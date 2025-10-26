<template>
  <div 
    class="sidebar" 
    :class="{ 
      'collapsed': collapsed, 
      'mobile-open': mobileOpen 
    }"
  >
    <!-- Logo区域 -->
    <div class="logo">
      <i class="fas fa-brain"></i>
      <h1>脑洞库</h1>
      <button class="toggle-sidebar" @click="$emit('toggle-collapse')">
        <i class="fas" :class="collapsed ? 'fa-chevron-right' : 'fa-chevron-left'"></i>
      </button>
    </div>
    
    <!-- 搜索框 -->
    <div class="search-box">
      <input 
        type="text" 
        placeholder="搜索笔记..." 
        v-model="searchQuery"
        @input="handleSearch"
      >
    </div>
    
    <!-- 主要导航 -->
    <div class="nav-section">
      <div class="nav-title">主要</div>
      <div 
        class="nav-item" 
        :class="{ active: activeSection === 'home' }"
        @click="setActiveSection('home')"
      >
        <i class="fas fa-home"></i>
        <span>主页</span>
      </div>
      <div 
        class="nav-item" 
        :class="{ active: activeSection === 'notes' }"
        @click="setActiveSection('notes')"
      >
        <i class="fas fa-sticky-note"></i>
        <span>所有笔记</span>
      </div>
      <div 
        class="nav-item" 
        :class="{ active: activeSection === 'favorites' }"
        @click="setActiveSection('favorites')"
      >
        <i class="fas fa-star"></i>
        <span>收藏</span>
      </div>
      <div 
        class="nav-item" 
        :class="{ active: activeSection === 'recent' }"
        @click="setActiveSection('recent')"
      >
        <i class="fas fa-history"></i>
        <span>最近</span>
      </div>
    </div>
    
    <!-- 分类导航 -->
    <div class="nav-section">
      <div class="nav-title">分类</div>
      <div 
        class="nav-item" 
        :class="{ active: activeCategory === 'work' }"
        @click="setActiveCategory('work')"
      >
        <i class="fas fa-book"></i>
        <span>工作</span>
      </div>
      <div 
        class="nav-item" 
        :class="{ active: activeCategory === 'creative' }"
        @click="setActiveCategory('creative')"
      >
        <i class="fas fa-lightbulb"></i>
        <span>创意</span>
      </div>
      <div 
        class="nav-item" 
        :class="{ active: activeCategory === 'study' }"
        @click="setActiveCategory('study')"
      >
        <i class="fas fa-graduation-cap"></i>
        <span>学习</span>
      </div>
      <div 
        class="nav-item" 
        :class="{ active: activeCategory === 'personal' }"
        @click="setActiveCategory('personal')"
      >
        <i class="fas fa-heart"></i>
        <span>个人</span>
      </div>
    </div>
    
    <!-- AI工具 -->
    <div class="nav-section">
      <div class="nav-title">AI工具</div>
      <div 
        class="nav-item" 
        :class="{ active: activeTool === 'assistant' }"
        @click="setActiveTool('assistant')"
      >
        <i class="fas fa-robot"></i>
        <span>AI助手</span>
        <span class="ai-tag">NEW</span>
      </div>
      <div 
        class="nav-item" 
        :class="{ active: activeTool === 'organize' }"
        @click="setActiveTool('organize')"
      >
        <i class="fas fa-magic"></i>
        <span>智能整理</span>
      </div>
      <div 
        class="nav-item" 
        :class="{ active: activeTool === 'analytics' }"
        @click="setActiveTool('analytics')"
      >
        <i class="fas fa-chart-bar"></i>
        <span>数据分析</span>
      </div>
    </div>
    
    <!-- 主题颜色选择器 -->
    <div class="nav-section">
      <div class="nav-title">主题颜色</div>
      <div class="color-picker">
        <div 
          v-for="color in themeColors" 
          :key="color.value"
          class="color-option" 
          :class="{ active: selectedColor === color.value }"
          :style="{ backgroundColor: color.value }"
          @click="setThemeColor(color.value)"
        ></div>
      </div>
    </div>
    
    <!-- 底部导航 -->
    <div class="nav-section" style="margin-top: auto;">
      <div class="nav-item" @click="openSettings">
        <i class="fas fa-cog"></i>
        <span>设置</span>
      </div>
      <div class="nav-item" @click="openHelp">
        <i class="fas fa-question-circle"></i>
        <span>帮助</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Props
