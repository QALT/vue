import {httpClient} from "./httpClient";
import store from "../../store";
import {handleError} from "../../helpers/api-platform/error";

export default {
    getExperiences() {
        let queryParams = '';

        if (store.getters.isEmployee) {
            const userIri = `/api/users/${store.getters.getId}`;
            queryParams = `?userAccount.id=${userIri}`;
        }

        return httpClient
            .get(`/api/experiences${queryParams}`)
            .then(response => response.data)
            .then(data => data["hydra:member"])
            .catch(handleError);
    },
    getExperience(id) {
        return httpClient
            .get(`/api/experiences/${id}`)
            .then(response => response.data)
            .catch(handleError);
    },
    addExperience(label, description, startDate,endDate) {
        const userIri = `/api/users/${store.getters.getId}`;
        return httpClient
            .post("/api/experiences", {label, description,startDate,endDate, userAccount: userIri})
            .then(response => response.data)
            .then(data => data["hydra:member"])
            .catch(handleError);
    },
    editExperience(id, newExperience) {
        return httpClient
            .put(`/api/experiences/${id}`, newExperience)
            .then(response => response.data)
            .catch(handleError);
    },
    deleteExperience(id) {
        return httpClient
            .delete(`/api/experiences/${id}`)
            .catch(handleError);
    }
};
