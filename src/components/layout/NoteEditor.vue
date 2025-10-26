<template>
  <div class="note-editor">
    <div class="editor-header">
      <input 
        type="text" 
        class="editor-title" 
        v-model="noteTitle"
        placeholder="笔记标题"
        @input="handleTitleChange"
      >
    </div>
    
    <div class="editor-toolbar">
      <button class="toolbar-btn" @click="formatText('bold')" title="粗体">
        <i class="fas fa-bold"></i>
      </button>
      <button class="toolbar-btn" @click="formatText('italic')" title="斜体">
        <i class="fas fa-italic"></i>
      </button>
      <button class="toolbar-btn" @click="formatText('underline')" title="下划线">
        <i class="fas fa-underline"></i>
      </button>
      <button class="toolbar-btn" @click="formatText('list')" title="无序列表">
        <i class="fas fa-list-ul"></i>
      </button>
      <button class="toolbar-btn" @click="formatText('orderedList')" title="有序列表">
        <i class="fas fa-list-ol"></i>
      </button>
      <button class="toolbar-btn" @click="formatText('link')" title="链接">
        <i class="fas fa-link"></i>
      </button>
      <button class="toolbar-btn" @click="formatText('image')" title="图片">
        <i class="fas fa-image"></i>
      </button>
      <button class="toolbar-btn" @click="formatText('code')" title="代码">
        <i class="fas fa-code"></i>
      </button>
      <button class="toolbar-btn" @click="formatText('table')" title="表格">
        <i class="fas fa-table"></i>
      </button>
    </div>
    
    <div class="editor-content-wrapper">
      <textarea 
        class="editor-content" 
        v-model="noteContent"
        placeholder="开始输入笔记内容..."
        @input="handleContentChange"
        ref="editorTextarea"
      ></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

// Props
const props = defineProps<{
  note: any
}>()

// Emits
const emit = defineEmits<{
  'save': [note: any]
  'update': [note: any]
}>()

// 响应式状态
const noteTitle = ref('')
const noteContent = ref('')
const editorTextarea = ref<HTMLTextAreaElement>()

// 计算属性
const currentNote = computed(() => ({
  ...props.note,
  title: noteTitle.value,
  content: noteContent.value,
  wordCount: noteContent.value.length
}))

// 监听props变化
watch(() => props.note, (newNote) => {
  if (newNote) {
    noteTitle.value = newNote.title || ''
    noteContent.value = newNote.content || ''
  }
}, { immediate: true })

// 方法
const handleTitleChange = () => {
  emit('update', currentNote.value)
}

const handleContentChange = () => {
  emit('update', currentNote.value)
}

const formatText = (format: string) => {
  if (!editorTextarea.value) return
  
  const textarea = editorTextarea.value
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = noteContent.value.substring(start, end)
  
  let formattedText = ''
  
  switch (format) {
    case 'bold':
      formattedText = `**${selectedText}**`
      break
    case 'italic':
      formattedText = `*${selectedText}*`
      break
    case 'underline':
      formattedText = `<u>${selectedText}</u>`
      break
    case 'list':
      formattedText = `- ${selectedText}`
      break
    case 'orderedList':
      formattedText = `1. ${selectedText}`
      break
    case 'link':
      formattedText = `[${selectedText}](url)`
      break
    case 'image':
      formattedText = `![${selectedText}](image-url)`
      break
    case 'code':
      formattedText = `\`${selectedText}\``
      break
    case 'table':
      formattedText = `| 列1 | 列2 | 列3 |\n|-----|-----|-----|\n| ${selectedText} | 数据 | 数据 |`
      break
  }
  
  // 替换选中的文本
  const newContent = noteContent.value.substring(0, start) + formattedText + noteContent.value.substring(end)
  noteContent.value = newContent
  
  // 更新光标位置
  setTimeout(() => {
    const newCursorPos = start + formattedText.length
    textarea.setSelectionRange(newCursorPos, newCursorPos)
    textarea.focus()
  }, 0)
  
  emit('update', currentNote.value)
}
</script>

<style scoped>
.note-editor {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 30px;
  overflow-y: auto;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  min-width: 0;
}

body.dark .note-editor {
  background-color: var(--color-bg-primary);
}

body.dark .editor-title {
  color: #e9ecef;
}

body.dark .editor-meta {
  color: #a0a7b5;
}

body.dark .toolbar-btn {
  color: #a0a7b5;
}

body.dark .toolbar-btn:hover {
  background-color: #1a1a1a;
  color: var(--color-text-primary);
}

body.dark .editor-content {
  color: #e9ecef;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.editor-title {
  width: 100%;
  border: none;
  font-size: 24px;
  font-weight: 700;
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--dark-color);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

body.dark .editor-title {
  color: #ffffff;
}

.editor-title:focus {
  outline: none;
  border-bottom-color: var(--primary-color);
}

.editor-toolbar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--color-border);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

body.dark .editor-toolbar {
  border-bottom-color: #3a4152;
}

.toolbar-btn {
  background: none;
  border: none;
  font-size: 16px;
  color: #6c757d;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

body.dark .toolbar-btn {
  color: #6c757d;
}

.toolbar-btn:hover {
  background-color: #f0f4f8;
  color: var(--dark-color);
  transform: scale(1.05);
}

body.dark .toolbar-btn:hover {
  background-color: #333333;
  color: #ffffff;
}

.editor-content-wrapper {
  flex: 1;
  position: relative;
  overflow-y: auto;
  max-height: calc(100vh - 200px);
}

.editor-content {
  width: 100%;
  height: 100%;
  border: none;
  font-size: 16px;
  line-height: 1.7;
  padding: 10px 0;
  resize: none;
  min-height: 400px;
  background: transparent;
  color: var(--dark-color);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow-y: auto;
}

body.dark .editor-content {
  color: #ffffff;
}

.editor-content:focus {
  outline: none;
}

.editor-content::placeholder {
  color: #6c757d;
  font-style: italic;
}

body.dark .editor-content::placeholder {
  color: #cccccc;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .note-editor {
    padding: 20px;
  }
  
  .editor-title {
    font-size: 20px;
  }
  
  .editor-toolbar {
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .toolbar-btn {
    padding: 6px 10px;
    font-size: 14px;
  }
}
</style>
