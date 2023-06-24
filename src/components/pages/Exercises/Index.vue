<template>
    <div class="flex justify-start m-4">
        <div class="bg-gray-900 text-gray-100 rounded p-4 max-w-[30rem] ">
            <div class="mt-4">
                Type
                <div class="flex flex-col mt-2">
                    <div v-for="exerciseType in exerciseTypes" :key="exerciseType" class="mb-2">
                        <label>
                            <input type="checkbox" v-model="selectedTypes" :value="exerciseType" @change="search">
                            {{ exerciseType }}
                        </label>
                    </div>
                </div>
            </div>

            <div class="mt-4">
                Body Part
                <div class="flex flex-col mt-2">
                    <div v-for="bodyPart in bodyParts" :key="bodyPart" class="mb-2">
                        <label>
                            <input type="checkbox" v-model="selectedBodyParts" :value="bodyPart" @change="search">
                            {{ bodyPart }}
                        </label>
                    </div>
                </div>
            </div>

            <div class="mt-4">
                Equipment Type
                <div class="flex flex-col mt-2">
                    <div v-for="equipmentType in equipmentTypes" :key="equipmentType" class="mb-2">
                        <label>
                            <input type="checkbox" v-model="selectedEquipmentTypes" :value="equipmentType" @change="search">
                            {{ equipmentType }}
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-gray-900 text-gray-100 rounded p-4  ml-4 w-full flex-grow">
            <input v-model="searchTerm" @input="search" class="p-2 rounded placeholder-white w-full"
                placeholder="Search exercises..." />

            <ul v-if="exercises" class="mt-4">
                <li v-for="exercise in exercises" :key="exercise.id">
                    <router-link :to="{ name: 'exerciseShow', params: { id: exercise.id } }">
                        <div class="flex items-center bg-gray-700 hover:bg-violet-700 text-gray-100 p-4 rounded mb-2">
                            <div><img :src="exerciseTypeImages[exercise.type]" alt="" class="w-12 h-12"></div>
                            <div class="flex-grow ml-4">
                                <div class="text-gray-100 font-bold">{{ exercise.title }}</div>
                            </div>
                            <div class="ml-auto text-right">
                                <div>{{ exercise.bodyPart }}</div>
                                <div>{{ exercise.level }}</div>
                                <div>{{ exercise.type }}</div>
                            </div>
                        </div>
                    </router-link>
                </li>

                <div class="flex justify-center mt-2">
                    <button v-if="nextPageUrl" @click="loadMore" :disabled="loading"
                        class="bg-gray-700 hover:bg-violet-700">Load
                        more</button>
                </div>
            </ul>
        </div>
    </div>
</template>




<script>
import axios from 'axios'
import cardioImage from '../../../assets/cardio.svg';
import strengthImage from '../../../assets/strength.svg';
import powerliftingImage from '../../../assets/powerlifting.svg';
import stretchImage from '../../../assets/stretch.svg';
import olympicImage from '../../../assets/olympic.svg';
import plyometricsImage from '../../../assets/plyometrics.svg';



export default {
    data() {
        return {
            exercises: null,
            searchTerm: '',
            exerciseTypes: ['Cardio', 'Strength', 'Powerlifting', 'Stretching', 'Plyometrics', 'Olympic Weightlifting'],
            selectedTypes: [],
            bodyParts: ['Abdominals', 'Abductors', 'Adductors', 'Biceps', 'Calves', 'Chest', 'Forearms', 'Glutes', 'Hamstrings', 'Lats', 'Lower Back', 'Middle Back', 'Neck', 'Quadriceps', 'Shoulders', 'Traps', 'Triceps'],
            selectedBodyParts: [],
            equipmentTypes: ['Bands', 'Barbell', 'Body Only', 'Cable', 'Dumbbell', 'E-Z Curl Bar', 'Exercise Ball', 'Foam Roll', 'Kettlebells', 'Machine', 'Medicine Ball', 'None', 'Other'],
            selectedEquipmentTypes: [],
            nextPageUrl: null,
            loading: false,
            exerciseTypeImages: {
                'Cardio': cardioImage,
                'Strength': strengthImage,
                'Powerlifting': powerliftingImage,
                'Stretching': stretchImage,
                'Plyometrics': plyometricsImage,
                'Olympic Weightlifting': olympicImage,
            }
        }
    },

    async created() {
        this.loading = true;
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/exercises");
            this.exercises = response.data.data;
            this.nextPageUrl = response.data.next_page_url;
        } catch (error) {
            console.error(error)
        }
        finally {
            this.loading = false;
        }
    },
    methods: {
        async search() {
            try {
                const types = this.selectedTypes.join(',');
                const bodyParts = this.selectedBodyParts.join(',');
                const equipmentTypes = this.selectedEquipmentTypes.join(',');
                const response = await axios.get(`http://127.0.0.1:8000/api/exercises/search?q=${this.searchTerm}&types=${types}&bodyParts=${bodyParts}&equipmentTypes=${equipmentTypes}`)
                this.exercises = response.data.data
            } catch (error) {
                console.error(error)
            }
        },
        async loadMore() {
            if (this.nextPageUrl) {
                this.loading = true;
                try {
                    const types = this.selectedTypes.join(',');
                    const bodyParts = this.selectedBodyParts.join(',');
                    const equipmentTypes = this.selectedEquipmentTypes.join(',');
                    const response = await axios.get(`${this.nextPageUrl}&q=${this.searchTerm}&types=${types}&bodyParts=${bodyParts}&equipmentTypes=${equipmentTypes}`);
                    this.exercises = [...this.exercises, ...response.data.data];
                    this.nextPageUrl = response.data.next_page_url;
                } catch (error) {
                    console.error(error)
                } finally {
                    this.loading = false;
                }
            }
        }
    }
}
</script>
