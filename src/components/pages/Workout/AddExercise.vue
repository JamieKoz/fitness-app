<template>
  
</template>

<script>
export default {
  props: ['workoutId'],
  data() {
    return {
      newExercise: {
        name: '',
        sets: [{ reps: 0 }],
      },
      exercises: [],
    };
  },
  methods: {
    addSet() {
      this.newExercise.sets.push({ reps: 0 });
    },
    addExercise() {
      this.exercises.push({...this.newExercise});
      // Reset form for next exercise
      this.newExercise = { name: '', sets: [{ reps: 0 }] };
      // Optionally, send the new exercise to the server here
    },
  },
};
</script>
