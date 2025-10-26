/**
 * 主题工具类
 */
export class ThemeUtils {
  private static readonly THEME_KEY = 'brainvault-theme'
  
  /**
   * 获取当前主题
   */
  static getCurrentTheme(): 'light' | 'dark' {
    const saved = localStorage.getItem(this.THEME_KEY)
    if (saved) {
      return saved as 'light' | 'dark'
    }
    return 'light'
  }
  
  /**
   * 设置主题
   */
  static setTheme(theme: 'light' | 'dark'): void {
    localStorage.setItem(this.THEME_KEY, theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }
  
  /**
   * 切换主题
   */
  static toggleTheme(): 'light' | 'dark' {
    const current = this.getCurrentTheme()
    const newTheme = current === 'light' ? 'dark' : 'light'
    this.setTheme(newTheme)
    return newTheme
  }
  
  /**
   * 初始化主题
   */
  static initTheme(): void {
    const theme = this.getCurrentTheme()
    this.setTheme(theme)
  }
}

/**
 * 颜色工具类
 */
export class ColorUtils {
  /**
   * 颜色变暗
   */
  static darkenColor(color: string, percent: number): string {
    const num = parseInt(color.replace("#", ""), 16)
    const amt = Math.round(2.55 * percent)
    const R = (num >> 16) - amt
    const G = (num >> 8 & 0x00FF) - amt
    const B = (num & 0x0000FF) - amt
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
  }
  
  /**
   * 颜色变亮
   */
  static lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace("#", ""), 16)
    const amt = Math.round(2.55 * percent)
    const R = (num >> 16) + amt
    const G = (num >> 8 & 0x00FF) + amt
    const B = (num & 0x0000FF) + amt
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
  }
  
  /**
   * 生成渐变背景
   */
  static generateGradient(primaryColor: string, secondaryColor?: string): string {
    const secondary = secondaryColor || this.darkenColor(primaryColor, 20)
    return `linear-gradient(135deg, ${primaryColor}, ${secondary})`
  }
}

/**
 * 日期工具类
 */
export class DateUtils {
  /**
   * 格式化日期
   */
  static formatDate(date: Date | string, format: 'short' | 'long' | 'relative' = 'short'): string {
    const d = typeof date === 'string' ? new Date(date) : date
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (format === 'relative') {
      if (days === 0) return '今天'
      if (days === 1) return '昨天'
      if (days < 7) return `${days}天前`
      if (days < 30) return `${Math.floor(days / 7)}周前`
      if (days < 365) return `${Math.floor(days / 30)}个月前`
      return `${Math.floor(days / 365)}年前`
    }
    
    if (format === 'long') {
      return d.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    
    return d.toLocaleDateString('zh-CN')
  }
}

/**
 * 文本工具类
 */
export class TextUtils {
  /**
   * 截断文本
   */
  static truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }
  
  /**
   * 计算字数
   */
  static countWords(text: string): number {
    return text.trim().length
  }
  
  /**
   * 提取关键词
   */
  static extractKeywords(text: string, maxKeywords: number = 5): string[] {
    // 简单的关键词提取，实际项目中可以使用更复杂的算法
    const words = text.toLowerCase()
      .replace(/[^\u4e00-\u9fa5a-zA-Z\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 1)
    
    const wordCount: Record<string, number> = {}
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1
    })
    
    return Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, maxKeywords)
      .map(([word]) => word)
  }
}

/**
 * 存储工具类
 */
export class StorageUtils {
  /**
   * 安全获取localStorage
   */
  static getItem(key: string): string | null {
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  }
  
  /**
   * 安全设置localStorage
   */
  static setItem(key: string, value: string): boolean {
    try {
      localStorage.setItem(key, value)
      return true
    } catch {
      return false
    }
  }
  
  /**
   * 安全删除localStorage
   */
  static removeItem(key: string): boolean {
    try {
      localStorage.removeItem(key)
      return true
    } catch {
      return false
    }
  }
}
