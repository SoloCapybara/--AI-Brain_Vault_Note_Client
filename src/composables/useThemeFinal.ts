import { ref, onMounted } from 'vue'

export function useThemeFinal() {
  const isDark = ref(false)
  
  const toggleTheme = () => {
    isDark.value = !isDark.value
    applyTheme()
    saveTheme()
  }
  
  const setTheme = (theme: 'light' | 'dark') => {
    isDark.value = theme === 'dark'
    applyTheme()
    saveTheme()
  }
  
  const applyTheme = () => {
    const body = document.body
    const root = document.documentElement
    
    if (isDark.value) {
      // 深色主题
      body.classList.add('dark')
      root.style.setProperty('--color-bg-primary', '#252a3a')
      root.style.setProperty('--color-bg-secondary', '#1a1d28')
      root.style.setProperty('--color-text-primary', '#e9ecef')
      root.style.setProperty('--color-text-secondary', '#a0a7b5')
      root.style.setProperty('--color-border', '#3a4152')
    } else {
      // 浅色主题
      body.classList.remove('dark')
      root.style.setProperty('--color-bg-primary', '#ffffff')
      root.style.setProperty('--color-bg-secondary', '#f5f7fb')
      root.style.setProperty('--color-text-primary', '#212529')
      root.style.setProperty('--color-text-secondary', '#6c757d')
      root.style.setProperty('--color-border', '#eaeaea')
    }
  }
  
  const saveTheme = () => {
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }
  
  const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      // 检测系统主题偏好
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  }
  
  // 初始化
  onMounted(() => {
    loadTheme()
  })
  
  return {
    isDark,
    toggleTheme,
    setTheme
  }
}
