<template>
	<div>
		<h1 class="h3 mb-2 text-gray-800">Nos offres</h1>
		<b-button to='/offers/add' variant="primary">Ajouter une offre</b-button>
		<b-table striped hover :items="jobs" :fields="fields" class="mt-2">
			<template #cell(actions)="data">
				<b-button size="sm" :to="'/offers/' + data.item.id + '/edit'" variant="warning" class="mr-2">Modifier</b-button>
				<b-button size="sm" variant="danger" @click="selectOffer(data.item)">Supprimer</b-button>
			</template>
		</b-table>
		<p class="mb-4" v-if="jobs.length === 0">Aucunes offre trouvée</p>

		<b-modal ref="deletion-modal" hide-footer title="Supression d'une offre d'emplois">
			<div class="d-block text-center">
				<p class="font-weight-normal">Êtes-vous sûr de vouloir supprimer l'offre "{{selectedOffer.title}}"</p>
			</div>
			<b-button class="mt-3" variant="danger" block @click="deleteOffer(selectedOffer.id)">Supprimer</b-button>
			<b-button class="mt-2" variant="outline-primary" block @click="closeModal()">Annuler</b-button>
		</b-modal>

	</div>
</template>

<script>
import OffersGateway from '../services/gateway/offers.gateway'

export default {
	name: 'JobList',
	data() {
		return {
			jobs: [],
			selectedOffer: {title: ''},
			fields: [
				{key: 'id', label: 'ID'}, 
				{key: 'title', label: 'Titre'}, 
				{key: 'description', label: 'Description'}, 
				'actions']
		}
	},
	methods: {
		selectOffer(offer) {
			this.selectedOffer = offer;
			this.$refs['deletion-modal'].show()
		},
		closeModal() {
			this.$refs['deletion-modal'].hide();
		},
		async deleteOffer(offerId) {
			this.$refs['deletion-modal'].hide();
			await OffersGateway.deleteOffer(offerId);
			this.jobs = await OffersGateway.getOffers();
		}
	},
	async created() {
		this.jobs = await OffersGateway.getOffers();
	}
}
</script>

<style>

</style>