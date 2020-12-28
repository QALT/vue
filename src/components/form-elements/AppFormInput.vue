<template>
    <input v-on="$listeners" v-bind="$attrs" v-bind:name="name" v-bind:id="name" @input="input" :value="values[name] || ''" />
</template>

<script>
export default {
    inject: ["submit", "name", "values"],

    methods: {
        input(event) {
            if (Object.prototype.hasOwnProperty.call(this.values, this.name)) {
                this.values[this.name] = event.target.value;
            }

            this.submit();
        }
    }
}
</script>
