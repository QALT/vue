<template>
    <div class="row">
        <div class="col-4-s">
            <h4 class="text-center">Ajout d'une expérience</h4>
            <b-form @submit="onSubmit">
                 <b-form-group
                    label="Intitulé du poste"
                    label-for="label"
                >
                    <b-form-input
                        id="label"
                        v-model="experience.label"
                    />
                </b-form-group>
                <b-form-group
                    label="Description"
                    label-for="description"
                >
                    <b-form-input
                        id="description"
                        v-model="experience.description"
                    />
                </b-form-group>
                <b-form-group
                    label="Date de début"
                    label-for="startDate"
                >
                    <b-form-datepicker
                        id="startDate"
                        v-model="experience.startDate"
                        placeholder=""
                        :max="max"
                        :start-weekday="1"
                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    >
                    </b-form-datepicker>
                </b-form-group>
                <b-form-group
                    label="Date de fin"
                    label-for="endDate"
                >
                    <b-form-datepicker
                        id="endDate"
                        v-model="experience.endDate"
                        placeholder=""
                        :max="max"
                        :start-weekday="1"
                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    >
                    </b-form-datepicker>
                </b-form-group>
                <b-button type="submit" variant="primary" class="mr-0">Ajouter</b-button>
            </b-form>
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
            max: new Date()
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();
            experiencesGateway.addExperience(this.experience);
        }
    }
}
</script>