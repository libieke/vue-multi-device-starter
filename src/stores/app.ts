import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const sidebarCollapsed = ref(false)
  const mobileMenuVisible = ref(false)
  const darkMode = ref(false)

  function toggleSidebar() { sidebarCollapsed.value = !sidebarCollapsed.value }
  function setMobileMenu(visible: boolean) { mobileMenuVisible.value = visible }
  function toggleTheme() {
    darkMode.value = !darkMode.value
    document.documentElement.classList.toggle('dark-theme', darkMode.value)
  }

  return { sidebarCollapsed, mobileMenuVisible, darkMode, toggleSidebar, setMobileMenu, toggleTheme }
})