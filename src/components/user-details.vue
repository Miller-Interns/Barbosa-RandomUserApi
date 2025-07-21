<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user-store';
import maleFrame from '@/assets/img/maleDetails.png';
import femaleFrame from '@/assets/img/femaleDetails.png';


const userStore = useUserStore();
const { selectedUser } = storeToRefs(userStore);

const frameStyle = computed(() => {
  if (!selectedUser.value) {
    return {}
  }

  let backgroundFrame;

  if (selectedUser.value.gender === 'female') {
    backgroundFrame = femaleFrame;
  } else {
    backgroundFrame = maleFrame;
  }

  return {
    backgroundImage: `url(${backgroundFrame})`,
  }
})

const formattedDob = computed(() => {
  if (selectedUser.value) {
    return new Date(selectedUser.value.dob.date).toLocaleDateString();
  }
  return '';
});

const formattedRegisteredDate = computed(() => {
  if (selectedUser.value) {
    return new Date(selectedUser.value.registered.date).toLocaleDateString();
  }
  return '';
});

const formattedAddress = computed(() => {

  if (!selectedUser.value) {
    return '';
  }
  const locationData = selectedUser.value.location;
  const fullAddress =
    locationData.street.number +
    ' ' +
    locationData.street.name +
    ', ' +
    locationData.city +
    ', ' +
    locationData.state +
    ', ' +
    locationData.country +
    ', ' +
    locationData.postcode;

  return fullAddress;
});

</script>

<template>
  <div class="modal-backdrop" @click="userStore.clearSelectedUser()">
    <div class="modal-content" @click.stop :style="frameStyle">
      <template v-if="selectedUser">
        <button class="close-button" @click="userStore.clearSelectedUser()">×</button>

        <div class="modal-header">
          <img :src="selectedUser.picture.large" :alt="`Photo of ${selectedUser.name.first}`" class="modal-photo" />
          <h2>{{ selectedUser.name.title }} {{ selectedUser.name.first }} {{ selectedUser.name.last }}</h2>
          <p class="user-username">@{{ selectedUser.login.username }}</p>
        </div>

        <div class="modal-body">
          <div class="detail-section">
            <h4>Contact Information</h4>
            <div class="detail-item"><strong>Email:</strong> <span>{{ selectedUser.email }}</span></div>
            <div class="detail-item"><strong>Phone:</strong> <span>{{ selectedUser.phone }}</span></div>
            <div class="detail-item"><strong>Cell:</strong> <span>{{ selectedUser.cell }}</span></div>
          </div>

          <div class="detail-section">
            <h4>Personal Details</h4>
            <div class="detail-item"><strong>Gender:</strong> <span>{{ selectedUser.gender }}</span></div>
            <div class="detail-item"><strong>Date of Birth:</strong> <span>{{ formattedDob }} (Age: {{
              selectedUser.dob.age }})</span></div>
            <div class="detail-item"><strong>Nationality:</strong> <span>{{ selectedUser.nat }}</span></div>
            <div class="detail-item"><strong>ID:</strong> <span>{{ selectedUser.id.name || 'N/A' }} - {{
              selectedUser.id.value || 'N/A' }}</span></div>
          </div>

          <div class="detail-section">
            <h4>Location</h4>
            <div class="detail-item"><strong>Address:</strong> <span>{{ formattedAddress }}</span></div>
            <div class="detail-item"><strong>Coordinates:</strong> <span>{{ selectedUser.location.coordinates.latitude
            }}, {{ selectedUser.location.coordinates.longitude }}</span></div>
            <div class="detail-item"><strong>Timezone:</strong> <span>{{ selectedUser.location.timezone.description }}
                ({{ selectedUser.location.timezone.offset }})</span></div>
          </div>

          <div class="detail-section">
            <h4>Account Details</h4>
            <div class="detail-item"><strong>Password:</strong> <span>{{ selectedUser.login.password }}</span></div>
            <div class="detail-item"><strong>Registered:</strong> <span>{{ formattedRegisteredDate }} ({{
              selectedUser.registered.age }} years ago)</span></div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  animation: fadeIn 0.3s ease-out;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.close-button {
  position: absolute;
  top: .5px;
  right: .5px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #333;
  cursor: pointer;
  line-height: 1;
  z-index: 10;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
}

.modal-header {
  background-color: transparent;
  text-align: center;
  border-bottom: none;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.modal-photo {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 5px solid white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.5rem;
  margin-top: 1rem;
  margin-left: .75rem;
  background-color: #e0e0e0;
}

.modal-header h2 {
  margin: 0;
  color: #333;
}

.user-username {
  color: #666;
  margin-top: 0.25rem;
  font-family: monospace;
}

.modal-body {
  overflow-y: auto;
  padding: 0 2rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background-color: transparent;
}

.detail-section h4 {
  padding-top: 1rem;
  margin-top: 1rem;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  color: #2260ff;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 0.5rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.5rem 0;
  font-size: 0.95rem;
}

.detail-item strong {
  color: #555;
  margin-right: 1rem;
  white-space: nowrap;
}

.detail-item span {
  color: #333;
  text-align: right;
  word-break: break-all;
}
</style>
