<template>
    <div>
        <h3>Mes candidatures</h3>
        <b-table striped hover :items="applications" :fields="fields" class="mt-2 text-center">
            <template #cell(actions)="data">
                <b-button size="sm" :to="`/applications/${data.item.id}/edit`" variant="warning" class="mr-2">Modifier</b-button>
                <b-button size="sm" variant="danger" @click="triggerApplicationDelete(data.item)">Supprimer</b-button>
            </template>
        </b-table>
        <delete-modal
            :modalOpened="openModal"
            :title="'Suppression d\'une candidature'"
            :text="`Êtes vous sûr de vouloir supprimer votre candidature pour ${selectedApplication.offer}`"
            @close="closeModal()"
            @confirm="deleteApplication()"
        ></delete-modal>
    </div>
</template>

<script>
import store from '../../store';
import applicationsGateway from '../../services/gateway/applications.gateway';
import deleteModal from '../../components/deleteModal';

export default {
    components: {
        deleteModal
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
            openModal: false
        }
    },
    async created() {
        const applications = await applicationsGateway.getUserApplications();
        this.applications = this.convertData(applications);
    },
    methods: {
        triggerApplicationDelete(application) {
            this.selectedApplication = application
            this.openModal = true
        },
        async deleteApplication() {
            this.closeModal();
            await applicationsGateway.deleteApplication(this.selectedApplication.id);
            const applications = await applicationsGateway.getUserApplications();
            this.applications = this.convertData(applications);
        },
        closeModal() {
            this.openModal = false;
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
