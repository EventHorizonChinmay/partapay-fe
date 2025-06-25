import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useLoginStore = defineStore('login', () => {
  // States
  const loginDetails = ref(null)
  const userIndex = ref(0)

  const showSideNavList = ref(false)


  const getLoginDetails = computed(() => {
    return [loginDetails.value, userIndex.value]
  })


  const setLoginDetails = (details) => {
    loginDetails.value = details
    userIndex.value = details ? details.userIndex : 0
  }

  // Function to fetch login details
  const fetchLoginDetails = async () => {
    try {
      const response = await fetch('/api/login-details') // Adjust the API endpoint as needed
      if (!response.ok) {
        throw new Error('Failed to fetch login details')
      }
      loginDetails.value = await response.json()
    } catch (error) {
      console.error('Error fetching login details:', error)
    }
  }

  return {
    loginDetails,
    fetchLoginDetails,
    showSideNavList,
    getLoginDetails,
    userIndex,
    setLoginDetails,
  }
}
)