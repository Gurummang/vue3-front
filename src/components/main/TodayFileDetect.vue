<template>
  <div>
    <div class="h-[32rem] bg-white shadow-sm rounded-lg p-4 mb-5">
      <div class="mb-2">
        <h2 class="text-xl font-bold mb-4">오늘 탐지 이슈</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full min-h-full bg-white">
          <thead class="bg-indigo-900">
            <tr>
              <th class="px-2 py-3 w-[40%] text-left text-sm font-bold font-medium text-white tracking-wider">파일명</th>
              <th class="px-1 py-3 w-[10%] text-center text-sm font-bold font-medium text-white tracking-wider">DLP</th>
              <th class="px-1 py-3 w-[10%] text-center text-sm font-bold font-medium text-white tracking-wider">악성탐지</th>
              <th class="px-2 py-3 w-[10%] text-center text-sm font-bold font-medium text-white tracking-wider">VirusTotal</th>
              <th class="px-2 py-3 w-[15%] text-left text-sm font-bold font-medium text-white tracking-wider">사용자</th>
              <th class="px-2 py-3 w-[15%] text-left text-sm font-bold font-medium text-white tracking-wider">생성 날짜</th>
            </tr>
          </thead>
          <tbody v-if="tableData.length" class="bg-white divide-y divide-gray-200">
            <template v-for="(details, index) in tableData" :key="index" >
              <tr class="hover:bg-gray-100 cursor-pointer" @click="toggleAccordion(index)">
                <td class="px-2 py-1.5 whitespace-nowrap text-xs max-w-1" :title="details.fileName">
                  <div class="flex items-center">
                    <img class="flex-shrink-0 size-5 rounded-full mr-2" :src="getSaasImg(convertSaasName(details.saas))" :alt="details.saas" />
                    <span class="truncate">{{ details.fileName }}</span>
                  </div>
                </td>
                <!-- DLP -->
                <td class="px-2 py-1.5 text-center whitespace-nowrap">
                  <span v-if="details.dlp === -1">
                    <v-icon :size="24" class="text-rose-600">mdi-alert-circle-outline</v-icon>
                  </span>
                  <span v-else-if="details.dlp === 0">
                    <v-icon :size="22" class="text-amber-400">mdi-dots-horizontal-circle-outline</v-icon>
                  </span>
                  <span v-else-if="details.dlp === 1">
                    <v-icon :size="22" class="text-emerald-600">mdi-check-circle-outline</v-icon>
                  </span>
                  <span v-else>
                    <v-icon :size="22" class="text-gray-300">mdi-minus-circle-outline</v-icon>
                  </span>
                </td>
                <!-- GSCAN -->
                <td class="px-2 py-1.5 text-center whitespace-nowrap">
                  <span v-if="details.suspicious === -1">
                    <v-icon :size="24" class="text-rose-600">mdi-alert-circle-outline</v-icon>
                  </span>
                  <span v-else-if="details.suspicious === 0">
                    <v-icon :size="22" class="text-amber-400">mdi-dots-horizontal-circle-outline</v-icon>
                  </span>
                  <span v-else-if="details.suspicious === 1">
                    <v-icon :size="22" class="text-emerald-600">mdi-check-circle-outline</v-icon>
                  </span>
                  <span v-else>
                    <v-icon :size="22" class="text-gray-300">mdi-minus-circle-outline</v-icon>
                  </span>
                </td>
                <!-- VT -->
                <td class="px-2 py-1.5 text-center whitespace-nowrap">
                  <span v-if="details.vt === -1">
                    <v-icon :size="24" class="text-rose-600">mdi-alert-circle-outline</v-icon>
                  </span>
                  <span v-else-if="details.suspicious === 0">
                    <v-icon :size="22" class="text-amber-400">mdi-dots-horizontal-circle-outline</v-icon>
                  </span>
                  <span v-else-if="details.suspicious === 1">
                    <v-icon :size="22" class="text-emerald-600">mdi-check-circle-outline</v-icon>
                  </span>
                  <span v-else>
                    <v-icon :size="22" class="text-gray-300">mdi-minus-circle-outline</v-icon>
                  </span>
                </td>
                <!-- <td class="px-2 py-1.5 text-center whitespace-nowrap">
                  <div v-if="details.fileStatus">
                    <span v-if="details.fileStatus.vtStatus === -1" class="bg-gray-200 text-slate-900 text-xs me-2 px-2.5 py-0.5 rounded-full">미검사</span>
                    <span v-else-if="details.fileStatus.vtStatus === 0" class="bg-amber-200 text-amber-800 text-xs me-2 px-2.5 py-0.5 rounded-full">스캔중</span>
                    <span v-else-if="details.fileStatus.vtStatus === 1 && details.vtReport !== null && details.vtReport.threatLabel === 'none'" class="bg-green-200 text-green-800 text-xs me-2 px-2.5 py-0.5 rounded-full">안전</span>
                    <span v-else-if="details.fileStatus.vtStatus === 1 && details.vtReport !== null && details.vtReport.threatLabel !== 'none'" class="bg-red-200 text-red-800 text-xs me-2 px-2.5 py-0.5 rounded-full">위험</span>
                    <span v-else class="bg-purple-950 text-white text-xs me-2 px-2.5 py-0.5 rounded-full">오류</span>
                  </div>
                </td> -->
                <td class="px-2 py-1.5 whitespace-nowrap text-xs max-w-1 truncate">{{ details.creator }}</td>
                <td class="px-2 py-1.5 whitespace-nowrap text-xs text-center">{{ removeWordDate(details.eventTs) }}</td>
              </tr>
            </template>
              <!-- Accordion row -->
          </tbody>
          <tbody v-else class="bg-white h-full">
            <tr class="h-full">
              <td colspan="6" class="text-center py-24 h-full">
                <div class="flex flex-col items-center justify-center h-full">
                  <img src="@/assets/grummang_mascot_small.png" alt="구름망 캐릭터" class="size-40 object-cover rounded-full mb-7">
                  <p class="text-gray-500 text-xl">오늘 탐지된 이슈가 없습니다.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, watch, computed, defineProps, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getSaasImg, removeWordDate, getfileSize, convertSaasName } from '@/utils/utils.js'

