import {createRouter, createWebHistory} from 'vue-router'
import ShowDetallThread from "../components/ShowDetallThread.vue";

const routes = [
    {
        path: '/',
        name: 'ShowDetallThread',
        component: ShowDetallThread
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router