<template>
    <div>
        <h3>Mes candidatures</h3>
        <b-table striped hover :items="applications" :fields="fields" class="mt-2 text-center">
            <template #cell(status)="data">
                {{ data.value | applicationStatus }}
            </template>
            <template #cell(actions)="data">
                <b-button size="sm" v-if="isEmployee || isAdmin" :to="`/applications/${data.item.id}/edit`" variant="warning" class="mr-2">Modifier</b-button>
                <b-button size="sm" variant="danger" v-if="isEmployee || isAdmin" @click="triggerApplicationDelete(data.item)">Supprimer</b-button>
                <b-button size="sm" variant="success" v-if="isEmployer" @click="triggerApplicationValidation(data.item)" class="mr-2">Valider</b-button>
                <b-button size="sm" variant="danger" v-if="isEmployer" @click="triggerApplicationReject(data.item)">Refuser</b-button>
            </template>
        </b-table>
        <delete-modal
            :modalOpened="openDeleteModal"
            :title="'Suppression d\'une candidature'"
            :text="`Êtes vous sûr de vouloir supprimer votre candidature pour ${selectedApplication.offer} ?`"
            @close="closeModals()"
            @confirm="deleteApplication()"
        ></delete-modal>
        <modal-component
            :modalOpened="validApplicationModal"
            :title="'Validation d\'une candidature'"
            :text="`Êtes vous sûr de vouloir valider cette candidature pour ${selectedApplication.offer} ?`"
            :confirmLabel="'Confirmer'"
            :cancelLabel="'Annuler'"
            @cancel="closeModals()"
            @confirm="validApplication()"
        ></modal-component>
        <modal-component
            :modalOpened="rejectApplicationModal"
            :title="'Refus d\'une candidature'"
            :text="`Êtes vous sûr de vouloir refuser cette candidature pour ${selectedApplication.offer} ?`"
            :confirmLabel="'Refuser'"
            :cancelLabel="'Annuler'"
            @cancel="closeModals()"
            @confirm="rejectApplication()"
        ></modal-component>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '../../store';
import applicationsGateway from '../../services/gateway/applications.gateway';
import deleteModal from '../../components/deleteModal';
import modalComponent from '../../components/modalComponent';

export default {
    components: {
        deleteModal,
        modalComponent
    },
    filters: {
        applicationStatus: function(status) {
            status = status.toString().toLowerCase();
            const statusTranslation = {
                'accepted': 'Acceptée',
                'refused': 'Rejetée',
                'submitted': 'Soumise'
            }
            return statusTranslation[status];
        }
    },
    computed: {
		...mapGetters(['isEmployer', 'isEmployee', 'isAdmin']),
	},
    data() {
        let additionalFields = [];
        const commonFields = [
            { key: 'comment', label: 'Message personnalisé' }, 
            { key: 'offer', label: 'Offre' },
            { key: 'status', label: 'Statut'},
            'actions'
        ];

        if (store.getters.isEmployer) {
            additionalFields = [
                {key: 'applicant', label: 'Candidat'},
            ];
        }

        const fields = [...additionalFields, ...commonFields];

        return {
            applications: [],
            fields,
            selectedApplication: { id: '', offer: '' },
            openDeleteModal: false,
            validApplicationModal: false,
            rejectApplicationModal: false
        }
    },
    async created() {
        this.refreshApplications();
    },
    methods: {
        async refreshApplications() {
            const applications = await applicationsGateway.getUserApplications();
            this.applications = this.convertData(applications);
        },
        triggerApplicationDelete(application) {
            this.selectedApplication = application;
            this.openDeleteModal = true;
        },
        async deleteApplication() {
            this.closeModals();
            await applicationsGateway.deleteApplication(this.selectedApplication.id);
            this.refreshApplications();
        },
        closeModals() {
            this.rejectApplicationModal = false;
            this.openDeleteModal = false;
            this.validApplicationModal = false;
        },
        getOfferTitle(application) {
            return application.offer.title;
        },
        getApplicant(applicant) {
            return `${applicant.lastname} ${applicant.firstname}`
        },
        convertData(applications) {
            return applications.map(application => { 
                return {
                    ...application,
                    offer: this.getOfferTitle(application),
                    applicant: this.getApplicant(application.applicant)
                }
            })
        },
        triggerApplicationValidation(application) {
            this.selectedApplication = application
            this.validApplicationModal = true
        },
        async validApplication() {
            this.closeModals();
            await applicationsGateway.validApplication(this.selectedApplication.id);
            this.refreshApplications();
        },
        triggerApplicationReject(application) {
            this.selectedApplication = application
            this.rejectApplicationModal = true;
        },
        async rejectApplication() {
            this.closeModals();
            await applicationsGateway.rejectApplication(this.selectedApplication.id);
            this.refreshApplications();
        }
    }
}
</script>
