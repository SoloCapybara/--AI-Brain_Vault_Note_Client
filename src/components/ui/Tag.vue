<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  removable?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  removable: false,
  disabled: false
})

const emit = defineEmits<{
  remove: []
  click: [event: MouseEvent]
}>()

const tagClasses = computed(() => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-all duration-200'
  
  const variantClasses = {
    default: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-700 dark:text-secondary-200',
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200',
    secondary: 'bg-secondary-200 text-secondary-800 dark:bg-secondary-600 dark:text-secondary-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-sm'
  }
  
  const interactiveClasses = props.disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer hover:scale-105 active:scale-95'
  
  return [
    baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size],
    interactiveClasses
  ].join(' ')
})

const handleRemove = (event: MouseEvent) => {
  event.stopPropagation()
  if (!props.disabled) {
    emit('remove')
  }
}

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <span
    :class="tagClasses"
    @click="handleClick"
  >
    <slot />
    <button
      v-if="removable"
      class="ml-1 hover:bg-black hover:bg-opacity-10 rounded-full p-0.5 transition-colors duration-200"
      @click="handleRemove"
    >
      <i class="fas fa-times text-xs"></i>
    </button>
  </span>
</template>
