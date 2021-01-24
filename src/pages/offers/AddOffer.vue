<template>
   <div class="row justify-content-center">
        <div class="col-4">
            <h1>Déposer une offre d'emploi</h1>
            <app-form :values="offer" :handleSubmit="onSubmit">
                <app-form-input
                    label="Titre de l'offre"
                    name=title
                    required
                />
                <app-form-input
                    label="Description de l'offre"
                    name=description
                />
                <app-form-select
                    label="Tags de l'offre"
                    name=tags
                    :options="options"
                    multiple
                    required
                />
                <div class="text-center">
                    <b-button variant="outline-primary" to="/" class="mr-2 center">Retour</b-button>
                    <app-form-button variant="primary">
                        Ajouter
                    </app-form-button>
                </div>
            </app-form>
        </div>
    </div>
</template>

<script>
import offersGateway from '../../services/gateway/offers.gateway';
import tagsGateway from '../../services/gateway/tags.gateway';

export default {
    name: 'AddOfferPage',
    data() {
        return {
            options:[],
            offer: {
                title: '',
                description: '',
                tags:[],
            }
        }
    },
    methods: {
        onSubmit() {
            offersGateway.addOffer(this.offer.title, this.offer.description, this.offer.tags);
        },
    },
    async created() {
            this.tags = await tagsGateway.getTags();
            this.tags.forEach(tag => this.options.push({ value:tag.id, text:tag.label}))
        }
}
</script>
