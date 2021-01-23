<template>
    <div class="row justify-content-center">
        <div class="col-4">
            <h4 class="text-center">Modifier le niveau d'étude</h4>
            <b-form v-on:submit.prevent="onSubmit" v-if="!isLoading">
                <b-form-group
                    label="Nom du niveau"
                    label-for="label"
                >
                    <b-form-input
                        id="label"
                        v-model="form.label"
                    />
                </b-form-group>   
                <div class="row justify-content-center">
                    <b-button variant="outline-primary" to="/degrees" class="mr-2 center">Retour</b-button>
                    <b-button type="submit" variant="primary" class="mr-2 center">Modifier</b-button>
                </div>
            </b-form>
        </div>
    </div>
</template>

<script>
import degreesGateway from '../../services/gateway/degrees.gateway';
export default {
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
        onSubmit() {
            const newDegree = {...this.form};
            degreesGateway.editDegree(this.id, newDegree);
        }
    }
    
}
</script>