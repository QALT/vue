<template>
    <b-button v-on="$listeners" v-bind="$attrs" variant="primary" type="submit">
        <slot />
    </b-button>
</template>

<script>
export default {}
</script>
