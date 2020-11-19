<template>
    <b-container>
        <b-row>
            <b-col>
                <h1 class="text-center pt-5">Login</h1>
            </b-col>
        </b-row>

        <b-row>
            <b-col cols="6" offset="3" class="pt-5">
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
                        <b-button type="submit" variant="primary" class="w-100">Login</b-button>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>

        <b-row>
            <b-col cols="12 pt-5">
                <p class="text-center">No account created. <b-link to="/register">Register instead?</b-link></p>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import jwt_decode from "jwt-decode";
import { mapMutations } from 'vuex';
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
            'setToken',
            'setFirstname',
            'setLastname',
        ]),
        onSubmit(event) {
            event.preventDefault();
            fetch(`${this.$store.state.apiUrl}/authentication_token`, {
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
                this.setToken(token);
                const { firstname, lastname } = jwt_decode(token);
                this.setFirstname(firstname);
                this.setLastname(lastname);

                this.$router.push('/')
            })
            .catch(error => toastNotification('error', error.message))
        }
    }
}
</script>
