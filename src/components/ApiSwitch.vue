<template>
    <div class="row">
        <div>
            <select class="custom-select" @change="onChange">
                <option selected disabled>Api provider</option>
                <option value="api-platform">Api platform</option>
                <option value="graphql">GraphQL</option>
            </select>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'Home',
    methods: {
        ...mapMutations([
            'setApiProvider'
        ]),
        onChange(event) {
            this.setApiProvider(event.currentTarget.value);
        }
    }
}
</script>