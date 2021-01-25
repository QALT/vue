<template>
	<div>
		<h1 class="h3 mb-2 text-gray-800">Mes expériences</h1>
		<b-button to='/experiences/add' variant="primary">Ajouter une expérience</b-button>
		<b-table striped hover :items="withHumanDates(['startDate', 'endDate'], experiences)" :fields="fields" class="mt-2 text-center">
			<template #cell(actions)="data">
				<b-button size="sm" :to="`/experiences/${data.item.id}/edit`" variant="warning" class="mr-2">Modifier</b-button>
				<b-button size="sm" variant="danger" @click="triggerExperienceDelete(data.item)">Supprimer</b-button>
			</template>
		</b-table>
		<p class="mb-4 text-center" v-if="experiences.length === 0">Aucune expérience trouvée</p>

		<delete-modal
            :modalOpened="openDeleteModal"
            :title="'Suppression d\'une expérience'"
            :text="`Êtes vous sûr de vouloir supprimer votre expérience intitulée: ${selectedExperience.offer}`"
            @close="closeModal()"
            @confirm="deleteExperience(selectedExperience.id)"
        ></delete-modal>

	</div>
</template>

<script>
import experiencesGateway from '../../services/gateway/experiences.gateway'
import {withHumanDates} from "../../helpers/date";
import deleteModal from '../../components/deleteModal.vue';

export default {
    components: { deleteModal },
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
				'actions'
			],
			openDeleteModal: false
		}
	},
	methods: {
        withHumanDates,
		triggerExperienceDelete(experience) {
            this.selectedExperience = experience;
            this.openDeleteModal = true;
        },
        closeModal() {
            this.openDeleteModal = false;
			this.selectedExperience = {id: '',label: ''};
        },
		async deleteExperience(selectedExperienceId) {
			this.closeModal();
			await experiencesGateway.deleteExperience(selectedExperienceId);
			this.experiences = await experiencesGateway.getExperiences();
		}
	},
	async created() {
		this.experiences = await experiencesGateway.getExperiences();
	}
}
</script>