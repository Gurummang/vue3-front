<template>
  <div class="bg-white shadow-sm rounded-lg p-4">
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

    <div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead class="bg-indigo-900">
          <tr>
            <th class="px-2 py-3 w-[5%] text-center text-sm font-bold font-medium text-white tracking-wider"></th>
            <th class="px-1 py-3 w-[5%] text-center text-sm font-bold font-medium text-white tracking-wider">DLP</th>
            <th class="px-1 py-3 w-[7%] text-center text-sm font-bold font-medium text-white tracking-wider">악성탐지</th>
            <th class="px-2 py-3 w-[7%] text-center text-sm font-bold font-medium text-white tracking-wider">VirusTotal</th>
            <th class="px-2 py-3 w-[26%] text-left text-sm font-bold font-medium text-white tracking-wider">파일명</th>
            <th class="px-2 py-3 w-[10%] text-center text-sm font-bold font-medium text-white tracking-wider">파일 유형</th>
            <th class="px-2 py-3 w-[10%] text-left text-sm font-bold font-medium text-white tracking-wider">SaaS</th>
            <th class="px-2 py-3 w-[15%] text-left text-sm font-bold font-medium text-white tracking-wider">사용자</th>
            <th class="px-2 py-3 w-[15%] text-center text-sm font-bold font-medium text-white tracking-wider">생성 날짜</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <template v-for="(details, index) in fileDetails" :key="index" >
            <tr class="hover:bg-gray-100 cursor-pointer" @click="toggleAccordion(index)">
              <td class="px-2 py-2 text-center whitespace-nowrap">
                <input type="checkbox" class="size-3.5 rounded border-gray-300" :id="['Option' + index]" />
              </td>
              <td class="px-2 py-2 text-center whitespace-nowrap">
                <span v-if="details.dlp === 0">
                  <v-icon :size="22" class="text-gray-300">mdi-dots-horizontal-circle-outline</v-icon>
                </span>
                <span v-else-if="details.dlp === 1">
                  <v-icon :size="22" class="text-amber-400">mdi-alert-circle-outline</v-icon>
                </span>
                <span v-else-if="details.dlp === 2">
                  <v-icon :size="22" class="text-emerald-600">mdi-check-circle-outline</v-icon>
                </span>
                <span v-else>
                  <v-icon :size="24" class="text-rose-600">mdi-eye-off</v-icon>
                </span>
              </td>
              <td class="px-2 py-2 text-center whitespace-nowrap">
                <span v-if="details.detect === 0">
                  <v-icon :size="22" class="text-gray-300">mdi-dots-horizontal-circle-outline</v-icon>
                </span>
                <span v-else-if="details.detect === 1">
                  <v-icon :size="22" class="text-red-600">mdi-alert-circle-outline</v-icon>
                </span>
                <span v-else-if="details.detect === 2">
                  <v-icon :size="22" class="text-emerald-600">mdi-check-circle-outline</v-icon>
                </span>
                <span v-else>
                  <v-icon :size="24" class="text-rose-600">mdi-eye-off</v-icon>
                </span>
              </td>
              <td class="px-2 py-2 text-center whitespace-nowrap">
                <span v-if="details.virustoal === 0" class="bg-gray-200 text-slate-900 text-xs me-2 px-2.5 py-0.5 rounded-full">미검사</span>
                <span v-if="details.virustoal === 1" class="bg-red-200 text-red-800 text-xs me-2 px-2.5 py-0.5 rounded-full">악성</span>
                <span v-if="details.virustoal === 2" class="bg-green-200 text-green-800 text-xs me-2 px-2.5 py-0.5 rounded-full">안전</span>
              </td>
              <td class="px-2 py-2 whitespace-nowrap text-xs">{{ details.name }}</td>
              <td class="px-2 py-2 whitespace-nowrap text-xs text-center">{{ details.type }}</td>
              <td class="px-2 py-2 whitespace-nowrap">
                <div class="flex items-center">
                  <img class="size-5 rounded-full mr-2" :src="getSaasImg(details.saas)" :alt="details.saas" />
                  <span class="text-sm"> {{ details.saas }}</span>
                </div>
              </td>
              <td class="px-2 py-2 whitespace-nowrap text-xs">{{ details.user }}</td>
              <td class="px-2 py-2 whitespace-nowrap text-xs text-center">{{ getDate(details.date) }}</td>
            </tr>
            
            <!-- Accordion row -->
            <tr v-if="isAccordionOpen(index)" class="">
              <td colspan="9" class="">
                <!-- <div class="text-sm text-gray-700">
                  <strong>Additional Information:</strong>
                  <p>{{ details.name }} - Additional details about the file, its type, user, and other relevant information can go here.</p>
                </div> -->
                
                <div class="flex-col pl-[5%] bg-gray-100">
                  <div class="">
                    <!-- cause divide-y to add empty span-->
                    <span class="inline-block w-1/4 p-2 border-x border-gray-200 text-center">파일명</span>
                    <span class="inline-block w-3/4 p-2 bg-white">{{ details.name }}</span>
                  </div>
                  <div class="border-t border-gray-200">
                    <span class="inline-block w-1/4 p-2 bg-gray-100 border-x border-gray-200 text-center">접근 가능 사용자 수</span>
                    <span class="inline-block w-1/4 p-2 bg-white">20</span>
                    <span class="inline-block w-[12.5%] p-2 bg-gray-100 border-x border-gray-200 text-center">파일 경로</span>
                    <span class="inline-block w-[37.5%] p-2 bg-white">grummang / dddd / aaasd.pdf</span>
                  </div>
                  <div class="border-t border-gray-200">
                    <span class="inline-block w-1/4 p-2 border-x border-gray-200 text-center">확장자 시그니쳐 일치 여부</span>
                    <span class="inline-block w-1/4 p-2 bg-white">~~~~~~~</span>
                    <span class="inline-block w-[12.5%] p-2 border-x border-gray-200 text-center">심층분석</span>
                    <span class="inline-block w-[37.5%] p-2 bg-white">~~~~~~~~~~~~~~</span>
                  </div>

                  <div class="p-2 border-t border-gray-200 border-l bg-gray-100 cursor-pointer" @click="toggleDLPReport(index)">
                    <v-icon v-if="!dlpReportStatus[index]" class="mr-2">mdi-chevron-right</v-icon>
                    <v-icon v-else class="mr-2">mdi-chevron-down</v-icon>DLP Report
                  </div>
                  <div v-if="isDLPReportOpen(index) && details.dlp" class="bg-white">
                    <!-- DLP Report content -->
                    <div class="flex">
                      <div class="w-1/2 border-t border-gray-200">
                        <div>
                          <span class="inline-block w-1/3 p-2 h-1/3 leading-[4rem] bg-gray-100 border-x border-gray-200 text-center">탐지 정책 수</span>
                          <span class="inline-block w-2/3 p-2 h-1/3 bg-white">20</span>
                        </div>
                        <div class="border-t border-gray-200">
                          <span class="inline-block w-1/3 p-2 h-1/3 leading-[4rem] bg-gray-100 border-x border-gray-200 text-center">탐지 개수</span>
                          <span class="inline-block w-2/3 p-2 h-1/3 bg-white">20</span>
                        </div>
                        <div class="border-t border-gray-200">
                          <span class="inline-block w-1/3 p-2 h-1/3 leading-[4rem] bg-gray-100 border-x border-gray-200 text-center">권장 조치사항</span>
                          <span class="inline-block w-2/3 p-2 h-1/3 bg-white">20</span>
                        </div>
                      </div>

                      <div class="w-1/2 border-t border-l border-gray-200">
                        <!-- <span class="inline-block w-full h-full p-2 bg-white border-l border-gray-200">접근 가능 사용자 수</span> -->
                        <dlp-chart></dlp-chart>
                      </div>

                    </div>

                  </div>

                  <div class="p-2 border-t border-gray-200 border-l bg-gray-100 cursor-pointer" @click="toggleVirusTotalReport(index)">
                    <v-icon v-if="!virusTotalReportStatus[index]" class="mr-2">mdi-chevron-right</v-icon>
                    <v-icon v-else class="mr-2">mdi-chevron-down</v-icon>VirusTotal Report
                  </div>
                  <div v-if="isVirusTotalReportOpen(index) && details.virustoal" class="bg-white">
                    <!-- VirusTotal Report content -->
                    <div class="flex">
                      <div class="w-1/2 border-t border-gray-200">
                        <div class="">
                          <span class="inline-block w-1/3 p-2 bg-gray-100 border-x border-gray-200 text-center">SHA-256</span>
                          <span class="inline-block w-2/3 p-2 bg-white">20</span>
                        </div>
                        <div class="border-t border-gray-200">
                          <span class="inline-block w-1/3 p-2 bg-gray-100 border-x border-gray-200 text-center">File Type</span>
                          <span class="inline-block w-2/3 p-2 bg-white">20</span>
                        </div>
                        <div class="border-t border-gray-200">
                          <span class="inline-block w-1/3 p-2 bg-gray-100 border-x border-gray-200 text-center">Threat Label</span>
                          <span class="inline-block w-2/3 p-2 bg-white">20</span>
                        </div>
                        <div class="border-t border-gray-200">
                          <span class="inline-block w-1/3 p-2 bg-gray-100 border-x border-gray-200 text-center">VirusTotal Report</span>
                          <span class="inline-block w-2/3 p-2 bg-white">20</span>
                        </div>
                      </div>

                      <div class="w-1/2 border-t">
                        <!-- <span class="inline-block w-1/2 h-full p-2 bg-white border-x border-gray-200">접근 가능 사용자 수</span> -->
                        <div class="float-left w-1/2 h-full border-l border-gray-200 p-2">
                          <virustotal-chart :name="'엔진탐색'" :score=40 :color="'#dc2626'"></virustotal-chart>
                        </div>
                        <div class="float-left w-1/2 h-full border-l border-gray-200 p-2">
                          <virustotal-chart :name="'Score'" :score=20 :color="'#FF8A00'"></virustotal-chart>
                        </div>
                        <!-- <span class="inline-block w-1/2 p-2 bg-white border-l border-gray-200">
                          <virustotal-chart :score=40 :color='dc2626'></virustotal-chart>
                        </span> -->
                    
                      
                      </div>

                    </div>

                    <div class="p-2 border-t border-gray-200 border-l bg-gray-100 text-center"> 주요 탐지 엔진 </div>
                    <div class="flex">
                      <div class="w-1/2 border-t border-gray-200">
                        <div>
                          <span class="inline-block w-1/3 p-2 bg-gray-100 border-x border-gray-200 text-center">V3</span>
                          <span class="inline-block w-2/3 p-2 bg-white">20</span>
                        </div>
                        <div class="border-t border-gray-200">
                          <span class="inline-block w-1/3 p-2 bg-gray-100 border-x border-gray-200 text-center">Kaspersky</span>
                          <span class="inline-block w-2/3 p-2 bg-white">20</span>
                        </div>
                        <div class="border-t border-gray-200">
                          <span class="inline-block w-1/3 p-2 bg-gray-100 border-x border-gray-200 text-center">Avast</span>
                          <span class="inline-block w-2/3 p-2 bg-white">20</span>
                        </div>
                      </div>
                      <div class="w-1/2 border-t border-gray-200">
                        <div>
                          <span class="inline-block w-1/3 p-2 bg-gray-100 border-x border-gray-200 text-center">ALYac</span>
                          <span class="inline-block w-2/3 p-2 bg-white">20</span>
                        </div>
                        <div class="border-t border-gray-200">
                          <span class="inline-block w-1/3 p-2 bg-gray-100 border-x border-gray-200 text-center">Falcon</span>
                          <span class="inline-block w-2/3 p-2 bg-white">20</span>
                        </div>
                        <div class="border-t border-gray-200">
                          <span class="inline-block w-1/3 p-2 bg-gray-100 border-x border-gray-200 text-center">Santinal One</span>
                          <span class="inline-block w-2/3 p-2 bg-white">20</span>
                        </div>
                      </div>

                    </div>

                  </div>
                  <!-- VT Report -->


                </div>
              </td>
            </tr>
          </template>
            <!-- Accordion row -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DlpChart from '@/components/file/DlpChart.vue'
