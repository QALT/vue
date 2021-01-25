<template>
    <div class="col-12 mb-5">
        <h4 class="text-center">{{ user.firstname }} {{ user.lastname }}</h4>
        <div class="row">
            <div class="col-4 offset-1">
                <p>Email: {{ user.email }}</p>
                <p>Nom: {{ user.lastname }}</p>
                <p>Prénom: {{ user.firstname }}</p>
                <p>Date de naissance: {{ user.birthday }}</p>
            </div>
            <div class="col-4 offset-2">
                <p>Région: {{ user.region }}</p>
                <p>Code postal: {{ user.postalCode }}</p>
                <p>Ville: {{ user.town }}</p>
                <p>Rue: {{ user.street }}</p>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-6">
                <h4 class="text-center">Formation(s)</h4>
                <b-card v-for="study in user.studies" v-bind:key="study.id">
                    <p><b>{{ study.school }}</b></p>
                    <p>{{ study.label }}</p>
                    <p>{{ study.degree.label }}</p>
                </b-card>
            </div>
            <div class="col-6">
                <h4 class="text-center">Expérience(s)</h4>
                <b-card v-for="experience in user.experiences" v-bind:key="experience.id">
                    <p><b>{{ experience.label }}</b></p>
                    <p>{{ experience.description }}</p>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
import usersGateway from '../../services/gateway/users.gateway'
export default {
    name: 'ShowUser',
    props: ['id'],
    data() {
        return {
            user: {}
        }
    },
    async created() {
        this.user = await usersGateway.getUser(this.id);
    },
}
</script>