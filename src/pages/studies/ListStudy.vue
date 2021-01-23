<template>
	<div>
		<h1 class="h3 mb-2 text-gray-800">Mes diplômes</h1>
		<b-button to='/studies/add' variant="primary">Ajouter un diplôme</b-button>
		<b-table striped hover :items="studiesDegree" :fields="fields" class="mt-2 text-center">
			<template #cell(actions)="data">
				<b-button size="sm" :to="`/studies/${data.item.id}/edit`" variant="warning" class="mr-2">Modifier</b-button>
				<b-button size="sm" variant="danger" @click="selectStudy(data.item)">Supprimer</b-button>
			</template>
		</b-table>
		<p class="mb-4 text-center" v-if="studiesDegree.length === 0">Aucun diplôme trouvé</p>

		<b-modal ref="deletion-modal" hide-footer title="Supression d'un diplôme">
			<div class="d-block text-center">
				<p class="font-weight-normal">Êtes-vous sûr de vouloir supprimer le diplôme "{{selectedStudy.label}}"</p>
			</div>
			<b-button class="mt-3" variant="danger" block @click="deleteStudy(selectedStudy.id)">Supprimer</b-button>
			<b-button class="mt-2" variant="outline-primary" block @click="closeModal()">Annuler</b-button>
		</b-modal>

	</div>
</template>

<script>
import StudiesGateway from '../../services/gateway/studies.gateway'

export default {
	name: 'ListStudy',
	data() {
		return {
			studies: [],
			studiesDegree: [],
			selectedStudy: {label: ''},
			fields: [
				{key: 'label', label: 'Titre'}, 
				{key: 'school', label: 'Ecole'}, 
				{key: 'degree', label:'Diplôme'},
				'actions'
			]
		}
	},
	methods: {
		selectStudy(study) {
			this.selectedStudy = study;
			this.$refs['deletion-modal'].show()
		},
		closeModal() {
			this.$refs['deletion-modal'].hide();
		},
		async deleteStudy(studyId) {
			this.$refs['deletion-modal'].hide();
			await StudiesGateway.deleteStudy(studyId);
			this.studies = await StudiesGateway.getStudies();
		},
		getDegreeLabel(study){ 
			return study.degree.label;
		}
	},
	async created() {
		this.studies = await StudiesGateway.getStudies();
		this.studiesDegree = this.studies.map(study => { 
			return { ...study, degree:this.getDegreeLabel(study) }
		})
	}
}
</script>

<style>

</style>
