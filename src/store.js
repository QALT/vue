import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const getDefaultStore = () => {
    return {
        token: null,
        apiProvider: null,
        firstname: null,
        lastname: null,
        email: null,
        id: null
    }
}

export default new Vuex.Store({
    state: {
        token: window.localStorage.getItem('token'),
        apiProvider: window.localStorage.getItem('apiProvider') ?? 'api-platform',
        firstname: window.localStorage.getItem("firstname"),
        lastname: window.localStorage.getItem("lastname"),
        email: window.localStorage.getItem("email"),
        id: window.localStorage.getItem("id")
    },
    mutations: {
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
        setLastname(state, lastname) {
            if (null === lastname) {
                window.localStorage.removeItem("lastname");
            } else {
                window.localStorage.setItem("lastname", lastname);
            }

            state.lastname = lastname;
        },
        setFirstname(state, firstname) {
            if (null === firstname) {
                window.localStorage.removeItem("firstname");
            } else {
                window.localStorage.setItem("firstname", firstname);
            }
            state.firstname = firstname;
        },
        setEmail(state, email) {
            if (null === email) {
                window.localStorage.removeItem("email");
            } else {
                window.localStorage.setItem("email", email);
            }
            state.email = email;
        },
        setId(state, id) {
            if (null === id) {
                window.localStorage.removeItem("id");
            } else {
                window.localStorage.setItem("id", id);
            }
            state.id = id;
        },
        disconnectUser(state) {
            Object.assign(state,getDefaultStore());
            window.localStorage.clear();
        }
    },
    getters: {
        isLogged(state) {
            return !!state?.token;
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
    }
})
