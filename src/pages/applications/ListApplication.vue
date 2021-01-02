<template>
    <div>
        <h3>Mes candidatures</h3>
        <b-table striped hover :items="applications" :fields="fields" class="mt-2">
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
import applicationsGateway from '../../services/gateway/applications.gateway';
import deleteModal from '../../components/deleteModal';

export default {
    components: {
        deleteModal
    },
    data() {
        return {
            applications: [],
            fields: [
                'id', 
                { key: 'comment', label: 'Message personnalisé' }, 
                { key: 'offer', label: 'Offre' },
                { key: 'status', label: 'Statut'},
                'actions'
            ],
            selectedApplication: { id: '', offer: '' },
            openModal: false
        }
    },
    async created() {
        this.applications = await applicationsGateway.getUserApplications();
    },
    methods: {
        triggerApplicationDelete(application) {
            this.selectedApplication = application
            this.openModal = true
        },
        async deleteApplication() {
            this.closeModal();
            await applicationsGateway.deleteApplication(this.selectedApplication.id);
            this.applications = await applicationsGateway.getUserApplications();
        },
        closeModal() {
            this.openModal = false
        }   
    }
}
</script>

<style>

</style>