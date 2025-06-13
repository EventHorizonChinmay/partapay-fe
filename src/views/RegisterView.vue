<template>
  <AuthLayout
    title="Create Account"
    subtitle="Join PartaPay and start splitting expenses"
    :header-icon="{ name: 'mdi-account-plus', color: 'success' }"
    :is-loading="isLoading"
  >
    <v-form ref="formRef" v-model="isFormValid" @submit.prevent="handleSubmit">
      <!-- Name Fields Row -->
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="registerForm.firstName"
            label="First Name"
            variant="outlined"
            prepend-inner-icon="mdi-account"
            :rules="authValidationRules.firstName"
            :error-messages="errors.firstName"
            class="mb-4"
            required
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="registerForm.lastName"
            label="Last Name"
            variant="outlined"
            :rules="authValidationRules.lastName"
            :error-messages="errors.lastName"
            class="mb-4"
            required
          />
        </v-col>
      </v-row>

      <!-- Email Field -->
      <v-text-field
        v-model="registerForm.email"
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
        v-model="registerForm.password"
        :label="showPassword ? 'Password (Visible)' : 'Password'"
        :type="showPassword ? 'text' : 'password'"
        variant="outlined"
        prepend-inner-icon="mdi-lock"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="() => togglePasswordVisibility('password')"
        :rules="authValidationRules.password"
        :error-messages="errors.password"
        class="mb-4"
        required
      />

      <!-- Confirm Password Field -->
      <v-text-field
        v-model="registerForm.confirmPassword"
        :label="showConfirmPassword ? 'Confirm Password (Visible)' : 'Confirm Password'"
        :type="showConfirmPassword ? 'text' : 'password'"
        variant="outlined"
        prepend-inner-icon="mdi-lock-check"
        :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="() => togglePasswordVisibility('confirmPassword')"
        :rules="authValidationRules.confirmPassword(registerForm.password)"
        :error-messages="errors.confirmPassword"
        class="mb-4"
        required
      />

      <!-- Terms Acceptance -->
      <v-checkbox
        v-model="registerForm.acceptTerms"
        color="success"
        :rules="[(v) => !!v || 'You must accept the terms and conditions']"
        class="mb-4"
      >
        <template v-slot:label>
          <span class="text-body-2">
            I agree to the
            <v-btn variant="text" size="small" color="success" class="pa-0">
              Terms of Service
            </v-btn>
            and
            <v-btn variant="text" size="small" color="success" class="pa-0">
              Privacy Policy
            </v-btn>
          </span>
        </template>
      </v-checkbox>

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

      <!-- Register Button -->
      <v-btn
        type="submit"
        color="success"
        size="large"
        block
        :loading="isLoading"
        :disabled="!isFormValid || isLoading"
        class="mb-4"
      >
        <v-icon start>mdi-account-plus</v-icon>
        Create Account
      </v-btn>

      <!-- Divider -->
      <v-divider class="my-6">
        <span class="text-medium-emphasis px-4">OR</span>
      </v-divider>

      <!-- Social Registration -->
      <v-btn
        variant="outlined"
        size="large"
        block
        class="mb-3"
        @click="handleSocialLogin('google')"
        :disabled="isLoading"
      >
        <v-icon start color="red">mdi-google</v-icon>
        Sign up with Google
      </v-btn>

      <!-- Login Link -->
      <v-card-actions class="px-0 pt-4">
        <div class="text-center w-100">
          <span class="text-body-2 text-medium-emphasis">
            Already have an account?
          </span>
          <v-btn
            variant="text"
            color="primary"
            to="/login"
            class="ml-1"
          >
            Sign In
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
  showConfirmPassword,
  errors,
  clearErrors,
  togglePasswordVisibility,
  handleRegister,
  handleSocialLogin
} = useAuth()

// Form state
const formRef = ref()
const isFormValid = ref(false)

// Form data
const registerForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
})

// Form submission handler
const handleSubmit = async () => {
  if (!isFormValid.value) return
  
  try {
    await handleRegister(registerForm)
  } catch (error) {
    // Error is handled in the composable
  }
}
</script>
