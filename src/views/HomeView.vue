<template>
  <v-container fluid>
    <v-row align="center" justify="center" class="text-center my-12">
      <v-col cols="12" md="8">
        <h1 class="text-h3 font-weight-bold mb-4">Welcome to PartaPay</h1>
        <p class="text-subtitle-1 mb-6">
          Easily track group expenses, split bills, and settle balances with friends, family, or teammates.
        </p>
        <v-btn color="primary" class="ma-2" to="/groups">
          Get Started
        </v-btn>
        <v-btn variant="outlined" color="secondary" class="ma-2" to="/analytics">
          View Analytics
        </v-btn>
      </v-col>
    </v-row>

    <v-row justify="center" class="text-center">
      <v-col cols="12" md="4">
        <v-icon size="48" color="primary">mdi-account-group</v-icon>
        <h3 class="text-h6 mt-2">Create & Manage Groups</h3>
        <p>Organize expenses for trips, roommates, teams, or family events.</p>
      </v-col>
      <v-col cols="12" md="4">
        <v-icon size="48" color="success">mdi-currency-usd</v-icon>
        <h3 class="text-h6 mt-2">Track & Split Expenses</h3>
        <p>Split costs fairly: equally, by percentage, or custom amounts.</p>
      </v-col>
      <v-col cols="12" md="4">
        <v-icon size="48" color="error">mdi-bank-transfer</v-icon>
        <h3 class="text-h6 mt-2">Settle Up with Ease</h3>
        <p>View balances and send payment reminders or confirmations.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
</script>
