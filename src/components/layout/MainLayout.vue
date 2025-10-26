<template>
  <div class="container" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
    <!-- 侧边栏遮罩层 -->
    <div 
      class="sidebar-overlay" 
      :class="{ active: showMobileSidebar }"
      @click="closeMobileSidebar"
    ></div>
    
    <!-- 侧边栏 -->
    <Sidebar 
      :collapsed="sidebarCollapsed"
      :mobile-open="showMobileSidebar"
      :is-dark="isDark"
      @toggle-collapse="toggleSidebar"
      @select-note="selectNote"
      @search="handleSearch"
      @change-theme-color="handleChangeThemeColor"
      @toggle-theme="toggleGlobalTheme"
    />
    
    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 顶部栏 -->
      <TopBar 
        :is-dark="isDark"
        @toggle-sidebar="toggleSidebar"
        @toggle-mobile-sidebar="toggleMobileSidebar"
        @toggle-theme="toggleTheme"
        @sync="handleSync"
        @notification="handleNotification"
        @upload="handleUpload"
      />
      
      <!-- 内容区域 -->
      <div class="content-area">
        <!-- 笔记列表 -->
        <NotesList 
          :notes="notes"
          :active-note="activeNote"
          @select-note="selectNote"
          @new-note="createNewNote"
        />
        
        <!-- 笔记编辑器 -->
        <NoteEditor 
          :note="activeNote"
          @save="handleSaveNote"
          @update="handleUpdateNote"
        />
        
        <!-- AI助手 -->
        <AIAssistant 
          :note="activeNote"
          @close="showAIAssistant = false"
          @generate-summary="handleGenerateSummary"
          @generate-tags="handleGenerateTags"
          @find-related="handleFindRelated"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Sidebar from './Sidebar.vue'
import TopBar from './TopBar.vue'
import NotesList from './NotesList.vue'
import NoteEditor from './NoteEditor.vue'
import AIAssistant from './AIAssistant.vue'
import { useThemeFinal } from '../../composables/useThemeFinal'

// 主题管理
const { isDark, toggleTheme: toggleThemeGlobal } = useThemeFinal()

// TopBar的主题切换 - 现在也调用全局主题切换
const toggleTheme = () => {
  // 直接调用全局主题切换，让Switch和模态框使用同一个逻辑
  toggleThemeGlobal()
}

// 模态框的主题切换 - 现在和Switch使用同一个逻辑
const toggleGlobalTheme = () => {
  // 直接调用全局主题切换，和Switch使用同一个逻辑
  toggleThemeGlobal()
}

// 不再需要同步编辑区域主题，因为现在Switch和模态框都使用全局主题

// 响应式状态
const sidebarCollapsed = ref(false)
const showMobileSidebar = ref(false)
const showAIAssistant = ref(false)
const activeNote = ref(null)

// 侧边栏状态管理
const loadSidebarState = () => {
  const savedState = localStorage.getItem('sidebarCollapsed')
  if (savedState !== null) {
    sidebarCollapsed.value = savedState === 'true'
  }
}

const saveSidebarState = () => {
  localStorage.setItem('sidebarCollapsed', sidebarCollapsed.value.toString())
}

// 笔记数据
const notes = ref([
  {
    id: 1,
    title: 'AI技术发展趋势分析',
    content: '近年来，人工智能技术取得了突破性进展...',
    preview: '本文分析了当前AI技术的主要发展趋势，包括大语言模型、多模态学习、强化学习等领域的突破...',
    tags: ['AI', '技术', '智能摘要'],
    date: '2023-10-15',
    wordCount: 1248,
    isAI: true
  },
  {
    id: 2,
    title: '项目进度报告',
    content: '本周项目完成了第一阶段开发...',
    preview: '本周项目完成了第一阶段开发，主要实现了用户认证、笔记创建和基本编辑功能...',
    tags: ['工作', '项目'],
    date: '2023-10-14',
    wordCount: 856,
    isAI: false
  },
  {
    id: 3,
    title: '读书笔记 - 设计心理学',
    content: '唐纳德·诺曼在《设计心理学》中提出了以用户为中心的设计理念...',
    preview: '唐纳德·诺曼在《设计心理学》中提出了以用户为中心的设计理念，强调产品的可用性和用户体验...',
    tags: ['阅读', '心理学', '关键点提取'],
    date: '2023-10-12',
    wordCount: 1532,
    isAI: true
  }
])

// 方法
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
  saveSidebarState()
}

const toggleMobileSidebar = () => {
  showMobileSidebar.value = !showMobileSidebar.value
}

