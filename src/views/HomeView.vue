<template>
  <v-container fluid class="pa-6">
    <!-- Welcome Section -->
    <v-row>
      <v-col cols="12">
        <v-card color="surface" class="pa-6 mt-7 card-hover" elevation="2">
          <v-card-title class="text-h4 text-gradient">
            Welcome to PartaPay
          </v-card-title>
          <v-card-subtitle class="text-on-surface">
            Manage your group expenses effortlessly
          </v-card-subtitle>
          
       
        </v-card>
      </v-col>
    </v-row>

    <!-- Feature Cards -->
    <v-row class="mt-4">
      <v-col v-for="feature in features" :key="feature.title" cols="12" md="4">
        <v-card 
          :color="feature.color" 
          class="card-hover" 
          height="200"
          variant="tonal"
        >
          <v-card-text class="d-flex flex-column align-center justify-center h-100">
            <v-icon size="48" class="mb-4">{{ feature.icon }}</v-icon>
            <h3 class="text-center">{{ feature.title }}</h3>
            <p class="text-center text-caption mt-2">{{ feature.description }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Action Buttons -->
    <v-row class="mt-6">
      <v-col cols="12" class="d-flex justify-center gap-4">
        <v-btn 
          color="primary" 
          size="large" 
          prepend-icon="mdi-plus-circle"
          to="/add-expense"
        >
          Add Expense
        </v-btn>
        <v-btn 
          color="secondary" 
          variant="outlined" 
          size="large"
          prepend-icon="mdi-account-group"
          to="/groups"
        >
          View Groups
        </v-btn>
        <v-btn 
          color="success" 
          variant="tonal" 
          size="large"
          prepend-icon="mdi-handshake"
          to="/settle-up"
        >
          Settle Up
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAppTheme } from '@/composables/useTheme'

const { isDark, toggleTheme, currentTheme } = useAppTheme()

const features = [
  {
    title: 'Track Expenses',
    description: 'Keep track of all group expenses easily',
    icon: 'mdi-receipt',
    color: 'primary'
  },
  {
    title: 'Split Bills',
    description: 'Automatically calculate who owes what',
    icon: 'mdi-calculator',
    color: 'success'
  },
  {
    title: 'Settle Debts',
    description: 'Simplified debt settlement process',
    icon: 'mdi-handshake',
    color: 'info'
  }
]
</script>

<style scoped>
.gap-4 {
  gap: 1rem;
}
</style>
