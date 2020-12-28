<template>
    <div v-on="$listeners" v-bind="$attrs">
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String
        }
    },

    provide() {
        return {
            name: this.name
        };
    }
}
</script>
