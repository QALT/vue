import { httpClient } from "./httpClient";
import {handleError} from "../../helpers/api-platform/error";

export default {
    login(email, password) {
        return httpClient.post("/authentication_token", { email, password })
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                }
                throw new Error("Bad credentials");
            }).catch(handleError);
    },
    register(email, plainPassword, lastname, firstname, roles) {
        return httpClient.post("/api/users", { email, plainPassword, lastname, firstname, roles: [roles] })
            .then(response => response.data)
            .catch(handleError);
    }
};
