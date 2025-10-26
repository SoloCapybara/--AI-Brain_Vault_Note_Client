<template>
  <div class="notes-list">
    <div class="notes-header">
      <h2>我的笔记</h2>
      <button class="new-note-btn" @click="$emit('new-note')">
        <i class="fas fa-plus"></i> 新建笔记
      </button>
    </div>
    
    <div class="notes-container">
      <div 
        v-for="note in notes" 
        :key="note.id"
        class="note-item" 
        :class="{ active: activeNote && activeNote.id === note.id }"
        @click="selectNote(note)"
      >
        <div class="note-title">
          <span>{{ note.title }}</span>
          <span class="note-date">{{ getRelativeDate(note.date) }}</span>
        </div>
        <div class="note-preview">
          {{ note.preview }}
        </div>
        <div class="note-meta">
          <span>{{ note.date }}</span>
          <span>{{ note.wordCount }}字</span>
        </div>
        <div class="note-tags" v-if="note.tags && note.tags.length > 0">
          <span 
            v-for="tag in note.tags" 
            :key="tag"
            class="tag" 
            :class="{ 'ai-tag': note.isAI && tag.includes('AI') }"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
defineProps<{
  notes: any[]
  activeNote: any
}>()

// Emits
const emit = defineEmits<{
  'select-note': [note: any]
  'new-note': []
}>()

// 方法
const selectNote = (note: any) => {
  emit('select-note', note)
}

const getRelativeDate = (date: string) => {
  const now = new Date()
  const noteDate = new Date(date)
  const diffTime = Math.abs(now.getTime() - noteDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return '今天'
  if (diffDays === 2) return '昨天'
  if (diffDays <= 7) return `${diffDays - 1}天前`
  if (diffDays <= 30) return `${Math.floor(diffDays / 7)}周前`
  return `${Math.floor(diffDays / 30)}个月前`
}
</script>

<style scoped>
.notes-list {
  width: 300px;
  min-width: 250px;
  max-width: 350px;
  background-color: white;
  border-right: 1px solid #eaeaea;
  overflow-y: auto;
  padding: 20px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  flex-shrink: 0;
}

.dark .notes-list {
  background-color: #252a3a;
  border-right-color: #3a4152;
}

.notes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.notes-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: var(--dark-color);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.dark .notes-header h2 {
  color: #e9ecef;
}

.new-note-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 15px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  align-items: center;
  font-weight: 500;
}

.new-note-btn:hover {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(91, 107, 240, 0.3);
}

.new-note-btn i {
  margin-right: 5px;
}

.notes-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.note-item {
  padding: 15px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid transparent;
  animation: fadeIn 0.3s ease;
  background-color: #f8f9fa;
}

.dark .note-item {
  background-color: #2d3344;
}

.note-item:hover {
  background-color: #e9ecef;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dark .note-item:hover {
  background-color: #353b4e;
}

.note-item.active {
  background-color: #eef2ff;
  border-color: var(--primary-color);
}

.dark .note-item.active {
  background-color: #3a4152;
}

.note-title {
  font-weight: 600;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.note-title span:first-child {
  color: var(--dark-color);
  flex: 1;
  margin-right: 10px;
}

.dark .note-title span:first-child {
  color: #e9ecef;
}

.note-date {
  font-size: 12px;
  color: #6c757d;
  font-weight: 400;
}

.dark .note-date {
  color: #a0a7b5;
}

.note-preview {
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.dark .note-preview {
  color: #a0a7b5;
}

.note-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #adb5bd;
  margin-bottom: 8px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.dark .note-meta {
  color: #7a8294;
}

.note-tags {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.tag {
  background-color: #e9ecef;
  color: #495057;
  padding: 3px 8px;
  border-radius: 20px;
  font-size: 11px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.dark .tag {
  background-color: #3a4152;
  color: #c8ccd4;
}

.tag.ai-tag {
  background-color: #f0f7ff;
  color: var(--primary-color);
}

.dark .tag.ai-tag {
  background-color: #2d3a5c;
  color: #7b9fff;
}

/* 动画 */
@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .notes-list {
    width: 280px;
  }
}

@media (max-width: 768px) {
  .notes-list {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #eaeaea;
  }
  
  .dark .notes-list {
    border-bottom-color: #3a4152;
  }
}
</style>