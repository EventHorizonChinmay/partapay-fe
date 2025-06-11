<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-6" max-width="400">
      <v-card-title class="text-h6">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field v-model="email" label="Email" type="email" required />
          <v-text-field v-model="password" label="Password" type="password" required />
          <v-btn color="primary" block type="submit" class="mt-4">Login</v-btn>
        </v-form>
        <div class="text-caption mt-4">
          Don't have an account?
          <RouterLink to="/register">Register</RouterLink>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { dancingLoginStore } from '@/stores/loginStore'

const email = ref('')
const password = ref('')

const loginStore = dancingLoginStore()

const login = () => {
  console.log('Logging in with:', email.value, password.value)
}

function saveLoginDetails(data: { email: string; password: string }) {
  console.log('Saving login details:', data)
  loginStore.setLoginDetails(data)
}
</script>

<style scoped lang="css">
.v-container {
  max-width: 400px;
}
.v-card {
  width: 100%;
}
</style>
