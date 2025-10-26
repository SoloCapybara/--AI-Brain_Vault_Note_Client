import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { THEME_CONFIG, STORAGE_KEYS } from '../utils/constants'
import { StorageUtils } from '../utils/theme'

export const useThemeStore = defineStore('theme', () => {
  // 状态
  const sidebarColor = ref('blue')
  const editorTheme = ref<'light' | 'dark'>('light')
  
  // 计算属性
  const currentTheme = computed(() => ({
    sidebarColor: sidebarColor.value,
    editorTheme: editorTheme.value
  }))
  
  const currentSidebarColor = computed(() => {
    const color = THEME_CONFIG.colors.find(c => c.id === sidebarColor.value)
    return color || THEME_CONFIG.colors[0]
  })
  
  // 方法
  const setSidebarColor = (colorId: string) => {
    sidebarColor.value = colorId
    saveToStorage()
  }
  
  const setEditorTheme = (theme: 'light' | 'dark') => {
    editorTheme.value = theme
    saveToStorage()
  }
  
  const toggleEditorTheme = () => {
    editorTheme.value = editorTheme.value === 'light' ? 'dark' : 'light'
    saveToStorage()
  }
  
  const saveToStorage = () => {
    const themeData = {
      sidebarColor: sidebarColor.value,
      editorTheme: editorTheme.value
    }
    StorageUtils.setItem(STORAGE_KEYS.THEME, JSON.stringify(themeData))
  }
  
  const loadFromStorage = () => {
    const saved = StorageUtils.getItem(STORAGE_KEYS.THEME)
    if (saved) {
      try {
        const themeData = JSON.parse(saved)
        sidebarColor.value = themeData.sidebarColor || 'blue'
        editorTheme.value = themeData.editorTheme || 'light'
      } catch (error) {
        console.error('Failed to load theme from storage:', error)
      }
    }
  }
  
  // 初始化
  loadFromStorage()
  
  return {
    // 状态
    sidebarColor,
    editorTheme,
    // 计算属性
    currentTheme,
    currentSidebarColor,
    // 方法
    setSidebarColor,
    setEditorTheme,
    toggleEditorTheme,
    saveToStorage,
    loadFromStorage
  }
})