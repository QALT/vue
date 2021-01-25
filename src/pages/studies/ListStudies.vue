<template>
	<div>
		<h1 class="h3 mb-2 text-gray-800">Mes diplômes</h1>
		<b-button to='/studies/add' variant="primary">Ajouter un diplôme</b-button>
		<b-table striped hover :items="studies" :fields="fields" class="mt-2 text-center">
			<template #cell(actions)="data">
				<b-button size="sm" :to="`/studies/${data.item.id}/edit`" variant="warning" class="mr-2">Modifier</b-button>
				<b-button size="sm" variant="danger" @click="triggerStudyDelete(data.item)">Supprimer</b-button>
			</template>
		</b-table>
		<p class="mb-4 text-center" v-if="studies.length === 0">Aucun diplôme trouvé</p>

		<delete-modal
			:modalOpened="openDeleteModal"
            :title="'Suppression d\'un diplôme'"
            :text="`Êtes vous sûr de vouloir supprimer le diplôme intitulé: ${selectedStudy.label}`"
            @close="closeModal()"
            @confirm="deleteStudy(selectedStudy.id)"
        ></delete-modal>
	</div>
</template>

<script>
import deleteModal from '../../components/deleteModal.vue';
import StudiesGateway from '../../services/gateway/studies.gateway'

export default {
    components: { deleteModal },
	name: 'ListStudies',
	data() {
		return {
			studies: [],
			selectedStudy: {id: '', label: ''},
			fields: [
				{key: 'label', label: 'Titre'}, 
				{key: 'degree', label:'Diplôme'},
				{key: 'school', label: 'Ecole'}, 
				'actions'
			],
			openDeleteModal: false
		}
	},
	methods: {
		triggerStudyDelete(study) {
            this.selectedStudy = study;
            this.openDeleteModal = true;
		},
		closeModal() {
			this.openDeleteModal = false
			this.selectedDegree = {id: '',label: ''};
		},
		async deleteStudy(selectedStudyId) {
			this.closeModal();
			await StudiesGateway.deleteStudy(selectedStudyId);
			const studies = await StudiesGateway.getStudies();
			this.studies = studies?.map(study => { 
				return { ...study, degree: this.getDegreeLabel(study) }
			})
		},
		getDegreeLabel(study){ 
			return study.degree.label;
		}
	},
	async created() {
		const studies = await StudiesGateway.getStudies();
		this.studies = studies?.map(study => { 
			return { ...study, degree: this.getDegreeLabel(study) }
		})
	}
}
</script>