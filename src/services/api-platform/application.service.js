import {httpClient} from "./httpClient"

export default {
	// getOffers() {
	// 	return httpClient.get("/api/offers")
	// 		.then(response => response.data)
	// 		.then(data => data['hydra:member'])
	// },
	// getOffer(id) {
	// 	return httpClient.get(`/api/offers/${id}`)
	// 		.then(response => response.data)
	// },
	addApplication(offerId, customMessage) {
        const formatedOfferId = `/api/offers/${offerId}`;
		return httpClient.post("/api/applications", {offer: formatedOfferId, comment: customMessage, status: 'submitted'})
			.then(response => response.data)
			.then(data => data['hydra:member'])
	},
	// editOffer(id, newOffer) {
	// 	return httpClient.put(`/api/offers/${id}`, newOffer)
	// 		.then(response => response.data)
	// },
	// deleteOffer(id) {
	// 	return httpClient.delete(`/api/offers/${id}`);
	// }
}