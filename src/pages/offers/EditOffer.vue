<template>
     <div class="row justify-content-center">
        <div class="col-4">
            <h4 class="text-center">Modification de l'offre d'emploi</h4>
            <form-offer :form="form" :handleSubmit="handleSubmit" :options="options" buttonValue="Modifier" />
        </div>
    </div>  
</template>

<script>
import offersGateway from '../../services/gateway/offers.gateway';
import tagsGateway from '../../services/gateway/tags.gateway';
import FormOffer from './FormOffer.vue';

export default {
    components: { FormOffer },
    name: 'EditOfferPage',
    props: ['id'],
    data() {
        return {
            options: [],
            form: {
                title: '',
                description: '',
                tags: [],
            },
            originalOffer: null,
            isLoading: true
        }
    },
    async created() {
        const tags = await tagsGateway.getTags();
        tags.forEach(tag => this.options.push({ value: tag.id, text:tag.label}))

        offersGateway.getOffer(this.id)
        .then(offer => {
            this.form.title = offer.title;
            this.form.description = offer.description
            this.form.tags = offer.tags?.map(tag => tag.id)
            this.originalOffer = offer;
            this.isLoading = false;
        })
    },
    methods: {
        handleSubmit() {
            const newOffer = {
                ...this.originalOffer,
                ...this.form
            };
            offersGateway.editOffer(this.originalOffer.id, newOffer);
        }
    }
}
</script>