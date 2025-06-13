<template>
  <div class="auth-container">
    <v-container fluid class="fill-height">
      <v-row justify="center" align="center" class="fill-height">
        <v-col cols="12" sm="8" md="6" lg="4" xl="3">
          <v-card class="auth-card" elevation="8">
            <!-- Header -->
            <v-card-title class="auth-header">
              <div class="text-center w-100">
                <v-icon size="48" :color="headerIcon.color" class="mb-2">
                  {{ headerIcon.name }}
                </v-icon>
                <h1 class="text-h4 font-weight-bold text-primary">{{ title }}</h1>
                <p class="text-subtitle-1 text-medium-emphasis mt-2">
                  {{ subtitle }}
                </p>
              </div>
            </v-card-title>

            <!-- Content Slot -->
            <v-card-text class="pa-6">
              <slot />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Loading Overlay -->
    <v-overlay :model-value="isLoading" class="align-center justify-center">
      <v-progress-circular
        color="primary"
        size="64"
        indeterminate
      />
    </v-overlay>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
  headerIcon: {
    name: string
    color: string
  }
  isLoading?: boolean
}

withDefaults(defineProps<Props>(), {
  isLoading: false
})
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-secondary)));
  position: relative;
}

.auth-card {
  border-radius: 16px !important;
  backdrop-filter: blur(10px);
  background: rgba(var(--v-theme-surface), 0.95) !important;
  animation: fadeInUp 0.6s ease-out;
}

.auth-header {
  padding: 32px 24px 16px 24px !important;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.12);
}

/* Dark mode styles */
.v-theme--dark .auth-container {
  background: linear-gradient(135deg, rgb(var(--v-theme-surface)), rgb(var(--v-theme-primary)));
}

.v-theme--dark .auth-card {
  background: rgba(var(--v-theme-surface), 0.98) !important;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
}

/* Responsive design */
@media (max-width: 600px) {
  .auth-card {
    margin: 16px;
    border-radius: 12px !important;
  }
  
  .auth-header {
    padding: 24px 16px 16px 16px !important;
  }
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>