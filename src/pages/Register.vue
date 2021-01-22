<template>
    <b-container class="vh-100">
        <b-row>
            <b-col>
                <h1 class="text-center text-white pt-5">Créer un compte</h1>
            </b-col>
        </b-row>

        <b-row>
            <b-col cols="6" offset="3" class="pt-5">
                <b-card>
                    <b-form @submit.prevent="onSubmit">
                        <b-form-group label="Email" label-for="email">
                            <b-form-input id="email" v-model="form.email" type="email" required />
                        </b-form-group>

                        <b-form-group label="Mot de passe" label-for="password" >
                            <b-form-input id="password" v-model="form.plainPassword" type="password" required />
                        </b-form-group>

                        <b-button type="submit" variant="primary" class="w-100">Register</b-button>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>

        <b-row>
            <b-col cols="12 pt-5">
                <p class="text-center text-white">J'ai déjà un compte. <b-link class="text-white text-decoration-underline" to="/login"><u>Vous connecter?</u></b-link></p>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import gatewayAuthService from '../services/gateway/auth.gateway';

export default {
    name: "Register",

    data() {
        return {
            form: {
                email: "",
                plainPassword: ""
            }
        };
    },

    methods: {
        onSubmit() {
            event.preventDefault();
            gatewayAuthService.register(this.form.email, this.form.plainPassword);
        }
    }
}
</script>