const closeMobileSidebar = () => {
  showMobileSidebar.value = false
}

const selectNote = (note: any) => {
  activeNote.value = note
  // 移动端选择笔记后关闭侧边栏
  if (window.innerWidth <= 768) {
    showMobileSidebar.value = false
  }
}

const createNewNote = () => {
  const newNote = {
    id: Date.now(),
    title: '新建笔记',
    content: '',
    preview: '',
    tags: [],
    date: new Date().toISOString().split('T')[0],
    wordCount: 0,
    isAI: false
  }
  notes.value.unshift(newNote)
  activeNote.value = newNote
}

const handleSaveNote = (note: any) => {
  const index = notes.value.findIndex(n => n.id === note.id)
  if (index !== -1) {
    notes.value[index] = { ...note }
  }
}

const handleUpdateNote = (note: any) => {
  const index = notes.value.findIndex(n => n.id === note.id)
  if (index !== -1) {
    notes.value[index] = { ...note }
  }
}

const handleSearch = (query: string) => {
  console.log('搜索:', query)
  // 实现搜索逻辑
}

const handleChangeThemeColor = (color: string) => {
  // 更新CSS变量
  document.documentElement.style.setProperty('--primary-color', color)
  
  // 更新侧边栏渐变
  const sidebar = document.querySelector('.sidebar')
  if (sidebar) {
    const darkenColor = (hex: string, percent: number) => {
      let f = parseInt(hex.slice(1), 16),
        t = percent < 0 ? 0 : 255,
        p = percent < 0 ? percent * -1 : percent,
        R = f >> 16,
        G = (f >> 8) & 0x00ff,
        B = f & 0x0000ff
      return (
        '#' +
        (
          0x1000000 +
          (Math.round((t - R) * p) + R) * 0x10000 +
          (Math.round((t - G) * p) + G) * 0x100 +
          (Math.round((t - B) * p) + B)
        )
          .toString(16)
          .slice(1)
      )
    }
    
    // 根据当前主题模式决定侧边栏背景
    const isCurrentlyDark = document.body.classList.contains('dark')
    
    if (isCurrentlyDark) {
      // 深色模式 - 使用黑色渐变
      sidebar.style.background = 'linear-gradient(135deg, #000000, #1a1a1a)'
    } else {
      // 浅色模式 - 使用纯白色背景
      sidebar.style.background = '#ffffff'
    }
  }
}

const handleSync = () => {
  console.log('同步数据')
}

const handleNotification = () => {
  console.log('查看通知')
}

const handleUpload = () => {
  console.log('上传文件')
}

const handleGenerateSummary = () => {
  console.log('生成摘要')
}

const handleGenerateTags = () => {
  console.log('生成标签')
}

const handleFindRelated = () => {
  console.log('查找相关内容')
}

// 窗口大小变化处理
const handleResize = () => {
  // 在移动端时自动关闭侧边栏
  if (window.innerWidth <= 768) {
    showMobileSidebar.value = false
  }
}

// 初始化
onMounted(() => {
  // 加载侧边栏状态
  loadSidebarState()
  
  // 不再需要加载编辑区域主题，因为现在使用全局主题
  
  // 设置默认选中的笔记
  if (notes.value.length > 0) {
    activeNote.value = notes.value[0]
  }
  
  // 监听窗口大小变化
  window.addEventListener('resize', handleResize)
})

// 清理
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.container {
  display: flex;
  min-height: 100vh;
  width: calc(100vw - 260px);
  max-width: none !important;
  background-color: #ffffff !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin-left: 260px; /* 为固定侧边栏留出空间 */
}

body.dark .container {
  background-color: var(--color-bg-secondary);
}

/* 侧边栏收缩时的布局调整 */
.container.sidebar-collapsed {
  width: calc(100vw - 90px);
  margin-left: 90px;
}

/* 移动端布局 */
@media (max-width: 768px) {
  .container {
    width: 100vw;
    margin-left: 0;
  }
  
  .container.sidebar-collapsed {
    width: 100vw;
    margin-left: 0;
  }
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: var(--transition);
}

.content-area {
  flex: 1;
  display: flex;
  overflow: hidden;
  transition: var(--transition);
  width: 100%;
  min-width: 0;
  max-width: 100%;
}

.sidebar-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}

.sidebar-overlay.active {
  display: block;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .content-area {
    flex-wrap: wrap;
  }
}

@media (max-width: 1024px) {
  .content-area {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .content-area {
    flex-direction: column;
  }
}
</style>
