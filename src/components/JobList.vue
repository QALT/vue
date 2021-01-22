<template>
	<div>
		<h1 class="h3 mb-2 text-gray-800">Nos offres</h1>
		<b-button to='/offers/add' variant="primary">Ajouter une offre</b-button>
		<b-table striped hover :items="jobs" :fields="fields" class="mt-2">
			<template #cell(actions)="data">
				<b-button size="sm" variant="primary" class="mr-2" @click="openApplicationModal(data.item)">Postuler</b-button>
				<b-button size="sm" :to="`/offers/${data.item.id}/edit`" variant="warning" class="mr-2">Modifier</b-button>
				<b-button size="sm" variant="danger" @click="triggerOfferDelete(data.item)">Supprimer</b-button>
			</template>
		</b-table>
		<p class="mb-4" v-if="jobs.length === 0">Aucunes offre trouvée</p>

		<delete-modal
			:modalOpened="openDeleteModal"
            :title="'Suppression d\'une offre d\'emplois'"
            :text="`Êtes vous sûr de vouloir supprimer l'offre d'emplois intituliée: ${selectedOffer.title}`"
            @close="closeModal()"
            @confirm="deleteOffer(selectedOffer.id)"
        ></delete-modal>

		<application-modal-vue :modalOpened="applicationModalOpened" :offer="selectedOffer" @close="closeApplicationModal()"></application-modal-vue>

	</div>
</template>

<script>
import OffersGateway from '../services/gateway/offers.gateway'
import ApplicationModalVue from './applications/ApplicationModal.vue';
import deleteModal from './deleteModal';

export default {
	name: 'JobList',
	components: {
		ApplicationModalVue,
		deleteModal
	},
	data() {
		return {
			jobs: [],
			selectedOffer: {id: '', title: ''},
			fields: [
				{key: 'id', label: 'ID'}, 
				{key: 'title', label: 'Titre'}, 
				{key: 'description', label: 'Description'},
				{key: 'tags', label: 'Tags'},
				'actions'
			],
			applicationModalOpened: false,
			openDeleteModal: false
		}
	},
	methods: {
		triggerOfferDelete(offer) {
			this.selectedOffer = offer;
			this.openDeleteModal = true;
		},
		closeModal() {
			this.selectedOffer = {id: '', title: ''};
			this.openDeleteModal = false
		},
		async deleteOffer(offerId) {
			this.closeModal();
			await OffersGateway.deleteOffer(offerId);
			this.jobs = await OffersGateway.getOffers();
		},
		openApplicationModal(offer) {
			this.selectedOffer = offer;
			this.applicationModalOpened = true;
		},
		closeApplicationModal() {
			this.selectedOffer = {id: '', title: ''};
			this.applicationModalOpened = false;
		}
	},
	async created() {
		this.jobs = await OffersGateway.getOffers();
		// this.jobs = this.jobs.forEach( job => job.tags.map(({label}) => ({label})));
		// this.jobs = this.jobs.forEach( job => console.log(job.tags));
	}
}
</script>

<style>

</style>
