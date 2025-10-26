import { ref } from 'vue'

export function useThemeTailwind() {
  const isDark = ref(false)
  
  const toggleTheme = () => {
    isDark.value = !isDark.value
    updateTheme()
  }
  
  const setTheme = (theme: 'light' | 'dark') => {
    isDark.value = theme === 'dark'
    updateTheme()
  }
  
  const updateTheme = () => {
    const root = document.documentElement
    
    if (isDark.value) {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
  }
  
  return {
    isDark,
    toggleTheme,
    setTheme
  }
}
