<template>
    <div>
        <b-form-select :options="selectOptions" v-model="selected" @change="onChange"></b-form-select>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
    name: 'ApiSwitch',
    methods: {
        ...mapMutations([
            'setApiProvider',
            'disconnectUser'
        ]),
        ...mapGetters(['getApiProvider']),
        onChange() {
            this.disconnectUser();
            this.setApiProvider(this.selected);
            this.$router.push('/login');    
        }
    },
    data() {
        return {
            selected: this.getApiProvider(),
            selectOptions: [
                { value: 'nothing', text: 'Api provider', disabled: true },
                { value: 'api-platform', text: 'API Platform' },
                { value: 'graphql', text: 'GraphQL' }
            ]
        }
    }
}
</script>