import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./components/Home.vue') // Lazy load component
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('./components/About.vue') // Lazy load component
    }
    // Add other routes as needed
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
