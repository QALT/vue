<template>
    <div>
        <b-form-select :options="selectOptions" v-model="selected" @change="onChange"></b-form-select>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'ApiSwitch',
    methods: {
        ...mapMutations([
            'setApiProvider'
        ]),
        onChange() {
            this.setApiProvider(this.selected);
        }
    },
    data() {
        return {
            selected: null,
            selectOptions: [
                { value: 'nothing', text: 'Api provider', disabled: true },
                { value: 'api-platform', text: 'API Platform' },
                { value: 'prisma', text: 'Prisma' }
            ]
        }
    }
}
</script>