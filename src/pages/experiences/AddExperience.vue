<template>
    <div class="row justify-content-center">
        <div class="col-4">
            <h4 class="text-center">Ajout d'une expérience</h4>
            <app-form :values="experience" :validations="validations" :handleSubmit="onSubmit">
                <app-form-input
                    label="Intitulé du poste"
                    name="label"
                    type="text"
                    required
                />
                <app-form-input
                    label="Description du poste"
                    name="description"
                    type="text"
                    required
                />
                <app-form-datepicker
                    label="Date de début"
                    name="startDate"
                    v-model="experience.startDate"
                    :max="max"
                    :start-weekday="1"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                />
                <app-form-datepicker
                    label="Date de fin"
                    name="endDate"
                    :max="max"
                    :start-weekday="1"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                />
                <div class="row justify-content-center">
                    <b-button variant="outline-primary" to="/experiences" class="mr-2 center">Retour</b-button>
                    <b-button type="submit" variant="primary" class="mr-2">Ajouter</b-button>
                </div>
            </app-form>
        </div>
    </div>
</template>

<script>
import experiencesGateway from '../../services/gateway/experiences.gateway';
export default {
    name: 'AddExperiencePage',
    data() {
        return {
            experience: {
                label: '',
                description: '',
                startDate: '',
                endDate: ''
            },
            max: new Date(),
            validations: {}
        }
    },
    methods: {
        onSubmit() {
            experiencesGateway.addExperience(this.experience);
        }
    }
}
</script>
