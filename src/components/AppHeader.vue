<template>
    <b-navbar variant="light" class="topbar mb-4 static-top shadow">
		<b-navbar-nav class="ml-auto">
            <hr class="topbar-divider">
            <b-nav-item to="/">
                <span class="text-gray-600 mr-2">John Doe</span>
                <b-icon-person-circle variant="secondary"></b-icon-person-circle>
            </b-nav-item>

        </b-navbar-nav>
	</b-navbar>

</template>

<script>
export default {
    name: "AppHeader"
}
</script>
