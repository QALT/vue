import axios from 'axios';
import store from '../../store';

const httpClient = () => {
    return axios.create({
        baseURL: process.env.VUE_APP_API_PLATFORM_URL || 'https://jsonplaceholder.typicode.com/',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${store.getters.getToken}`
            // anything you want to add to the headers
        }
    });
}

export default httpClient();