<template>
    <div id="app">
        <app-header v-if="showHeader"></app-header>
        <router-view></router-view>
    </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'

export default {
    name: 'App',
    components: {
        AppHeader,
    },
    computed: {
        showHeader() {
            const excludedPaths = ['/login', '/register'];
            const currentPath = this.$router.currentRoute.path;
            return !excludedPaths.includes(currentPath);
        }
    }
}
</script>