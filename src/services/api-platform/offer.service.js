import {httpClient} from "./httpClient"

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
		return httpClient.post("/api/offers", {title, description})
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