<template>
  <div class="pb-5">
    <!-- SaaS 통계 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">

      <div class="flex items-center bg-white shadow-sm rounded-lg p-4">
        <div>
          <h3 class="font-semibold text-gray-700">총 연동 SaaS</h3>
          <p class="text-3xl font-semibold">{{ saasData.length }}</p>
        </div>
        <v-icon :size="44" class="text-orange ml-auto">mdi-clouds</v-icon>
      </div>
      <div class="flex items-center bg-white shadow-sm rounded-lg p-4">
        <div>
          <h3 class="font-semibold text-gray-700">연동된 SaaS</h3>
          <p class="text-3xl font-semibold">{{ connectedCount }}</p>
        </div>
        <v-icon :size="44" class="text-green-500 ml-auto">mdi-cloud-check-outline</v-icon>
      </div>
      <div class="flex items-center bg-white shadow-sm rounded-lg p-4">
        <div>
          <h3 class="font-semibold text-gray-700">연동 중인 SaaS</h3>
          <p class="text-3xl font-semibold">{{ connectingCount }}</p>
        </div>
        <v-icon :size="44" class="text-yellow-300 ml-auto">mdi-cloud-sync-outline</v-icon>
      </div>
      <div class="flex items-center bg-white shadow-sm rounded-lg p-4">
        <div>
          <h3 class="font-semibold text-gray-700">연동 못한 SaaS</h3>
          <p class="text-3xl font-semibold">{{ failConnectCount }}</p>
        </div>
        <v-icon :size="44" class="text-rose-600 ml-auto">mdi-cloud-remove-outline</v-icon>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg p-4">
      <!-- SaaS 연동 섹션 -->
      <div class="mb-2">
        <h2 class="text-xl font-bold text-gray-800 mb-4">SaaS 연동</h2>
        <div class="space-x-2">
          <button 
          class="inline-block rounded border border-orange-500 px-3 py-2 align-text-bottom text-sm font-semibold text-orange-500 hover:bg-orange-500 hover:text-white active:bg-orange-500"
          @click="openconnectModal"
          >
            <v-icon :size="20">mdi-cloud-upload</v-icon> SaaS 연동
          </button>
          <button
            class="inline-block rounded border border-indigo-900 px-3 py-2 align-text-bottom text-sm font-semibold text-indigo-900 hover:bg-indigo-900 hover:text-white active:bg-indigo-900"
            @click="openModificationModal"
          >
            <v-icon :size="20">mdi-cloud</v-icon> SaaS 수정
          </button>
          <button
            class="inline-block rounded border border-rose-600 px-3 py-2 align-text-bottom text-sm font-semibold text-rose-600 hover:bg-rose-600 hover:text-white active:bg-rose-600"
            @click="openUnconnectModal"
          >
            <v-icon :size="20">mdi-cloud-off</v-icon> SaaS 해제
          </button>
        </div>
      </div>

      <!-- SaaS 테이블 -->
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead class="bg-indigo-900">
            <tr>
              <th class="px-3 py-3 w-[6%] text-center text-sm font-bold font-medium text-white tracking-wider">선택</th>
              <th class="px-3 py-3 w-[6%] text-center text-sm font-bold font-medium text-white tracking-wider">연동</th>
              <th class="px-3 py-3 w-[12%] text-left text-sm font-bold font-medium text-white tracking-wider">SaaS</th>
              <th class="px-3 py-3 w-[15%] text-left text-sm font-bold font-medium text-white tracking-wider">관리자 계정</th>
              <th class="px-3 py-3 w-[11%] text-left text-sm font-bold font-medium text-white tracking-wider">별칭</th>
              <th class="px-3 py-3 w-[40%] text-left text-sm font-bold font-medium text-white tracking-wider">Webhook URL</th>
              <th class="px-3 py-3 w-[10%] text-left text-sm font-bold font-medium text-white tracking-wider">연동날짜</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(saas, index) in saasData" :key="index">
              <td class="px-3 py-2 whitespace-nowrap text-center">
                <input 
                  type="radio" 
                  name="saas"
                  class="form-radio size-3"
                  :value="saas"
                  v-model="selectedSaas"
                />
              </td>
              <td class="px-3 py-2 whitespace-nowrap text-center">
                <span v-if="saas.status === 1">
                  <v-icon :size="24" class="text-green-500">mdi-eye</v-icon>
                  </span>
                <span v-else-if="saas.status === 0">
                  <v-icon :size="24" class="text-yellow-300">mdi-eye</v-icon>
                </span>
                <span v-else-if="saas.status === -1">
                  <v-icon :size="24" class="text-gray-200">mdi-eye-off</v-icon>
                </span>
                <span v-else>
                  <v-icon :size="24" class="text-rose-600">mdi-eye-off</v-icon>
                </span>
              </td>
              <td class="px-3 py-2 whitespace-nowrap">
                <div class="flex items-center">
                  <img class="size-5 rounded-full mr-2" :src="getSaasImg(convertSaasName(saas.name))" :alt="saas.name" />
                  <span class="text-sm capitalize"> {{ convertSaasName(saas.name) }}</span>
                </div>
              </td>
              <td class="px-3 py-2 whitespace-nowrap text-xs max-w-1 truncate">{{ saas.adminEmail }}</td>
              <td class="px-3 py-2 whitespace-nowrap text-xs max-w-1 truncate">{{ saas.alias }}</td>
              <td class="px-3 py-2 whitespace-nowrap text-xs max-w-1 truncate">{{ saas.webhookUrl }}</td>
              <td class="px-3 py-2 whitespace-nowrap text-xs">{{ getDate(saas.registerDate) }}</td>
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
import { ref, defineProps, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'
import SaasConnectModal from '@/components/modals/SaasConnectModal.vue'
import SaasModificationModal from '@/components/modals/SaasModificationModal.vue'
import SaasUnconnectModal from '@/components/modals/SaasUnconnectModal.vue'
import { getSaasImg, getDate, convertSaasName } from '@/utils/utils.js'

const props = defineProps({
  responseData: {
    type: Object,
    required: true
  }
});

const isconnectModalOpen = ref(false);
const isModificationModalOpen = ref(false);
const isUnconnectModalOpen = ref(false);
const selectedSaas = ref(null);

const saasData = ref(props.responseData);

const router = useRouter();

const openconnectModal = () => {
  isconnectModalOpen.value = true;
};

const closeconnectModal = () => {
  isconnectModalOpen.value = false;
  router.go();
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
  router.go();
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
  router.go();
}

// 통계 수치
const connectedCount = computed(() => saasData.value.filter(saas => saas.status === 1).length);
const connectingCount = computed(() => saasData.value.filter(saas => saas.status === 0).length);
const failConnectCount = computed(() => saasData.value.filter(saas => saas.status === 99).length);

</script>
