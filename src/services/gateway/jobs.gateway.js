import store from '../../store';
import { toastNotification } from '../../helpers/Toastify';
import ApiPlatformJobService from '../api-platform/job.service';
import GraphQLJobService from '../prisma/job.service';

const providers = {
    'api-platform': ApiPlatformJobService,
    'graphql': GraphQLJobService
}

export default {
    getJobs() {
        providers[store.getters.getApiProvider].getJobs().then(({jobs}) => jobs).catch(() => toastNotification('error', 'Can\'t retreive jobs'))
    }
}