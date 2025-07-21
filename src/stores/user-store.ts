import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { type User } from '@/interface/user-interface'

const USERPERPAGE = 6
const localStorageKey = 'random-user-data'

export const useUserStore = defineStore('users', () => {
  const allUsers = ref<User[]>([])
  const currentPage = ref(1)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const selectedGender = ref<'all' | 'male' | 'female'>('all')
  const selectedUser = ref<User | null>(null)

  const totalPages = computed(() => {
    return Math.ceil(allUsers.value.length / USERPERPAGE)
  })

  const paginatedUsers = computed(() => {
    const startIndex = (currentPage.value - 1) * USERPERPAGE
    const endIndex = startIndex + USERPERPAGE
    return allUsers.value.slice(startIndex, endIndex)
  })

  function selectUser(user: User) {
    selectedUser.value = user
  }

  function clearSelectedUser() {
    selectedUser.value = null
  }

  async function fetchUsersByGender(gender: 'all' | 'male' | 'female') {
    isLoading.value = true
    error.value = null
    selectedGender.value = gender

    let url = 'https://randomuser.me/api/?results=36'
    if (gender !== 'all') {
      url += `&gender=${gender}`
    }

    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Network response was not ok')
      const data = await response.json()
      allUsers.value = data.results
      localStorage.setItem(localStorageKey, JSON.stringify({ users: data.results, gender: gender }))
      currentPage.value = 1
    } catch (e) {
      console.error(e)
      error.value = 'Failed to fetch users. Please try again.'
      allUsers.value = []
    } finally {
      isLoading.value = false
    }
  }

  function fetchNewSet() {
    localStorage.clear()
    return fetchUsersByGender(selectedGender.value)
  }

  function initialize() {
    localStorage.clear()
    const cachedData = localStorage.getItem(localStorageKey)
    if (cachedData) {
      const { users, gender } = JSON.parse(cachedData)
      allUsers.value = users
      selectedGender.value = gender
    } else {
      fetchUsersByGender('all')
    }
  }

  function nextPage() {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  function prevPage() {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  return {
    currentPage,
    isLoading,
    error,
    selectedGender,
    selectedUser,
    totalPages,
    paginatedUsers,
    nextPage,
    prevPage,
    fetchNewSet,
    fetchUsersByGender,
    initialize,
    selectUser,
    clearSelectedUser,
  }
})
