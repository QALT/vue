import {httpClient} from "./httpClient"
import store from '../../store';


export default {
	getOffers() {
		return httpClient.get("/api/offers")
			.then(response => response.data)
			.then(data => data['hydra:member'])
	},
	getOffer(id) {
		return httpClient.get(`/api/offers/${id}`)
			.then(response => response.data)
	},
	addOffer(title, description) {
		const userIri = `/api/users/${store.getters.getId}`;
		return httpClient.post("/api/offers", {title, description, employer: userIri})
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