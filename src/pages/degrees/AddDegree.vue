<template>
    <div class="container">
        <h1>Ajouter un niveau d'étude</h1>
        <app-form :values="form" v-on:submit.prevent="onSubmit">
            <app-form-field name="label">
                <app-form-label>Nom du niveau</app-form-label>
                <app-form-input></app-form-input>
            </app-form-field>
            <app-form-button>Ajouter</app-form-button>
        </app-form>
    </div>
</template>

<script>
import degreesGateway from '../../services/gateway/degrees.gateway';
export default {
    data() {
        return {
            form: {
                label: ''
            }
        }
    },
    methods: {
        onSubmit() {
            degreesGateway.addDegree(this.form.label);
        }
    }
}
</script>