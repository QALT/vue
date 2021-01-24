<template>
    <div class="row justify-content-center">
        <div class="col-4">
            <h4 class="text-center">Ajouter un tag</h4>
            <form-tag :form="form" :handleSubmit="handleSubmit" buttonValue="Ajouter" />
        </div>
    </div>
</template>

<script>
import tagsGateway from '../../services/gateway/tags.gateway';
import FormTag from './FormTag.vue';

export default {
    components: { FormTag },
    name: 'AddTagPage',
    data() {
        return {
            tags:[],
            form: {
                label: '',
            }
        }
    },
    methods: {
        handleSubmit() {
            tagsGateway.addTag(this.form.label);
        }
    },
}
</script>