<template>
    <div class="row justify-content-center">
        <div class="col-4">
            <h4 class="text-center">Modifier le niveau d'étude</h4>
            <form-degree :form="form" :handleSubmit="handleSubmit" buttonValue="Modifier" />
        </div>
    </div>
</template>

<script>
import degreesGateway from '../../services/gateway/degrees.gateway';
import FormDegree from './FormDegree.vue';
export default {
    components: { FormDegree },
    props: ['id'],
    data() {
        return {
            form: {
                label: ''
            },
            isLoading: true
        }
    },
    created() {
        degreesGateway.getDegree(this.id)
        .then(degree => {
            this.form.label = degree.label;
            this.isLoading = false;
        })
    },
    methods: {
        handleSubmit() {
            const newDegree = {...this.form};
            degreesGateway.editDegree(this.id, newDegree);
        }
    }
    
}
</script>