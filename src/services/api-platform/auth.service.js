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
    register(email, plainPassword, roles) {
        return httpClient.post('/api/users', { email, plainPassword, roles: [roles] })
        .then(response => response.data);
    }
}