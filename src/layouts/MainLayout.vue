<template>
  <v-app>
    <NavigationDrawer />

    <div class="d-flex flex-column flex-grow-1">
      <TopBar />
      <v-main class="pa-4">
        <router-view />
      </v-main>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import NavigationDrawer from '@/components/NavigationDrawer.vue'
import TopBar from '@/components/TopBar.vue'
</script>

<style scoped>
.v-application {
  min-height: 100vh;
}
</style>
