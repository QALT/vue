<template>
    <b-modal ref="application-modal" hide-footer hide-header-close title="Candidature" v-model="modalOpened">
        <div class="d-block text-center">
            <h4 class="font-weight-normal">Postuler pour l'offre "{{offer.title}}"</h4>
            <app-form :values="form">
                <app-form-field name="customMessage">
                    <app-form-label>Message personnalisé pour la candidature</app-form-label>
                    <app-form-textarea></app-form-textarea>
                </app-form-field>
            </app-form>
        </div>
        <div class="d-flex mt-3 justify-content-center">
            <b-button class="mr-2" variant="primary" @click.prevent="sendApplication()">Postuler</b-button>
            <b-button class="" variant="outline-primary" @click.prevent="closeModal()">Annuler</b-button>
        </div>
    </b-modal>
</template>

<script>
import applicationsGateway from '../../services/gateway/applications.gateway';
export default {
    name: 'ApplicationModal',
    props: {
        modalOpened: { type: Boolean, required: true},
        offer: {
            type: Object,
            default: function() {
                return { title: '', id: '' }
            }
        }
    },
    data() {
        return {
            form: {
                customMessage: ''
            }
        }
    },
    methods: {
        sendApplication() {
            applicationsGateway.addApplication(this.offer.id, this.form.customMessage);
        },
        closeModal() {
            this.$emit('close');
        }
    }
}
</script>