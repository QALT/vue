import store from '../../store';
import router from '../../router';

import { toastNotification } from '../../helpers/Toastify';
import ApiPlatformJobService from '../api-platform/experiences.service';
// import GraphQLJobService from '../prisma/experiences.service';

const providers = {
    'api-platform': ApiPlatformJobService
    // 'graphql': GraphQLJobService
}

export default {
    getExperiences() {
        return providers[store.getters.getApiProvider].getExperiences()
            .catch(() => toastNotification('error', 'Impossible de retrouver vos diplômes'))
    },
    addExperience(experience) {
        return providers[store.getters.getApiProvider].addExperience(experience.label, experience.description, experience.startDate, experience.endDate)
            .then(() => {
                toastNotification('success', 'Expérience ajoutée')
                router.push('/experiences');
            })
            .catch(() => toastNotification('error', 'Une erreur est survenue lors de la création de l\'expérience'))
    },
    getExperience(id) {
        return providers[store.getters.getApiProvider].getExperience(id)
            .catch(() => toastNotification('error', 'Erreur lors de la récupération de l\'expérience'))
    },
    editExperience(id, newExperience) {
        return providers[store.getters.getApiProvider].editExperience(id, newExperience)
            .then(() => {
                toastNotification('success', 'Expérience éditée')
                router.push('/experiences');
            })
            .catch(() => toastNotification('error', 'Une erreur est survenue lors de l\'édition de l\'expérience'))
    },
    deleteExperience(id) {
        return providers[store.getters.getApiProvider].deleteExperience(id)
        .then(() => toastNotification('success', 'Expérience supprimée'))
        .catch(() => toastNotification('error', 'Une erreur est survenue lors de la suppression de l\'expérience'))
    }
}