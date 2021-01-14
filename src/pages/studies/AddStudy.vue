<template>
    <div class="container">
        <h1>Ajouter un diplôme</h1>
        <app-form :values="form" v-on:submit="onSubmit">
            <app-form-field name="label">
                <app-form-label>Nom du diplôme</app-form-label>
                <app-form-input></app-form-input>
            </app-form-field>
            <b-form-select v-model="form.degree" :options="degrees">
                <template #first>
                    <b-form-select-option :value="null" disabled>-- Selectionner un niveau d'étude --</b-form-select-option>
                </template>
            </b-form-select>
            <app-form-field name="school">
                <app-form-label>Nom de l'école</app-form-label>
                <app-form-input></app-form-input>
            </app-form-field>
            <app-form-button>Ajouter</app-form-button>
        </app-form>
    </div>
</template>

<script>
import studiesGateway from '../../services/gateway/studies.gateway';
import degreesGateway from '../../services/gateway/degrees.gateway';

export default {
    name: 'AddStudyPage',
    data() {
        return {
            degrees:[],
            form: {
                label: '',
                degree: '',
                school: ''
            }
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();
            studiesGateway.addStudy(this.form.label, this.form.school, this.form.degree);
        }
    },
    created() {
        degreesGateway.getDegrees().then(degrees => {
            this.degrees = degrees.map(degree => ({value: degree['@id'] ?? degree.id, text: degree.label}))
        });
    }
}
</script>