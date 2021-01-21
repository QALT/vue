<template>
	<div>
		<h1 class="h3 mb-2 text-gray-800">Mes expériences</h1>
		<b-button to='/experiences/add' variant="primary">Ajouter une expérience</b-button>
		<b-table striped hover :items="experiences" :fields="fields" class="mt-2">
			<template #cell(actions)="data">
				<b-button size="sm" :to="`/experiences/${data.item.id}/edit`" variant="warning" class="mr-2">Modifier</b-button>
				<b-button size="sm" variant="danger" @click="selectExperience(data.item)">Supprimer</b-button>
			</template>
		</b-table>
		<p class="mb-4" v-if="experiences.length === 0">Aucune expérience trouvée</p>

		<b-modal ref="deletion-modal" hide-footer title="Supression d'une expérience">
			<div class="d-block text-center">
				<p class="font-weight-normal">Êtes-vous sûr de vouloir supprimer l'expérience "{{selectedExperience.label}}"</p>
			</div>
			<b-button class="mt-3" variant="danger" block @click="deleteExperience(selectedExperience.id)">Supprimer</b-button>
			<b-button class="mt-2" variant="outline-primary" block @click="closeModal()">Annuler</b-button>
		</b-modal>

	</div>
</template>

<script>
import experiencesGateway from '../../services/gateway/experiences.gateway'

export default {
	name: 'ListExperience',
	data() {
		return {
            experiences:[],
			selectedExperience: {id: '',label: ''},
			fields: [
                {key: 'label', label: 'Intitulé du poste'}, 
                {key: 'description', label: 'Description'},
                {key: 'startDate', label: 'Début le'}, 
                {key: 'endDate', label: 'Fin le'}, 
				'actions']
		}
	},
	methods: {
		selectExperience(experience) {
			this.selectedExperience = experience;
			this.$refs['deletion-modal'].show()
		},
		closeModal() {
			this.$refs['deletion-modal'].hide();
		},
		async deleteExperience(experienceId) {
			this.$refs['deletion-modal'].hide();
			await experiencesGateway.deleteExperience(experienceId);
			this.experiences = await experiencesGateway.getExperiences();
		}
	},
	async created() {
		this.experiences = await experiencesGateway.getExperiences();
	}
}
</script>

<style>

</style>
