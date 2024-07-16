<template>
  <div class="px-6">
    <!-- SaaS 통계 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div class="bg-white shadow rounded-lg p-4">
        <h3 class="text-2xl font-semibold text-gray-700">지원하는 SaaS</h3>
        <p class="text-3xl font-bold">{{ saasData.length }}</p>
      </div>
      <div class="bg-white shadow rounded-lg p-4">
        <h3 class="text-2xl font-semibold text-gray-700">연동 SaaS</h3>
        <p class="text-3xl font-bold">{{ connectedCount }}</p>
      </div>
      <div class="bg-white shadow rounded-lg p-4">
        <h3 class="text-2xl font-semibold text-gray-700">미연동 SaaS</h3>
        <p class="text-3xl font-bold">{{ unconnectCount }}</p>
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
          @click="openModal"
          >
            <v-icon :size="30">mdi-cloud-upload</v-icon> SaaS 연동
          </button>
          <button
            class="inline-block rounded border border-indigo-900 px-6 py-3 align-text-bottom text-xl font-bold text-indigo-900 hover:bg-indigo-900 hover:text-white active:bg-indigo-900"
          >
            <v-icon :size="30">mdi-cloud</v-icon> SaaS 편집
          </button>
          <button
            class="inline-block rounded border border-rose-600 px-6 py-3 align-text-bottom text-xl font-bold text-rose-600 hover:bg-rose-600 hover:text-white active:bg-rose-600"
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
                  v-model="selectedSaaS"
                  @change="handleSelection"
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
                  <img class="h-8 w-8 rounded-full mr-2" :src="getSaasLogo(saas.name)" :alt="saas.name" />
                  <span class="text-lg font-bold"> {{ saas.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-lg">{{ saas.adminAccount }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-lg">{{ saas.webhookUrl }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-lg">{{ saas.saasAlias }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-lg">{{ saas.integrationDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- SaaS 테이블 -->
    </div>
  </div>

  <saas-integration-modal 
    :isOpen="isModalOpen" 
    :selectedSaaSData="selectedSaaSData"
    @close="closeModal"
  ></saas-integration-modal>
  <!-- <axios-test></axios-test> -->
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios'
import SaasIntegrationModal from '@/components/modals/SaasIntegrationModal.vue'
// import AxiosTest from '@/components/AxiosTest.vue'

const isModalOpen = ref(false);
const selectedSaaS = ref(null);
const selectedSaaSData = ref(null);

const openModal = () => {
  if (selectedSaaS.value) {
    // 선택된 SaaS의 전체 데이터를 찾아서 저장
    selectedSaaSData.value = saasData.value.find(saas => saas.name === selectedSaaS.value.name);
    // alert(selectedSaaSData);
    isModalOpen.value = true;
  } else {
    alert('SaaS를 선택해주세요.');
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedSaaSData.value = null; // 모달을 닫을 때 선택된 데이터 초기화
}

const handleSubmit = (data) => {
  console.log('SaaS 연동 데이터:', data);
  // 여기서 연동 로직을 처리합니다.
};

const handleSelection = () => {
  console.log(selectedSaaS.value);
};


const saasData = ref([
  { name: 'Jira', status: 'connect', adminAccount: 'aabbcccc@구름.com', webhookUrl: 'webhook@구름.com', saasAlias: 'Jira연결', integrationDate: '2024-00-01', whProvide: true},
  { name: 'Slack', status: 'connecting', adminAccount: 'aaabbccc@구름.com', webhookUrl: 'webhook@구름.com', saasAlias: 'Slack 연결', integrationDate: '2024-00-02', whProvide: false},
  { name: 'Slack', status: 'connect', adminAccount: 'aaabbccc@구름.com', webhookUrl: '-', saasAlias: '', integrationDate: '2024-00-03', whProvide: false},
  { name: 'Jira', status: 'unconnect', adminAccount: 'aabbcccc@구름.com', webhookUrl: 'webhook@구름.com', saasAlias: '', integrationDate: '2024-00-04', whProvide: false},
  { name: 'Jira', status: 'error', adminAccount: '-', webhookUrl: '-', saasAlias: '', integrationDate: '-', whProvide: false},
]);

// 통계 수치
const connectedCount = computed(() => saasData.value.filter(saas => saas.status === 'connect').length);
const unconnectCount = computed(() => saasData.value.filter(saas => saas.status === 'unconnect').length);
const failConnectCount = computed(() => saasData.value.length - connectedCount.value - unconnectCount.value);

const getSaasLogo = (name) => {
  // 이름을 소문자로 변환하고 공백을 제거합니다.
  const formattedName = name.toLowerCase().replace(/\s+/g, '');
  // 동적으로 이미지 경로를 생성합니다.
  return `./src/assets/${formattedName}.png`;
};
</script>
