<template>
    <div>
        <h3>Mes candidatures</h3>
        <b-table striped hover :items="applications" :fields="fields" class="mt-2 text-center">
            <template #cell(actions)="data">
                <b-button size="sm" :to="`/applications/${data.item.id}/edit`" variant="warning" class="mr-2" v-if="isEmployee || isAdmin">Modifier</b-button>
                <b-button size="sm" variant="danger" @click="triggerApplicationDelete(data.item)" v-if="isEmployee || isAdmin">Supprimer</b-button>
                <b-button size="sm" variant="danger" @click="triggerApplicationDelete(data.item)" v-if="isEmployer">Refuser</b-button>
            </template>
        </b-table>
        <delete-modal
            :modalOpened="openDeleteModal"
            :title="'Suppression d\'une candidature'"
            :text="`Êtes vous sûr de vouloir supprimer votre candidature pour ${selectedApplication.offer}`"
            @close="closeModal()"
            @confirm="deleteApplication(selectedApplication.id)"
        ></delete-modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '../../store';
import applicationsGateway from '../../services/gateway/applications.gateway';
import deleteModal from '../../components/deleteModal';

export default {
    components: {
        deleteModal
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
            openDeleteModal: false
        }
    },
    async created() {
        const applications = await applicationsGateway.getUserApplications();
        this.applications = this.convertData(applications);
    },
    methods: {
        triggerApplicationDelete(application) {
            this.selectedApplication = application;
            this.openDeleteModal = true;
        },
        async deleteApplication(selectedApplicationId) {
            this.closeModal();
            await applicationsGateway.deleteApplication(selectedApplicationId);
            const applications = await applicationsGateway.getUserApplications();
            this.applications = this.convertData(applications);
        },
        closeModal() {
            this.openDeleteModal = false;
            this.selectedApplication = { id: '', offer: '' };
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
        } 
    }
}
</script>
