import store from '../../store';
import router from '../../router';

import { toastNotification } from '../../helpers/Toastify';
import ApiPlatformDegreesService from '../api-platform/degrees.service';
import GraphQLJobService from '../prisma/studies.service';

const providers = {
    'api-platform': ApiPlatformDegreesService,
    'graphql': GraphQLJobService
}

export default {
    getDegrees() {
        return providers[store.getters.getApiProvider].getDegrees()
            .catch(() => toastNotification('error', 'Impossible de récupérer les niveaux d\'étude'))
    },
    addDegree(label) {
        return providers[store.getters.getApiProvider].addDegree(label)
            .then(() => {
                toastNotification('success', 'Niveau d\'étude ajouté')
                router.push('/degrees');
            })
            .catch(() => toastNotification('error', 'Une erreur est survenue lors de la création du niveau d\'étude'))
    },
    getDegree(id) {
        return providers[store.getters.getApiProvider].getDegree(id)
            .catch(() => toastNotification('error', 'Erreur lors de la récupération du niveau d\'étude'))
    },
    editDegree(id, newDegree) {
        return providers[store.getters.getApiProvider].editDegree(id, newDegree)
            .then(() => {
                toastNotification('success', 'Niveau edité')
                router.push('/degrees');
            })
            .catch(() => toastNotification('error', 'Une erreur est survenue lors de l\'édition du niveau'))
    },
    deleteDegree(id) {
        return providers[store.getters.getApiProvider].deleteDegree(id)
        .then(() => toastNotification('success', 'Niveau supprimé'))
        .catch(() => toastNotification('error', 'Une erreur est survenue lors de la suppression du niveau'))
    }
}