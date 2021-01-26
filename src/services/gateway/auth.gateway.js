import store from "../../store";
import router from "../../router";
import prismaAuthService from "../prisma/auth.service";
import apiAuthService from "../api-platform/auth.service";
import { toastNotification } from "../../helpers/Toastify";
import jwt_decode from "jwt-decode";

const providers = {
    "api-platform": apiAuthService,
    "graphql": prismaAuthService
};

export default {
    login(email, password) {
        providers[store.getters.getApiProvider].login(email, password).then(({token}) => {
            store.commit("setToken", token);
            const { id, email, firstname, lastname, roles } = jwt_decode(token);
            store.commit("setId", id);
            store.commit("setEmail", email);
            store.commit("setFirstname", firstname);
            store.commit("setLastname", lastname);
            store.commit("setRoles", roles);
            router.push("/");
        }).catch(() => toastNotification("error", "Une erreur est survenue durant la connexion"));
    },
    register(email, password, lastname, firstname, roles) {
        providers[store.getters.getApiProvider].register(email, password, lastname, firstname, roles).then(() => {
            toastNotification("success", "Inscription réussite");
            router.push("/login");
        }).catch(() => toastNotification("error", "Une erreur est survenue durant l'inscription"));
    }
};