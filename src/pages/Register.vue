<template>
    <b-container>
        <b-row>
            <b-col>
                <h1 class="text-center pt-5">Register</h1>
            </b-col>
        </b-row>

        <b-row>
            <b-col cols="6" offset="3" class="pt-5">
                <b-card>
                    <b-form @submit.prevent="onSubmit">
                        <b-form-group label="Email" label-for="email">
                            <b-form-input id="email" v-model="form.email" type="email" required placeholder="Enter email" />
                        </b-form-group>

                        <b-form-group label="Password" label-for="password" >
                            <b-form-input id="password" v-model="form.password" type="password" required placeholder="Enter password" />
                        </b-form-group>

                        <b-button type="submit" variant="primary" class="w-100">Register</b-button>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>

        <b-row>
            <b-col cols="12 pt-5">
                <p class="text-center">Already registered. <b-link to="/login">Login instead?</b-link></p>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import jwt_decode from "jwt-decode";
import {mapMutations} from "vuex";
import { toastNotification } from '../helpers/Toastify';

export default {
    name: "Register",

    data() {
        return {
            form: {
                email: "",
                password: ""
            }
        };
    },

    methods: {
        ...mapMutations([
            "setToken",
            "setFirstname",
            "setLastname",
        ]),

        async onSubmit() {
            try {
                const response = await fetch(`${this.$store.state.apiUrl}/users`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(this.form)
                });

                if (!response.ok) {
                    throw new Error("Unable to register, please try again later");
                }

                // TODO: check the values from the API
                const { token } = await response.json();

                this.setToken(token);
                const { firstname, lastname } = jwt_decode(token);
                this.setFirstname(firstname);
                this.setLastname(lastname);

                this.$router.push("/");

                toastNotification("success", "Successfully registered");
            } catch (error) {
                toastNotification("error", error.message);
            }
        }
    }
}
</script>
