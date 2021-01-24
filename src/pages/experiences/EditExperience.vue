<template>
    <div class="row justify-content-center">
        
        <div class="col-4">
            <h4 class="text-center">Modification de l'expérience</h4>
            <form-experience :form="form" :validations="validations" :handleSubmit="handleSubmit" buttonValue="Modifier" />
        </div>
    </div>
</template>

<script>
import experiencesGateway from '../../services/gateway/experiences.gateway';
import FormExperience from './FormExperience.vue';

export default {
    components: { FormExperience },
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
            validations: {},
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
        handleSubmit() {
            const newExperience = {
                ...this.originalExperience,
                ...this.form
            };
            experiencesGateway.editExperience(this.originalExperience.id, newExperience);
        }
    }
}
</script>