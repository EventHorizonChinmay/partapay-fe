<template>
  <v-navigation-drawer app permanent>
    <v-list>
      <v-list-item-title class="text-h6">PartaPay</v-list-item-title>
      <v-divider class="my-2" />
      <v-list-item v-for="item in navItems" :key="item.title" :to="item.to" link>
        <v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const navItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/dashboard' },
  { title: 'Groups', icon: 'mdi-account-group', to: '/groups' },
  { title: 'Add Expense', icon: 'mdi-currency-usd', to: '/add-expense' },
  { title: 'Settle Up', icon: 'mdi-bank-transfer', to: '/settle-up' },
  { title: 'Analytics', icon: 'mdi-chart-box-outline', to: '/analytics' },
  { title: 'Notifications', icon: 'mdi-bell', to: '/notifications' },
  { title: 'Profile', icon: 'mdi-account', to: '/profile' },
]
</script>
