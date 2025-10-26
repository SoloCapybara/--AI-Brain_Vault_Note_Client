/**
 * 应用常量
 */
export const APP_CONFIG = {
  name: '脑洞库',
  version: '1.0.0',
  description: 'AI智能笔记应用',
  author: 'BrainVault Team'
}

/**
 * 主题配置
 */
export const THEME_CONFIG = {
  colors: [
    { id: 'blue', name: '经典蓝', value: '#5b6bf0', gradient: 'linear-gradient(135deg, #5b6bf0, #4f46e5)' },
    { id: 'red', name: '热情红', value: '#f25f5c', gradient: 'linear-gradient(135deg, #f25f5c, #dc2626)' },
    { id: 'cyan', name: '清新青', value: '#4cc9f0', gradient: 'linear-gradient(135deg, #4cc9f0, #06b6d4)' },
    { id: 'purple', name: '优雅紫', value: '#7209b7', gradient: 'linear-gradient(135deg, #7209b7, #581c87)' },
    { id: 'green', name: '自然绿', value: '#3a9d5d', gradient: 'linear-gradient(135deg, #3a9d5d, #16a34a)' },
    { id: 'orange', name: '活力橙', value: '#f9a826', gradient: 'linear-gradient(135deg, #f9a826, #ea580c)' }
  ],
  defaultColor: 'blue'
}

/**
 * 布局配置
 */
export const LAYOUT_CONFIG = {
  sidebar: {
    width: 260,
    collapsedWidth: 70,
    mobileBreakpoint: 768
  },
  notesList: {
    width: 320,
    mobileWidth: 280
  },
  aiAssistant: {
    width: 300
  }
}

/**
 * 动画配置
 */
export const ANIMATION_CONFIG = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500
  },
  easing: {
    ease: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
}

/**
 * 笔记类型
 */
export const NOTE_TYPES = {
  TEXT: 'text',
  MARKDOWN: 'markdown',
  RICH: 'rich'
} as const

/**
 * 标签配置
 */
export const TAG_CONFIG = {
  maxTags: 10,
  maxTagLength: 20,
  colors: [
    '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd',
    '#6c757d', '#495057', '#343a40', '#212529'
  ]
}

/**
 * AI功能配置
 */
export const AI_CONFIG = {
  features: [
    { id: 'summary', name: '智能摘要', icon: 'fas fa-magic', description: '自动生成笔记摘要' },
    { id: 'tags', name: '生成标签', icon: 'fas fa-tags', description: '智能推荐相关标签' },
    { id: 'related', name: '相关内容', icon: 'fas fa-search', description: '查找相关笔记' },
    { id: 'translate', name: '翻译', icon: 'fas fa-language', description: '多语言翻译' },
    { id: 'improve', name: '润色', icon: 'fas fa-edit', description: '优化文本表达' }
  ]
}

/**
 * 快捷键配置
 */
export const SHORTCUTS = {
  NEW_NOTE: 'Ctrl+N',
  SAVE: 'Ctrl+S',
  SEARCH: 'Ctrl+F',
  THEME_TOGGLE: 'Ctrl+T',
  SIDEBAR_TOGGLE: 'Ctrl+B'
} as const

/**
 * 存储键名
 */
export const STORAGE_KEYS = {
  THEME: 'brainvault-theme',
  SIDEBAR_COLLAPSED: 'brainvault-sidebar-collapsed',
  NOTES: 'brainvault-notes',
  SETTINGS: 'brainvault-settings',
  USER_PREFERENCES: 'brainvault-user-preferences'
} as const
