import { httpClient } from "./httpClient";
import store from "../../store";
import {handleError} from "../../helpers/api-platform/error";

export default {
    getApplication(id) {
        return httpClient.get(`/api/applications/${id}`)
            .then(response => response.data)
            .catch(handleError);
    },
    addApplication(offerId, customMessage) {
        const formatedOfferId = `/api/offers/${offerId}`;
        const userIri = `/api/users/${store.getters.getId}`;
        return httpClient.post("/api/applications", {offer: formatedOfferId, comment: customMessage, applicant: userIri})
            .then(response => response.data)
            .then(data => data["hydra:member"])
            .catch(handleError);
    },
    getUserApplications() {
        let queryParams = "";

        if (store.getters.isEmployer) {
            queryParams = `?offer.employer.id=${store.getters.getId}`;
        }

        if(store.getters.isEmployee) {
            queryParams = `?applicant.id=${store.getters.getId}`;
        }

        return httpClient.get(`/api/applications${queryParams}`)
            .then(response => response.data)
            .then(data => data["hydra:member"])
            .catch(handleError);
    },
    editApplication(id, newApplication) {
        return httpClient.put(`/api/applications/${id}`, newApplication)
            .then(response => response.data)
            .catch(handleError);
    },
    deleteApplication(id) {
        return httpClient.delete(`/api/applications/${id}`)
            .catch(handleError);
    },
    validApplication(id) {
        return httpClient.put(`/api/applications/${id}`, {status: 'accepted'})
            .then(response => response.data)
            .catch(handleError);
    },
    rejectApplication(id) {
        return httpClient.put(`/api/applications/${id}`, {status: 'refused'})
            .then(response => response.data)
            .catch(handleError);
    }
};
