<template>
    <b-button v-on="$listeners" v-bind="$attrs" type="submit">
        <slot />
    </b-button>
</template>

<script>
export default {}
</script>
