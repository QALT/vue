import store from "../../store";

import { toastNotification } from "../../helpers/Toastify";
import ApiUserService from "../api-platform/users.service";
import GraphQLUserService from "../prisma/users.service";

const providers = {
    "api-platform": ApiUserService,
    "graphql": GraphQLUserService
};

export default {
    getUser(id) {
        return providers[store.getters.getApiProvider].getUser(id)
            .catch(() => toastNotification("error", "Erreur lors de la récupération des informations de l'utilisateur"));
    },
    editUser(id, user) {
        return providers[store.getters.getApiProvider].editUser(id, user)
            .then((user) => {
                store.commit("setLastname", user.lastname);
                store.commit("setFirstname", user.firstname);
                toastNotification("success", "Profil mis à jour");
            })
            .catch(() => toastNotification("error", "Une erreur est survenue lors de la mise à jour de votre profil"));
    },
};