<template>
    <div id="app" class="bg-gradient-primary d-flex vh-100">
        <sidebar v-if="showHeader"></sidebar>
        <div v-bind:class="{'content-wrapper': showHeader}" class="w-100 d-flex flex-column">
            <app-header></app-header>
            <div class="pl-4 pr-4 container-fluid">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import Sidebar from './components/Sidebar.vue'

export default {
    name: 'App',
    components: {
        AppHeader,
        Sidebar
    },
    computed: {
        showHeader() {
            const excludedPaths = ['/login', '/register'];
            const currentPath = this.$route.path;
            return !excludedPaths.includes(currentPath);
        }
    }
}
</script>

<style>
@import url('./assets/css/custom.css');
.content-wrapper {
    background-color: var(--white);
    width: 100%;
    overflow-x: hidden;
}

.cursor-pointer:hover {
    cursor: pointer;
}

</style>
