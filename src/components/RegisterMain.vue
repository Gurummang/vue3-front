<template>
  <div class="px-6">
    <!-- SaaS 통계 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div class="bg-white shadow rounded-lg p-4">
        <h3 class="text-2xl font-semibold text-gray-700">총 연동 SaaS</h3>
        <p class="text-3xl font-bold">{{ saasData.length }}</p>
      </div>
      <div class="bg-white shadow rounded-lg p-4">
        <h3 class="text-2xl font-semibold text-gray-700">연동된 SaaS</h3>
        <p class="text-3xl font-bold">{{ connectedCount }}</p>
      </div>
      <div class="bg-white shadow rounded-lg p-4">
        <h3 class="text-2xl font-semibold text-gray-700">연동 중인 SaaS</h3>
        <p class="text-3xl font-bold">{{ connectingCount }}</p>
      </div>
      <div class="bg-white shadow rounded-lg p-4">
        <h3 class="text-2xl font-semibold text-gray-700">연동 못한 SaaS</h3>
        <p class="text-3xl font-bold">{{ failConnectCount }}</p>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg p-4">
      <!-- SaaS 연동 섹션 -->
      <div class="mb-6">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">SaaS 연동</h2>
        <div class="space-x-4">
          <button 
          class="inline-block rounded border border-orange-500 px-6 py-3 align-text-bottom text-xl font-bold text-orange-500 hover:bg-orange-500 hover:text-white active:bg-orange-500"
          @click="openconnectModal"
          >
            <v-icon :size="30">mdi-cloud-upload</v-icon> SaaS 연동
          </button>
          <button
            class="inline-block rounded border border-indigo-900 px-6 py-3 align-text-bottom text-xl font-bold text-indigo-900 hover:bg-indigo-900 hover:text-white active:bg-indigo-900"
            @click="openModificationModal"
          >
            <v-icon :size="30">mdi-cloud</v-icon> SaaS 수정
          </button>
          <button
            class="inline-block rounded border border-rose-600 px-6 py-3 align-text-bottom text-xl font-bold text-rose-600 hover:bg-rose-600 hover:text-white active:bg-rose-600"
            @click="openUnconnectModal"
          >
            <v-icon :size="30">mdi-cloud-off</v-icon> SaaS 해제
          </button>
        </div>
      </div>

      <!-- SaaS 테이블 -->
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead class="bg-indigo-900">
            <tr>
              <th class="px-6 py-3 text-left text-lg font-bold font-medium text-white tracking-wider">선택</th>
              <th class="px-6 py-3 text-left text-lg font-bold font-medium text-white tracking-wider">연동</th>
              <th class="px-6 py-3 text-left text-lg font-bold font-medium text-white tracking-wider">SaaS</th>
              <th class="px-6 py-3 text-left text-lg font-bold font-medium text-white tracking-wider">관리자 계정</th>
              <th class="px-6 py-3 text-left text-lg font-bold font-medium text-white tracking-wider">Webhook URL</th>
              <th class="px-6 py-3 text-left text-lg font-bold font-medium text-white tracking-wider">별칭</th>
              <th class="px-6 py-3 text-left text-lg font-bold font-medium text-white tracking-wider">연동날짜</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(saas, index) in saasData" :key="index">
              <td class="px-6 py-4 whitespace-nowrap">
                <input 
                  type="radio" 
                  name="saas"
                  class="form-radio h-4 w-4"
                  :value="saas"
                  v-model="selectedSaas"
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span v-if="saas.status === 'connect'">
                  <v-icon :size="30" class="text-orange-500">mdi-eye</v-icon>
                  </span>
                <span v-else-if="saas.status === 'connecting'">
                  <v-icon :size="30" class="text-yellow-300">mdi-eye</v-icon>
                </span>
                <span v-else-if="saas.status === 'unconnect'">
                  <v-icon :size="30" class="text-gray-200">mdi-eye-off</v-icon>
                </span>
                <span v-else>
                  <v-icon :size="30" class="text-rose-600">mdi-eye-off</v-icon>
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img class="h-8 w-8 rounded-full mr-2" :src="getSaasImg(saas.name)" :alt="saas.name" />
                  <span class="text-lg font-bold"> {{ saas.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-lg">{{ saas.adminEmail }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-lg">{{ saas.webhookUrl }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-lg">{{ saas.alias }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-lg">{{ saas.registerDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- SaaS 테이블 -->
    </div>
  </div>

  <saas-connect-modal 
    v-if="isconnectModalOpen"
    @close="closeconnectModal"
  ></saas-connect-modal>

  <saas-modification-modal
    v-if="isModificationModalOpen"
    :selectedSaas="selectedSaas"
    @close="closeModificationModal"
  ></saas-modification-modal>

  <saas-unconnect-modal
    v-if="isUnconnectModalOpen"
    :selectedSaas="selectedSaas"
    @close="closeUnconnectModal"
  ></saas-unconnect-modal>
  <!-- <axios-test></axios-test> -->
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios'
import SaasConnectModal from '@/components/modals/SaasConnectModal.vue'
import SaasModificationModal from '@/components/modals/SaasModificationModal.vue'
import SaasUnconnectModal from '@/components/modals/SaasUnconnectModal.vue'
import { getSaasImg } from '@/utils/utils.js'
// import AxiosTest from '@/components/AxiosTest.vue'

const isconnectModalOpen = ref(false);
const isModificationModalOpen = ref(false);
const isUnconnectModalOpen = ref(false);
const selectedSaas = ref(null);

const openconnectModal = () => {
  isconnectModalOpen.value = true;
};

const closeconnectModal = () => {
  isconnectModalOpen.value = false;
}

const openModificationModal = () => {
  if(selectedSaas.value) {
    isModificationModalOpen.value = true;
  } else {
    alert('SaaS를 선택해주세요.');
  }
}

const closeModificationModal = () => {
  isModificationModalOpen.value = false;
  selectedSaas.value = null;
}

const openUnconnectModal = () => {
  if(selectedSaas.value) {
    isUnconnectModalOpen.value = true;
  } else {
    alert('해제할 SaaS를 선택해주세요.');
  }
};

const closeUnconnectModal = () => {
  isUnconnectModalOpen.value = false;
  selectedSaas.value = null;
}

const handleSubmit = (data) => {
  console.log('SaaS 연동 데이터:', data);
  // 여기서 연동 로직을 처리합니다.
};

const saasData = ref([
  { id: 1, name: 'Jira', status: 'connect', adminEmail: 'aabbcccc@구름.com', webhookUrl: 'webhook@구름.com', alias: 'Jira연결', registerDate: '2024-00-01', apiToken: '1234'},
  { id: 2, name: 'Slack', status: 'connecting', adminEmail: 'aaabbccc@구름.com', webhookUrl: 'webhook@구름.com', alias: 'Slack 연결', registerDate: '2024-00-02', apiToken: '2345'},
  { id: 3, name: 'Slack', status: 'connect', adminEmail: 'aaabbccc@구름.com', webhookUrl: '-', alias: '', registerDate: '2024-00-03', apiToken: '9876'},
  { id: 4, name: 'Jira', status: 'failconnect', adminEmail: 'aabbcccc@구름.com', webhookUrl: 'webhook@구름.com', alias: '', registerDate: '2024-00-04', apiToken: ''},
  { id: 5, name: 'Jira', status: 'failconnect', adminEmail: '-', webhookUrl: '-', alias: '', registerDate: '-', apiToken: ''},
]);

// 통계 수치
const connectedCount = computed(() => saasData.value.filter(saas => saas.status === 'connect').length);
const connectingCount = computed(() => saasData.value.filter(saas => saas.status === 'connecting').length);
const failConnectCount = computed(() => saasData.value.filter(saas => saas.status === 'failconnect').length);

</script>
