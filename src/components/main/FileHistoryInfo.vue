<template>
  <div>
    <div class="h-[20rem] bg-white shadow-sm rounded-lg p-4 mb-5">
      <div class="mb-2">
        <h2 class="text-xl font-bold mb-4">SaaS별 히스토리</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead class="bg-indigo-900">
            <tr>
              <th class="px-2 py-4 w-[30%] text-left text-sm font-bold font-medium text-white tracking-wider">SaaS</th>
              <th class="px-1 py-4 w-[15%] text-center text-sm font-bold font-medium text-white tracking-wider">업로드</th>
              <th class="px-1 py-4 w-[15%] text-center text-sm font-bold font-medium text-white tracking-wider">수정</th>
              <th class="px-1 py-4 w-[15%] text-center text-sm font-bold font-medium text-white tracking-wider">삭제</th>
              <th class="px-1 py-4 w-[25%] text-left text-sm font-bold font-medium text-white tracking-wider">마지막 활동</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <template v-for="(info, index) in InfoValues" :key="index">
              <tr class="hover:bg-gray-100 cursor-pointer">
                <td class="flex items-center justify-center px-2 py-4">
                  <img class="flex-shrink-0 size-5 rounded-full mr-2" :src="getSaasImg(convertSaasName(info.saas))" :alt="info.saas" />
                  <div class="w-full text-sm font-semibold truncate capitalize">{{ convertSaasName(info.saas) }}</div>
                </td>
                <td class="px-1 py-4">
                  <div class="w-full text-sm text-center">{{ info.upload }}</div>
                </td>
                <td class="px-1 py-4">
                  <div class="w-full text-sm text-center">{{ info.change }}</div>
                </td>
                <td class="px-1 py-4">
                  <div class="w-full text-sm text-center">{{ info.delete }}</div>
                </td>
                <td class="px-1 py-4">
                  <div class="w-full text-sm text-left">{{ info.lastActivity }}</div>
                </td>
                
                
              </tr>
            </template>
              <!-- Accordion row -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { getSaasImg, removeWordDate, convertSaasName } from '@/utils/utils.js'

const props = defineProps({
  fileHistoryInfo: {
    type: Object,
    required: true
  }
});

const InfoValues = ref(props.fileHistoryInfo);

</script>

<style scoped>
/* You can add custom styles here if needed */
</style>