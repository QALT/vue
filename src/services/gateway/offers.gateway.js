import store from '../../store';
import router from '../../router';

import { toastNotification } from '../../helpers/Toastify';
import ApiPlatformJobService from '../api-platform/offer.service';
import GraphQLJobService from '../prisma/offer.service';

const providers = {
    'api-platform': ApiPlatformJobService,
    'graphql': GraphQLJobService
}

export default {
    getOffers() {
        return providers[store.getters.getApiProvider].getOffers()
            .catch(() => toastNotification('error', 'Can\'t retreive jobs'))
    },
    addOffer(title, description) {
        return providers[store.getters.getApiProvider].addOffer(title, description)
            .then(() => {
                toastNotification('success', 'Offre ajoutée')
                router.push('/');
            })
            .catch(() => toastNotification('error', 'Une erreur est survenue lors de la création de l\'offre'))
    },
    getOffer(id) {
        return providers[store.getters.getApiProvider].getOffer(id)
            .catch(() => toastNotification('error', 'Erreur lors de la récupération de l\'offre'))
    },
    editOffer(id, newOffer) {
        return providers[store.getters.getApiProvider].editOffer(id, newOffer)
            .then(() => {
                toastNotification('success', 'Offre editée')
                router.push('/');
            })
            .catch(() => toastNotification('error', 'Une erreur est survenue lors de l\'édition de l\'offre'))
    }
}