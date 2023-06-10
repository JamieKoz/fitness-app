<template>
  <div class="container mx-auto bg-gradient-to-r from-violet-600 to-fuchsia-600">
    <div class="sticky top-0 z-50">
      <Nav></Nav>
    </div>
    <div class="">
      <router-view />

    </div>
    <Footer class=""></Footer>
  </div>
</template>

<script setup lang="ts">
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'

</script>



<style scoped></style>
