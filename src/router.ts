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
    },
    {
        path: '/exercises',
        name: 'exercises',
        component: () => import('./components/pages/Exercises/Index.vue') // Lazy load component
    },
    {
        path: '/exercises/:title',
        name: 'exerciseShow',
        component: () => import('./components/pages/Exercises/Show.vue'),
        props: true,
    },
    {
        path: '/workout',
        name: 'workout',
        component: () => import('./components/pages/Workout/Index.vue'),
        props: true,
        children: [
            {
                path: '/add-exercise/:workoutId',
                name: 'addExercise',
                component: () => import('./components/pages/Workout/AddExercise.vue'),
                props: true,
            }
        ]
    },
    {
        path: '/create-workout',
        name: 'createWorkout', // This should match what you use in <router-link> or programmatic navigation
        component: () => import('./components/pages/Workout/Create.vue'),
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
