<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: string
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  error?: boolean
  errorMessage?: string
  label?: string
  hint?: string
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  iconPosition?: 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  error: false,
  size: 'md'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  input: [event: Event]
}>()

const inputClasses = computed(() => {
  const baseClasses = 'w-full border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0'
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  }
  
  const stateClasses = props.error
    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-600'
    : 'border-secondary-300 focus:ring-primary-500 focus:border-primary-500 dark:border-secondary-600 dark:focus:border-primary-500'
  
  const disabledClasses = props.disabled
    ? 'bg-secondary-50 text-secondary-500 cursor-not-allowed dark:bg-secondary-800 dark:text-secondary-400'
    : 'bg-white text-secondary-900 dark:bg-secondary-800 dark:text-secondary-100'
  
  return [
    baseClasses,
    sizeClasses[props.size],
    stateClasses,
    disabledClasses
  ].join(' ')
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', event)
}
</script>

<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
      {{ label }}
    </label>
    
    <div class="relative">
      <i v-if="icon && iconPosition === 'left'" :class="[icon, 'absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400']"></i>
      
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :class="[
          inputClasses,
          icon && iconPosition === 'left' ? 'pl-10' : '',
          icon && iconPosition === 'right' ? 'pr-10' : ''
        ]"
        @input="handleInput"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
      />
      
      <i v-if="icon && iconPosition === 'right'" :class="[icon, 'absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400']"></i>
    </div>
    
    <p v-if="error && errorMessage" class="mt-1 text-sm text-red-600 dark:text-red-400">
      {{ errorMessage }}
    </p>
    
    <p v-else-if="hint" class="mt-1 text-sm text-secondary-500 dark:text-secondary-400">
      {{ hint }}
    </p>
  </div>
</template>
