<template>
	<div>
		<h1 class="h3 mb-2 text-gray-800">Tags</h1>
		<b-button to='/tags/add' variant="primary">Ajouter un tag</b-button>
		<b-table striped hover :items="tags" :fields="fields" class="mt-2 text-center">
			<template #cell(actions)="data">
				<b-button size="sm" :to="`/tags/${data.item.id}/edit`" variant="warning" class="mr-2">Modifier</b-button>
				<b-button size="sm" variant="danger" @click="selectTag(data.item)">Supprimer</b-button>
			</template>
		</b-table>
		<p class="mb-4 text-center" v-if="tags.length === 0">Aucun tag trouvé</p>

		<b-modal ref="deletion-modal" hide-footer title="Supression d'un tag">
			<div class="d-block text-center">
				<p class="font-weight-normal">Êtes-vous sûr de vouloir supprimer le tag "{{selectedTag.label}}" ?</p>
			</div>
			<b-button class="mt-3" variant="danger" block @click="deleteTag(selectedTag.id)">Supprimer</b-button>
			<b-button class="mt-2" variant="outline-primary" block @click="closeModal()">Annuler</b-button>
		</b-modal>
	</div>
</template>

<script>
import TagsGateway from '../../services/gateway/tags.gateway'

export default {
	name: 'ListTag',
	data() {
		return {
			tags: [],
			selectedTag: {label: ''},
			fields: [
				{key: 'label', label: 'Label'}, 
				'actions'
			]
		}
	},
	methods: {
		selectTag(tag) {
			this.selectedTag = tag;
			this.$refs['deletion-modal'].show()
		},
		closeModal() {
			this.$refs['deletion-modal'].hide();
		},
		async deleteTag(tagId) {
			this.$refs['deletion-modal'].hide();
			await TagsGateway.deleteTag(tagId);
			this.tags = await TagsGateway.getTags();
		},
	},
	async created() {
		this.tags = await TagsGateway.getTags();
	}
}
</script>