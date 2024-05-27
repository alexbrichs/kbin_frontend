import {createRouter, createWebHistory} from 'vue-router'
import HomePage from "../components/HomePage.vue";
import ShowDetallThread from "../components/ShowDetallThread.vue";

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/thread/:id/top/',
        name: 'ShowDetallThread',
        component: ShowDetallThread,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router