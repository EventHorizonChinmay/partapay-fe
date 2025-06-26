<template>
    <!-- Header -->
    <v-row align="center" class="mb-6">
      <v-col cols="12" md="6">
        <h2 class="text-h4 font-weight-bold text-primary">Your Groups</h2>
        <p class="text-subtitle-1 text-medium-emphasis">Manage and view all your expense groups</p>
      </v-col>

      <v-col cols="12" md="6" class="d-flex justify-end align-center flex-wrap gap-2">
        <!-- Toggle between list and grid -->
        <v-btn-toggle v-model="currentView" borderless dense divided>
          <v-btn value="grid" icon><v-icon>mdi-view-grid</v-icon></v-btn>
          <v-btn value="list" icon><v-icon>mdi-view-list</v-icon></v-btn>
        </v-btn-toggle>

        <!-- Create group -->
        <v-btn
          color="primary"
          size="large"
          prepend-icon="mdi-account-group-outline"
          to="/groups/create"
        >
          Create Group
        </v-btn>
      </v-col>
    </v-row>

  <v-container fluid class="pa-4 pa-sm-6">
    <!-- Grid View -->
    <v-row v-if="currentView === 'grid'">
      <v-col
        v-for="group in groups"
        :key="group.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="h-100 d-flex flex-column justify-space-between">
          <v-card-title class="d-flex flex-column flex-sm-row justify-space-between align-start align-sm-center">
            <div class="d-flex align-center">
              <v-avatar :color="group.color" size="40" class="me-3">
                <v-icon color="white">{{ group.icon }}</v-icon>
              </v-avatar>
              <div>
                <h3 class="text-subtitle-1 font-weight-bold">{{ group.name }}</h3>
                <p class="text-caption text-medium-emphasis">{{ group.members }} members</p>
              </div>
            </div>
            <v-chip
              :color="group.balance > 0 ? 'success' : group.balance < 0 ? 'error' : 'info'"
              size="small"
              variant="tonal"
            >
              {{ group.balance > 0 ? '+' : '' }}₹{{ Math.abs(group.balance) }}
            </v-chip>
          </v-card-title>

          <v-card-text class="text-medium-emphasis">
            <p>Total Expenses: <strong>₹{{ group.totalExpenses }}</strong></p>
            <p>Last Activity: {{ group.lastUpdated }}</p>
          </v-card-text>

          <v-card-actions class="d-flex justify-end">
            <v-btn variant="text" size="small" color="primary" :to="`/groups/${group.id}`">
              View
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- List View -->
    <v-card v-else class="mb-6">
      <v-list>
        <v-list-item
          v-for="group in groups"
          :key="group.id"
          :title="group.name"
          :subtitle="`${group.members} members • ₹${group.totalExpenses} • Last updated: ${group.lastUpdated}`"
          :to="`/groups/${group.id}`"
        >
          <template #prepend>
            <v-avatar :color="group.color" size="40">
              <v-icon color="white">{{ group.icon }}</v-icon>
            </v-avatar>
          </template>
          <template #append>
            <v-chip
              :color="group.balance > 0 ? 'success' : group.balance < 0 ? 'error' : 'info'"
              size="small"
              variant="tonal"
            >
              {{ group.balance > 0 ? '+' : '' }}₹{{ Math.abs(group.balance) }}
            </v-chip>
          </template>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- Empty State -->
    <v-alert
      v-if="groups.length === 0"
      type="info"
      variant="tonal"
      class="ma-4"
    >
      <v-alert-title>No Groups Found</v-alert-title>
      You haven't created any groups yet. Start by clicking "Create Group" above.
    </v-alert>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// View toggle: 'grid' or 'list'
const currentView = ref<'grid' | 'list'>('grid')

// Dummy data - replace with actual API data
const groups = [
  {
    id: 1,
    name: 'Friends Trip',
    members: 4,
    totalExpenses: '8450',
    balance: -1250,
    color: 'primary',
    icon: 'mdi-airplane',
    lastUpdated: '2 days ago'
  },
  {
    id: 2,
    name: 'Office Team',
    members: 8,
    totalExpenses: '15320',
    balance: 850,
    color: 'success',
    icon: 'mdi-office-building',
    lastUpdated: '3 hours ago'
  },
  {
    id: 3,
    name: 'Roommates',
    members: 3,
    totalExpenses: '12780',
    balance: 0,
    color: 'info',
    icon: 'mdi-home',
    lastUpdated: 'Yesterday'
  }
]
</script>
