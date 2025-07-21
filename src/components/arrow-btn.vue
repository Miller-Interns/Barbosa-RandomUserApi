<script setup lang="ts">
import { computed } from 'vue';
import leftArrowUrl from '@/assets/img/back.png';
import rightArrowUrl from '@/assets/img/next.png';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  direction: {
    type: String,
    default: 'right',
    validator: (value: string) => ['left', 'right'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['click']);
const iconUrl = computed(() => {
  return props.direction === 'left' ? leftArrowUrl : rightArrowUrl;
});

function handleClick() {
  if (!props.disabled) {   emit('click');
  }
}
</script>

<template>
  <button :class="['arrow-button', `direction-${direction}`]" @click="handleClick" :disabled="disabled">
    {{ text }}
    <div class="icon">
      <img :src="iconUrl" alt="arrow-icon" width="25px" height="25px">
    </div>
  </button>
</template>

<style scoped>
.arrow-button {
  color: white;
  font-family: inherit;
  padding: 0.35em;
  font-size: 17px;
  border-radius: 10em;
  border: none;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  height: 2.8em;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 500;
  box-shadow: 0 0 1.6em rgba(183, 33, 255, 0.3), 0 0 1.6em hsla(191, 98%, 56%, 0.3);
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
  background-color: #96AE9D;
}

.arrow-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  box-shadow: none;
}

.arrow-button .icon {
  background: #F9F0EC;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.2em;
  width: 2.2em;
  border-radius: 10em;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
}

.arrow-button:active .icon {
  transform: scale(0.9);
}

.arrow-button.direction-right {
  padding-left: 1.2em;
  padding-right: 3.3em;
}

.arrow-button.direction-right .icon {
  right: 0.3em;
  margin-left: 1em;
}

.arrow-button.direction-right:hover .icon {
  width: calc(100% - 0.6em);
}


.arrow-button.direction-left {
  flex-direction: row-reverse;
  padding-right: 1.2em;
  padding-left: 3.3em;
}

.arrow-button.direction-left .icon {
  left: 0.3em;
  margin-right: 1em;
}

.arrow-button.direction-left:hover .icon {
  width: calc(100% - 0.6em);
}
</style>
