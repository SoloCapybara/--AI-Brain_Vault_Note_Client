<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import Header from '../components/Header.vue'
import NoteEditor from '../components/NoteEditor.vue'
import AIAssistant from '../components/AIAssistant.vue'
import ThemeSettings from '../components/ThemeSettings.vue'
import ThemeTest from '../components/ThemeTest.vue'
import { useThemeStore } from '../stores/theme'

const sidebarCollapsed = ref(false)
const currentNote = ref(null)
const showAIAssistant = ref(false)
const showThemeSettings = ref(false)

const themeStore = useThemeStore()

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const toggleAIAssistant = () => {
  showAIAssistant.value = !showAIAssistant.value
}

const openThemeSettings = () => {
  showThemeSettings.value = true
}

const handleSaveNote = (note: any) => {
  console.log('保存笔记:', note)
}
</script>

<template>
  <div class="app-container">
    <!-- 侧边栏 -->
    <Sidebar 
      :collapsed="sidebarCollapsed" 
      @select-note="currentNote = $event"
    />
    
    <!-- 主内容区域 -->
    <div class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <!-- 顶部导航 -->
      <Header 
        @toggle-sidebar="toggleSidebar"
        @toggle-ai="toggleAIAssistant"
        @open-theme-settings="openThemeSettings"
        :ai-active="showAIAssistant"
      />
      
      <!-- 笔记编辑区域 -->
      <div class="editor-container">
        <NoteEditor 
          :note="currentNote"
          @save="handleSaveNote"
        />
      </div>
    </div>
    
    <!-- AI助手面板 -->
    <AIAssistant 
      v-if="showAIAssistant"
      :note="currentNote"
      @close="showAIAssistant = false"
    />
    
    <!-- 主题设置面板 -->
    <ThemeSettings 
      v-if="showThemeSettings"
      @close="showThemeSettings = false"
    />
    
    <!-- 主题测试组件 - 临时移除 -->
    <!-- <ThemeTest /> -->
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
  background-color: var(--color-bg-secondary);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 280px;
  transition: margin-left 0.3s ease;
}

.main-content.sidebar-collapsed {
  margin-left: 60px;
}

.editor-container {
  flex: 1;
  padding: 0;
  overflow: hidden;
  margin: 0;
  background-color: var(--color-bg-primary) !important;
  color: var(--color-text-primary) !important;
  transition: background-color 0.2s ease, color 0.2s ease;
}



/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
  
  .main-content.sidebar-collapsed {
    margin-left: 0;
  }
}
</style>

