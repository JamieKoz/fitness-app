import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./components/pages/Home.vue') // Lazy load component
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('./components/pages/About.vue') // Lazy load component
    },
    {
        path: '/bmi',
        name: 'bmi-calculator',
        component: () => import('./components/pages/BMI.vue') // Lazy load component
    }
    // Add other routes as needed
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
