<template>
  <v-container fluid class="pa-6">
    <!-- Page Header -->
    <div class="d-flex justify-space-between align-center mb-6 mt-6">
      <div>
        <h2 class="text-h4 font-weight-bold text-primary">Dashboard</h2>
        <p class="text-subtitle-1 text-medium-emphasis">Track your expenses and group finances</p>
      </div>
      <v-btn color="primary" size="large" prepend-icon="mdi-plus-circle">
        Add Expense
      </v-btn>
    </div>

    <!-- Summary Cards -->
    <v-row class="mb-6">
      <v-col v-for="stat in summaryStats" :key="stat.title" cols="12" sm="6" md="3">
        <v-card 
          :color="stat.color" 
          variant="tonal" 
          height="140"
          class="card-hover"
        >
          <v-card-text class="d-flex flex-column justify-space-between h-100">
            <div class="d-flex justify-space-between align-start">
              <div>
                <p class="text-caption text-medium-emphasis">{{ stat.title }}</p>
                <h3 class="text-h5 font-weight-bold">{{ stat.value }}</h3>
              </div>
              <v-icon :color="stat.color" size="32">{{ stat.icon }}</v-icon>
            </div>
            <div class="d-flex align-center">
              <v-icon 
                :color="stat.trend === 'up' ? 'success' : stat.trend === 'down' ? 'error' : 'warning'" 
                size="16"
              >
                {{ stat.trend === 'up' ? 'mdi-trending-up' : stat.trend === 'down' ? 'mdi-trending-down' : 'mdi-minus' }}
              </v-icon>
              <span class="text-caption ms-1">{{ stat.change }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <!-- Recent Expenses -->
      <v-col cols="12" lg="8">
        <v-card class="mb-6">
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Recent Expenses</span>
            <v-btn variant="text" size="small" to="/expenses">View All</v-btn>
          </v-card-title>
          <v-divider />
          
          <v-list lines="two">
            <v-list-item
              v-for="expense in recentExpenses"
              :key="expense.id"
              :prepend-avatar="expense.avatar"
              :title="expense.description"
              :subtitle="`${expense.group} • ${expense.date}`"
            >
              <template v-slot:append>
                <div class="text-right">
                  <div class="text-h6 font-weight-bold">₹{{ expense.amount }}</div>
                  <v-chip 
                    :color="expense.status === 'settled' ? 'success' : 'warning'" 
                    size="x-small"
                    variant="tonal"
                  >
                    {{ expense.status }}
                  </v-chip>
                </div>
              </template>
            </v-list-item>
          </v-list>

          <v-card-actions v-if="recentExpenses.length === 0">
            <v-alert type="info" variant="tonal" class="ma-4 flex-grow-1">
              <v-alert-title>No expenses yet</v-alert-title>
              Start by adding your first expense to track group spending.
            </v-alert>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Quick Actions & Groups -->
      <v-col cols="12" lg="4">
        <!-- Quick Actions -->
        <v-card class="mb-4">
          <v-card-title>Quick Actions</v-card-title>
          <v-card-text>
            <v-list density="compact">
              <v-list-item
                v-for="action in quickActions"
                :key="action.title"
                :prepend-icon="action.icon"
                :title="action.title"
                :subtitle="action.subtitle"
                :to="action.to"
                class="px-0"
              />
            </v-list>
          </v-card-text>
        </v-card>

        <!-- Active Groups -->
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Active Groups</span>
            <v-btn variant="text" size="small" to="/groups">View All</v-btn>
          </v-card-title>
          <v-divider />
          
          <v-list>
            <v-list-item
              v-for="group in activeGroups"
              :key="group.id"
              :title="group.name"
              :subtitle="`${group.members} members • ₹${group.totalExpenses} total`"
            >
              <template v-slot:prepend>
                <v-avatar :color="group.color" size="40">
                  <v-icon color="white">{{ group.icon }}</v-icon>
                </v-avatar>
              </template>
              <template v-slot:append>
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

          <v-card-actions v-if="activeGroups.length === 0">
            <v-alert type="info" variant="tonal" class="ma-4 flex-grow-1">
              <v-alert-title>No groups yet</v-alert-title>
              Create your first group to start splitting expenses.
              <template v-slot:append>
                <v-btn variant="tonal" size="small" to="/groups/create">
                  Create Group
                </v-btn>
              </template>
            </v-alert>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts Section -->
    <v-row class="mt-6">
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title>Monthly Spending</v-card-title>
          <div class="chart-placeholder">
            <v-icon size="64" color="grey-lighten-1">mdi-chart-line</v-icon>
            <p class="text-center text-grey-lighten-1 mt-2">Chart will be implemented</p>
          </div>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title>Expense Categories</v-card-title>
          <div class="chart-placeholder">
            <v-icon size="64" color="grey-lighten-1">mdi-chart-donut</v-icon>
            <p class="text-center text-grey-lighten-1 mt-2">Chart will be implemented</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAppTheme } from '@/composables/useTheme'

