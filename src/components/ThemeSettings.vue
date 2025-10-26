<script setup lang="ts">
import { computed } from 'vue'
import { useThemeFinal } from '../composables/useThemeFinal'

const { isDark, toggleTheme, setTheme } = useThemeFinal()

const emit = defineEmits<{
  close: []
}>()

// 计算属性
const isDarkTheme = computed(() => isDark.value)

// 方法
const toggleEditorTheme = () => {
  toggleTheme()
  console.log('主题设置完成:', isDark.value ? 'dark' : 'light')
}

const setEditorTheme = (theme: 'light' | 'dark') => {
  setTheme(theme)
  console.log('主题设置完成:', theme)
}
</script>

<template>
  <div class="theme-settings-overlay" @click="emit('close')">
    <div class="theme-settings" @click.stop>
    <div class="settings-header">
      <h3>🎨 主题设置</h3>
      <button @click="emit('close')" class="close-btn">×</button>
    </div>

    <div class="settings-content">
      <!-- 编辑器主题选择 -->
      <div class="setting-section">
        <h4>编辑器主题</h4>
        <div class="theme-options">
          <div 
            class="theme-option"
            :class="{ active: !isDarkTheme }"
            @click="setEditorTheme('light')"
          >
            <div class="theme-preview light">
              <div class="preview-header"></div>
              <div class="preview-content"></div>
              <div class="preview-text"></div>
            </div>
            <span class="theme-name">浅色主题</span>
          </div>
          
          <div 
            class="theme-option"
            :class="{ active: isDarkTheme }"
            @click="setEditorTheme('dark')"
          >
            <div class="theme-preview dark">
              <div class="preview-header"></div>
              <div class="preview-content"></div>
              <div class="preview-text"></div>
            </div>
            <span class="theme-name">深色主题</span>
          </div>
        </div>
      </div>

      <!-- 快速切换 -->
      <div class="setting-section">
        <h4>快速切换</h4>
        <div class="quick-toggle-buttons">
          <button 
            @click="setEditorTheme('light')"
            class="quick-btn"
            :class="{ active: !isDarkTheme }"
          >
            ☀️ 浅色主题
          </button>
          <button 
            @click="setEditorTheme('dark')"
            class="quick-btn"
            :class="{ active: isDarkTheme }"
          >
            🌙 深色主题
          </button>
        </div>
        <button 
          @click="toggleEditorTheme"
          class="toggle-btn"
        >
          <span class="toggle-icon">{{ isDarkTheme ? '🌙' : '☀️' }}</span>
          <span class="toggle-text">
            {{ isDarkTheme ? '切换到浅色' : '切换到深色' }}
          </span>
        </button>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
.theme-settings-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-settings {
  width: 450px;
  max-width: 90vw;
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  max-height: 60vh;
  overflow-y: auto;
  /* 自定义滚动条样式 */
  scrollbar-width: auto;
  scrollbar-color: #3b82f6 #f1f5f9;
}

.theme-settings::-webkit-scrollbar {
  width: 10px;
}

.theme-settings::-webkit-scrollbar-track {
  background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 5px;
  border: 1px solid #e2e8f0;
}

.theme-settings::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 5px;
  border: 1px solid #1d4ed8;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.2);
}

.theme-settings::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.3);
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e1e5e9;
  background: #f8f9fa;
  border-radius: 12px 12px 0 0;
}

.settings-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 18px;
}

.close-btn {
  width: 30px;
  height: 30px;
  border: none;
  background: #e9ecef;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.close-btn:hover {
  background: #dee2e6;
}

.settings-content {
  padding: 15px;
}

.setting-section {
  margin-bottom: 15px;
}

.setting-section h4 {
  margin-bottom: 8px;
  color: #2c3e50;
  font-size: 14px;
  font-weight: 600;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.color-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.color-option:hover {
  background: #f8f9fa;
}

.color-option.active {
  border-color: #3b82f6;
  background: #f0f4ff;
}

.color-preview {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-bottom: 4px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.color-name {
  font-size: 12px;
  color: #6c757d;
  text-align: center;
}

.theme-options {
  display: flex;
  gap: 12px;
}

.theme-option {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.theme-option:hover {
  background: #f8f9fa;
}

.theme-option.active {
  border-color: #3b82f6;
  background: #f0f4ff;
}

.theme-preview {
  width: 60px;
  height: 40px;
  border-radius: 4px;
  margin-bottom: 6px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.theme-preview.light {
  background: #ffffff;
  border: 1px solid #e1e5e9;
}

.theme-preview.dark {
  background: #1a1a1a;
  border: 1px solid #333;
}

.preview-header {
  height: 12px;
  background: #f8f9fa;
  border-bottom: 1px solid #e1e5e9;
}

.theme-preview.dark .preview-header {
  background: #2d2d2d;
  border-bottom-color: #444;
}

.preview-content {
  height: 30px;
  background: #ffffff;
  padding: 5px;
}

.theme-preview.dark .preview-content {
  background: #1a1a1a;
}

.preview-text {
  height: 8px;
  background: #e9ecef;
  margin: 2px 0;
  border-radius: 2px;
}

.theme-preview.dark .preview-text {
  background: #333;
}

.preview-text:last-child {
  width: 60%;
}

.theme-name {
  font-size: 12px;
  color: #6c757d;
  text-align: center;
}

.toggle-btn {
  width: 100%;
  padding: 10px;
  border: 2px solid #e1e5e9;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-size: 13px;
  font-weight: 500;
}

.toggle-btn:hover {
  border-color: #3b82f6;
  background: #f0f4ff;
}


.toggle-icon {
  font-size: 18px;
}

.toggle-text {
  font-weight: 500;
}

.quick-toggle-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.quick-btn {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.quick-btn:hover {
  border-color: #3b82f6;
  background: #f0f4ff;
}

.quick-btn.active {
  border-color: #3b82f6;
  background: #3b82f6;
  color: white;
}

.quick-btn.active:hover {
  background: #2563eb;
  border-color: #2563eb;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .theme-settings {
    width: 95vw;
    margin: 20px;
  }
  
  .color-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .theme-options {
    flex-direction: column;
  }
}
</style>
