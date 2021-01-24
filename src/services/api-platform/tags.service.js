import {httpClient} from "./httpClient";

export default {
    getTags() {
        return httpClient.get("/api/tags")
            .then(response => response.data)
            .then(data => data["hydra:member"]);
    }
};