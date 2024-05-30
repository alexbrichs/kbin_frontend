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
        name: 'UserProfile0',
        component: UserProfile,
        props: true
    },
    // Veure publicacions (threads i/o links)
    {
        path: '/u/:username/:activeOption/:activeFilter/',
        name: 'UserProfile1',
        component: UserProfile,
        props: true
    },
    {
        path: '/u/:username/comments/',
        name: 'UserProfile2',
        component: UserProfile,
        props: (route) => ({ username: route.params.username, activeSelected: 'comments' })
    },
    // Veure comentaris
    {
        path: '/u/:username/comments/:activeOption/:activeFilter/',
        name: 'UserProfile3',
        component: UserProfile,
        props: (route) => ({ username: route.params.username, activeSelected: 'comments' })
    },
    // Veure boosts
    {
        path: '/u/:username/boosts/',
        name: 'UserProfile4',
        component: UserProfile,
        props: (route) => ({ username: route.params.username, activeSelected: 'boosts' })
    },
    {
        path: '/u/:username/boosts/:activeOption/:activeFilter/',
        name: 'UserProfile5',
        component: UserProfile,
        props: (route) => ({ username: route.params.username, activeSelected: 'boosts' })
    },
]

// Combinar les rutes
const combinedRoutes = [...routes, ...user_routes];

const router = createRouter({
    history: createWebHistory(),
    routes: combinedRoutes,
})

export default router