<template>
	<div>
		<h1 class="h3 mb-2 text-gray-800">Nos offres</h1>
		<b-button to='/offers/add' variant="primary">Ajouter une offre</b-button>
		<b-table striped hover :items="jobs" :fields="fields" class="mt-2">
			<template #cell(actions)="data">
				<b-button size="sm" :to="'/offers/' + data.item.id + '/edit'" variant="warning">Modifier</b-button>
			</template>
		</b-table>
		<p class="mb-4" v-if="jobs.length === 0">Aucunes offre trouvée</p>

	</div>
</template>

<script>
import OffersGateway from '../services/gateway/offers.gateway'

export default {
	name: 'JobList',
	data() {
		return {
			jobs: [],
			fields: [
				{key: 'id', label: 'ID'}, 
				{key: 'title', label: 'Titre'}, 
				{key: 'description', label: 'Description'}, 
				'actions']
		}
	},
	async created() {
		this.jobs = await OffersGateway.getOffers();
	}
}
</script>

<style>

</style>