<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md',
  hover: false,
  clickable: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const cardClasses = computed(() => {
  const baseClasses = 'rounded-lg transition-all duration-200'
  
  const variantClasses = {
    default: 'bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700',
    elevated: 'bg-white dark:bg-secondary-800 shadow-soft hover:shadow-medium',
    outlined: 'bg-transparent border-2 border-secondary-300 dark:border-secondary-600',
    filled: 'bg-secondary-50 dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-700'
  }
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  }
  
  const interactiveClasses = props.clickable
    ? 'cursor-pointer hover:shadow-medium active:scale-[0.98]'
    : props.hover
    ? 'hover:shadow-medium'
    : ''
  
  return [
    baseClasses,
    variantClasses[props.variant],
    paddingClasses[props.padding],
    interactiveClasses
  ].join(' ')
})

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>

<template>
  <div
    :class="cardClasses"
    @click="handleClick"
  >
    <slot />
  </div>
</template>
