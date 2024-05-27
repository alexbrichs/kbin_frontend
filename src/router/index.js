import {createRouter, createWebHistory} from 'vue-router'
import UserProfile from "../components/UserProfile.vue";

const routes = [
    {
        path: '/u/:username/',
        name: 'UserProfile',
        component: UserProfile,
        props: true
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router