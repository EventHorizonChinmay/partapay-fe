<template>
  <v-app-bar app color="primary" density="comfortable">
    <!-- Hamburger Menu Button for All Screen Sizes -->
    <v-app-bar-nav-icon
      @click="() => (loginStore.showSideNavList = !loginStore.showSideNavList)"
    ></v-app-bar-nav-icon>

    <v-app-bar-title class="text-h6 font-weight-bold"> PartaPay </v-app-bar-title>

    <v-spacer />

    <!-- Theme Toggle Switch -->
    <div class="d-flex align-center me-3">
      <v-icon class="me-2" color="white" size="20">
        {{ isDark ? 'mdi-weather-night' : 'mdi-weather-sunny' }}
      </v-icon>
      <v-switch
        v-model="isDark"
        @change="handleThemeToggle"
        color="amber"
        base-color="grey-lighten-2"
        hide-details
        density="compact"
        :true-icon="'mdi-weather-night'"
        :false-icon="'mdi-weather-sunny'"
        class="theme-switch"
      />
    </div>

    <!-- Notifications Button -->
    <v-btn icon variant="text" to="/notifications">
      <v-icon>mdi-bell-outline</v-icon>
    </v-btn>

    <!-- Profile Button -->
    <v-btn icon variant="text" to="/profile">
      <v-icon>mdi-account-circle-outline</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAppTheme } from '@/composables/useTheme'

import { useLoginStore } from '@/stores/loginStore'

const loginStore = useLoginStore()

const { toggleTheme, isDark, currentTheme } = useAppTheme()

// Define emits for drawer toggle
const emit = defineEmits(['toggle-drawer'])

const handleThemeToggle = () => {
  console.log('Theme toggle switch changed!')
  console.log('Current theme:', currentTheme.value)
  console.log('Is dark:', isDark.value)
}

const toggleDrawer = () => {
  emit('toggle-drawer')
}
</script>
