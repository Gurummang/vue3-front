<template>
  <div>
    <div class="p-4 bg-white border rounded-lg shadow-sm my-5">
      <h2 class="text-xl font-bold mb-4">
        파일 히스토리 - {{ totalCount }}건
      </h2>

      <div class="flex pb-2">
        <div class="space-x-2">
          <button
            class="inline-block border border-orange px-3 py-2 align-text-bottom flex items-center text-sm font-semibold text-orange hover:bg-orange hover:text-white hover:border-orange active:bg-orange"
            @click="openHistoryVisualizationModal"
          >
            <v-icon :size="20" class="mr-1">mdi-weather-cloudy-clock</v-icon> 파일 분포 시각화
          </button>
        </div>
        <div class="flex ml-auto space-x-2">
          <select
            v-model="sortBy"
            class="block w-sm text-sm font-medium transition duration-75 border border-gray-300 rounded-md shadow-sm focus:border-blue-600 focus:ring-1 focus:ring-inset focus:ring-blue-600 bg-none"
          >
            <option value="saas">SaaS</option>
            <option value="activity">활동 종류</option>
            <option value="name">파일명</option>
            <option value="eventTs" selected>히스토리 시각</option>
            <option value="uploadTs">최초시각</option>
            <option value="user">사용자</option>
          </select>
          <select
            v-model="sortOrder"
            class="block w-sm text-sm font-medium transition duration-75 border border-gray-300 rounded-md shadow-sm focus:border-blue-600 focus:ring-1 focus:ring-inset focus:ring-blue-600 bg-none"
          >
            <option value="asc">오름차순</option>
            <option value="desc" selected>내림차순</option>
          </select>

          <div class="relative max-w-sm">
            <input
              v-model="searchFilter"
              @keyup.enter="() => { getData(); selectPages = 1; }"
              class="w-4/5 py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              type="search"
              placeholder="검색"
            />
            <button
              @click="() => { getData(); selectPages = 1; }"
              class="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <svg
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead class="bg-indigo-900">
            <tr>
              <th class="pl-4 pr-2 py-3 w-[6%] text-left text-sm font-bold font-medium text-white tracking-wider">선택</th>
              <th class="px-2 py-3 w-[5%] text-left text-sm font-bold font-medium text-white tracking-wider text-center">번호</th>
              <th class="px-2 py-3 w-[13%] text-left text-sm font-bold font-medium text-white tracking-wider">SaaS</th>
              <th class="px-2 py-3 w-[10%] text-left text-sm font-bold font-medium text-white tracking-wider">활동 종류</th>
              <th class="px-2 py-3 w-[27%] text-left text-sm font-bold font-medium text-white tracking-wider">파일명</th>
              <th class="px-2 py-3 w-[12%] text-left text-sm font-bold font-medium text-white tracking-wider">히스토리 시각</th>
              <th class="px-2 py-3 w-[12%] text-left text-sm font-bold font-medium text-white tracking-wider">최초 시각</th>
              <th class="px-2 py-3 w=[15%] text-left text-sm font-bold font-medium text-white tracking-wider">사용자</th>
            </tr>
          </thead>
          <tbody v-if="sortedData" class="bg-white divide-y divide-gray-200">
            <tr v-for="(detail, index) in sortedData" :key="index">
              <td class="pl-6 pr-1 py-2 whitespace-nowrap">
                <input
                  type="radio"
                  name="detail"
                  class="form-radio size-3"
                  :value="detail"
                  v-model="selectedHistory"
                />
              </td>
              <td class="px-2 py-2 whitespace-nowrap text-center text-xs">{{ index + 1 }}</td>
              <td class="px-2 py-2 whitespace-nowrap align-middle">
                <div class="flex items-center">
                  <!-- <img class="w-5 h-5 mr-2" :src="getSaasImg(detail.saas)" :alt="detail.saas" />
                  <span class="text-sm"> {{ detail.saas }}</span> -->
                  <img class="w-5 h-5 mr-2" :src="getSaasImg(convertSaasName(detail.saas))" :alt="detail.saas" />
                  <span class="text-sm capitalize"> {{ convertSaasName(detail.saas) }}</span>
                </div>
              </td>
              <td class="px-2 py-2 whitespace-nowrap text-xs align-middle">
                <p v-if="detail.eventType === 'file_upload'" class="flex items-center">
                  <v-icon :size="20" class="text-orange mr-1">mdi-file-upload-outline</v-icon>
                  파일 업로드
                </p>
                <p v-if="detail.eventType === 'file_change'" class="flex items-center">
                  <v-icon :size="20" class="text-amber-400 mr-1">mdi-file-edit-outline</v-icon>
                  파일 수정
                </p>
                <p v-if="detail.eventType === 'file_delete'" class="flex items-center">
                  <v-icon :size="20" class="text-slate-400 mr-1">mdi-file-remove-outline</v-icon>
                  파일 삭제
                </p>
              </td>
              <td class="px-2 py-2 whitespace-nowrap text-xs max-w-1 truncate" :title="detail.fileName">{{ detail.fileName }}</td>
              <td class="px-2 py-2 whitespace-nowrap text-xs">
                {{ removeWordDate(detail.eventTs) }}
              </td>
              <td class="px-2 py-2 whitespace-nowrap text-xs">
                {{ removeWordDate(detail.uploadTs) }}
              </td>
              <td class="px-2 py-2 whitespace-nowrap text-xs max-w-1 truncate" :title="detail.email">{{ detail.email }}</td>
            </tr>
          </tbody>
          <tbody v-else class="bg-white h-full">
            <tr class="h-full">
              <td colspan="8" class="text-center py-7 h-full">
                <div class="flex flex-col items-center justify-center h-full">
                  <img src="@/assets/grummang_mascot_small.png" alt="구름망 캐릭터" class="size-20 object-cover rounded-full mb-5">
                  <p class="text-gray-500 text-base">히스토리에 관한 정보가 없습니다.</p>
                </div>
              </td>
            </tr>
          </tbody>

        </table>
      </div>
    </div>

    <the-pagination :totalPage="totalPage" @send-event="reset" :selectPages="selectPages"></the-pagination>
  </div>

  <history-visualization-modal
    v-if="isHistoryVisualizationModalOpen"
    :visualizationInfo="visualizationInfo"
    @close="closeHistoryVisualizationModal"
  ></history-visualization-modal>
