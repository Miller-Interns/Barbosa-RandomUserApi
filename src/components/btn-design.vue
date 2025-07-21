<script setup lang="ts">
import searchUrl from '@/assets/img/search.svg';

</script>

<template>
  <button class="cssbuttons-io-button"> Fetch New Set Of Users
    <div class="icon">
      <img :src="searchUrl" alt="search-icon" width="25px" height="25px">
    </div>
  </button>
</template>

<style scoped>
.cssbuttons-io-button {
  background-color: #96AE9D;
  color: white;
  font-family: inherit;
  padding: 0.35em;
  padding-left: 1.2em;
  font-size: 17px;
  border-radius: 10em;
  border: none;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  height: 2.8em;
  padding-right: 3.3em;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 500;
  box-shadow: 0 0 1.6em rgba(183, 33, 255, 0.3), 0 0 1.6em hsla(191, 98%, 56%, 0.3);
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
}

.cssbuttons-io-button .icon {
  background: #F9F0EC;
  margin-left: 1em;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.2em;
  width: 2.2em;
  border-radius: 10em;
  right: 0.3em;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
}

.cssbuttons-io-button:hover .icon {
  width: calc(100% - 0.6em);
}

.cssbuttons-io-button .icon svg {
  width: 1.1em;
  transition: transform 0.3s;
  color: #B721FF;
}

.cssbuttons-io-button:hover .icon svg {
  transform: translateX(0.1em);
}

.cssbuttons-io-button:active .icon {
  transform: scale(0.9);
}
</style>
