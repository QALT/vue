import { httpClient } from "./httpClient"
import store from '../../store';

export default {
	getOffers() {
		let queryParams = '';

		if (store.getters.isEmployer) {
			queryParams = `?employer.id=${store.getters.getId}`
		}

		return httpClient.get(`/api/offers${queryParams}`)
			.then(response => response.data)
			.then(data => data['hydra:member'])
	},
	getOffer(id) {
		return httpClient.get(`/api/offers/${id}`)
			.then(response => response.data)
	},
	addOffer(title,description,selectedTags) {
		const userIri = `/api/users/${store.getters.getId}`;
		selectedTags = selectedTags.map(tag => '/api/tags/'+tag);
		return httpClient.post("/api/offers", {title, description,tags:selectedTags, employer: userIri})
			.then(response => response.data)
			.then(data => data['hydra:member'])
	},
	editOffer(id, newOffer) {
		return httpClient.put(`/api/offers/${id}`, newOffer)
			.then(response => response.data)
	},
	deleteOffer(id) {
		return httpClient.delete(`/api/offers/${id}`);
	}
}