</template>

<script setup>
import { ref, watch, defineProps, onMounted } from 'vue'
import { getSaasImg, getDate, removeWordDate, convertSaasName } from '@/utils/utils.js'
import ThePagination from '@/components/ThePagination.vue'
import HistoryVisualizationModal from '@/components/modals/HistoryVisualizationModal.vue'
import { historyVisualizatuonApi } from '@/apis/file'

const props = defineProps({
  historyDetails: {
    type: Object,
    required: true
  }
})

// const sortedEventTs = ref(props.historyDetails.fileHistoryDto.sort((a, b) => new Date(b.eventTs) - new Date(a.eventTs)));
const selectedHistory = ref(null)
const isHistoryVisualizationModalOpen = ref(false)
const visualizationInfo = ref(null)

const sortBy = ref('eventTs')
const sortOrder = ref('desc')
const sortedData = ref([])
const searchFilter = ref('')

// 페이지 네비게이션
const items = ref([])
const totalData = ref([])
const selectPages = ref(1) // 1이라는 페이지로 셋팅
const totalPage = ref(0) // totalData의 개수에 따라 페이지네이션을 그려지는 리스트를 뜻합니다.
const totalCount = ref(null)
const limit = ref(20) // 한 페이지에 보여줄 아이템 개수

const getData = () => {
  sortedData.value = [...props.historyDetails.fileHistoryDto].sort((a, b) => {
    let compareResult

    switch (sortBy.value) {
      case 'eventTs':
        compareResult = new Date(a.eventTs) - new Date(b.eventTs)
        break
      case 'saas':
        compareResult = a.saas.localeCompare(b.saas)
        break
      case 'activity':
        compareResult = a.eventType.localeCompare(b.eventType)
        break
      case 'name':
        compareResult = a.fileName.localeCompare(b.fileName)
        break
      case 'uploadTs':
        compareResult = new Date(a.uploadTs) - new Date(b.uploadTs)
        break
      case 'user':
        compareResult = a.email.localeCompare(b.email)
        break
      default:
        compareResult = 0
    }
    
    return sortOrder.value === 'asc' ? compareResult : -compareResult
  })
  .filter(item => item.fileName.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
                  item.saas.toLowerCase().includes(searchFilter.value.toLowerCase()) || 
                  item.email.toLowerCase().includes(searchFilter.value.toLowerCase())
  )

  totalCount.value = sortedData !== undefined ? sortedData.value.length : 0
  totalPage.value =
    Math.ceil(totalCount.value / limit.value) !== 0 ? Math.ceil(totalCount.value / limit.value) : 1
  sortedData.value = disassemble(selectPages.value - 1, sortedData.value, limit.value)

  // 검색한 후에 선택 히스토리 선택 항목 지우기
  selectedHistory.value = null
}

const disassemble = (index, data, size) => {
  const res = new Array()

  for (let i = 0; i < data.length; i += size) {
    res.push(data.slice(i, i + size))
  }
  return res[index]
}

// totalData.value = disassemble(selectPages.value - 1, totalData.value, limit.value)

onMounted(() => {
  getData()
})

const reset = (pageIdx) => {
  if (pageIdx === 0) selectPages.value = 1
  else selectPages.value = pageIdx
}

watch(selectPages, () => {
  getData()
})

// Modal Function
const openHistoryVisualizationModal = () => {
  if (selectedHistory.value) {
    let data = {
      eventId: selectedHistory.value.eventId
    }
    historyVisualizatuonApi(data).then((response) => {
      visualizationInfo.value = response
      isHistoryVisualizationModalOpen.value = true
    })
  } else {
    alert('시각화할 파일을 선택해주세요.')
  }
}

const closeHistoryVisualizationModal = () => {
  isHistoryVisualizationModalOpen.value = false
}
</script>

<style lang="scss" scoped>
</style>