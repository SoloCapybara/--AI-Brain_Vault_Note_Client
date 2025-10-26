<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
  size: 'md',
  color: 'primary'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

const switchClasses = computed(() => {
  const baseClasses = 'relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const sizeClasses = {
    sm: 'h-4 w-7',
    md: 'h-6 w-11',
    lg: 'h-8 w-14'
  }
  
  const colorClasses = {
    primary: props.modelValue
      ? 'bg-primary-500 focus:ring-primary-500'
      : 'bg-secondary-300 focus:ring-secondary-500 dark:bg-secondary-600',
    secondary: props.modelValue
      ? 'bg-secondary-500 focus:ring-secondary-500'
      : 'bg-secondary-300 focus:ring-secondary-500 dark:bg-secondary-600',
    success: props.modelValue
      ? 'bg-green-500 focus:ring-green-500'
      : 'bg-secondary-300 focus:ring-secondary-500 dark:bg-secondary-600',
    warning: props.modelValue
      ? 'bg-yellow-500 focus:ring-yellow-500'
      : 'bg-secondary-300 focus:ring-secondary-500 dark:bg-secondary-600',
    danger: props.modelValue
      ? 'bg-red-500 focus:ring-red-500'
      : 'bg-secondary-300 focus:ring-secondary-500 dark:bg-secondary-600'
  }
  
  const disabledClasses = props.disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer'
  
  return [
    baseClasses,
    sizeClasses[props.size],
    colorClasses[props.color],
    disabledClasses
  ].join(' ')
})

const thumbClasses = computed(() => {
  const baseClasses = 'inline-block bg-white rounded-full shadow transform transition-transform duration-200'
  
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-5 w-5',
    lg: 'h-7 w-7'
  }
  
  const positionClasses = props.modelValue
    ? 'translate-x-3 sm:translate-x-3 md:translate-x-5 lg:translate-x-6'
    : 'translate-x-0'
  
  return [
    baseClasses,
    sizeClasses[props.size],
    positionClasses
  ].join(' ')
})

const handleClick = () => {
  if (!props.disabled) {
    const newValue = !props.modelValue
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}
</script>

<template>
  <button
    :class="switchClasses"
    :disabled="disabled"
    @click="handleClick"
  >
    <span :class="thumbClasses"></span>
  </button>
</template>
