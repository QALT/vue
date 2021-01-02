<template>
    <div class="container">
        <h1>Ajouter un diplôme</h1>
        <app-form :values="form" v-on:submit="onSubmit">
            <app-form-field name="label">
                <app-form-label>Nom du diplôme</app-form-label>
                <app-form-input></app-form-input>
            </app-form-field>
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
export default {
    name: 'AddStudyPage',
    data() {
        return {
            form: {
                label: '',
                school: ''
            }
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();
            studiesGateway.addStudy(this.form.label, this.form.school);
        }
    }
}
</script>