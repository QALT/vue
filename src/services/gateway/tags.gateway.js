import store from "../../store";
import router from "../../router";

import { toastNotification } from "../../helpers/Toastify";
import ApiPlatformJobService from "../api-platform/tags.service";
import GraphQLJobService from "../prisma/tags.service";

const providers = {
    "api-platform": ApiPlatformJobService,
    "graphql": GraphQLJobService
};

export default {
    getTags() {
        return providers[store.getters.getApiProvider].getTags()
            .catch(() => toastNotification("error", "Impossible de retrouver les tags"));
    },
    getTag(id) {
        return providers[store.getters.getApiProvider].getTag(id)
            .catch(() => toastNotification("error", "Erreur lors de la récupération du tag"));
    },
    addTag(label) {
        return providers[store.getters.getApiProvider].addTag(label)
            .then(() => {
                toastNotification("success", "Tag ajouté");
                router.push("/tags");
            })
            .catch(() => toastNotification("error", "Une erreur est survenue lors de la création du diplôme"));
    },
    editTag(id, newTag) {
        return providers[store.getters.getApiProvider].editTag(id, newTag)
            .then(() => {
                toastNotification("success", "Tag édité");
                router.push("/tags");
            })
            .catch(() => toastNotification("error", "Une erreur est survenue lors de l'édition du tag"));
    },
    deleteTag(id) {
        return providers[store.getters.getApiProvider].deleteTag(id)
            .then(() => toastNotification("success", "Tag supprimé"))
            .catch(() => toastNotification("error", "Une erreur est survenue lors de la suppression du tag"));
    }
};