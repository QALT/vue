import {httpClient} from "./httpClient";
import {handleError} from "../../helpers/api-platform/error";

export default {
    getDegrees() {
        return httpClient
            .get("/api/degrees")
            .then(response => response.data)
            .then(data => data["hydra:member"])
            .catch(handleError);
    },
    getDegree(id) {
        return httpClient
            .get(`/api/degrees/${id}`)
            .then(response => response.data)
            .catch(handleError);
    },
    addDegree(label) {
        return httpClient
            .post("/api/degrees", {label})
            .then(response => response.data)
            .then(data => data["hydra:member"])
            .catch(handleError);
    },
    editDegree(id, newDegree) {
        return httpClient
            .put(`/api/degrees/${id}`, newDegree)
            .then(response => response.data)
            .catch(handleError);
    },
    deleteDegree(id) {
        return httpClient
            .delete(`/api/degrees/${id}`)
            .catch(handleError);
    }
};
