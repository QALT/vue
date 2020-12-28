import VueRouter from "vue-router"
import store from "./store";
import Login from "./pages/Login.vue"
import Home from "./pages/Home.vue"
import NotFound from "./pages/NotFound.vue"
import Register from "./pages/Register.vue";
import About from "./pages/About.vue";
import AddOfferPage from "./pages/offers/AddOffer.vue";
import EmptyRouterView from './pages/EmptyRouterView.vue';

const router = new VueRouter({
    mode: "history",
    routes: [
        { path: "/login", component: Login },
        { path: "/", component: Home },
        { 
            path: "/offers", component: EmptyRouterView,
            children: [
                { path: 'add', component: AddOfferPage }
            ]
        },
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
