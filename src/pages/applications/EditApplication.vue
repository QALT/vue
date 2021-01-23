<template>
    <div class="row justify-content-center">
        <div class="col-4">
            <h4 class="text-center">Modification de la candidature</h4>
            <b-form v-on:submit.prevent="onSubmit" v-if="!isLoading">
                <b-form-group
                    label="Message personnalisé"
                    label-for="comment"
                >
                    <b-form-textarea
                        id="comment"
                        v-model="form.comment"
                    />
                </b-form-group>   
                <div class="row justify-content-center">
                    <b-button variant="outline-primary" to="/applications" class="mr-2 center">Retour</b-button>
                    <b-button type="submit" variant="primary" class="mr-2 center">Modifier</b-button>
                </div>
            </b-form>
        </div>
    </div>  
</template>

<script>
import applicationGateway from '../../services/gateway/applications.gateway';
export default {
    props: ['id'],
    data() {
        return {
            isLoading: true,
            form: {
                comment: ''
            }
        }
    },
    created() {
        applicationGateway.getApplication(this.id)
        .then(application => {
            this.form.comment = application.comment;
            this.isLoading = false;
        })
    },
    methods: {
        onSubmit() {
            applicationGateway.editApplication(this.id, this.form);
        }
    }
    
}
</script>