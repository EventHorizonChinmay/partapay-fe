<template>
  <v-app>
    <!-- Navigation Drawer -->
    
    <!-- Main Content Area -->
    <v-main>
      <!-- Top App Bar -->
      <TopBar @toggle-drawer="toggleDrawer" />
      <div class="mt-8">

        <NavigationDrawer ref="drawerRef" />
      </div>
      
      <!-- Page Content with proper spacing -->
      <div class="content-wrapper">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavigationDrawer from '@/components/NavigationDrawer.vue'
import TopBar from '@/components/TopBar.vue'

const drawerRef = ref(null)

const toggleDrawer = () => {
  if (drawerRef.value) {
    drawerRef.value.drawer = !drawerRef.value.drawer
  }
}
</script>

<style scoped>
.content-wrapper {
  padding: 0;
  min-height: calc(100vh - 64px); /* Subtract app bar height */
}
</style>

<style scoped>
.v-application {
  min-height: 100vh;
}
</style>
