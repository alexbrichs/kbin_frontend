import {createRouter, createWebHistory} from 'vue-router'
import HomePage from '../components/HomePage.vue'
import '/public/assets/css/app.910c0aab.css';
import '/public/assets/css/824.b4cc3385.css';

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router