const props = defineProps({
  todayFileDetect: Object,
  required: true
})

const tableData = ref(props.todayFileDetect)
// const tableData = ref([
//             {
//                 "saas": "slack",
//                 "fileName": "asdasd.txt",
//                 "suspicious": -1,
//                 "dlp": -1,
//                 "vt": 1,
//                 "creator": "haha",
//                 "eventTs": "2024-12-11 00:00:00"
//             },
//             {
//                 "saas": "slack",
//                 "fileName": "asdasasdasdasdasdasdasdaasdasdasdasdasdasdasdsdasdasdasdasdd.txt",
//                 "suspicious": -1,
//                 "dlp": -1,
//                 "vt": 0,
//                 "creator": "haha",
//                 "eventTs": "2024-12-11 00:00:00"
//             },
//             {
//                 "saas": "slack",
//                 "fileName": "asdasd.txt",
//                 "suspicious": -1,
//                 "dlp": -1,
//                 "vt": 1,
//                 "creator": "haha",
//                 "eventTs": "2024-12-11 00:00:00"
//             },
//             {
//                 "saas": "slack",
//                 "fileName": "asdasd.txt",
//                 "suspicious": -1,
//                 "dlp": -1,
//                 "vt": 1,
//                 "creator": "haha",
//                 "eventTs": "2024-12-11 00:00:00"
//             },
//             {
//                 "saas": "slack",
//                 "fileName": "asdasd.txt",
//                 "suspicious": -1,
//                 "dlp": 1,
//                 "vt": -1,
//                 "creator": "haha",
//                 "eventTs": "2024-12-11 00:00:00"
//             },
//             {
//                 "saas": "slack",
//                 "fileName": "asdasd.txt",
//                 "suspicious": -1,
//                 "dlp": -1,
//                 "vt": 1,
//                 "creator": "haha",
//                 "eventTs": "2024-12-11 00:00:00"
//             },
//             {
//                 "saas": "slack",
//                 "fileName": "asdasd.txt",
//                 "suspicious": -1,
//                 "dlp": -1,
//                 "vt": 1,
//                 "creator": "haha",
//                 "eventTs": "2024-12-11 00:00:00"
//             },
//             {
//                 "saas": "slack",
//                 "fileName": "asdasd.txt",
//                 "suspicious": -1,
//                 "dlp": 1,
//                 "vt": -1,
//                 "creator": "haha",
//                 "eventTs": "2024-12-11 00:00:00"
//             },
//             {
//                 "saas": "slack",
//                 "fileName": "asdasd.txt",
//                 "suspicious": -1,
//                 "dlp": -1,
//                 "vt": 1,
//                 "creator": "haha",
//                 "eventTs": "2024-12-11 00:00:00"
//             },
//             {
//                 "saas": "slack",
//                 "fileName": "asdasd.txt",
//                 "suspicious": -1,
//                 "dlp": -1,
//                 "vt": 1,
//                 "creator": "haha",
//                 "eventTs": "2024-12-11 00:00:00"
//             },        
//             ])

// const sortedDate = ref(props.fileDetails.data.files.sort((a, b) => new Date(b.date) - new Date(a.date)))

</script>

<style scoped>

</style>
