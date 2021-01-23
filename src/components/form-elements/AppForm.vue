<template>
    <b-form v-on="$listeners" v-bind="$attrs" @submit.prevent="submit">
        <slot />
        <div class="text-center">
            <small>Les champs marqués d'une <span class="text-danger">*</span> sont obligatoire</small>
        </div>
    </b-form>
</template>

<script>
export default {
    props: {
        values: {
            type: Object,
            required: true
        },
        handleSubmit: {
            type: Function,
            required: true
        },
        validations: {
            type: Object,
            required: true
        }
    },
    methods: {
        submit() {
            this.handleSubmit();
        }
    },
    provide() {
        const { values, validations } = this;

        return {
            values,
            validations
        };
    }
}
</script>
