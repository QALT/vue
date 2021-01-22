import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const getDefaultStore = () => {
    return {
        token: window.localStorage.getItem('token'),
        apiProvider: window.localStorage.getItem('apiProvider') ?? 'api-platform',
        id: window.localStorage.getItem("id"),
        email: window.localStorage.getItem("email"),
        firstname: window.localStorage.getItem("firstname"),
        lastname: window.localStorage.getItem("lastname"),
        roles: window.localStorage.getItem("roles"),
    }
}

export default new Vuex.Store({
    state: getDefaultStore(),
    mutations: {
        disconnectUser(state) {
            state.token = null;
            window.localStorage.clear();
        },
        setToken(state, token) {
            if (null === token) {
                window.localStorage.removeItem("token");
            } else {
                window.localStorage.setItem('token', token);
            }

            state.token = token;
        },
        setApiProvider(state, apiProvider) {
            window.localStorage.setItem('apiProvider', apiProvider);
            state.apiProvider = apiProvider;
        },
        setId(state, id) {
            if (null === id) {
                window.localStorage.removeItem("id");
            } else {
                window.localStorage.setItem("id", id);
            }
            state.id = id;
        },
        setEmail(state, email) {
            if (null === email) {
                window.localStorage.removeItem("email");
            } else {
                window.localStorage.setItem("email", email);
            }
            state.email = email;
        },
        setFirstname(state, firstname) {
            if (null === firstname) {
                window.localStorage.removeItem("firstname");
            } else {
                window.localStorage.setItem("firstname", firstname);
            }
            state.firstname = firstname;
        },
        setLastname(state, lastname) {
            if (null === lastname) {
                window.localStorage.removeItem("lastname");
            } else {
                window.localStorage.setItem("lastname", lastname);
            }

            state.lastname = lastname;
        },
        setRoles(state, roles) {
            if (null === roles) {
                window.localStorage.removeItem("roles");
            } else {
                window.localStorage.setItem("roles", roles);
            }

            state.roles = roles;
        },
    },
    getters: {
        isLogged(state) {
            return !!state?.token;
        },
        isEmployee(state) {
            return state?.roles?.includes('ROLE_EMPLOYEE');
        },
        isEmployer(state) {
            return state?.roles?.includes('ROLE_EMPLOYER');
        },
        getToken(state) {
            return state.token;
        },
        getApiProvider(state) {
            return state.apiProvider;
        },
        getId(state){
            return state.id
        },
        getEmail(state) {
            return state.email;
        },
        getFirstname(state) {
            return state.firstname ?? '';
        },
        getLastname(state) {
            return state.lastname ?? '';
        },
        getRoles(state) {
            return state.roles ?? '';
        },
    }
})