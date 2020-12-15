import axios from 'axios';
import store from '../../store';

export const httpClient = axios.create({
    baseURL: process.env.VUE_APP_API_PLATFORM_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

httpClient.interceptors.request.use(function (config) {
    const authKey = store.getters.getToken
    config.headers["Authorization"] = "Bearer " + authKey;
    return config;
});