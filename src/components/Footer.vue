<template>
    <div class="py-24 bg-gradient-to-r from-gray-800 to-gray-900">

        <div class="container flex justify-center">
            <img src="../assets/DALL·E 2023-06-10 09.51.00 - a minimal logo for a fitness app with a dumbbell.png"
                alt="Fitness App Logo" class="max-w-[100px] h-auto">

            <div class="w-72 text-center">
                <ul class="flex flex-col items-center space-y-2">
                    <li><a href="#" class="text-white hover:text-violet-700">Contact us</a></li>
                    <li><a href="#" class="text-white hover:text-violet-700">Contact us</a></li>
                    <li><a href="#" class="text-white hover:text-violet-700">Contact us</a></li>
                </ul>
            </div>
            <div class="w-72 text-center">
                <ul class="flex flex-col items-center space-y-2">
                    <li><a href="#" class="text-white hover:text-violet-700">Contact us</a></li>
                    <li><a href="#" class="text-white hover:text-violet-700">Contact us</a></li>
                    <li><a href="#" class="text-white hover:text-violet-700">Contact us</a></li>
                </ul>
            </div>
        </div>
        <div class="pt-24 text-center">
            Copyright © {{ currentYear }} Fitness Tracker Ltd. All Rights Reserved
        </div>
    </div>
</template>


<script>

export default {
    data() {
        return {
            currentYear: new Date().getFullYear()
        }
    }
}
</script>