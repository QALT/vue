import {httpClient} from "./httpClient";
import {handleError} from "../../helpers/api-platform/error";

export default {
    getTags() {
        return httpClient.get("/api/tags")
            .then(response => response.data)
            .then(data => data["hydra:member"])
            .catch(handleError);
    },
    getTag(id) {
        return httpClient.get(`/api/tags/${id}`)
            .then(response => response.data);
    },
    addTag(label) {
        return httpClient.post("/api/tags", {label})
            .then(response => response.data)
            .then(data => data["hydra:member"]);
    },
    editTag(id, newTag) {
        return httpClient.put(`/api/tags/${id}`, newTag)
            .then(response => response.data);
    },
    deleteTag(id) {
        return httpClient.delete(`/api/tags/${id}`);
    }
};