defineProps<{
  collapsed: boolean
  mobileOpen: boolean
}>()

// Emits
const emit = defineEmits<{
  'toggle-collapse': []
  'search': [query: string]
  'select-note': [note: any]
}>()

// 响应式状态
const searchQuery = ref('')
const activeSection = ref('home')
const activeCategory = ref('')
const activeTool = ref('')
const selectedColor = ref('#5b6bf0')

// 主题颜色选项
const themeColors = [
  { name: '蓝色', value: '#5b6bf0' },
  { name: '红色', value: '#f25f5c' },
  { name: '青色', value: '#4cc9f0' },
  { name: '紫色', value: '#7209b7' },
  { name: '绿色', value: '#3a9d5d' },
  { name: '橙色', value: '#f9a826' }
]

// 方法
const handleSearch = () => {
  emit('search', searchQuery.value)
}

const setActiveSection = (section: string) => {
  activeSection.value = section
  activeCategory.value = ''
  activeTool.value = ''
}

const setActiveCategory = (category: string) => {
  activeCategory.value = category
  activeSection.value = ''
  activeTool.value = ''
}

const setActiveTool = (tool: string) => {
  activeTool.value = tool
  activeSection.value = ''
  activeCategory.value = ''
}

const setThemeColor = (color: string) => {
  selectedColor.value = color
  // 更新CSS变量
  document.documentElement.style.setProperty('--primary-color', color)
  // 更新侧边栏渐变
  const sidebar = document.querySelector('.sidebar')
  if (sidebar) {
    sidebar.style.background = `linear-gradient(135deg, ${color}, ${darkenColor(color, 20)})`
  }
}

const openSettings = () => {
  console.log('打开设置')
}

const openHelp = () => {
  console.log('打开帮助')
}

// 辅助函数：加深颜色
const darkenColor = (color: string, percent: number) => {
  const num = parseInt(color.replace("#", ""), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) - amt
  const G = (num >> 8 & 0x00FF) - amt
  const B = (num & 0x0000FF) - amt
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
}
</script>

<style scoped>
.sidebar {
  width: 260px;
  background: linear-gradient(135deg, #5b6bf0, #3a4bd8);
  color: white;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  z-index: 100;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar.collapsed {
  width: 70px;
}

.sidebar.collapsed .logo h1,
.sidebar.collapsed .nav-title,
.sidebar.collapsed .nav-item span,
.sidebar.collapsed .ai-tag,
.sidebar.collapsed .search-box {
  display: none;
}

.sidebar.collapsed .nav-item {
  justify-content: center;
  padding: 15px 0;
}

.sidebar.collapsed .nav-item i {
  margin-right: 0;
  font-size: 20px;
}

.logo {
  display: flex;
  align-items: center;
  padding: 0 20px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.logo i {
  font-size: 28px;
  margin-right: 10px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.logo h1 {
  font-size: 22px;
  font-weight: 700;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.toggle-sidebar {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  margin-left: auto;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.toggle-sidebar:hover {
  transform: scale(1.1);
}

.nav-section {
  margin-bottom: 30px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.nav-title {
  font-size: 14px;
  text-transform: uppercase;
  padding: 0 20px;
  margin-bottom: 10px;
  opacity: 0.7;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.nav-item {
  padding: 12px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-item.active {
  background-color: rgba(255, 255, 255, 0.15);
  border-left: 4px solid white;
}

.nav-item i {
  margin-right: 12px;
  font-size: 18px;
  width: 24px;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.search-box {
  padding: 0 20px;
  margin-bottom: 20px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.search-box input {
  width: 100%;
  padding: 12px 15px;
  border-radius: 8px;
  border: none;
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  font-size: 14px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.search-box input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.ai-tag {
  background-color: #f25f5c;
  color: white;
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 20px;
  margin-left: auto;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.color-picker {
  display: flex;
  padding: 0 20px;
  margin-top: 20px;
  gap: 10px;
  flex-wrap: wrap;
}

.color-option {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 2px solid transparent;
}

.color-option:hover {
  transform: scale(1.2);
}

.color-option.active {
  border-color: white;
  transform: scale(1.2);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    height: 100%;
    transform: translateX(-100%);
    z-index: 200;
  }
  
  .sidebar.mobile-open {
    transform: translateX(0);
  }
  
  .sidebar.collapsed {
    width: 280px;
  }
}
</style>