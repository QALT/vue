import { httpClient } from "./httpClient";
import store from "../../store";
import {handleError} from "../../helpers/api-platform/error";

export default {
    getOffers() {
        let queryParams = "";

        if (store.getters.isEmployer) {
            queryParams = `?employer.id=${store.getters.getId}`;
        }

        return httpClient
            .get(`/api/offers${queryParams}`)
            .then(response => response.data)
            .then(data => data["hydra:member"])
            .catch(handleError);
    },
    getOffer(id) {
        return httpClient
            .get(`/api/offers/${id}`)
            .then(response => response.data)
            .catch(handleError);
    },
    addOffer(title,description,selectedTags) {
        const userIri = `/api/users/${store.getters.getId}`;
        selectedTags = selectedTags?.map(tag => "/api/tags/" + tag);
        return httpClient
            .post("/api/offers", {title, description, tags:selectedTags, employer: userIri})
            .then(response => response.data)
            .then(data => data["hydra:member"])
            .catch(handleError);
    },
    editOffer(id, newOffer) {
        newOffer.tags = newOffer.tags?.map(tag => "/api/tags/" + tag);
        return httpClient
            .put(`/api/offers/${id}`, {...newOffer, employer: newOffer.employer["@id"]})
            .then(response => response.data)
            .catch(handleError);
    },
    deleteOffer(id) {
        return httpClient
            .delete(`/api/offers/${id}`)
            .catch(handleError);
    }
};
