<template>
     <div class="row justify-content-center">
        <div class="col-4">
            <h4 class="text-center">Modification de l'offre d'emploi</h4>
            <b-form v-on:submit.prevent="onSubmit" v-if="!isLoading">
                <b-form-group
                    label="Titre de l'offre"
                    label-for="title"
                >
                    <b-form-input
                        id="title"
                        v-model="form.title"
                    />
                </b-form-group>
                <b-form-group
                    label="Description de l'offre"
                    label-for="description"
                >
                    <b-form-textarea
                        id="description"
                        v-model="form.description"
                    />
                </b-form-group>   
                <div class="row justify-content-center">
                    <b-button variant="outline-primary" to="/offers" class="mr-2 center">Retour</b-button>
                    <b-button type="submit" variant="primary" class="mr-2 center">Modifier</b-button>
                </div>
            </b-form>
        </div>
    </div>  
</template>

<script>
import offersGateway from '../../services/gateway/offers.gateway';
export default {
    name: 'EditOfferPage',
    props: ['id'],
    data() {
        return {
            form: {
                title: '',
                description: ''
            },
            originalOffer: null,
            isLoading: true
        }
    },
    created() {
        offersGateway.getOffer(this.id)
        .then(offer => {
            this.form.title = offer.title;
            this.form.description = offer.description
            this.originalOffer = offer;
            this.isLoading = false;
        })
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();
            const newOffer = {
                ...this.originalOffer,
                ...this.form
            };
            offersGateway.editOffer(this.originalOffer.id, newOffer);
        }
    }
}
</script>