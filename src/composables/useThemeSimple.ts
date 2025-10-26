import { ref, watch } from 'vue'

export function useThemeSimple() {
  const currentTheme = ref<'light' | 'dark'>('light')
  
  // 切换主题
  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
    applyTheme()
  }
  
  // 设置主题
  const setTheme = (theme: 'light' | 'dark') => {
    currentTheme.value = theme
    applyTheme()
  }
  
  // 应用主题
  const applyTheme = () => {
    const root = document.documentElement
    
    if (currentTheme.value === 'dark') {
      root.style.setProperty('--bg-primary', '#000000')
      root.style.setProperty('--bg-secondary', '#1a1a1a')
      root.style.setProperty('--text-primary', '#ffffff')
      root.style.setProperty('--text-secondary', '#9ca3af')
    } else {
      root.style.setProperty('--bg-primary', '#ffffff')
      root.style.setProperty('--bg-secondary', '#f8f9fa')
      root.style.setProperty('--text-primary', '#000000')
      root.style.setProperty('--text-secondary', '#6c757d')
    }
  }
  
  // 初始化
  applyTheme()
  
  return {
    currentTheme,
    toggleTheme,
    setTheme
  }
}
