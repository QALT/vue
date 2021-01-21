import {httpClient} from "./httpClient"

export default {
	getDegrees() {
		return httpClient.get("/api/degrees")
			.then(response => response.data)
			.then(data => data['hydra:member'])
	},
	getDegree(id) {
		return httpClient.get(`/api/degrees/${id}`)
			.then(response => response.data)
	},
	addDegree(label) {
		return httpClient.post("/api/degrees", {label})
			.then(response => response.data)
			.then(data => data['hydra:member'])
	},
	editDegree(id, newDegree) {
		return httpClient.put(`/api/degrees/${id}`, newDegree)
			.then(response => response.data)
	},
	deleteDegree(id) {
		return httpClient.delete(`/api/degrees/${id}`);
	}
}