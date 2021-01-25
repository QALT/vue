<template>
    <b-modal ref="application-modal" hide-footer hide-header-close title="Candidature" v-model="modalOpened">
        <div class="d-block text-center">
            <h4 class="font-weight-normal">Postuler pour l'offre "{{offer.title}}"</h4>
            <b-form @submit.prevent="handleSubmit">
                <b-form-group label="Message personnalisé pour la candidature">
                    <textarea v-model="form.comment" style="resize: auto; max-width: 450px;"></textarea>
                </b-form-group>
                <div class="d-flex mt-3 justify-content-center">
                    <app-form-button>Postuler</app-form-button>
                    <b-button variant="outline-primary">Annuler</b-button>
                </div>
            </b-form>
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
                comment: ''
            }
        }
    },
    methods: {
        handleSubmit() {
            applicationsGateway.addApplication(this.offer.id, this.form.comment);
        },
        closeModal() {
            this.$emit('close');
        }
    }
}
</script>
