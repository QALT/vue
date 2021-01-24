<template>
    <div class="row justify-content-center">
        <div class="col-4">
            <h4 class="text-center">Ajouter un niveau d'étude</h4>
            <form-degree :form="form" :handleSubmit="handleSubmit" buttonValue="Ajouter" />
        </div>
    </div>  
</template>
<script>
import degreesGateway from '../../services/gateway/degrees.gateway';
import FormDegree from './FormDegree.vue';
export default {
    components: { FormDegree },
    data() {
        return {
            form: {
                label: ''
            }
        }
    },
    methods: {
        handleSubmit() {
            degreesGateway.addDegree(this.form.label);
        }
    }
}
</script>
