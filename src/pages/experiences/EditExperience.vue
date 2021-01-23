<template>
    <div class="row justify-content-center">
        
        <div class="col-4">
            <h4 class="text-center">Modification de l'expérience</h4>
            <b-form v-on:submit.prevent="onSubmit" v-if="!isLoading">
                 <b-form-group
                    label="Intitulé du poste"
                    label-for="label"
                >
                    <b-form-input
                        id="label"
                        v-model="form.label"
                    />
                </b-form-group>
                <b-form-group
                    label="Description"
                    label-for="description"
                >
                    <b-form-input
                        id="description"
                        v-model="form.description"
                    />
                </b-form-group>
                <b-form-group
                    label="Date de début"
                    label-for="startDate"
                >
                    <b-form-datepicker
                        id="startDate"
                        v-model="form.startDate"
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
                        v-model="form.endDate"
                        placeholder=""
                        :max="max"
                        :start-weekday="1"
                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    >
                    </b-form-datepicker>
                </b-form-group>
                <div class="row justify-content-center">
                    <b-button variant="outline-primary" to="/experiences" class="mr-2 center">Retour</b-button>
                    <b-button type="submit" variant="primary" class="mr-2 center">Modifier</b-button>
                </div>
            </b-form>
        </div>
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
            isLoading: true,
            max: new Date()
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