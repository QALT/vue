import store from '../../store';
import router from '../../router';
import prismaAuthService from '../prisma/auth.service';
import apiAuthService from '../api-platform/auth.service';
import { toastNotification } from '../../helpers/Toastify';
import jwt_decode from "jwt-decode";

const providers = {
    'api-platform': apiAuthService,
    'graphql': prismaAuthService
}

export default {
    login(email, password) {
        providers[store.getters.getApiProvider].login(email, password).then(({token}) => {
            store.commit('setToken', token);
            const { firstname, lastname } = jwt_decode(token);
            store.commit('setFirstname', firstname);
            store.commit('setLastname', lastname);
            store.commit('setEmail', email);
            router.push('/');
        }).catch(error => toastNotification('error', error.message))
    },
    register(email, password) {
        providers[store.getters.getApiProvider].register(email, password).then(() => {
            toastNotification('success', 'Inscription réussite');
            router.push('/login');
        }).catch(() => toastNotification('error', 'Une erreur est survenue durant l\'inscription'))
    }
}