<template>
    <div class="flex justify-center">
        <div class="flex flex-col justify-center bg-gray-900 min-w-2xl rounded-md text-lg text-white">
            <div class="flex flex-wrap">
                <div class="p-4">
                    {{ exercise.title }}
                </div>

                <div class="max-w-lg p-4">
                    {{ exercise.desc }}
                </div>

                <div class="p-4">
                    {{ exercise.bodyPart }}
                </div>

                <div class="p-4">
                    {{ exercise.equipment }}
                </div>

                <div class="p-4">
                    {{ exercise.level }}
                </div>

                <div class="p-4">
                    {{ exercise.rating }}
                </div>
            </div>

            <div class="p-4 flex justify-center my-4">
                <img src="" alt="" class="w-80 h-80 object-cover">
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    props: ['title'],
    data() {
        return {
            exercise: null,
        }
    },
    async created() {
        const encodedTitle = encodeURIComponent(this.title.replace(/\//g, "--slash--"));
        const response = await axios.get(`http://127.0.0.1:8000/api/exercises/show/${encodedTitle}`)
        console.log(response.data)
        this.exercise = response.data
    },
}
</script>
