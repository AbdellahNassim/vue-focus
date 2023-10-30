<script setup lang="ts">
import { ref } from 'vue'
const isLoggedIn = ref(true)
function logout() {
    isLoggedIn.value = false
}
function login() {
    isLoggedIn.value = true
}
</script>
<template>
    <button v-if="isLoggedIn" class="btn btn-danger" @click="logout">
        <v-icon name="md-logout" class="mr-2"></v-icon>
        Logout</button>
    <button v-else class="btn btn-primary" @click="login">
        <v-icon name="md-login-outlined" class="mr-2"></v-icon>
        Login</button>
</template>


<style scoped></style>