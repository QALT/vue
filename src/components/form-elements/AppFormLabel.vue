<template>
    <label v-bind="$attrs" v-on="$listeners" v-bind:for="name">
        <slot />
    </label>
</template>

<script>
export default {
    inject: ["name"]
}
</script>
