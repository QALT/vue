import {toastNotification} from "../Toastify";
import store from "../../store";
import router from "../../router";

export const handleError = (error) => {
    if (error.response.status === 401) {
        toastNotification("error", "Token expiré");
        store.commit("disconnectUser");
        router.push("/login");
        return;
    }

    throw error;
};
