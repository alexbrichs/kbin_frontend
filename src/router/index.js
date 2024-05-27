import {createRouter, createWebHistory} from 'vue-router'
import UserProfile from "../components/UserProfile.vue";

const routes = [
    {
        path: '/u/',
        name: 'UserProfile',
        component: UserProfile,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router