<template>
  <div class="container">
    <h1>Create New Workout</h1>
    <div class="flex flex-col gap-y-5 w-full">
      <div>
        <label for="title">Workout Title:</label>
        <input id="title" v-model="workout.title" type="text" class="p-2 w-full text-gray-500 focus:outline-none" required>
      </div>

      <div>Time Spent: {{ formatTime(timeSpent) }}</div>

      <div v-for="(exercise, exerciseIndex) in exercises" :key="exerciseIndex" class="pb-4 mb-4">
        <div class="flex flex-col md:w-1/3">
          <label for="exercise-name" class="mb-1 text-sm">Exercise</label>
          <select v-model="exercise.exerciseId" class="p-2 w-full text-gray-500 focus:outline-none" required>
            <option disabled value="">Please select one</option>
            <option v-for="exercise in exerciseList" :value="exercise.id" :key="exercise.id">{{ exercise.title }}</option>
          </select>
        </div>

        <!-- Labels for set details -->
        <div class="flex gap-x-2 mt-4 font-bold">
          <div class="w-12 text-center">Set</div>
          <div class="flex-1 text-center">Weight (kg)</div>
          <div class="flex-1 text-center">Reps</div>
          <div class="flex-1 text-center">Completed</div>
          <div class="w-20">Remove</div>
        </div>

        <!-- Iterating over sets -->
        <div v-for="(set, setIndex) in exercise.sets" :key="setIndex" class="flex gap-x-2 mt-2 items-center">
          <div class="w-12 text-center">{{ setIndex + 1 }}</div>
          <div class="flex-1"><input type="number" v-model="set.weight" class="p-2 w-full text-gray-500 focus:outline-none" required></div>
          <div class="flex-1"><input type="number" v-model="set.reps" class="p-2 w-full text-gray-500 focus:outline-none" required></div>
          <div class="flex-1 text-center">
            <input type="checkbox" v-model="set.isCompleted" class="p-2 text-gray-500 focus:outline-none" required>
          </div>
          <div class="w-20">
            <button @click="deleteSet(exerciseIndex, setIndex)" class="bg-transparent">
              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="20px" height="20px"><path d="M 42 5 L 32 5 L 32 3 C 32 1.347656 30.652344 0 29 0 L 21 0 C 19.347656 0 18 1.347656 18 3 L 18 5 L 8 5 C 7.449219 5 7 5.449219 7 6 C 7 6.550781 7.449219 7 8 7 L 9.085938 7 L 12.695313 47.515625 C 12.820313 48.90625 14.003906 50 15.390625 50 L 34.605469 50 C 35.992188 50 37.175781 48.90625 37.300781 47.515625 L 40.914063 7 L 42 7 C 42.554688 7 43 6.550781 43 6 C 43 5.449219 42.554688 5 42 5 Z M 20 44 C 20 44.554688 19.550781 45 19 45 C 18.449219 45 18 44.554688 18 44 L 18 11 C 18 10.449219 18.449219 10 19 10 C 19.550781 10 20 10.449219 20 11 Z M 20 3 C 20 2.449219 20.449219 2 21 2 L 29 2 C 29.550781 2 30 2.449219 30 3 L 30 5 L 20 5 Z M 26 44 C 26 44.554688 25.550781 45 25 45 C 24.449219 45 24 44.554688 24 44 L 24 11 C 24 10.449219 24.449219 10 25 10 C 25.550781 10 26 10.449219 26 11 Z M 32 44 C 32 44.554688 31.554688 45 31 45 C 30.445313 45 30 44.554688 30 44 L 30 11 C 30 10.449219 30.445313 10 31 10 C 31.554688 10 32 10.449219 32 11 Z"/></svg>
            </button>
          </div>
        </div>

        <button @click="addSet(exerciseIndex)" class="mt-2">Add Set</button>
      </div>

      <button @click="addExercise" class="py-2 px-6 rounded-sm">Add Exercise</button>
      <button @click="submitWorkout" class="mt-4">Create Workout</button>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  components: {
    TrashIcon,
  },
  data() {
    return {
      workout: {
        title: '',
        time_spent: 0,
      },
      timeSpent: 0,
      timerId: null,
      exerciseList: [],
      exercises: [{
        exerciseId: '',
        sets: [{ reps: '', weight: '', isCompleted: false}],
      }],
    };
  },
  methods: {
    addExercise() {
      this.exercises.push({ exerciseId: '', sets: [{ reps: '', weight: '', isCompleted: false}] });
    },

    addSet(exerciseIndex) {
      this.exercises[exerciseIndex].sets.push({ reps: '', weight: '', isCompleted: ''})
    },

    deleteExercise(index) {
      this.exercises.splice(index, 1);
    },

    async submitWorkout() {
      try {
        const workoutData = { ...this.workout, exercises: this.exercises };
        const response = await axios.post('/api/workout', workoutData);
        this.stopTimer();
        this.workout.time_spent = Math.ceil(this.timeSpent / 60);
      } catch (error) {
        console.error('Error submitting workout:', error);
      }
    },

    async getExerciseList() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/exercises');
        this.exerciseList = response.data.data;
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    },

    startTimer() {
        this.timerId = setInterval(() => {
            this.timeSpent += 1;
        }, 1000);
    },

    stopTimer() {
        clearInterval(this.timerId);
        this.timerId = null;
    },

    formatTime(time){
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;
      return [hours, minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":");
    }
  },

  created() {
    this.getExerciseList();
  },

  mounted() {
      this.startTimer();
  }
}
</script>

