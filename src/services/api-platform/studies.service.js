import { httpClient } from "./httpClient";
import store from "../../store";
import {handleError} from "../../helpers/api-platform/error";

export default {
    getStudies() {
        let queryParams = "";

        if (store.getters.isEmployee) {
            const userIri = `/api/users/${store.getters.getId}`;
            queryParams = `?userAccount.id=${userIri}`;
        }

        return httpClient.get(`/api/studies${queryParams}`)
            .then(response => response.data)
            .then(data => data["hydra:member"])
            .catch(handleError);
    },
    getStudy(id) {
        return httpClient
            .get(`/api/studies/${id}`)
            .then(response => response.data)
            .catch(handleError);
    },
    addStudy(label, school, degree) {
        const userIri = `/api/users/${store.getters.getId}`;
        return httpClient
            .post("/api/studies", {label, school, degree, userAccount: userIri})
            .then(response => response.data)
            .then(data => data["hydra:member"])
            .catch(handleError);
    },
    editStudy(id, newStudy) {
        return httpClient
            .put(`/api/studies/${id}`, newStudy)
            .then(response => response.data)
            .catch(handleError);
    },
    deleteStudy(id) {
        return httpClient
            .delete(`/api/studies/${id}`)
            .catch(handleError);
    }
};
