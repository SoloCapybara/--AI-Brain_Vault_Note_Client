<template>
  <div class="top-bar">
    <div class="user-info">
      <button class="mobile-menu-btn" @click="$emit('toggle-mobile-sidebar')">
        <i class="fas fa-bars"></i>
      </button>
      <div class="user-avatar">用户</div>
      <div class="user-details">
        <div class="welcome-text">欢迎回来！</div>
        <div class="notification-text">今天有3条笔记待处理</div>
      </div>
    </div>
    
    <div class="top-actions">
      <div class="theme-toggle">
        <span>深色模式</span>
        <label class="switch">
          <input 
            type="checkbox" 
            :checked="isDark"
            @change="$emit('toggle-theme')"
          >
          <span class="slider"></span>
        </label>
      </div>
      <button class="action-btn" @click="$emit('sync')" title="同步">
        <i class="fas fa-sync-alt"></i>
      </button>
      <button class="action-btn" @click="$emit('notification')" title="通知">
        <i class="fas fa-bell"></i>
      </button>
      <button class="action-btn" @click="$emit('upload')" title="上传">
        <i class="fas fa-cloud-upload-alt"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeFinal } from '../../composables/useThemeFinal'

// 主题管理
const { isDark } = useThemeFinal()

// Emits
defineEmits<{
  'toggle-mobile-sidebar': []
  'toggle-theme': []
  'sync': []
  'notification': []
  'upload': []
}>()
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.dark .top-bar {
  background-color: #252a3a;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.user-info {
  display: flex;
  align-items: center;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 20px;
  color: var(--dark-color);
  cursor: pointer;
  margin-right: 15px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.dark .mobile-menu-btn {
  color: #e9ecef;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin-right: 10px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.user-details {
  display: flex;
  flex-direction: column;
}

.welcome-text {
  font-weight: 500;
  color: var(--dark-color);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.dark .welcome-text {
  color: #e9ecef;
}

.notification-text {
  font-size: 14px;
  color: #6c757d;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.dark .notification-text {
  color: #a0a7b5;
}

.top-actions {
  display: flex;
  gap: 15px;
  align-items: center;
}

.action-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: var(--dark-color);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  padding: 8px;
  border-radius: 6px;
}

.dark .action-btn {
  color: #e9ecef;
}

.action-btn:hover {
  color: var(--primary-color);
  transform: scale(1.1);
  background-color: rgba(91, 107, 240, 0.1);
}

.theme-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
}

.theme-toggle span {
  font-size: 14px;
  color: var(--dark-color);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.dark .theme-toggle span {
  color: #e9ecef;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--primary-color);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .mobile-menu-btn {
    display: block;
  }
  
  .theme-toggle span {
    display: none;
  }
}
</style>