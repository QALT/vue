import VueRouter from 'vue-router'
import store from './store';
import Login from './pages/Login.vue'
import Home from './pages/Home.vue'
import NotFound from './pages/NotFound.vue'

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/login', component: Login },
        { path: '/', component: Home },
        { path: '*', component: NotFound }
    ]
});

router.beforeEach((to, from, next) => {
    if (!store.state.token && to.path !== '/login') {
        next('/login');
    }

    next();
})

export default router;