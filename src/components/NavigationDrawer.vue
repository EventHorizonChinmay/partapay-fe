<template>
  <v-navigation-drawer 
    v-model="drawer"
    :permanent="$vuetify.display.lgAndUp"
    :temporary="$vuetify.display.mdAndDown"
    :rail="$vuetify.display.lgAndUp && !drawer"
    :rail-width="72"
    width="280"
    location="left"
    class="drawer-below-appbar"
  >
    <!-- User Profile - Show avatar only in rail mode -->
    <v-list>
      <v-list-item
        v-if="!drawer"
        class="text-center pa-2"
      >
        <v-avatar size="40">
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-avatar>
      </v-list-item>
      
      <v-list-item
        v-else
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        title="John Doe"
        subtitle="john@example.com"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <!-- Navigation Menu Items -->
    <v-list density="compact" nav>
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="drawer ? item.title : undefined"
        color="primary"
        class="mb-1"
        @click="handleMenuItemClick"
      >
        <!-- Tooltip for rail mode -->
        <v-tooltip 
          v-if="!drawer"
          activator="parent" 
          location="end"
        >
          {{ item.title }}
        </v-tooltip>
      </v-list-item>
    </v-list>

    <!-- Theme Status at bottom -->
    <template v-slot:append>
      <div class="pa-2">
        <v-chip 
          v-if="drawer"
          :color="isDark ? 'purple' : 'amber'" 
          size="small"
          :prepend-icon="isDark ? 'mdi-weather-night' : 'mdi-weather-sunny'"
        >
          {{ isDark ? 'Dark' : 'Light' }} Mode
        </v-chip>
        
        <!-- Icon only for rail mode -->
        <div v-else class="text-center">
          <v-icon 
            :color="isDark ? 'purple' : 'amber'" 
            size="20"
          >
            {{ isDark ? 'mdi-weather-night' : 'mdi-weather-sunny' }}
          </v-icon>
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useAppTheme } from '@/composables/useTheme'
import { ref, watch } from 'vue'
import { useDisplay } from 'vuetify'

const { isDark } = useAppTheme()
const { mobile } = useDisplay()

// Make drawer reactive - closed on mobile, rail mode on desktop
const drawer = ref(false)

// Debug: Watch drawer state
watch(drawer, (newVal) => {
  console.log('Drawer state changed:', newVal ? 'Open (Full)' : 'Closed (Rail Mode)')
})

const handleMenuItemClick = () => {
  // Close drawer on mobile when navigation item is clicked
  if (mobile.value) {
    drawer.value = false
    console.log('Mobile navigation: Drawer closed after menu item click')
  }
}

const menuItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/dashboard' },
  { title: 'Groups', icon: 'mdi-account-group', to: '/groups' },
  { title: 'Add Expense', icon: 'mdi-plus-circle', to: '/add-expense' },
  { title: 'Settle Up', icon: 'mdi-handshake', to: '/settle-up' },
  { title: 'Analytics', icon: 'mdi-chart-line', to: '/analytics' },
  { title: 'Profile', icon: 'mdi-account', to: '/profile' },
  { title: 'Notifications', icon: 'mdi-bell', to: '/notifications' },
]

// Expose drawer for parent components to control
defineExpose({
  drawer
})
</script>

<style scoped>
.drawer-below-appbar {
  top: 64px !important; /* Position below the app bar */
  height: calc(100vh - 64px) !important; 
}
</style>
