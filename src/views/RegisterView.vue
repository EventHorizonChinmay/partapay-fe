<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-6" max-width="400">
      <v-card-title class="text-h6">Register</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="register">
          <v-text-field v-model="name" label="Full Name" required />
          <v-text-field v-model="email" label="Email" type="email" required />
          <v-text-field v-model="password" label="Password" type="password" required />
          <v-text-field
            v-model="confirmPassword"
            label="Confirm Password"
            type="password"
            required
          />
          <v-btn color="primary" block type="submit" class="mt-4">Register</v-btn>
        </v-form>
        <div class="text-caption mt-4">
          Already have an account?
          <RouterLink to="/login">Login</RouterLink>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { dancingLoginStore } from '@/stores/loginStore'
import { computed } from 'vue'
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const loginStore = dancingLoginStore()

function displayLoginDetails() {
  const data = loginStore.getLoginDetails
  console.log('Login Details:', data)

  console.log('Displaying login details...')
  console.log('Name:', name.value)
  console.log('Email:', email.value)
}

const register = () => {
  console.log('Registering:', name.value, email.value)
}
</script>
