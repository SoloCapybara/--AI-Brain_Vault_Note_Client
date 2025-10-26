<template>
  <div class="ai-assistant">
    <!-- 统计卡片 -->
    <div class="stats-card">
      <h3><i class="fas fa-chart-line"></i> 笔记统计</h3>
      <div class="stats-number">127</div>
      <div class="stats-desc">总笔记数</div>
      <div class="stats-number">18,542</div>
      <div class="stats-desc">总字数</div>
    </div>
    
    <!-- AI助手功能 -->
    <div class="ai-section">
      <h3><i class="fas fa-robot"></i> AI助手</h3>
      <button class="ai-action-btn" @click="$emit('generate-summary')">
        <i class="fas fa-magic"></i> 智能摘要
      </button>
      <button class="ai-action-btn" @click="$emit('generate-tags')">
        <i class="fas fa-tags"></i> 生成标签
      </button>
      <button class="ai-action-btn" @click="$emit('find-related')">
        <i class="fas fa-search"></i> 相关内容
      </button>
    </div>
    
    <!-- AI建议 -->
    <div class="ai-section">
      <h3><i class="fas fa-lightbulb"></i> AI建议</h3>
      <div class="ai-suggestion">
        <h4>扩展本节内容</h4>
        <p>建议在大语言模型部分添加更多关于参数规模和训练数据的细节。</p>
      </div>
      <div class="ai-suggestion">
        <h4>添加相关研究</h4>
        <p>可以考虑引用最近发表的关于多模态学习的几篇重要论文。</p>
      </div>
      <div class="ai-suggestion">
        <h4>优化结构</h4>
        <p>建议将"边缘计算与AI部署"部分移到"强化学习的应用拓展"之前。</p>
      </div>
    </div>
    
    <!-- 标签建议 -->
    <div class="ai-section">
      <h3><i class="fas fa-tags"></i> 标签建议</h3>
      <div class="tag-suggestions">
        <span 
          v-for="tag in suggestedTags" 
          :key="tag"
          class="tag-suggestion"
          @click="addTag(tag)"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Props
defineProps<{
  note: any
}>()

// Emits
const emit = defineEmits<{
  'close': []
  'generate-summary': []
  'generate-tags': []
  'find-related': []
}>()

// 响应式状态
const suggestedTags = ref([
  '人工智能',
  '技术趋势',
  '机器学习',
  '深度学习',
  '自然语言处理',
  '计算机视觉'
])

// 方法
const addTag = (tag: string) => {
  console.log('添加标签:', tag)
  // 这里可以触发添加标签的逻辑
}
</script>

<style scoped>
.ai-assistant {
  width: 280px;
  min-width: 250px;
  max-width: 320px;
  background-color: white;
  border-left: 1px solid #eaeaea;
  padding: 20px;
  overflow-y: auto;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  min-height: 400px;
  flex-shrink: 0;
}

.dark .ai-assistant {
  background-color: #252a3a;
  border-left-color: #3a4152;
}

.ai-section {
  margin-bottom: 30px;
  animation: slideIn 0.4s ease;
}

.ai-section h3 {
  font-size: 16px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  color: var(--dark-color);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.dark .ai-section h3 {
  color: #e9ecef;
}

.ai-section h3 i {
  color: var(--primary-color);
  margin-right: 8px;
}

.ai-suggestion {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  animation: fadeIn 0.5s ease;
}

.dark .ai-suggestion {
  background-color: #2d3344;
}

.ai-suggestion:hover {
  background-color: #e9ecef;
  transform: translateY(-2px);
}

.dark .ai-suggestion:hover {
  background-color: #353b4e;
}

.ai-suggestion h4 {
  font-size: 14px;
  margin-bottom: 8px;
  color: var(--primary-color);
  font-weight: 600;
}

.ai-suggestion p {
  font-size: 14px;
  color: #6c757d;
  line-height: 1.5;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.dark .ai-suggestion p {
  color: #a0a7b5;
}

.ai-action-btn {
  width: 100%;
  padding: 12px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin-bottom: 10px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.4s ease;
}

.ai-action-btn i {
  margin-right: 8px;
}

.ai-action-btn:hover {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(91, 107, 240, 0.3);
}

.tag-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-suggestion {
  background-color: #eef2ff;
  color: var(--primary-color);
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.dark .tag-suggestion {
  background-color: #2d3a5c;
  color: #7b9fff;
}

.tag-suggestion:hover {
  background-color: #e0e7ff;
  transform: scale(1.05);
}

.dark .tag-suggestion:hover {
  background-color: #35436e;
}

.stats-card {
  background: linear-gradient(135deg, var(--primary-color), #f25f5c);
  color: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  animation: fadeIn 0.6s ease;
}

.stats-card h3 {
  font-size: 16px;
  margin-bottom: 10px;
  opacity: 0.9;
  display: flex;
  align-items: center;
}

.stats-card h3 i {
  margin-right: 8px;
}

.stats-number {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 5px;
}

.stats-desc {
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 15px;
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

@keyframes slideIn {
  from { 
    opacity: 0; 
    transform: translateX(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateX(0); 
  }
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .ai-assistant {
    width: 250px;
  }
}

@media (max-width: 1024px) {
  .ai-assistant {
    display: none;
  }
}
</style>
