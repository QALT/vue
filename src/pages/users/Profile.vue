<template>
    <div :key="key">
        <div class="row">
            <div class="col-12 mb-5">
                <h4 class="text-center">Informations personnelles</h4>
                <app-form :values="user" :handleSubmit="handleSubmit" >
                    <div class="row">
                        <div class="col-4 offset-1">
                            <app-form-input
                                label="Email"
                                name="email"
                                type="email"
                                disabled
                            />
                            <app-form-input
                                label="Nom"
                                name="lastname"
                            />
                            <app-form-input
                                label="Prénom"
                                name="firstname"
                            />
                            <app-form-datepicker
                                label="Date de naissance"
                                name="birthday"
                                :max="max"
                                :start-weekday="1"
                                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                            />
                        </div>
                        <div class="col-4 offset-2">
                            <app-form-input
                                label="Région"
                                name="region"
                            />
                            <app-form-input
                                label="Code postal"
                                name="postalCode"
                            />
                            <app-form-input
                                label="Ville"
                                name="town"
                            />
                            <app-form-input
                                label="Rue"
                                name="street"
                            />
                        </div>
                    </div>
                    <div class="text-center">
                        <app-form-button>Modifier</app-form-button>
                    </div>
                </app-form>
            </div>
        </div>
        <div class="row">
            <div class="col-6" v-if="isEmployee">
                <h4 class="text-center">Formation(s) <b-icon-pencil class="cursor-pointer ml-2" @click="onClickStudies" /></h4>
                <b-card v-for="study in user.studies" v-bind:key="study.id">
                    <p><b>{{ study.school }}</b></p>
                    <p>{{ study.label }}</p>
                    <p>{{ study.degree.label }}</p>
                </b-card>
            </div>
            <div class="col-6" v-if="isEmployee">
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
            user: {
                email: '',
                lastname: '',
                firstname: '',
                birthday: '',
                country: '',
                region: '',
                postalCode: '',
                town: '',
                street: '',
            },
            key: Math.round(Math.random() * 100),
            max: new Date()
        }
    },
    async created() {
        userGateway.getUser(store.getters.getId).then(user => {
            this.user = {
                ...user,
                country: 'France',
                region: user.address?.region ?? '',
                postalCode: user.address?.postalCode ?? '',
                town: user.address?.town ?? '',
                street: user.address?.street ?? '',
            };
            this.key = Math.round(Math.random() * 100)
        });
    },
    computed: {
		...mapGetters(['isEmployer', 'isEmployee']),
	},
    methods: {
        handleSubmit() {
            const newUser = {
                ...this.user,
                address: {
                    country: this.user.country,
                    region: this.user.region,
                    postalCode: this.user.postalCode,
                    town: this.user.town,
                    street: this.user.street,
                }
            }
            userGateway.editUser(store.getters.getId, newUser);
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