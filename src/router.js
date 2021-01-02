import VueRouter from "vue-router"
import store from "./store";
import Login from "./pages/Login.vue"
import Home from "./pages/Home.vue"
import NotFound from "./pages/NotFound.vue"
import Register from "./pages/Register.vue";
import About from "./pages/About.vue";
import AddOfferPage from "./pages/offers/AddOffer.vue";
import EditOfferPage from "./pages/offers/EditOffer.vue";
import EmptyRouterView from './pages/EmptyRouterView.vue';
import UserApplicationsPage from './pages/applications/ListApplication.vue';
import EditApplicationPage from './pages/applications/EditApplication.vue';

const router = new VueRouter({
    mode: "history",
    routes: [
        { path: "/login", component: Login },
        { path: "/", component: Home },
        { 
            path: "/offers", component: EmptyRouterView,
            children: [
                { path: 'add', component: AddOfferPage },
                { path: ':id/edit', component: EditOfferPage, props: true }
            ]
        },
        {
            path: '/applications', component: EmptyRouterView,
            children: [
                { path: '', component: UserApplicationsPage },
                { path: ':id/edit', component: EditApplicationPage, props: true }
        ]},
        { path: "/register", component: Register },
        { path: "/about", component: About },
        { path: "*", component: NotFound }
    ]
});

router.beforeEach((to, from, next) => {
    if (!store.state.token) {
        if (to.path === "/register") {
            return next();
        }

        if (to.path !== "/login") {
            return next("/login");
        }
    }

    if (store.state.token && to.path === "/login" || to.path === "/register") {
        return next("/");
    }

    next();
})

export default router;
