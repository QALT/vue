<template>
    <b-form-group :invalid-feedback="invalidFeedback" :state="state">
        <slot name="label">{{$attrs.label}} <span class="text-danger">{{typeof $attrs.required === 'string' ? '*' : ''}}</span></slot>
        <b-form-input
            v-on="$listeners"
            v-bind="$attrs"
            v-bind:id="name"
            v-bind:required="typeof $attrs.required === 'string' ? true : false"
            v-model="values[name]"
            :value="values[name] || ''"
            @input="input"
            :state="state"
        />
    </b-form-group>
</template>

<script>
import {validate} from "../../helpers/validator";

export default {
    inject: ['values', 'validations'],
    props: {
        name: {
            type: String,
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
        input(inputValue) {
            this.invalidFeedback = validate(this.$attrs.label, this.validations[this.name] || "", inputValue);
            this.state = this.invalidFeedback.length > 0 ? false : null;

            if (Object.prototype.hasOwnProperty.call(this.values, this.name)) {
                this.values[this.name] = inputValue;
            } else {
                throw Error(`The property ${this.name} is not a part of the values of the form.`)
            }
        }
    }
}
</script>
