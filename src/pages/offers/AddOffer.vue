<template>
   <div class="row justify-content-center">
        <div class="col-4">
            <h1>Déposer une offre d'emploi</h1>
            <form-offer :form="form" :handleSubmit="handleSubmit" :options="options" buttonValue="Ajouter" />
        </div>
    </div>
</template>

<script>
import offersGateway from '../../services/gateway/offers.gateway';
import tagsGateway from '../../services/gateway/tags.gateway';
import FormOffer from './FormOffer.vue';

export default {
    components: { FormOffer },
    name: 'AddOfferPage',
    data() {
        return {
            options:[],
            form: {
                title: '',
                description: '',
                tags:[],
            }
        }
    },
    methods: {
        handleSubmit() {
            offersGateway.addOffer(this.form.title, this.form.description, this.form.tags);
        },
    },
    async created() {
        this.form.tags = await tagsGateway.getTags();
        this.form.tags.forEach(tag => this.options.push({ value:tag.id, text:tag.label}))
    }
}
</script>
