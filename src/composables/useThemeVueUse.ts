import { useDark, useToggle } from '@vueuse/core'

export function useThemeVueUse() {
  const isDark = useDark({
    selector: 'html',
    attribute: 'data-theme',
    valueDark: 'dark',
    valueLight: 'light',
  })
  
  const toggleTheme = useToggle(isDark)
  
  return {
    isDark,
    toggleTheme,
    setTheme: (theme: 'light' | 'dark') => {
      isDark.value = theme === 'dark'
    }
  }
}
