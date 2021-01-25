<template>
    <b-modal ref="delete-modal" hide-footer hide-header-close v-model="modalOpened">
        <template #modal-title>{{title}}</template>
        <div class="d-block text-center">
            <h4>{{text}}</h4>
        </div>
        <div class="d-flex mt-3 justify-content-center">
            <b-button class="mr-2" variant="primary" @click.prevent="confirmation">{{confirmLabel}}</b-button>
            <b-button variant="outline-primary" @click.prevent="cancelModal">{{cancelLabel}}</b-button>
        </div>
    </b-modal>
</template>

<script>
export default {
    name: 'modal-component',
    props: {
        modalOpened: { type: Boolean, required: true},
        title: String,
        text: String,
        confirmLabel: String,
        cancelLabel: String
    },
    methods: {
        confirmation() {
            this.$emit('confirm');
        },
        cancelModal() {
            this.$emit('cancel');
        }
    }
}
</script>