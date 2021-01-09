import { httpClient } from "./httpClient"
import store from '../../store';

export default {
	getApplication(id) {
		return httpClient.get(`/api/applications/${id}`)
			.then(response => response.data)
	},
	addApplication(offerId, customMessage) {
		const formatedOfferId = `/api/offers/${offerId}`;
		const userIri = store.getters.getId;
		return httpClient.post("/api/applications", {offer: formatedOfferId, comment: customMessage, applicant: userIri})
			.then(response => response.data)
			.then(data => data['hydra:member'])
	},
	getUserApplications() {
		const userIri = store.getters.getId;
		return httpClient.get(`/api/applications?applicant=${userIri}`)
			.then(response => response.data)
			.then(data => data['hydra:member'])
	},
	editApplication(id, newApplication) {
		return httpClient.put(`/api/applications/${id}`, newApplication)
			.then(response => response.data)
	},
	deleteApplication(id) {
		return httpClient.delete(`/api/applications/${id}`);
	}
}