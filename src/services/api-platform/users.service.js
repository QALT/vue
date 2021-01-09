import { httpClient } from "./httpClient"

export default {
    getUser(id) {
		return httpClient.get(`/api/users/${id}`)
			.then(response => response.data)
	},
	editUser(id, user) {
		return httpClient.put(`/api/users/${id}`, user)
        .then(response => response.data)
	},
}