import {httpClient} from "./httpClient"

export default {
	getOffers() {
		return httpClient.get("/api/offers")
			.then(response => response.data)
			.then(data => data['hydra:member'])
	},
	addOffer(title, description) {
		return httpClient.post("/api/offers", {title, description})
			.then(response => response.data)
			.then(data => data['hydra:member'])
	}
}