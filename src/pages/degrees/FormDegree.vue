<template>
    <app-form :values="form" :handleSubmit="handleSubmit" :validations="validations" >
        <app-form-input
            label="Nom du niveau"
            name="label"
            required
        />
        <div class="row justify-content-center">
            <b-button variant="outline-primary" to="/degrees" class="mr-2 center">Retour</b-button>
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
        }
    },
    data() {
        return {
            validations: {
                label: "required"
            }
        }
    }
}
</script>