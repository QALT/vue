import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: window.localStorage.getItem('token'),
        apiUrl: process.env.VUE_APP_API_PLATFORM_URL,
        apiProvider: 'api-platform',
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            window.localStorage.setItem('token', token);
        },
        setApiProvider(state, apiProvider) {
            state.apiProvider = apiProvider;
            if (apiProvider === 'api-platform') {
                state.apiUrl = process.env.VUE_APP_API_PLATFORM_URL
            } else if(apiProvider === 'graphql') {
                state.apiUrl = process.env.VUE_APP_GRAPHQL_URL
            }
        }
    }
})