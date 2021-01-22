<template>
    <div class="ml-auto d-flex">
        <hr class="topbar-divider">
        <b-navbar-nav v-if="!isLogged">
            <b-nav-item to="/login">Login</b-nav-item>
            <b-nav-item to="/register">Register</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-else class="dropdown">
            <b-nav-item-dropdown right>
                <template #button-content>
                    <span class="text-gray-600 mr-2">{{getFirstname}} {{getLastname}}</span>
                    <b-icon-person-circle variant="secondary" />
                </template>
                <b-dropdown-item href="/profil">Votre profil</b-dropdown-item>
                <b-dropdown-item href="#" @click="disconnect()">Logout</b-dropdown-item>
              </b-nav-item-dropdown>
        </b-navbar-nav>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: "AccountView",
    computed: {
        ...mapGetters(['isLogged', 'getFirstname', 'getLastname'])
    },
    methods: {
        ...mapMutations(['disconnectUser']),
        disconnect() {
            this.disconnectUser();
            this.$router.push('/login');
        }
    }
}
</script>

<style>

</style>