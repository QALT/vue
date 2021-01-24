import { httpClient } from "./httpClient";
import {handleError} from "../../helpers/api-platform/error";

export default {
    getUser(id) {
        return httpClient
            .get(`/api/users/${id}`)
            .then(response => response.data)
            .catch(handleError);
    },
    editUser(id, user) {
        return httpClient
            .put(`/api/users/${id}`, user)
            .then(response => response.data)
            .catch(handleError);
    },
};
