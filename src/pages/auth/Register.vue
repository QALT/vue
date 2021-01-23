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

                        <b-form-group label="Nom" label-for="lastname">
                            <b-form-input id="lastname" v-model="form.lastname" type="text" />
                        </b-form-group>

                        <b-form-group label="Prénom" label-for="firstname">
                            <b-form-input id="firstname" v-model="form.firstname" type="text" />
                        </b-form-group>

                        <b-form-group label="Mon rôle" label-for="roles" >
                            <b-form-select id="roles" v-model="form.roles" :options="options" required></b-form-select>
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
import gatewayAuthService from '../../services/gateway/auth.gateway';

export default {
    name: "Register",

    data() {
        return {
            form: {
                email: "",
                plainPassword: "",
                lastname: "",
                firstname: "",
                roles: null
            },
            options: [
                { value: null, text: 'Choisissez ce que vous recherchez sur cette plateforme' },
                { value: 'ROLE_EMPLOYEE', text: 'Je cherche une offre d\'emploi' },
                { value: 'ROLE_EMPLOYER', text: 'Je souhaite publier une offre d\'emploi' }
            ]
        };
    },

    methods: {
        onSubmit(event) {
            event.preventDefault();
            gatewayAuthService.register(this.form.email, this.form.plainPassword, this.form.lastname, this.form.firstname, this.form.roles);
        }
    }
}
</script>
