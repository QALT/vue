<template>
    <b-container class="vh-100">
        <b-row>
            <b-col>
                <h1 class="text-center text-white pt-5">Connexion</h1>
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
                            name="password"
                            type="password"
                            required
                        />
                        <div class="text-center">
                            <app-form-button variant="primary">
                                Connexion
                            </app-form-button>
                        </div>
                    </app-form>
                </b-card>
            </b-col>
        </b-row>

        <b-row>
            <b-col cols="12 pt-5">
                <p class="text-center text-white">Pas encore de compte. <b-link class="text-white" to="/register"><u>En créer un?</u></b-link></p>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import gatewayAuthService from '../../services/gateway/auth.gateway';

export default {
    name: 'Login',
    data: () => ({
        form: {
            email: '',
            password: ''
        },
        validations: {
            email: "required|min:3",
            password: "required|password|min:8"
        }
    }),
    methods: {
        handleSubmit() {
            gatewayAuthService.login(this.form.email, this.form.password);
        }
    }
}
</script>
