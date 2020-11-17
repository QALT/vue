<template>
    <div class="container">
        <div class="row">
            <div class="col-6 offset-3 pt-5">
                <b-card>
                    <b-form @submit="onSubmit">
                        <b-form-group
                            label="Email"
                            label-for="email"
                        >
                            <b-form-input
                                id="email"
                                v-model="form.email"
                                type="email"
                                required
                                placeholder="Enter email"
                            />
                        </b-form-group>
                        <b-form-group
                            label="Password"
                            label-for="password"
                        >
                            <b-form-input
                                id="password"
                                v-model="form.password"
                                type="password"
                                required
                                placeholder="Enter password"
                            />
                        </b-form-group>
                        <b-button type="submit" variant="primary">Submit</b-button>
                    </b-form>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { toastNotification } from '../helpers/Toastify';

export default {
    name: 'Login',
    data: () => ({
        form: {
            email: '',
            password: ''
        }
    }),
    methods: {
        ...mapMutations([
            'setToken'
        ]),
        onSubmit(event) {
            event.preventDefault();
            fetch('https://localhost:8443/authentication_token', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.form)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                throw new Error('Bad credentials')
            })
            .then(({ token }) => {
                this.setToken(token)
                this.$router.push('/')
            })
            .catch(error => toastNotification('error', error.message))
        }
    }
}
</script>