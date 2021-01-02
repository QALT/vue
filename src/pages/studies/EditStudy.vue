<template>
    <div class="container">
        <h1>Editer un diplôme</h1>
        <app-form :values="form" v-on:submit="onSubmit" v-if="!isLoading">
            <app-form-field name="label">
                <app-form-label>Nom du diplôme</app-form-label>
                <app-form-input></app-form-input>
            </app-form-field>
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
export default {
    name: 'EditStudyPage',
    props: ['id'],
    data() {
        return {
            form: {
                label: '',
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
            this.originalStudy = study;
            this.isLoading = false;
        })
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