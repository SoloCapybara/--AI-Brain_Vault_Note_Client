import { computed, watch } from 'vue'
import { useThemeStore } from '../stores/theme'

export function useTheme() {
  const themeStore = useThemeStore()
  
  // 当前主题
  const currentTheme = computed(() => themeStore.currentTheme.editorTheme)
  
  // 切换主题
  const toggleTheme = () => {
    themeStore.toggleEditorTheme()
  }
  
  // 设置主题
  const setTheme = (theme: 'light' | 'dark') => {
    themeStore.setEditorTheme(theme)
  }
  
  // 监听主题变化，更新HTML属性
  watch(currentTheme, (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme)
    console.log('🎨 主题已切换到:', newTheme)
    
    // 延迟检查，确保样式已应用
    setTimeout(() => {
      console.log('🎨 === 详细主题调试信息 ===')
      console.log('🎨 HTML data-theme属性:', document.documentElement.getAttribute('data-theme'))
      
      // 检查CSS变量
      const root = document.documentElement
      const computedStyle = getComputedStyle(root)
      console.log('🎨 CSS变量 - 背景色:', computedStyle.getPropertyValue('--color-bg-primary').trim())
      console.log('🎨 CSS变量 - 文字色:', computedStyle.getPropertyValue('--color-text-primary').trim())
      console.log('🎨 CSS变量 - 次要背景:', computedStyle.getPropertyValue('--color-bg-secondary').trim())
      
      // 检查各个组件
      const editorContainer = document.querySelector('.editor-container')
      if (editorContainer) {
        const editorStyle = getComputedStyle(editorContainer)
        console.log('🎨 编辑器容器背景色:', editorStyle.backgroundColor)
        console.log('🎨 编辑器容器文字色:', editorStyle.color)
      }
      
      const noteEditor = document.querySelector('.note-editor')
      if (noteEditor) {
        const noteStyle = getComputedStyle(noteEditor)
        console.log('🎨 笔记编辑器背景色:', noteStyle.backgroundColor)
        console.log('🎨 笔记编辑器文字色:', noteStyle.color)
      }
      
      const titleInput = document.querySelector('.note-title-input')
      if (titleInput) {
        const titleStyle = getComputedStyle(titleInput)
        console.log('🎨 标题输入框背景色:', titleStyle.backgroundColor)
        console.log('🎨 标题输入框文字色:', titleStyle.color)
      }
      
      const textarea = document.querySelector('.note-textarea')
      if (textarea) {
        const textareaStyle = getComputedStyle(textarea)
        console.log('🎨 文本区域背景色:', textareaStyle.backgroundColor)
        console.log('🎨 文本区域文字色:', textareaStyle.color)
      }
      
      const toolbar = document.querySelector('.toolbar')
      if (toolbar) {
        const toolbarStyle = getComputedStyle(toolbar)
        console.log('🎨 工具栏背景色:', toolbarStyle.backgroundColor)
        console.log('🎨 工具栏文字色:', toolbarStyle.color)
      }
      
      const tagsSection = document.querySelector('.tags-section')
      if (tagsSection) {
        const tagsStyle = getComputedStyle(tagsSection)
        console.log('🎨 标签区域背景色:', tagsStyle.backgroundColor)
        console.log('🎨 标签区域文字色:', tagsStyle.color)
      }
      
      console.log('🎨 === 调试信息结束 ===')
      
      // 强制设置样式
      const elements = [
        '.editor-container',
        '.note-editor', 
        '.note-header',
        '.note-content',
        '.note-title-input',
        '.note-textarea'
      ]
      
      elements.forEach(selector => {
        const element = document.querySelector(selector)
        if (element) {
          if (newTheme === 'light') {
            element.style.setProperty('background-color', '#ffffff', 'important')
            element.style.setProperty('color', '#000000', 'important')
          } else {
            element.style.setProperty('background-color', '#000000', 'important')
            element.style.setProperty('color', '#ffffff', 'important')
          }
        }
      })
    }, 100)
  }, { immediate: true })
  
  // 强制重置为浅色主题
  const resetToLight = () => {
    document.documentElement.setAttribute('data-theme', 'light')
    themeStore.setEditorTheme('light')
  }
  
  return {
    currentTheme,
    toggleTheme,
    setTheme,
    resetToLight
  }
}
