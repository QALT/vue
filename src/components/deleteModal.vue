<template>
    <b-modal ref="delete-modal" hide-footer hide-header-close title="Candidature" v-model="modalOpened">
        <template #modal-title>{{title}}</template>
        <div class="d-block text-center">
            <h4>{{text}}</h4>
        </div>
        <div class="d-flex mt-3 justify-content-center">
            <b-button class="mr-2" variant="primary" @click.prevent="confirmation()">Supprimer</b-button>
            <b-button class="" variant="outline-primary" @click.prevent="closeModal()">Annuler</b-button>
        </div>
    </b-modal>
</template>

<script>
export default {
    name: 'deleteModal',
    props: {
        modalOpened: { type: Boolean, required: true},
        title: String,
        text: String
    },
    methods: {
        confirmation() {
            this.$emit('confirm');
        },
        closeModal() {
            this.$emit('close');
        }
    }
}
</script>