<template>
    <app-form :values="form" :handleSubmit="handleSubmit" :validations="validations" >
        <app-form-input
            label="Intitulé du poste"
            name="label"
            required
        />
        <app-form-input
            label="Description"
            name="description"
        />
        <app-form-datepicker
            label="Date de début"
            name="startDate"
            :max="max"
            :start-weekday="1"
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            required
        />
        <app-form-datepicker
            label="Date de fin"
            name="endDate"
            :max="max"
            :start-weekday="1"
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            required
        />
        <div class="text-center">
            <b-button variant="outline-primary" to="/experiences" class="mr-2 center">Retour</b-button>
            <app-form-button>
                {{buttonValue}}
            </app-form-button>
        </div>
    </app-form>
</template>

<script>
import AppFormDatepicker from '../../components/form-elements/AppFormDatepicker.vue'
export default {
    components: { AppFormDatepicker },
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
    },
    data() {
        return {
            max: new Date(),
            validations: {
                label: "required",
                startDate: `required|before:${this.form.endDate}`,
                endDate: "required"
            }
        }
    }
}
</script>