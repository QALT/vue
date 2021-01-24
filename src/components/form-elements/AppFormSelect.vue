<template>
    <b-form-group v-bind:label="$attrs.label" :invalid-feedback="invalidFeedback" :state="state">
        <b-form-select
            v-on="$listeners"
            v-bind="$attrs"
            v-bind:id="name"
            v-model="values[name]"
            @input="input"
            :value="values[name] || ''"
            :options="options"
            :state="state"
        />
    </b-form-group>
</template>

<script>
import {validate}  from "../../helpers/validator";

export default {
    inject: ['values', 'validations'],
    props: {
        name: {
            type: String,
            required: true
        },
        options: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            invalidFeedback: "",
            state: null
        };
    },
    methods: {
        input(newValue) {
            this.invalidFeedback = validate(this.$attrs.label, this.validations[this.name] || "", newValue);
            this.state = this.invalidFeedback.length > 0 ? false : null;

            if (Object.prototype.hasOwnProperty.call(this.values, this.name)) {
                this.values[this.name] = newValue;
            } else {
                throw Error(`The property ${this.name} is not a part of the values of the form.`)
            }

        }
    }
}
</script>
