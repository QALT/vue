<template>
    <div class="row justify-content-center">
        <div class="col-4">
            <h4 class="text-center">Modifier le diplôme</h4>
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
    name: 'EditStudyPage',
    props: ['id'],
    data() {
        return {
            degrees: [],
            form: {
                label: '',
                degree: '',
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
            this.form.degree = study.degree['@id'] ?? study.degree.id;
            this.originalStudy = study;
            this.isLoading = false;
        })
        degreesGateway.getDegrees().then(degrees => {
            this.degrees = degrees?.map(degree => ({value: degree['@id'] ?? degree.id, text: degree.label}))
        });
    },
    methods: {
        handleSubmit() {
            const newStudy = {
                ...this.originalStudy,
                ...this.form
            };
            studiesGateway.editStudy(this.originalStudy.id, newStudy);
        }
    }
    
}
</script>