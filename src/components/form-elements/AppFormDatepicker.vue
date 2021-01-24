<template>
    <b-form-group :label="label">
        <b-form-datepicker
            v-bind="$attrs"
            v-on="$listeners"
            v-bind:id="name"
            @input="input"
            :value="value"
            :placeholder="placeholder"
        >
        <small>{{ error }}</small>
        </b-form-datepicker>
    </b-form-group>
</template>

<script>
import {validate} from "../../helpers/validator";

export default {
    inject: ["values", "validations"],

    props: {
        name: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            error: "",
            state: null
        };
    },

    computed: {
        label() {
            return this.$attrs.label || "";
        },
        placeholder() {
            return this.$attrs.placeholder || "";
        },
        value() {
            return this.values[this.name] || "";
        }
    },

    methods: {
        input(newValue) {
            this.error = validate(this.label, this.validations[this.name] || "", newValue);
            this.state = this.error.length > 0 ? false : null;

            if (typeof this.values[this.name] !== "undefined") {
                this.values[this.name] = newValue;
            }
        }
    }
}
</script>
