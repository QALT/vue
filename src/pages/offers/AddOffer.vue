<template>
    <div class="container">
        <h1>Déposer une offre d'emplois</h1>
        <app-form :values="form" v-on:submit="onSubmit">
            <app-form-field name="title">
                <app-form-label>Titre de l'offre</app-form-label>
                <app-form-input></app-form-input>
            </app-form-field>
            <app-form-field name="description">
                <app-form-label>Description de l'offre</app-form-label>
                <app-form-input type="textarea"></app-form-input>
            </app-form-field>

            <app-form-button>Envoyer</app-form-button>
        </app-form>
    </div>
</template>

<script>
import offersGateway from '../../services/gateway/offers.gateway';
export default {
    name: 'AddOfferPage',
    data() {
        return {
            form: {
                title: '',
                description: ''
            }
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();
            offersGateway.addOffer(this.form.title, this.form.description);
        }
    }
}
</script>