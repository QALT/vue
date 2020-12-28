import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: window.localStorage.getItem('token'),
        apiProvider: 'api-platform',
        firstname: window.localStorage.getItem("firstname"),
        lastname: window.localStorage.getItem("lastname"),
        email: window.localStorage.getItem("email")
    },
    mutations: {
        setToken(state, token) {
            if (token === null) {
                window.localStorage.removeItem("token");
            } else {
                window.localStorage.setItem('token', token);
            }

            state.token = token;
        },
        setApiProvider(state, apiProvider) {
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
        disconnectUser(state) {
            state.token = null;
            window.localStorage.removeItem('token');
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
        getEmail(state) {
            return state.email;
        }
    }
})
