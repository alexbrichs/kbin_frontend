import {createRouter, createWebHistory} from 'vue-router'
import HomePage from '../components/HomePage.vue'
import ShowDetallThread from "@/components/ShowDetallThread.vue";
import CercadorThreads from "@/components/CercadorThreads.vue";
import '/public/assets/css/app.910c0aab.css';
import '/public/assets/css/824.b4cc3385.css';
import LlistarMagazines from "@/components/LlistarMagazines.vue";

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
    },
    {
        path: '/cercador/:activeFilter/:activeOption/',
        name: 'CercadorThreads',
        component: CercadorThreads
    },
    {
        path: '/cercador/',
        name: 'CercadorThreads1',
        component: CercadorThreads
    },
    {
        path: '/magazines/',
        name: 'LlistarMagazines',
        component: LlistarMagazines
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router