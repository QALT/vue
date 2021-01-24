<template>
    <b-modal ref="application-modal" hide-footer hide-header-close title="Candidature" v-model="modalOpened">
        <div class="d-block text-center">
            <h4 class="font-weight-normal">Postuler pour l'offre "{{offer.title}}"</h4>
            <b-form @submit="sendApplication">
                <label>
                    Message personnalisé pour la candidature
                </label>
                <textarea v-model="form.customMessage" style="resize: auto; max-width: 470px;"/>
            </b-form>
        </div>
        <div class="d-flex mt-3 justify-content-center">
            <b-button class="mr-2" variant="primary" @click.prevent="sendApplication()">Postuler</b-button>
            <b-button variant="outline-primary" @click.prevent="closeModal()">Annuler</b-button>
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
