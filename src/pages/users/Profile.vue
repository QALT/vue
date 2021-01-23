<template>
    <div>
        <div class="row">
            <div class="col-6 offset-3 mb-5">
                <h4 class="text-center">Informations personnelles</h4>
                <b-form @submit="editUser">
                    <b-form-group
                        label="Email"
                        label-for="email"
                    >
                        <b-form-input
                            id="email"
                            v-model="user.email"
                            type="email"
                            required
                        />
                    </b-form-group>
                    <b-form-group
                        label="Nom"
                        label-for="lastname"
                    >
                        <b-form-input
                            id="lastname"
                            v-model="user.lastname"
                        />
                    </b-form-group>
                    <b-form-group
                        label="Prénom"
                        label-for="firstname"
                    >
                        <b-form-input
                            id="firstname"
                            v-model="user.firstname"
                        />
                    </b-form-group>
                    <b-form-group
                        label="Date de naissance"
                        label-for="birthday"
                    >
                        <b-form-datepicker
                            id="birthday"
                            v-model="user.birthday"
                            placeholder=""
                            :max="max"
                            :start-weekday="1"
                            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                        >
                        </b-form-datepicker>
                    </b-form-group>
                    <b-button type="submit" variant="primary" class="mr-0">Modifier</b-button>
                </b-form>
            </div>
            <div class="col-6 offset-3 mb-5" v-if="isEmployee">
                <h4 class="text-center">Formation(s) <b-icon-pencil class="cursor-pointer ml-2" @click="onClickStudies" /></h4>
                <b-card v-for="study in user.studies" v-bind:key="study.id">
                    <p><b>{{ study.school }}</b></p>
                    <p>{{ study.label }}</p>
                </b-card>
            </div>
            <div class="col-6 offset-3" v-if="isEmployee">
                <h4 class="text-center">Expérience(s) <b-icon-pencil class="cursor-pointer ml-2" @click="onClickExperiences" /></h4>
                <b-card v-for="experience in user.experiences" v-bind:key="experience.id">
                    <p><b>{{ experience.label }}</b></p>
                    <p>{{ experience.description }}</p>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../../store';
import router from '../../router';
import userGateway from '../../services/gateway/users.gateway';

export default {
    name: 'Profile',
    data() {
        return {
            user: {},
            max: new Date()
        }
    },
    created() {
        userGateway.getUser(store.getters.getId).then(user => {
            this.user = user
        });
    },
    computed: {
		...mapGetters(['isEmployer', 'isEmployee']),
	},
    methods: {
        editUser(event) {
            event.preventDefault();
            userGateway.editUser(store.getters.getId, this.user);
        },
        onClickStudies() {
            router.push('studies')
        },
        onClickExperiences() {
            router.push('experiences')
        }
    }
}
</script>