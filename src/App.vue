<template>
  <v-app>
    <v-main>
      <v-sheet color="primary" height="64" class="d-flex align-center justify-center">
        <h1 class="text-h5 white--text">PartaPay</h1>
      </v-sheet>
    </v-main>
    <router-view />
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style>
/* Add global styles here if needed */
</style>
