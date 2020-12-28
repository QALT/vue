<template>
    <button v-on="$listeners" v-bind="$attrs" type="submit">
        <slot />
    </button>
</template>

<script>
export default {
    inject: ["submit"]
}
</script>