const { isDark } = useAppTheme()

// Sample data - replace with real API calls
const summaryStats = [
  {
    title: 'Total Expenses',
    value: '₹12,450',
    icon: 'mdi-currency-inr',
    color: 'primary',
    trend: 'up',
    change: '+12.5% from last month'
  },
  {
    title: 'You Owe',
    value: '₹2,340',
    icon: 'mdi-arrow-up-circle',
    color: 'error',
    trend: 'down',
    change: '-₹450 from last week'
  },
  {
    title: 'Owed to You',
    value: '₹3,780',
    icon: 'mdi-arrow-down-circle',
    color: 'success',
    trend: 'up',
    change: '+₹1,200 from last week'
  },
  {
    title: 'Active Groups',
    value: '5',
    icon: 'mdi-account-group',
    color: 'info',
    trend: 'neutral',
    change: 'No change'
  }
]

const recentExpenses = [
  {
    id: 1,
    description: 'Dinner at Pizza Place',
    group: 'Friends Trip',
    date: '2 hours ago',
    amount: '1,250',
    status: 'pending',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    id: 2,
    description: 'Uber ride to airport',
    group: 'Office Team',
    date: '1 day ago',
    amount: '480',
    status: 'settled',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    id: 3,
    description: 'Grocery shopping',
    group: 'Roommates',
    date: '2 days ago',
    amount: '2,150',
    status: 'pending',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
  }
]

const quickActions = [
  {
    title: 'Add Expense',
    subtitle: 'Record a new expense',
    icon: 'mdi-plus-circle',
    to: '/add-expense'
  },
  {
    title: 'Settle Up',
    subtitle: 'Pay back friends',
    icon: 'mdi-handshake',
    to: '/settle-up'
  },
  {
    title: 'Create Group',
    subtitle: 'Start a new group',
    icon: 'mdi-account-group-outline',
    to: '/groups/create'
  },
  {
    title: 'View Analytics',
    subtitle: 'See spending insights',
    icon: 'mdi-chart-line',
    to: '/analytics'
  }
]

const activeGroups = [
  {
    id: 1,
    name: 'Friends Trip',
    members: 4,
    totalExpenses: '8,450',
    balance: -1250,
    color: 'primary',
    icon: 'mdi-airplane'
  },
  {
    id: 2,
    name: 'Office Team',
    members: 8,
    totalExpenses: '15,320',
    balance: 850,
    color: 'success',
    icon: 'mdi-office-building'
  },
  {
    id: 3,
    name: 'Roommates',
    members: 3,
    totalExpenses: '12,780',
    balance: 0,
    color: 'info',
    icon: 'mdi-home'
  }
]
</script>

<style scoped>
.chart-placeholder {
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed rgba(var(--v-theme-on-surface), 0.12);
  border-radius: 8px;
  margin: 16px 0;
}

.card-hover:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
}
</style>