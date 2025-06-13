import { useTheme } from 'vuetify'
import { computed, ref, watch } from 'vue'

export function useAppTheme() {
  const theme = useTheme()
  
  // Create a reactive reference for v-model binding
  const isDarkRef = ref(theme.global.current.value.dark)

  const toggleTheme = () => {
    console.log('Toggle theme clicked!') // Debug log
    const currentTheme = theme.global.name.value
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    theme.global.name.value = newTheme
    isDarkRef.value = newTheme === 'dark'
    console.log(`Theme changed from ${currentTheme} to ${newTheme}`) // Debug log
  }

  // Watch for external theme changes and sync isDarkRef
  watch(() => theme.global.current.value.dark, (newVal) => {
    isDarkRef.value = newVal
  })

  const isDark = computed({
    get: () => isDarkRef.value,
    set: (value) => {
      isDarkRef.value = value
      theme.global.name.value = value ? 'dark' : 'light'
    }
  })
  
  const currentTheme = computed(() => theme.global.name.value)

  return {
    toggleTheme,
    isDark,
    currentTheme,
    theme: theme.global
  }
}