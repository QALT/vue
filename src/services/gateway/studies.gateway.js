import store from '../../store';
import router from '../../router';

import { toastNotification } from '../../helpers/Toastify';
import ApiPlatformJobService from '../api-platform/studies.service';
import GraphQLJobService from '../prisma/studies.service';

const providers = {
    'api-platform': ApiPlatformJobService,
    'graphql': GraphQLJobService
}

export default {
    getStudies() {
        return providers[store.getters.getApiProvider].getStudies()
            .catch(() => toastNotification('error', 'Impossible de retrouver vos diplômes'))
    },
    addStudy(label, school) {
        return providers[store.getters.getApiProvider].addStudy(label, school)
            .then(() => {
                toastNotification('success', 'Diplôme ajouté')
                router.push('/studies');
            })
            .catch(() => toastNotification('error', 'Une erreur est survenue lors de la création du diplôme'))
    },
    getStudy(id) {
        return providers[store.getters.getApiProvider].getStudy(id)
            .catch(() => toastNotification('error', 'Erreur lors de la récupération du diplôme'))
    },
    editStudy(id, newStudy) {
        return providers[store.getters.getApiProvider].editStudy(id, newStudy)
            .then(() => {
                toastNotification('success', 'Diplôme edité')
                router.push('/studies');
            })
            .catch(() => toastNotification('error', 'Une erreur est survenue lors de l\'édition du diplôme'))
    },
    deleteStudy(id) {
        return providers[store.getters.getApiProvider].deleteStudy(id)
        .then(() => toastNotification('success', 'Diplôme supprimée'))
        .catch(() => toastNotification('error', 'Une erreur est survenue lors de la suppression du diplôme'))
    }
}