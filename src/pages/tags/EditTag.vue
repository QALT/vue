<template>
    <div class="row justify-content-center">
        <div class="col-4">
            <h4 class="text-center">Modifier le tag</h4>
            <form-tag :form="form" :handleSubmit="handleSubmit" buttonValue="Modifier" />
        </div>
    </div>
</template>

<script>
import tagsGateway from '../../services/gateway/tags.gateway';
import FormTag from './FormTag.vue';

export default {
    components: { FormTag },
    name: 'EditTagPage',
    props: ['id'],
    data() {
        return {
            form: {
                label: '',
            },
            originalTag: null,
            isLoading: true
        }
    },
    created() {
        tagsGateway.getTag(this.id)
        .then(tag => {
            this.form.label = tag.label;
            this.originalTag = tag;
            this.isLoading = false;
        })
    },
    methods: {
        handleSubmit() {
            tagsGateway.editTag(this.originalTag.id, this.form);
        }
    }
    
}
</script>