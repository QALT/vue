<template>
    <b-navbar variant="light" class="topbar mb-4 static-top shadow">
        <api-switch class="pt-3 pb-3"></api-switch>
        <account-view></account-view>
	</b-navbar>

</template>

<script>
import AccountView from './AccountView';
import ApiSwitch from './ApiSwitch';

export default {
    name: "AppHeader",
    components: {
        AccountView,
        ApiSwitch
    }
}
</script>
