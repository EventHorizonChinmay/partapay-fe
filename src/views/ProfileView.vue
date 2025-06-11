<template>
  <v-container>
    <v-card class="mx-auto" max-width="600" outlined>
      <v-card-title>User Profile</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4" class="d-flex justify-center">
            <v-avatar size="120">
              <img src="https://avatars.githubusercontent.com/u/placeholder" alt="User Avatar" />
            </v-avatar>
          </v-col>
          <ProfileImageCard class="d-flex align-center" />
          <v-col cols="12" md="8">
            <v-text-field v-model="name" label="Name" />
            <v-text-field v-model="email" label="Email" />
            <v-btn color="primary" class="mt-2" @click="saveProfile">Save Changes</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const name = ref('John Doe')
const email = ref('johndoe@example.com')

const saveProfile = () => {
  console.log('Saved:', name.value, email.value)
}
</script>
