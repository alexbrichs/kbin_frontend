import {createRouter, createWebHistory} from 'vue-router'
import HomePage from '../components/HomePage.vue'
import ShowDetallThread from "@/components/ShowDetallThread.vue";
import CercadorThreads from "@/components/CercadorThreads.vue";
import UserProfile from "../components/UserProfile.vue";
import CrearThread from "@/components/CrearThread.vue";
import '/public/assets/css/app.910c0aab.css';
import '/public/assets/css/824.b4cc3385.css';

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/:activeOption/:activeFilter',
        name: 'HomePage1',
        component: HomePage
    },
    {
        path: '/thread/:id/top/',
        name: 'ShowDetallThread',
        component: ShowDetallThread,
        props: true
    },
    {
        path: '/cercador/:activeOption/:activeFilter',
        name: 'CercadorThreads',
        component: CercadorThreads
    },
    {
        path: '/cercador/',
        name: 'CercadorThreads1',
        component: CercadorThreads
    },
    {
        path: '/new/thread/',
        name: 'CrearThread',
        component: CrearThread
    },
    {
        path: '/new/link/',
        name: 'CrearLink',
        component: CrearThread
    }
]
const user_routes = [
    {
        path: '/u/:username/',
        name: 'UserProfile',
        component: UserProfile,
        props: true
    },
    // Veure publicacions (threads i/o links)
    {
        path: '/u/:username/:activeOption/:activeFilter/',
        name: 'UserProfile1',
        component: UserProfile,
    },
    {
        path: '/u/:username/commented/',
        name: 'UserProfile2',
        component: UserProfile,
    },
    {
        path: '/u/:username/comment/:activeOption/:activeFilter/',
        name: 'UserProfile3',
        component: UserProfile,
    },
    {
        path: '/u/:username/boosts/',
        name: 'UserProfile4',
        component: UserProfile,
    },
    {
        path: '/u/:username/boosts/:activeOption/:activeFilter/',
        name: 'UserProfile5',
        component: UserProfile,
    },
]

// Combinar les rutes
const combinedRoutes = [...routes, ...user_routes];

const router = createRouter({
    history: createWebHistory(),
    routes: combinedRoutes,
})

export default router