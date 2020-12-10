import store from '../../store';
import router from '../../router';
import prismaAuthService from '../prisma/auth.service';
import apiAuthService from '../api-platform/auth.service';
import { toastNotification } from '../../helpers/Toastify';
import jwt_decode from "jwt-decode";

export default {
    login(email, password) {
        let promise;
        if(store.getters.getApiProvider === 'api-platform') {
            promise = apiAuthService.login;
        } else {
            promise = prismaAuthService.login;
        }
        promise(email, password).then(({token}) => {
            store.commit('setToken', token);
            const { firstname, lastname } = jwt_decode(token);
            store.commit('setFirstname', firstname);
            store.commit('setLastname', lastname);
            router.push('/');
        }).catch(error => toastNotification('error', error.message))
    }
}