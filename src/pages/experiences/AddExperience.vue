<template>
    <div class="row justify-content-center">
        <div class="col-4">
            <h4 class="text-center">Ajout d'une expérience</h4>
            <form-experience :form="form" :validations="validations" :handleSubmit="handleSubmit" buttonValue="Ajouter" />
        </div>
    </div>
</template>

<script>
import experiencesGateway from '../../services/gateway/experiences.gateway';
import FormExperience from './FormExperience.vue';
export default {
    components: { FormExperience },
    name: 'AddExperiencePage',
    data() {
        return {
            form: {
                label: '',
                description: '',
                startDate: '',
                endDate: ''
            },
            validations: {}
        }
    },
    methods: {
        handleSubmit() {
            experiencesGateway.addExperience(this.form);
        }
    }
}
</script>
