import httpClient from "./httpClient"

export default {
	getAllJobs() {
		return httpClient.get("/offers")
			.then(response => response.data)
			.then(data => data['hydra:member'])
	}
}