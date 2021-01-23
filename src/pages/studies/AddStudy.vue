<template>
    <div class="row justify-content-center">
        <div class="col-4">
            <h4 class="text-center">Ajouter un diplôme</h4>
            <b-form v-on:submit.prevent="onSubmit">
                <b-form-group
                    label="Nom du diplôme"
                    label-for="label"
                >
                    <b-form-input
                        id="label"
                        v-model="form.label"
                    />
                </b-form-group>
                <b-form-group
                    label="Titre du diplôme"
                    label-for=""
                >
                <b-form-select v-model="form.degree" :options="degrees">
                <template #first>
                    <b-form-select-option :value="degrees" disabled>-- Selectionner un niveau d'étude --</b-form-select-option>
                </template>
                </b-form-select>
                </b-form-group>
                <b-form-group
                    label="Nom de l'école"
                    label-for="school"
                >
                    <b-form-input
                        id="school"
                        v-model="form.school"
                    />
                </b-form-group>  
                <div class="row justify-content-center">
                    <b-button variant="outline-primary" to="/studies" class="mr-2 center">Retour</b-button>
                    <b-button type="submit" variant="primary" class="mr-2 center">Ajouter</b-button>
                </div>
            </b-form>
        </div>
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