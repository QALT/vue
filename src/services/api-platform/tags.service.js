import {httpClient} from "./httpClient";
import {handleError} from "../../helpers/api-platform/error";

export default {
    getTags() {
        return httpClient.get("/api/tags")
            .then(response => response.data)
            .then(data => data["hydra:member"])
            .catch(handleError);
    }
};
