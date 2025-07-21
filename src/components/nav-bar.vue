<script setup lang="ts">
import logoUrl from '@/assets/img/logo.png';
import femaleUrl from '@/assets/img/Female.svg';
import maleUrl from '@/assets/img/Male.svg';
import allUrl from '@/assets/img/all.svg';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user-store';
import { computed } from 'vue';

const userStore = useUserStore();
const { selectedGender, isLoading } = storeToRefs(userStore);

const filterOption = [
  { value: 'all', label: 'All', icon: allUrl },
  { value: 'male', label: 'Male', icon: maleUrl },
  { value: 'female', label: 'Female', icon: femaleUrl },
];

function onFilterChange(event: Event) {
  const target = event.target as HTMLInputElement;
  userStore.fetchUsersByGender(target.value as 'all' | 'male' | 'female')
}

const headerStyle = computed(() => {
  const colors = {
    male: '#a8edea',
    female: '#fed6e3',
  };

  if (selectedGender.value === 'all') {
    return {
      background: `linear-gradient(to right, ${colors.female}, ${colors.male})`,
    };
  } else {
    return {
      background: colors[selectedGender.value],
    };
  }
});

</script>

<template>
  <header :style="headerStyle">
    <div class="logo">
      <img :src="logoUrl" alt="logo" width="120" height="120">
      <h1 class="text"><span>Random Users</span></h1>
    </div>
    <div class="filter-inputs">
      <label v-for="option in filterOption" :key="option.value">
        <input class="filter-input" type="radio" name="gender" :value="option.value"
          :checked="selectedGender === option.value" @change="onFilterChange" :disabled="isLoading" />
        <span class="filter-tile">
          <span class="filter-icon">
            <img :src="option.icon" :alt="`${option.label}-icon`" width="40" height="40" />
          </span>
          <span class="radio-label">{{ option.label }}</span>
        </span>
      </label>
    </div>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  padding: 10px 50px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1;
  backdrop-filter: blur(30px);
  box-shadow: 0px 0px 30px rgba(255, 228, 237, 0.37);
  border: 2px solid rgba(255, 255, 255, 0.18);

}

.logo {
  display: flex;
  justify-content: flex-start;
}

.btn {
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
}

.text {
  font-size: 3em;
  margin-left: 100px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter-inputs {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 350px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-left: 600px;
}

.filter-inputs>* {
  margin: 6px;
}

.filter-input:checked+.filter-tile {
  border-color: #2260ff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  color: #2260ff;
}

.filter-input:checked+.filter-tile:before {
  transform: scale(1);
  opacity: 1;
  background-color: #2260ff;
  border-color: #2260ff;
}

.filter-input:checked+.filter-tile .filter-icon svg {
  fill: #2260ff;
}

.filter-input:checked+.filter-tile .radio-label {
  color: #2260ff;
}

.filter-input:focus+.filter-tile {
  border-color: #2260ff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 0 0 4px #b5c9fc;
}

.filter-input:focus+.filter-tile:before {
  transform: scale(1);
  opacity: 1;
}

.filter-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  min-height: 80px;
  border-radius: 0.5rem;
  border: 2px solid #b5bfd9;
  background-color: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: 0.15s ease;
  cursor: pointer;
  position: relative;
}

.filter-tile:before {
  content: "";
  position: absolute;
  display: block;
  width: 0.75rem;
  height: 0.75rem;
  border: 2px solid #b5bfd9;
  background-color: #fff;
  border-radius: 50%;
  top: 0.25rem;
  left: 0.25rem;
  opacity: 0;
  transform: scale(0);
  transition: 0.25s ease;
}

.filter-tile:hover {
  border-color: #2260ff;
}

.filter-tile:hover:before {
  transform: scale(1);
  opacity: 1;
}

.filter-icon svg {
  width: 2rem;
  height: 2rem;
  fill: #494949;
}

.radio-label {
  color: #707070;
  transition: 0.375s ease;
  text-align: center;
  font-size: 13px;
}

.filter-input {
  clip: rect(0 0 0 0);
  -webkit-clip-path: inset(100%);
  clip-path: inset(100%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
</style>
