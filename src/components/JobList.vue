<template>
	<div>
		<h1 class="h3 mb-2 text-gray-800">Offers</h1>
		<p class="mb-4">There's a list of all our current offers available</p>
		<b-table striped hover :items="jobs"></b-table>
	</div>
</template>

<script>
import JobService from '../services/api-platform/job.service';

export default {
	name: 'JobList',
	data() {
		return {
			jobs: []
		}
	},
	async created() {
		const jobs = await JobService.getAllJobs();
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