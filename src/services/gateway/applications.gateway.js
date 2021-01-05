import store from '../../store';
import router from '../../router';

import { toastNotification } from '../../helpers/Toastify';
import ApiApplicationService from '../api-platform/application.service';
import GraphQLApplicationService from '../prisma/application.service';

const providers = {
    'api-platform': ApiApplicationService,
    'graphql': GraphQLApplicationService
}

export default {
    addApplication(offerId, customMessage) {
        return providers[store.getters.getApiProvider].addApplication(offerId, customMessage)
            .then(() => {
                toastNotification('success', 'Candidature envoyée')
                router.push('/applications');
            })
            .catch(() => toastNotification('error', 'Une erreur est survenue lors de l\'envoie de la candidature'))
    },
    getApplication(id) {
        return providers[store.getters.getApiProvider].getApplication(id)
            .catch(() => toastNotification('error', 'Une erreur est survenue lors de la récupération de la candidature'))
    },
    getUserApplications() {
        return providers[store.getters.getApiProvider].getUserApplications()
            .catch(() => toastNotification('error', 'Une erreur est survenue lors de la récupération de vos candidatures'))
    },
    editApplication(id, newApplication) {
        return providers[store.getters.getApiProvider].editApplication(id, newApplication)
            .then(() => {
                toastNotification('success', 'Candidature éditée')
                router.push('/applications');
            })
            .catch(() => toastNotification('error', 'Une erreur est survenue lors de l\'édition de la candidature'))
    },
    deleteApplication(id) {
        return providers[store.getters.getApiProvider].deleteApplication(id)
        .then(() => toastNotification('success', 'Candidature supprimée'))
        .catch(() => toastNotification('error', 'Une erreur est survenue lors de la suppression de la candidature')) 
    }
}