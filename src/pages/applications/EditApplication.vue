<template>
    <div class="row justify-content-center">
        <div class="col-4">
            <h4 class="text-center">Modification de la candidature</h4>
            <app-form :values="form" :handleSubmit="handleSubmit">
                <app-form-input
                    label="Message personnalisé"
                    name="comment"
                />
                <div class="row justify-content-center">
                    <b-button variant="outline-primary" to="/applications" class="mr-2 center">Retour</b-button>
                    <app-form-button>
                        Modifier
                    </app-form-button>
                </div>
            </app-form>
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
        handleSubmit() {
            applicationGateway.editApplication(this.id, this.form);
        }
    }
    
}
</script>