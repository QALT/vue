<template>
	<div>
		<h1 class="h3 mb-2 text-gray-800">Nos offres</h1>
		<b-button to='/offers/add' variant="primary" v-if="isEmployer">Ajouter une offre</b-button>
		
		<b-col lg="6" class="my-4">
			<b-form-group
				label="Filtre"
				label-for="filter-input"
				label-cols-sm="3"
				label-align-sm="right"
				label-size="sm"
				class="mb-4"
			>
			<b-input-group size="sm">
				<b-form-input
					id="filter-input"
					v-model="filter"
					type="search"
					placeholder="Rechercher ..."
				>
				</b-form-input>
				<b-input-group-append>
					<b-button :disabled="!filter" @click="filter = ''">Supprimer</b-button>
				</b-input-group-append>
			</b-input-group>
			</b-form-group>
		</b-col>
		<b-table :filter="filter" striped hover :items="jobsLabel" :fields="fields" class="mt-2 text-center">
			<template #cell(actions)="data">
				<b-button size="sm" variant="primary" class="mr-2" @click="openApplicationModal(data.item)" v-if="isEmployee">Postuler</b-button>
				<b-button size="sm" :to="`/offers/${data.item.id}/edit`" variant="warning" class="mr-2" v-if="isEmployer">Modifier</b-button>
				<b-button size="sm" variant="danger" @click="triggerOfferDelete(data.item)" v-if="isEmployer">Supprimer</b-button>
			</template>
		</b-table>
		<p class="mb-4 text-center" v-if="jobs.length === 0">Aucunes offre trouvée</p>

		<delete-modal
			:modalOpened="openDeleteModal"
            :title="'Suppression d\'une offre d\'emplois'"
            :text="`Êtes vous sûr de vouloir supprimer l'offre d'emplois intituliée: ${selectedOffer.title}`"
            @close="closeModal()"
            @confirm="deleteOffer(selectedOffer.id)"
        ></delete-modal>

		<application-modal-vue :modalOpened="applicationModalOpened" :offer="selectedOffer" @close="closeApplicationModal()"></application-modal-vue>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import OffersGateway from '../services/gateway/offers.gateway'
import ApplicationModalVue from './applications/ApplicationModal.vue';
import deleteModal from './deleteModal';

export default {
	name: 'JobList',
	components: {
		ApplicationModalVue,
		deleteModal
	},
	data() {
		return {
			jobs: [],
			jobsLabel : [],
			selectedOffer: {id: '', title: ''},
			fields: [
				{key: 'title', label: 'Titre'}, 
				{key: 'description', label: 'Description'},
				{key: 'tags', label: 'Tags'},
				'actions'
			],
			applicationModalOpened: false,
			openDeleteModal: false,
			filter: null,
		}
	},
	computed: {
		...mapGetters(['isEmployer', 'isEmployee']),
	},
	methods: {
		triggerOfferDelete(offer) {
			this.selectedOffer = offer;
			this.openDeleteModal = true;
		},
		closeModal() {
			this.selectedOffer = {id: '', title: ''};
			this.openDeleteModal = false
		},
		async deleteOffer(offerId) {
			this.closeModal();
			await OffersGateway.deleteOffer(offerId);
			this.jobs = await OffersGateway.getOffers();
		},
		openApplicationModal(offer) {
			this.selectedOffer = offer;
			this.applicationModalOpened = true;
		},
		closeApplicationModal() {
			this.selectedOffer = {id: '', title: ''};
			this.applicationModalOpened = false;
		},
		getJobsLabels(job) { 
			return job.tags.map(tag => tag.label).join(", ");
		}
	},
	async created() {
		this.jobs = await OffersGateway.getOffers();
		this.jobsLabel = this.jobs.map(job => { 
			return { ...job, tags:this.getJobsLabels(job) }
		})
	}
}
</script>

<style>

</style>
