<template>
   <div class="row justify-content-center">
        <div class="col-4">
            <h1>Déposer une offre d'emploi</h1>   
            <b-form @submit="onSubmit">
                <b-form-group
                    label="Titre de l'offre"
                    label-for="title"
                >
                    <b-form-input
                        id="title"
                        v-model="offer.title"
                    />
                </b-form-group>
                <b-form-group
                    label="Description de l'offre"
                    label-for="description"
                >
                    <b-form-input
                        id="description"
                        v-model="offer.description"
                    />
                </b-form-group>
                 <b-form-group
                    label="Tags de l'offre"
                    label-for="tags"
                >
                    <b-form-select v-model="selected" :options="options" multiple :select-size="4">

                    </b-form-select>
                 </b-form-group>
                <div class="row justify-content-center">
                    <b-button variant="outline-primary" to="/" class="mr-2 center">Retour</b-button>
                    <b-button type="submit" variant="primary" class="mr-2">Ajouter</b-button>
                </div>
            </b-form>
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
            selected:[],
            tags:[],
            options:[],
            offer: {
                title: '',
                description: ''   
            }
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();
            offersGateway.addOffer(this.offer.title,this.offer.description,this.selected);
        },
    },
    async created() {
            this.tags = await tagsGateway.getTags();
            this.tags.forEach(tag => this.options.push({ value:tag.id, text:tag.label}))
        }
}
</script>