<template>
    <nav class="bg-gradient-to-r from-gray-800 to-gray-900 w-full">
        <!-- Mobile menu button -->
        <div class="md:hidden flex justify-between items-center p-4">
            <router-link to="/" class="flex items-center">
                <img src="../assets/DALL·E 2023-06-10 09.51.00 - a minimal logo for a fitness app with a dumbbell.png"
                    alt="Fitness App Logo" class="w-10 h-auto">
            </router-link>
            <button @click="toggleMobileMenu" class="text-white focus:outline-none">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>

        <!-- Desktop menu -->
        <div class="hidden md:flex items-center h-18">
            <router-link to="/" class="hover:bg-violet-700 text-white hover:text-white p-4">
                <img src="../assets/DALL·E 2023-06-10 09.51.00 - a minimal logo for a fitness app with a dumbbell.png"
                    alt="Fitness App Logo" class="max-w-[55px] h-auto">
            </router-link>
            <router-link to="/bmi" class="hover:bg-violet-700 text-white px-5 py-4 hover:text-white transition-colors duration-200">
                BMI Calculator
            </router-link>
            <router-link to="/exercises" class="hover:bg-violet-700 text-white px-5 py-4 hover:text-white transition-colors duration-200">
                Exercises
            </router-link>
            <router-link to="/workout" class="hover:bg-violet-700 text-white px-5 py-4 hover:text-white transition-colors duration-200">
                Workout
            </router-link>
        </div>

        <!-- Mobile menu -->
        <div v-if="mobileMenuOpen" class="md:hidden bg-gray-800">
            <router-link 
                to="/bmi" 
                class="block hover:bg-violet-700 text-white px-4 py-3 border-t border-gray-700 transition-colors duration-200"
                @click="closeMobileMenu">
                BMI Calculator
            </router-link>
            <router-link 
                to="/exercises" 
                class="block hover:bg-violet-700 text-white px-4 py-3 border-t border-gray-700 transition-colors duration-200"
                @click="closeMobileMenu">
                Exercises
            </router-link>
            <router-link 
                to="/workout" 
                class="block hover:bg-violet-700 text-white px-4 py-3 border-t border-gray-700 transition-colors duration-200"
                @click="closeMobileMenu">
                Workout
            </router-link>
        </div>
    </nav>
</template>
<script>
export default {
    name: 'Nav',
    data() {
        return {
            mobileMenuOpen: false
        }
    },
    methods: {
        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
        },
        closeMobileMenu() {
            this.mobileMenuOpen = false;
        }
    },
    mounted() {
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.$el.contains(e.target)) {
                this.mobileMenuOpen = false;
            }
        });
    }
}
</script>
