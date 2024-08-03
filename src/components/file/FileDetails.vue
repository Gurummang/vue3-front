<template>
  <div class="bg-white shadow-sm rounded-lg p-4">
      <!-- SaaS 연동 섹션 -->
      <div class="mb-2">
        <h2 class="text-xl font-bold text-gray-800 mb-4">파일 검사</h2>
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
            <tr class="">
              <th class="px-2 py-3 w-[5%] text-left text-sm font-bold font-medium text-white tracking-wider">선택</th>
              <th class="px-2 py-3 w-[5%] text-left text-sm font-bold font-medium text-white tracking-wider">DLP</th>
              <th class="px-2 py-3 w-[7%] text-left text-sm font-bold font-medium text-white tracking-wider">악성탐지</th>
              <th class="px-2 py-3 w-[7%] text-left text-sm font-bold font-medium text-white tracking-wider">VirusTotal</th>
              <th class="px-2 py-3 w-auto text-left text-sm font-bold font-medium text-white tracking-wider">파일명</th>
              <th class="px-2 py-3 w-[10%] text-left text-sm font-bold font-medium text-white tracking-wider">파일 유형</th>
              <th class="px-2 py-3 w-[7%] text-left text-sm font-bold font-medium text-white tracking-wider">SaaS</th>
              <th class="px-2 py-3 w-[15%] text-left text-sm font-bold font-medium text-white tracking-wider">사용자</th>
              <th class="px-2 py-3 w-[15%] text-left text-sm font-bold font-medium text-white tracking-wider">생성 날짜</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(details, index) in fileDetails" :key="index">
              <td class="px-2 py-2 whitespace-nowrap">
                <input 
                  type="radio" 
                  name="details"
                  class="form-radio size-3"
                  :value="details"
                  v-model="selectedSaas"
                />
              </td>
              <td class="px-2 py-2 whitespace-nowrap">
                <span v-if="details.detect === 0">
                  <v-icon :size="24" class="text-orange-500">mdi-eye</v-icon>
                  </span>
                <span v-else-if="details.detect === 1">
                  <v-icon :size="24" class="text-yellow-300">mdi-eye</v-icon>
                </span>
                <span v-else-if="details.detect === 2">
                  <v-icon :size="24" class="text-gray-200">mdi-eye-off</v-icon>
                </span>
                <span v-else>
                  <v-icon :size="24" class="text-rose-600">mdi-eye-off</v-icon>
                </span>
              </td>

              <td class="px-2 py-2 whitespace-nowrap">
                <span v-if="details.dlp === 0">
                  <v-icon :size="24" class="text-orange-500">mdi-eye</v-icon>
                  </span>
                <span v-else-if="details.dlp === 1">
                  <v-icon :size="24" class="text-yellow-300">mdi-eye</v-icon>
                </span>
                <span v-else-if="details.dlp === 2">
                  <v-icon :size="24" class="text-gray-200">mdi-eye-off</v-icon>
                </span>
                <span v-else>
                  <v-icon :size="24" class="text-rose-600">mdi-eye-off</v-icon>
                </span>
              </td>

              <td class="px-2 py-2 whitespace-nowrap">
                <span v-if="details.virustoal === 0">
                  <v-icon :size="24" class="text-orange-500">mdi-eye</v-icon>
                  </span>
                <span v-else-if="details.virustoal === 1">
                  <v-icon :size="24" class="text-yellow-300">mdi-eye</v-icon>
                </span>
                <span v-else-if="details.virustoal === 2">
                  <v-icon :size="24" class="text-gray-200">mdi-eye-off</v-icon>
                </span>
                <span v-else>
                  <v-icon :size="24" class="text-rose-600">mdi-eye-off</v-icon>
                </span>
              </td>

              <td class="px-2 py-2 whitespace-nowrap text-xs">{{ details.name }}</td>
              <td class="px-2 py-2 whitespace-nowrap text-xs">{{ details.type }}</td>

              <td class="px-2 py-2 whitespace-nowrap">
                <div class="flex items-center">
                  <img class="size-5 rounded-full mr-2" :src="getSaasImg(details.saas)" :alt="details.saas" />
                  <span class="text-sm"> {{ details.saas }}</span>
                </div>
              </td>
              <td class="px-2 py-2 whitespace-nowrap text-xs">{{ details.user }}</td>
              <td class="px-2 py-2 whitespace-nowrap text-xs">{{ getDate(details.date) }}</td>

            </tr>
          </tbody>
        </table>
      </div>
      <!-- SaaS 테이블 -->
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { getSaasImg, getDate } from '@/utils/utils.js'


const someData = [
  {detect: 0, dlp: 0, virustoal: 0, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'slack', user:'asdasdasd', date:'2024.08.22T17:00:22'},
  {detect: 1, dlp: 1, virustoal: 1, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'slack', user:'asdasdasd', date:'2024.08.22T17:00:22'},
  {detect: 2, dlp: 2, virustoal: 2, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'slack', user:'asdasdasd', date:'2024.08.22T17:00:22'},
  {detect: 0, dlp: 0, virustoal: 0, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'jira', user:'asdasdasd', date:'2024.08.22T17:00:22'},
  {detect: 0, dlp: 0, virustoal: 0, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'jira', user:'asdasdasd', date:'2024.08.22T17:00:22'},
  {detect: 0, dlp: 0, virustoal: 0, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'jira', user:'asdasdasd', date:'2024.08.22T17:00:22'},
  {detect: 0, dlp: 0, virustoal: 0, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'slack', user:'asdasdasd', date:'2024.08.22T17:00:22'},
  {detect: 0, dlp: 0, virustoal: 0, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'slack', user:'asdasdasd', date:'2024.08.22T17:00:22'},
  {detect: 0, dlp: 0, virustoal: 0, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'slack', user:'asdasdasd', date:'2024.08.22T17:00:22'},
  {detect: 0, dlp: 0, virustoal: 0, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'slack', user:'asdasdasd', date:'2024.08.22T17:00:22'},
];
let fileDetails = ref(someData);

</script>

<style lang="scss" scoped>

</style>