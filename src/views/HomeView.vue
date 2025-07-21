<script setup lang="ts">
import { onMounted } from 'vue';
import Button from '@/components/btn-design.vue';
import loadingDesign from '@/components/loading-design.vue';
import femaleFrame from '@/assets/img/femaleFrame.png';
import maleFrame from '@/assets/img/maleFrame.png';
import { type User } from '@/interface/user-interface';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user-store';
import UserDetailsModal from '@/components/user-details.vue';
import ArrowButton from '@/components/arrow-btn.vue';

const useStore = useUserStore();
const { paginatedUsers, currentPage, totalPages, isLoading, error, selectedUser } = storeToRefs(useStore);

function getFrameForUser(user: User): string {
  if (user.gender === 'female') {
    return femaleFrame;
  } else {
    return maleFrame;
  }
}

onMounted(() => {
  useStore.initialize();
});
</script>

<template>
  <div class="main-container">
    <div class="container">
      <Button @click="useStore.fetchNewSet" :disabled="isLoading">Fetch New Set of Users</Button>
    </div>
    <div class="gallery-container">
      <div v-if="isLoading" class="loading-icon">
        <loadingDesign />
      </div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <div v-else-if="paginatedUsers.length > 0" class="user-gallery">
        <div v-for="user in paginatedUsers" :key="user.login.uuid" class="user-frame clickable"
          :style="{ backgroundImage: `url(${getFrameForUser(user)})` }" @click="useStore.selectUser(user)">
          <img :src="user.picture.large" :alt="`Photo of ${user.name.first}`" class="user-photo" />
          <p class="user-name">{{ user.name.first }} {{ user.name.last }}</p>
        </div>
      </div>
      <div v-else class="no-users-message">Click "Fetch New Set of Users" to begin.</div>
      <div v-if="paginatedUsers.length > 0" class="pagination-controls">
        <ArrowButton @click="useStore.prevPage" :disabled="currentPage === 1 || isLoading" direction="left"
          text="Previous" />
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <ArrowButton @click="useStore.nextPage" :disabled="currentPage === totalPages || isLoading" direction="right"
          text="Next" />
      </div>
    </div>
    <UserDetailsModal v-if="selectedUser" />
  </div>
</template>

<style scoped>
.clickable {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.clickable:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 140px 2rem 2rem 2rem;
}

.container {
  display: flex;
  justify-content: center;
  gap: .5rem;
  width: 100%;
  margin-bottom: 1rem;
}

.gallery-container {
  margin-top: 1rem;
  width: 100%;
  min-height: 500px;
  display: grid;
  justify-items: center;
}

.user-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  max-width: 1000px;
}

.user-frame {
  width: 250px;
  height: 250px;
  border-radius: 5%;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.user-photo {
  width: 53%;
  height: 53%;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  top: 13%;
  left: 23.5%;
  background-color: #f0f0f0;
}

.user-name {
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
  color: #3a3a3a;
  text-shadow: 0px 1px 3px rgba(255, 255, 255, 0.4);
}

.pagination-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
  width: 100%;
}

.pagination-controls span {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

.no-users-message,
.error-message,
.loading-icon {
  font-size: 1.2rem;
  color: #555;
  padding-top: 5rem;
  text-align: center;
}

.loading-icon {
  margin-top: 100px;
}
</style>
