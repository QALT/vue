<template>
	<div>
		<h1 class="h3 mb-2 text-gray-800">Niveau d'études</h1>
		<b-button to='/degrees/add' variant="primary">Ajouter un niveau</b-button>
		<b-table striped hover :items="withHumanDates(['updatedAt'], degrees)" :fields="fields" class="mt-2 text-center">
			<template #cell(actions)="data">
				<b-button size="sm" :to="`/degrees/${data.item.id}/edit`" variant="warning" class="mr-2">Modifier</b-button>
				<b-button size="sm" variant="danger" @click="triggerDegreeDelete(data.item)">Supprimer</b-button>
			</template>
		</b-table>
		<p class="mb-4 text-center" v-if="degrees.length === 0">Aucun niveau d'étude trouvé</p>

		<delete-modal
			:modalOpened="openDeleteModal"
            :title="'Suppression d\'un niveau d\'étude'"
            :text="`Êtes vous sûr de vouloir supprimer le niveau intitulé: ${selectedDegree.label}`"
            @close="closeModal()"
            @confirm="deleteDegree(selectedDegree.id)"
        ></delete-modal>
	</div>
</template>

<script>
import DegreesGateway from '../../services/gateway/degrees.gateway'
import deleteModal from '../../components/deleteModal';
import {withHumanDates} from "../../helpers/date";

export default {
	components: {
		deleteModal
	},
	data() {
		return {
			degrees: [],
			selectedDegree: {id: '', label: ''},
			openDeleteModal: false,
			fields: [
				{ key: 'label', label: 'Label' }, 
                { key: 'updatedAt', label: 'Dernière mise à jour' }, 
				'actions'
			]
		}
	},
	methods: {
        withHumanDates,
		triggerDegreeDelete(degree) {
			this.selectedDegree = degree;
			this.openDeleteModal = true;
		},
		closeModal() {
			this.openDeleteModal = false
			this.selectedDegree = {id: '',label: ''};
		},
		async deleteDegree(degreeId) {
			this.closeModal();
			await DegreesGateway.deleteDegree(degreeId);
			this.degrees = await DegreesGateway.getDegrees();
		},
	},
	async created() {
		this.degrees = await DegreesGateway.getDegrees();
	}
}
</script>