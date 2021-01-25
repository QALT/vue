<template>
	<div>
		<h1 class="h3 mb-2 text-gray-800">Tags</h1>
		<b-button to='/tags/add' variant="primary">Ajouter un tag</b-button>
		<b-table striped hover :items="tags" :fields="fields" class="mt-2 text-center">
			<template #cell(actions)="data">
				<b-button size="sm" :to="`/tags/${data.item.id}/edit`" variant="warning" class="mr-2">Modifier</b-button>
				<b-button size="sm" variant="danger" @click="triggerTagDelete(data.item)">Supprimer</b-button>
			</template>
		</b-table>
		<p class="mb-4 text-center" v-if="tags.length === 0">Aucun tag trouvé</p>

		<delete-modal
            :modalOpened="openDeleteModal"
            :title="'Suppression d\'un tag'"
            :text="`Êtes vous sûr de vouloir supprimer le tag intitulé: ${selectedTag.label}`"
            @close="closeModal()"
            @confirm="deleteTag(selectedTag.id)"
        ></delete-modal>
	</div>
</template>

<script>
import deleteModal from '../../components/deleteModal.vue';
import TagsGateway from '../../services/gateway/tags.gateway'

export default {
    components: { deleteModal },
	name: 'ListTag',
	data() {
		return {
			tags: [],
			selectedTag: {id: '', label: ''},
			fields: [
				{key: 'label', label: 'Label'}, 
				'actions'
			],
			openDeleteModal: false
		}
	},
	methods: {
		triggerTagDelete(tag) {
            this.selectedTag = tag;
            this.openDeleteModal = true;
        },
        closeModal() {
            this.openDeleteModal = false;
			this.selectedTag = {id: '',label: ''};
        },
		async deleteTag(selectedTagId) {
			this.closeModal();
			await TagsGateway.deleteTag(selectedTagId);
			this.tags = await TagsGateway.getTags();
		},
	},
	async created() {
		this.tags = await TagsGateway.getTags();
	}
}
</script>