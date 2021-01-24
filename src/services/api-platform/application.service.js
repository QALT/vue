import { httpClient } from "./httpClient";
import store from "../../store";

export default {
    getApplication(id) {
        return httpClient.get(`/api/applications/${id}`)
            .then(response => response.data);
    },
    addApplication(offerId, customMessage) {
        const formatedOfferId = `/api/offers/${offerId}`;
        const userIri = `/api/users/${store.getters.getId}`;
        return httpClient.post("/api/applications", {offer: formatedOfferId, comment: customMessage, applicant: userIri})
            .then(response => response.data)
            .then(data => data["hydra:member"]);
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
            .then(data => data["hydra:member"]);
    },
    editApplication(id, newApplication) {
        return httpClient.put(`/api/applications/${id}`, newApplication)
            .then(response => response.data);
    },
    deleteApplication(id) {
        return httpClient.delete(`/api/applications/${id}`);
    }
};