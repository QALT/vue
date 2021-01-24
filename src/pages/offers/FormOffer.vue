<template>
    <app-form :values="form" :handleSubmit="handleSubmit">
        <app-form-input
            label="Titre de l'offre"
            name="title"
            required
        />
        <app-form-input
            label="Description de l'offre"
            name="description"
        />
        <app-form-select
            label="Tags de l'offre"
            name="tags"
            :options="options"
            multiple
            required
        />
        <div class="text-center">
            <b-button variant="outline-primary" to="/" class="mr-2 center">Retour</b-button>
            <app-form-button>
                {{buttonValue}}
            </app-form-button>
        </div>
    </app-form>
</template>

<script>
export default {
    name: 'FormTag',
    props: {
        buttonValue: {
            type: String,
            required: true
        },
        form: {
            type: Object,
            required: true
        },
        handleSubmit: {
            type: Function,
            required: true
        },
        options: {
            type: Array,
            required: true
        }
    }
}
</script>