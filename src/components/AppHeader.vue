<template>
    <b-navbar variant="light" class="topbar mb-4 static-top shadow">
        <account-view></account-view>
	</b-navbar>

</template>

<script>
import AccountView from './AccountView';
export default {
    name: "AppHeader",
    components: {
        AccountView
    }
}
</script>
