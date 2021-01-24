import {httpClient} from "./httpClient";
import store from "../../store";


export default {
    getExperiences() {
        return httpClient.get("/api/experiences")
            .then(response => response.data)
            .then(data => data["hydra:member"]);
    },
    getExperience(id) {
        return httpClient.get(`/api/experiences/${id}`)
            .then(response => response.data);
    },
    addExperience(label, description, startDate,endDate) {
        const userIri = `/api/users/${store.getters.getId}`;
        return httpClient.post("/api/experiences", {label, description,startDate,endDate, userAccount: userIri})
            .then(response => response.data)
            .then(data => data["hydra:member"]);
    },
    editExperience(id, newExperience) {
        return httpClient.put(`/api/experiences/${id}`, newExperience)
            .then(response => response.data);
    },
    deleteExperience(id) {
        return httpClient.delete(`/api/experiences/${id}`);
    }
};