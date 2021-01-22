import { httpClient } from "./httpClient"
import store from '../../store';

export default {
	getStudies() {
        
		return httpClient.get("/api/studies")
			.then(response => response.data)
			.then(data => data['hydra:member'])
	},
	getStudy(id) {
		return httpClient.get(`/api/studies/${id}`)
			.then(response => response.data)
	},
	addStudy(label, school, degree) {
		const userIri = `/api/users/${store.getters.getId}`;
		return httpClient.post("/api/studies", {label, school, degree, useraccount: userIri})
			.then(response => response.data)
			.then(data => data['hydra:member'])
	},
	editStudy(id, newStudy) {
		return httpClient.put(`/api/studies/${id}`, newStudy)
			.then(response => response.data)
	},
	deleteStudy(id) {
		return httpClient.delete(`/api/studies/${id}`);
	}
}