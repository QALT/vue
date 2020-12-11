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
