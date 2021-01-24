import VueRouter from "vue-router";
import store from "./store";
import Login from "./pages/auth/Login.vue";
import Register from "./pages/auth/Register.vue";
import Home from "./pages/Home.vue";
import Profile from "./pages/users/Profile.vue";
import NotFound from "./pages/NotFound.vue";
import AddOfferPage from "./pages/offers/AddOffer.vue";
import EditOfferPage from "./pages/offers/EditOffer.vue";
import EmptyRouterView from './pages/EmptyRouterView.vue';
import UserApplicationsPage from './pages/applications/ListApplication.vue';
import EditApplicationPage from './pages/applications/EditApplication.vue';
import ListStudiesPage from './pages/studies/ListStudies.vue';
import AddStudyPage from './pages/studies/AddStudy.vue';
import EditStudyPage from './pages/studies/EditStudy.vue';
import ListExperiencePage from './pages/experiences/ListExperience.vue'
import AddExperiencePage from './pages/experiences/AddExperience.vue'
import EditExperiencePage from './pages/experiences/EditExperience.vue'
import ListDegrees from './pages/degrees/ListDegrees.vue';
import AddDegree from './pages/degrees/AddDegree.vue';
import EditDegree from './pages/degrees/EditDegree.vue';
import ListTags from './pages/tags/ListTags.vue';
import AddTag from './pages/tags/AddTag.vue';
import EditTag from './pages/tags/EditTag.vue';

const router = new VueRouter({
    mode: "history",
    routes: [
        { path: "/login", component: Login },
        { path: "/register", component: Register },
        { path: "/", component: Home },
        { path: "/profil", component: Profile },
        { 
            path: "/offers", component: EmptyRouterView,
            children: [
                { path: "add", component: AddOfferPage },
                { path: ":id/edit", component: EditOfferPage, props: true }
            ]
        },
        {
            path: "/applications", component: EmptyRouterView,
            children: [
                { path: "", component: UserApplicationsPage },
                { path: ":id/edit", component: EditApplicationPage, props: true }
            ]},
        { 
            path: "/studies", component: EmptyRouterView,
            children: [
                { path: "", component : ListStudiesPage},
                { path: "add", component: AddStudyPage },
                { path: ":id/edit/", component: EditStudyPage, props: true }
            ]   
        },
        { 
            path: "/experiences", component: EmptyRouterView,
            children: [
                { path: "", component : ListExperiencePage},
                { path: "add", component: AddExperiencePage },
                { path: ":id/edit/", component: EditExperiencePage, props: true }
            ]
        },
        {
            path: "/degrees", component: EmptyRouterView,
            children: [
                { path: "", component : ListDegrees},
                { path: "add", component: AddDegree },
                { path: ":id/edit/", component: EditDegree, props: true }
            ]   
        },
        {
            path: "/tags", component: EmptyRouterView,
            children: [
                { path: '', component : ListTags},
                { path: 'add', component: AddTag },
                { path: ':id/edit/', component: EditTag, props: true }
            ]   
        },
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
  
    if (store.state.roles) {
        const employeeRoutes = ["/studies", "/experiences"];
        if (store.getters.isEmployer && employeeRoutes.includes(to.path)) {
            return next("/");
        }
    }

    next();
});

export default router;
