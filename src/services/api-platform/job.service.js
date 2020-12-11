import httpClient from "./httpClient"

export default {
	getAllJobs() {
		return httpClient.get("/api/offers")
			.then(response => response.data)
			.then(data => data['hydra:member'])
	}
}