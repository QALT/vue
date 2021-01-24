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
                    <app-form :values="form" :handleSubmit="handleSubmit" :validations="validations">
                        <app-form-input
                            label="Email"
                            name="email"
                            type="email"
                            required
                        />
                        <app-form-input
                            label="Mot de passe"
                            name="plainPassword"
                            type="password"
                            required
                        />
                        <app-form-input
                            label="Nom"
                            name="lastname"
                        />
                        <app-form-input
                            label="Prénom"
                            name="firstname"
                        />
                        <app-form-select
                            label="Mon rôle"
                            name="roles"
                            :options="options"
                            required
                        />
                        <div class="text-center">
                            <app-form-button variant="primary">
                                Créer votre compte
                            </app-form-button>
                        </div>
                    </app-form>
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
import AppForm from '../../components/form-elements/AppForm.vue';
import AppFormButton from '../../components/form-elements/AppFormButton.vue';
import AppFormInput from '../../components/form-elements/AppFormInput.vue';
import AppFormSelect from '../../components/form-elements/AppFormSelect.vue';
import gatewayAuthService from '../../services/gateway/auth.gateway';

export default {
    components: { AppForm, AppFormInput, AppFormButton, AppFormSelect },
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
            ],
            validations: {
                email: 'required|min:10',
                plainPassword: "required|password|min:8",
                lastname: "required",
                roles: "required|in:ROLE_EMPLOYEE,ROLE_EMPLOYER"
            }
        };
    },

    methods: {
        handleSubmit() {
            gatewayAuthService.register(this.form.email, this.form.plainPassword, this.form.lastname, this.form.firstname, this.form.roles);
        }
    }
}
</script>
