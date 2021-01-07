import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueApollo from 'vue-apollo';
import { apolloClient } from './services/prisma/apolloClient'

import AppForm from './components/form-elements/AppForm.vue';
import AppFormInput from './components/form-elements/AppFormInput.vue';
import AppFormLabel from './components/form-elements/AppFormLabel.vue';
import AppFormField from './components/form-elements/AppFormField.vue';
import AppFormButton from './components/form-elements/AppFormButton.vue';
import AppFormTextarea from './components/form-elements/AppFormTextarea.vue';

Vue.component('AppForm', AppForm)
Vue.component('AppFormInput', AppFormInput)
Vue.component('AppFormLabel', AppFormLabel)
Vue.component('AppFormField', AppFormField)
Vue.component('AppFormButton', AppFormButton)
Vue.component('AppFormTextarea', AppFormTextarea)


const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
  })

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueApollo);

new Vue({
    router,
    store,
    apolloProvider,
    render: h => h(App),
}).$mount('#app')
