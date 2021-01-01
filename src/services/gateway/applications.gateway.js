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
    }
}