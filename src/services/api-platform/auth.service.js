import { httpClient } from './httpClient';

export default {
    login(email, password) {
        return httpClient.post('/authentication_token', { email, password })
        .then(response => {
            if (response.status === 200) {
                return response.data;
            }
            throw new Error('Bad credentials')
        })
    },
    register(email, password) {
        return httpClient.post('/api/users', { email, password })
        .then(response => response.data);
    }
}