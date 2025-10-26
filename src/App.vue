<script setup lang="ts">
import MainLayout from './components/layout/MainLayout.vue'
</script>

<template>
  <div id="app">
    <MainLayout />
  </div>
</template>

<style>
@import 'tailwindcss';

/* CSS变量定义 */
:root {
  --primary-color: #5b6bf0;
  --secondary-color: #3a4bd8;
  --accent-color: #f25f5c;
  --light-color: #f8f9fa;
  --dark-color: #212529;
  --success-color: #4cc9f0;
  --warning-color: #f72585;
  --border-radius: 12px;
  --box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  --sidebar-bg: linear-gradient(135deg, #5b6bf0, #3a4bd8);
  --sidebar-width: 260px;
  --sidebar-collapsed-width: 70px;
}

#app {
  height: 100vh;
  width: 100vw;
  max-width: none !important;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7fb;
  transition: var(--transition);
}

.dark #app {
  background-color: #1a1d28;
}

/* 全局自定义滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* 暗色模式滚动条 */
.dark ::-webkit-scrollbar-thumb {
  background: #475569;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

/* 全局动画 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes bounceIn {
  from { opacity: 0; transform: scale(0.3); }
  50% { opacity: 1; transform: scale(1.05); }
  70% { transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

.animate-slide-in {
  animation: slideIn 0.4s ease-in-out;
}

.animate-bounce-in {
  animation: bounceIn 0.5s ease-in-out;
}
</style>