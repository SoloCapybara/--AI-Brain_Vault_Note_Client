import { ref, onMounted } from 'vue'

export function useThemeFinal() {
  const isDark = ref(false) // 强制从浅色模式开始
  
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
    
    if (isDark.value) {
      // 深色主题
      body.classList.add('dark')
    } else {
      // 浅色主题
      body.classList.remove('dark')
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
      // 默认使用浅色模式
      isDark.value = false
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
