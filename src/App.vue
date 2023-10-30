<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LoginButton from './components/LoginButton.vue';
</script>

<template>
  <header class="flex flex-col justify-center md:flex-row">
    <div>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      <h1 class="text-brandGreen text-6xl font-bold text-center">Vue Focus</h1>
    </div>
    <div class="flex gap-6 justify-center mt-4 md:mt-0 md:justify-start items-start">
      <button class="btn btn-primary">
        <v-icon name="bi-bar-chart-steps" class="mr-2"></v-icon>
        <span>Reports</span>
      </button>
      <button class="btn btn-primary">
        <v-icon name="ri-settings-3-line" class="mr-2"></v-icon>
        <span>Settings</span></button>
      <LoginButton />
    </div>
  </header>

  <main class="grid place-items-center">
    <RouterView />
  </main>
</template>

<style scoped>
header {
  padding: 2rem;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