import VirustotalChart from '@/components/file/VirustotalChart.vue'
import { getSaasImg, getDate } from '@/utils/utils.js'

const fileDetails = ref([
  { detect: 0, dlp: 0, virustoal: 0, name: '1ㅀㅇ라강라하ㅏ가하아라하가ㅘ파아아라가하f', type: 'pdf', saas: 'slack', user: 'asdasdasd', date: '2024.08.22T17:00:22' },
  { detect: 1, dlp: 1, virustoal: 1, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'slack', user: 'asdasdasd', date: '2024.08.22T17:00:22' },
  { detect: 2, dlp: 2, virustoal: 2, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'slack', user: 'asdasdasd', date: '2024.08.22T17:00:22' },
  { detect: 0, dlp: 0, virustoal: 0, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'jira', user: 'asdasdasd', date: '2024.08.22T17:00:22' },
  { detect: 0, dlp: 0, virustoal: 0, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'jira', user: 'asdasdasd', date: '2024.08.22T17:00:22' },
  { detect: 0, dlp: 0, virustoal: 0, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'jira', user: 'asdasdasd', date: '2024.08.22T17:00:22' },
  { detect: 0, dlp: 0, virustoal: 0, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'slack', user: 'asdasdasd', date: '2024.08.22T17:00:22' },
  { detect: 0, dlp: 0, virustoal: 0, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'slack', user: 'asdasdasd', date: '2024.08.22T17:00:22' },
  { detect: 0, dlp: 0, virustoal: 0, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'slack', user: 'asdasdasd', date: '2024.08.22T17:00:22' },
  { detect: 0, dlp: 0, virustoal: 0, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'slack', user: 'asdasdasd', date: '2024.08.22T17:00:22' },
  { detect: 1, dlp: 1, virustoal: 1, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'slack', user: 'asdasdasd', date: '2024.08.22T17:00:22' },
  { detect: 2, dlp: 2, virustoal: 2, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'slack', user: 'asdasdasd', date: '2024.08.22T17:00:22' },
  { detect: 0, dlp: 0, virustoal: 0, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'jira', user: 'asdasdasd', date: '2024.08.22T17:00:22' },
  { detect: 0, dlp: 0, virustoal: 0, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'jira', user: 'asdasdasd', date: '2024.08.22T17:00:22' },
  { detect: 0, dlp: 0, virustoal: 0, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'jira', user: 'asdasdasd', date: '2024.08.22T17:00:22' },
  { detect: 0, dlp: 0, virustoal: 0, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'slack', user: 'asdasdasd', date: '2024.08.22T17:00:22' },
  { detect: 0, dlp: 0, virustoal: 0, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'slack', user: 'asdasdasd', date: '2024.08.22T17:00:22' },
  { detect: 0, dlp: 0, virustoal: 0, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'slack', user: 'asdasdasd', date: '2024.08.22T17:00:22' },
  { detect: 0, dlp: 0, virustoal: 0, name: '123123123ssdfsdfsdf', type: 'pdf', saas: 'slack', user: 'asdasdasd', date: '2024.08.22T17:00:22' },
]);

const color = 'dc2626';

const accordionStatus = ref({});
const dlpReportStatus = ref({});
const virusTotalReportStatus = ref({});

const toggleAccordion = (index) => {
  accordionStatus.value[index] = !accordionStatus.value[index];
}

const isAccordionOpen = (index) => {
  return accordionStatus.value[index] || false;
}

const toggleDLPReport = (index) => {
  dlpReportStatus.value[index] = !dlpReportStatus.value[index];
}

const isDLPReportOpen = (index) => {
  return dlpReportStatus.value[index] || false;
}

const toggleVirusTotalReport = (index) => {
  virusTotalReportStatus.value[index] = !virusTotalReportStatus.value[index];
}

const isVirusTotalReportOpen = (index) => {
  return virusTotalReportStatus.value[index] || false;
}

const openconnectModal = () => {
  // Handle the SaaS connect modal logic here
}

const openModificationModal = () => {
  // Handle the SaaS modification modal logic here
}

const openUnconnectModal = () => {
  // Handle the SaaS unconnect modal logic here
}
</script>

<style scoped>

</style>
