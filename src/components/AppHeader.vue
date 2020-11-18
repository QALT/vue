<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Navbar</a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/login">Login</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/register">Register</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/about">About</router-link>
                </li>
                <li class="nav-item">
                    <b-button @click="logout">Logout</b-button>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <router-link to="/">Home</router-link>
                        <router-link to="/login">Login</router-link>
                        <router-link to="/register">Register</router-link>
                        <router-link to="/">Home</router-link>
                        <router-link to="/">Home</router-link>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Disabled</a>
                </li>
            </ul>
        </div>
        <api-switch></api-switch>
    </nav>
</template>

<script>
import ApiSwitch from './ApiSwitch.vue'
import {mapMutations} from "vuex";

export default {
    name: "AppHeader",
    components: { ApiSwitch },

    methods: {
        ...mapMutations([
            "setToken"
        ]),
        logout() {
            this.setToken(null);
            this.$router.push("/login");
        }
    }
}
</script>
