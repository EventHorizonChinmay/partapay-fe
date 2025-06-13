<template>
  <AuthLayout
    title="Welcome Back"
    subtitle="Sign in to your PartaPay account"
    :header-icon="{ name: 'mdi-account-circle', color: 'primary' }"
    :is-loading="isLoading"
  >
    <v-form ref="formRef" v-model="isFormValid" @submit.prevent="handleSubmit">
      <!-- Email Field -->
      <v-text-field
        v-model="loginForm.email"
        label="Email Address"
        type="email"
        variant="outlined"
        prepend-inner-icon="mdi-email"
        :rules="authValidationRules.email"
        :error-messages="errors.email"
        class="mb-4"
        required
      />

      <!-- Password Field -->
      <v-text-field
        v-model="loginForm.password"
        :label="showPassword ? 'Password (Visible)' : 'Password'"
        :type="showPassword ? 'text' : 'password'"
        variant="outlined"
        prepend-inner-icon="mdi-lock"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="togglePasswordVisibility"
        :rules="authValidationRules.password"
        :error-messages="errors.password"
        class="mb-4"
        required
      />

      <!-- Remember Me & Forgot Password -->
      <div class="d-flex justify-space-between align-center mb-6">
        <v-checkbox
          v-model="loginForm.rememberMe"
          label="Remember me"
          color="primary"
          density="compact"
          hide-details
        />
        <v-btn
          variant="text"
          color="primary"
          size="small"
          @click="handleForgotPassword(loginForm.email)"
        >
          Forgot Password?
        </v-btn>
      </div>

      <!-- General Error Display -->
      <v-alert
        v-if="errors.general"
        type="error"
        variant="tonal"
        class="mb-4"
        closable
        @click:close="clearErrors"
      >
        {{ errors.general }}
      </v-alert>

      <!-- Login Button -->
      <v-btn
        type="submit"
        color="primary"
        size="large"
        block
        :loading="isLoading"
        :disabled="!isFormValid || isLoading"
        class="mb-4"
      >
        <v-icon start>mdi-login</v-icon>
        Sign In
      </v-btn>

      <!-- Divider -->
      <v-divider class="my-6">
        <span class="text-medium-emphasis px-4">OR</span>
      </v-divider>

      <!-- Social Login -->
      <v-btn
        variant="outlined"
        size="large"
        block
        class="mb-3"
        @click="handleSocialLogin('google')"
        :disabled="isLoading"
      >
        <v-icon start color="red">mdi-google</v-icon>
        Continue with Google
      </v-btn>

      <!-- Register Link -->
      <v-card-actions class="px-0 pt-4">
        <div class="text-center w-100">
          <span class="text-body-2 text-medium-emphasis">
            Don't have an account?
          </span>
          <v-btn
            variant="text"
            color="primary"
            to="/register"
            class="ml-1"
          >
            Create Account
          </v-btn>
        </div>
      </v-card-actions>
    </v-form>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuth, authValidationRules } from '@/composables/useAuth'
import AuthLayout from '@/components/AuthLayout.vue'

// Composables
const {
  isLoading,
  showPassword,
  errors,
  clearErrors,
  togglePasswordVisibility,
  handleLogin,
  handleSocialLogin,
  handleForgotPassword
} = useAuth()

// Form state
const formRef = ref()
const isFormValid = ref(false)

// Form data
const loginForm = reactive({
  email: '',
  password: '',
  rememberMe: false
})

// Form submission handler
const handleSubmit = async () => {
  if (!isFormValid.value) return
  
  try {
    await handleLogin(loginForm)
  } catch (error) {
    // Error is handled in the composable
  }
}
</script>
