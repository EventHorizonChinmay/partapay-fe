<template>
  <v-app>
    <!-- Navigation Drawer -->

    <!-- Main Content Area -->
    <v-main>
      <!-- Top App Bar -->
      <TopBar @toggle-drawer="toggleDrawer" />
      <div class="mt-8">
        <NavigationDrawer />
      </div>

      <!-- Page Content with proper spacing -->
      <div class="content-wrapper">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// vue related imports
import { ref } from 'vue'

//Stores
import { useLoginStore } from '@/stores/loginStore'

//COmponents
import NavigationDrawer from '@/components/NavigationDrawer.vue'
import TopBar from '@/components/TopBar.vue'

const loginStore = useLoginStore()

const drawerRef = ref(loginStore.showSideNavList)

const toggleDrawer = () => {
  if (drawerRef.value) {
    loginStore.showSideNavList = !loginStore.showSideNavList
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
