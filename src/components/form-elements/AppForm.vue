<template>
    <form v-on="$listeners" v-bind="$attrs" @submit="submitForm">
        <slot />
    </form>
</template>

<script>
export default {
    props: {
        values: Object
    },

    methods: {
        submit() {},

        submitForm(event) {
            event.preventDefault();
            this.submit();
        }
    },

    data() {
        return {
            formValues: this.values
        };
    },

    provide() {
        const {submit, formValues: values} = this;

        return {
            submit,
            values
        };
    }
}
</script>
