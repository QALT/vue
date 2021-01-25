<template>
    <app-form :values="form" :handleSubmit="handleSubmit" :validations="validations">
        <app-form-input
            label="Nom du diplôme"
            name="label"
            required
        />
        <app-form-select
            label="Titre du diplôme"
            name="degree"
            :options="options"
            required
        />
        <app-form-input
            label="Nom de l'école"
            name="school"
            required
        />
        <div class="text-center">
            <b-button variant="outline-primary" to="/studies" class="mr-2 center">Retour</b-button>
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
        },
    },
    data() {
        return {
            validations: {
                label: "required",
                degree: "required",
                school: "required",
            }
        }
    }
}
</script>