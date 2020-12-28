<template>
	<div>
		<h1 class="h3 mb-2 text-gray-800">Nos offres</h1>
		<b-button to='/offers/add'>Ajouter une offre</b-button>
		<b-table striped hover :items="jobs"></b-table>
		<p class="mb-4" v-if="jobs.length === 0">Aucunes offre trouvée</p>

	</div>
</template>

<script>
import OffersGateway from '../services/gateway/offers.gateway'

export default {
	name: 'JobList',
	data() {
		return {
			jobs: []
		}
	},
	async created() {
		const jobs = await OffersGateway.getOffers() || [];
		this.jobs = jobs.map(job => ({
			id: job.id,
			title: job.title,
			description: job.description,
			lastUpdate: new Date(job.updatedAt).toLocaleString()
		}))
	}
}
</script>

<style>

</style>