<template>
    <div class="container">
        <h1>Editer l'expérience</h1>
        <app-form :values="form" v-on:submit="onSubmit" v-if="!isLoading">
            <app-form-field name="label">
                <app-form-label>Intitulé du poste</app-form-label>
                <app-form-input></app-form-input>
            </app-form-field>
             <app-form-field name="description">
                <app-form-label>Description</app-form-label>
                <app-form-input></app-form-input>
            </app-form-field>
             <app-form-field name="startDate">
                <app-form-label>Date de début de mission</app-form-label>
                <app-form-input></app-form-input>
            </app-form-field>
            <app-form-field name="endDate">
                <app-form-label>Date de fin de mission</app-form-label>
                <app-form-input></app-form-input>
            </app-form-field>
            <app-form-button>Modifier</app-form-button>
        </app-form>
    </div>
</template>

<script>
import experiencesGateway from '../../services/gateway/experiences.gateway';
export default {
    name: 'EditExperiencePage',
    props: ['id'],
    data() {
        return {
            form: {
                label: '',
                description : '',
                startDate: '',
                endDate: ''
            },
            originalExperience: null,
            isLoading: true
        }
    },
    created() {
        experiencesGateway.getExperience(this.id)
        .then(experience => {
            this.form.label = experience.label;
            this.form.description = experience.description;
            this.form.startDate = experience.startDate;
            this.form.endDate = experience.endDate;
            this.originalExperience = experience;
            this.isLoading = false;
        })
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();
            const newExperience = {
                ...this.originalExperience,
                ...this.form
            };
            experiencesGateway.editExperience(this.originalExperience.id, newExperience);
        }
    }
    
}
</script>