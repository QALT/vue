<template>
    <b-navbar variant="primary" class="bg-gradient-primary flex-column sidebar sidebar-dark">
        <b-navbar-brand href="/" class="text-light text-center mx-3 p-3">
            <b-icon-briefcase></b-icon-briefcase>
            Job Finder
        </b-navbar-brand>
        <hr class="sidebar-divider my-0 w-100">
        <b-navbar-nav class="flex-column w-100">
            <b-nav-item to="/" exact-active-class="text-light">
                <b-icon-briefcase class="mr-1" />
                Offres
            </b-nav-item>
            <b-nav-item to="/applications" exact-active-class="text-light">
                <b-icon-file-person class="mr-1" />
                Candidatures
            </b-nav-item>
            <b-nav-item to="/studies" exact-active-class="text-light" v-if="isEmployee">
                <b-icon icon="person-fill" class="mr-1"></b-icon>
                Diplômes
            </b-nav-item>
            <b-nav-item to="/experiences" exact-active-class="text-light" v-if="isEmployee">
                <b-icon-asterisk class="mr-1"></b-icon-asterisk>
                Expériences
            </b-nav-item>
            <b-nav-item to="/degrees" exact-active-class="text-light" v-if="isAdmin">
                <b-icon icon="bar-chart" class="mr-1"></b-icon>
                Niveau d'étude
            </b-nav-item>
            <b-nav-item to="/tags" exact-active-class="text-light" v-if="isAdmin">
                <b-icon icon="bookmark-star" class="mr-1"></b-icon>
                Tags
            </b-nav-item>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "Sidebar",
    computed: {
		...mapGetters(['isEmployee', 'isAdmin']),
	},
}
</script>
