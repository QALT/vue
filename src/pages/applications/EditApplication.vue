<template>
    <div class="container">
        <h1>Editer une candidature</h1>
        <app-form :values="form" v-on:submit.prevent="onSubmit" v-if="!isLoading">
            <app-form-field name="comment">
                <app-form-label>Message personnalisé</app-form-label>
                <app-form-textarea></app-form-textarea>
            </app-form-field>
            <app-form-button>Modifier</app-form-button>
        </app-form>
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