<template>
    <div class="flex h-18 bg-gradient-to-r from-gray-800 to-gray-900 w-full">
        <router-link to="/" class="hover:bg-fuscia-700 text-white hover:text-white">
            <img src="../assets/DALL·E 2023-06-10 09.51.00 - a minimal logo for a fitness app with a dumbbell.png"
                alt="Fitness App Logo" class="max-w-[55px] h-auto">
        </router-link>

        <router-link to="/about" class="hover:bg-violet-700 text-white pt-3.5 px-5 hover:text-white">About</router-link>
        <router-link to="/bmi" class="hover:bg-violet-700 text-white pt-3.5 px-5 hover:text-white">BMI
            Calculator</router-link>
        <router-link to="/exercises"
            class="hover:bg-violet-700 text-white pt-3.5 px-5 hover:text-white">Exercises</router-link>
    </div>
</template>

<script>
export default {
    name: 'Nav'
};
</script>

<style scoped></style>