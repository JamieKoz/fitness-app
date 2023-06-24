<template>
  <div class="container mx-auto bg-gradient-to-r from-gray-800 to-gray-900 min-h-screen">
    <div class="sticky top-0 z-50">
      <Nav></Nav>
    </div>
    <router-view />

    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'

</script>



<style scoped></style>
