import VueRouter from "vue-router"
import store from "./store";
import Login from "./pages/Login.vue"
import Home from "./pages/Home.vue"
import NotFound from "./pages/NotFound.vue"
import Register from "./pages/Register.vue";
import About from "./pages/About.vue";

const router = new VueRouter({
    mode: "history",
    routes: [
        { path: "/login", component: Login },
        { path: "/", component: Home },
        { path: "/register", component: Register },
        { path: "/about", component: About },
        { path: "*", component: NotFound }
    ]
});

router.beforeEach((to, from, next) => {
    console.log({token: store.state.token, route: to.path});

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
