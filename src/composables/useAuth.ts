import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

// Types
interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

interface RegisterForm {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

interface AuthErrors {
  email?: string
  password?: string
  confirmPassword?: string
  firstName?: string
  lastName?: string
  general?: string
}

// Validation rules (reusable across auth forms)
export const authValidationRules = {
  email: [
    (v: string) => !!v || 'Email is required',
    (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid'
  ],
  password: [
    (v: string) => !!v || 'Password is required',
    (v: string) => v.length >= 6 || 'Password must be at least 6 characters'
  ],
  confirmPassword: (password: string) => [
    (v: string) => !!v || 'Please confirm your password',
    (v: string) => v === password || 'Passwords do not match'
  ],
  firstName: [
    (v: string) => !!v || 'First name is required',
    (v: string) => v.length >= 2 || 'First name must be at least 2 characters'
  ],
  lastName: [
    (v: string) => !!v || 'Last name is required',
    (v: string) => v.length >= 2 || 'Last name must be at least 2 characters'
  ],
  required: (field: string) => [
    (v: string) => !!v || `${field} is required`
  ]
}

// Auth composable for shared functionality
export function useAuth() {
  const router = useRouter()
  const isLoading = ref(false)
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)

  // Generic error handling
  const errors = reactive<AuthErrors>({})

  const clearErrors = () => {
    Object.keys(errors).forEach(key => {
      delete errors[key as keyof AuthErrors]
    })
  }

  const setError = (field: keyof AuthErrors, message: string) => {
    errors[field] = message
  }

  // Toggle password visibility
  const togglePasswordVisibility = (field: 'password' | 'confirmPassword' = 'password') => {
    if (field === 'password') {
      showPassword.value = !showPassword.value
    } else {
      showConfirmPassword.value = !showConfirmPassword.value
    }
  }

  // Simulate API calls (replace with actual API integration)
  const simulateApiCall = (duration = 1500): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, duration)
    })
  }

  // Login handler
  const handleLogin = async (formData: LoginForm) => {
    isLoading.value = true
    clearErrors()

    try {
      await simulateApiCall()
      
      console.log('Login successful:', {
        email: formData.email,
        rememberMe: formData.rememberMe
      })

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      setError('general', 'Invalid email or password. Please try again.')
      console.error('Login error:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // Register handler
  const handleRegister = async (formData: RegisterForm) => {
    isLoading.value = true
    clearErrors()

    try {
      await simulateApiCall()
      
      console.log('Registration successful:', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email
      })

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      setError('general', 'Registration failed. Please try again.')
      console.error('Registration error:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // Social login handler
  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'apple') => {
    isLoading.value = true
    clearErrors()

    try {
      await simulateApiCall()
      console.log(`${provider} login successful`)
      router.push('/dashboard')
    } catch (error) {
      setError('general', `${provider} login failed. Please try again.`)
      console.error(`${provider} login error:`, error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // Forgot password handler
  const handleForgotPassword = async (email: string) => {
    isLoading.value = true
    clearErrors()

    try {
      await simulateApiCall(1000)
      console.log('Password reset email sent to:', email)
      // Show success message
    } catch (error) {
      setError('general', 'Failed to send reset email. Please try again.')
      console.error('Forgot password error:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  return {
    // State
    isLoading,
    showPassword,
    showConfirmPassword,
    errors,
    
    // Methods
    clearErrors,
    setError,
    togglePasswordVisibility,
    handleLogin,
    handleRegister,
    handleSocialLogin,
    handleForgotPassword
  }
}