<script setup>
import Header from './components/Header.vue'
import MainMenu from './components/MainMenu.vue'
</script>

<template>
  <Header />

  <main>
    <router-view />
  </main>
</template>

<style>
  main {
    min-width: 100vw;
    height: 95vh;
    padding: 2rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>