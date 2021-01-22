import store from '../../store';

import { toastNotification } from '../../helpers/Toastify';
import ApiPlatformJobService from '../api-platform/tags.service';
import GraphQLJobService from '../prisma/tags.service';

const providers = {
    'api-platform': ApiPlatformJobService,
    'graphql': GraphQLJobService
}

export default {
    getTags() {
        return providers[store.getters.getApiProvider].getTags()
            .catch(() => toastNotification('error', 'Impossible de retrouver les tags'))
    }
}