import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: window.localStorage.getItem('token'),
        apiUrl: process.env.VUE_APP_API_PLATFORM_URL,
        apiProvider: 'api-platform',
        firstname: window.localStorage.getItem("firstname"),
        lastname: window.localStorage.getItem("lastname")
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
            if (apiProvider === 'api-platform') {
                state.apiUrl = process.env.VUE_APP_API_PLATFORM_URL
            } else if(apiProvider === 'graphql') {
                state.apiUrl = process.env.VUE_APP_GRAPHQL_URL
            }
        },

        setLastname(state, lastname) {
            if (null === lastname) {
                window.localStorage.removeItem("lastname");
            } else {
                window.localStorage.setItem("lastname");
            }

            state.lastname = lastname;
        },

        setFirstname(state, firstname) {
            if (null === firstname) {
                window.localStorage.removeItem("firstname");
            } else {
                window.localStorage.setItem("firstname");
            }

            state.firstname = firstname;
        }
    }
})
