<template>
  <label class="radio-label-wrapper">
    <input class="radio-input" type="radio" :name="name" :value="value" :checked="modelValue === value"
      @change="$emit('update:modelValue', value)" />
    <span class="radio-tile">
      <span class="radio-icon">
        <slot name="icon"></slot>
      </span>
      <span class="radio-label">{{ label }}</span>
    </span>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string | null;
  value: string;
  name: string;
  label: string;
}>();

defineEmits(['update:modelValue']);
</script>

<style scoped>
.radio-tile {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 0.5rem;
  border: 2px solid #b5bfd9;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: 0.15s ease;
  cursor: pointer;
  position: relative;
}

.radio-icon svg {
  width: 80px;
  height: 80px;
  stroke: #2260ff;
}

.radio-label {
  color: #707070;
  font-weight: 500;
  letter-spacing: 1px;
  font-size: 14px;
}

.radio-input {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.radio-input:checked+.radio-tile {
  border-color: #2260ff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 0 0 4px #b5c9fc;
}

.radio-input:checked+.radio-tile .radio-icon svg {
  stroke: #2260ff;
}

.radio-input:checked+.radio-tile .radio-label {
  color: #2260ff;
}
</style>
