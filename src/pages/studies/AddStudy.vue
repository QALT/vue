<template>
    <div class="row justify-content-center">
        <div class="col-4">
            <h4 class="text-center">Ajouter un diplôme</h4>
            <form-study :form="form" :handleSubmit="handleSubmit" :options="degrees" buttonValue="Ajouter" />
        </div>
    </div>
</template>

<script>
import studiesGateway from '../../services/gateway/studies.gateway';
import degreesGateway from '../../services/gateway/degrees.gateway';
import FormStudy from './FormStudy.vue';

export default {
    components: { FormStudy },
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
        handleSubmit() {
            studiesGateway.addStudy(this.form.label, this.form.school, this.form.degree);
        }
    },
    created() {
        degreesGateway.getDegrees().then(degrees => {
            this.degrees = degrees?.map(degree => ({value: degree['@id'] ?? degree.id, text: degree.label}))
        });
    }
}
</script>