<template>
    <b-navbar variant="primary" class="bg-gradient-primary flex-column sidebar sidebar-dark">
        <b-navbar-brand href="/" class="text-light text-center mx-3 p-3">
            <b-icon-briefcase></b-icon-briefcase>
            Job Finder
        </b-navbar-brand>
        <hr class="sidebar-divider my-0 w-100">
        <api-switch class="pt-3 pb-3"></api-switch>
        <hr class="sidebar-divider my-0 w-100">
        <b-navbar-nav class="flex-column w-100">
            <b-nav-item to="/" exact-active-class="text-light">
                <b-icon-briefcase class="mr-1"></b-icon-briefcase>
                Offers
            </b-nav-item>
        </b-navbar-nav>
    </b-navbar>
</template>
<script>
import ApiSwitch from './ApiSwitch';

export default {
    name: "Sidebar",
    components: {
        ApiSwitch
    }
}
</script>
