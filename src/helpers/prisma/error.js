import {toastNotification} from "../../helpers/Toastify";
import router from "../../router";
import store from "../../store";

export const handleError = (error) => {
    if (error && error.graphQLErrors && error.graphQLErrors[0] && error.graphQLErrors[0].message && error.graphQLErrors[0].message === "jwt expired") {
        store.commit("disconnectUser");
        router.push("/login");
        toastNotification("error", "Token expired");
        return;
    }

    throw error;
};
