<template>
    <div class="container">
        <h1>Editer un diplôme</h1>
        <app-form :values="form" v-on:submit="onSubmit" v-if="!isLoading">
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
            <app-form-button>Modifier</app-form-button>
        </app-form>
    </div>
</template>

<script>
import studiesGateway from '../../services/gateway/studies.gateway';
import degreesGateway from '../../services/gateway/degrees.gateway';

export default {
    name: 'EditStudyPage',
    props: ['id'],
    data() {
        return {
            degrees: [],
            form: {
                label: '',
                degree: '',
                school : ''
            },
            originalStudy: null,
            isLoading: true
        }
    },
    created() {
        studiesGateway.getStudy(this.id)
        .then(study => {
            this.form.label = study.label;
            this.form.school = study.school;
            this.form.degree = study.degree;
            this.originalStudy = study;
            this.isLoading = false;
        })
        degreesGateway.getDegrees().then(degrees => {
            this.degrees = degrees.map(degree => ({value: degree['@id'] ?? degree.id, text: degree.label}))
        });
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();
            const newStudy = {
                ...this.originalStudy,
                ...this.form
            };
            studiesGateway.editStudy(this.originalStudy.id, newStudy);
        }
    }
    
}
</script>