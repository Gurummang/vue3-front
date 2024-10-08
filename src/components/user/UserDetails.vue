<template>
  <div>
    <div class="p-4 bg-white border rounded-lg shadow-sm my-5">
      <h2 class="text-xl font-bold mb-4">사용자 정보</h2>

      <div class="flex pb-2">
        <div class="flex ml-auto space-x-2">
          <select
            class="block w-sm text-sm font-medium transition duration-75 border border-gray-300 rounded-md shadow-sm focus:border-blue-600 focus:ring-1 focus:ring-inset focus:ring-blue-600 bg-none"
          >
            <option value="week">SaaS</option>
            <option value="month">사용자</option>
            <option value="year">계정</option>
            <option value="year">업로드 수</option>
            <option value="year">DLP파일</option>
            <option value="year">악성파일</option>
            <option value="year" selected>마지막 활동 날짜</option>
          </select>
          <select
            class="block w-sm text-sm font-medium transition duration-75 border border-gray-300 rounded-md shadow-sm focus:border-blue-600 focus:ring-1 focus:ring-inset focus:ring-blue-600 bg-none"
          >
            <option value="week">오름차순</option>
            <option value="month" selected>내림차순</option>
          </select>

          <div class="relative max-w-sm">
            <input
              class="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              type="search"
              placeholder="검색"
            />
            <button
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
              <!-- <th class="pl-6 pr-2 py-3 text-left text-sm font-bold font-medium text-white tracking-wider">선택</th> -->
              <!-- <th class="px-6 py-3 text-left text-sm font-bold font-medium text-white tracking-wider text-center">번호</th> -->
              <th class="px-6 py-3 text-left text-sm font-bold font-medium text-white tracking-wider">SaaS</th>
              <th class="px-6 py-3 text-left text-sm font-bold font-medium text-white tracking-wider">사용자</th>
              <th class="px-6 py-3 text-left text-sm font-bold font-medium text-white tracking-wider">계정</th>
              <th class="px-6 py-3 text-left text-sm font-bold font-medium text-white tracking-wider text-center">업로드 수</th>
              <th class="px-6 py-3 text-left text-sm font-bold font-medium text-white tracking-wider text-center">DLP파일</th>
              <th class="px-6 py-3 text-left text-sm font-bold font-medium text-white tracking-wider text-center">악성파일</th>
              <th class="px-6 py-3 text-left text-sm font-bold font-medium text-white tracking-wider">마지막 활동 날짜</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(detail, index) in totalData" :key="index" class="hover:bg-gray-100">
              <td class="px-6 py-2 whitespace-nowrap align-middle">
                <div class="flex items-center">
                  <img class="w-5 h-5 mr-2" :src="getSaasImg(convertSaasName(detail.saas))" :alt="detail.saas" />
                  <span class="text-sm capitalize"> {{ convertSaasName(detail.saas) }}</span>
                </div>
              </td>
              <td class="px-6 py-2 whitespace-nowrap text-xs">{{ detail.user }}</td>
              <td class="px-6 py-2 whitespace-nowrap text-xs">{{ detail.account }}</td>
              <td class="px-6 py-2 whitespace-nowrap text-xs text-center">{{ detail.totalUpload }}</td>
              <td class="px-6 py-2 whitespace-nowrap text-xs text-center">{{ detail.sensitive }}</td>
              <td class="px-6 py-2 whitespace-nowrap text-xs text-center">{{ detail.malware }}</td>
              <td class="px-6 py-2 whitespace-nowrap text-xs">{{ removeWordDate(detail.lastDate) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <the-pagination :totalPage="totalPage" @send-event="reset" :selectPages="selectPages"></the-pagination>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, onMounted } from 'vue'
import { getSaasImg, getDate, removeWordDate, convertSaasName } from '@/utils/utils.js'
import ThePagination from '@/components/ThePagination.vue'
import HistoryVisualizationModal from '@/components/modals/HistoryVisualizationModal.vue'
import { historyVisualizatuonApi } from '@/apis/file'

const props = defineProps({
  userDetails: {
    type: Object,
    required: true
  }
})

const sortedDate = ref(props.userDetails.sort((a, b) => {
  if (a.lastDate === "-999999999-01-01T00:00:00") return 1;
  if (b.lastDate === "-999999999-01-01T00:00:00") return -1;
  return new Date(b.lastDate) - new Date(a.lastDate)})
)

const selectedHistory = ref(null)
const isHistoryVisualizationModalOpen = ref(false)
const visualizationInfo = ref(null)

// 페이지 네비게이션
const items = ref([])
const totalData = ref([])
const selectPages = ref(1) // 1이라는 페이지로 셋팅
const totalPage = ref(0) // totalData의 개수에 따라 페이지네이션을 그려지는 리스트를 뜻합니다.
const totalCount = ref(null)
const limit = ref(15) // 한 페이지에 보여줄 아이템 개수

const getData = () => {
  totalData.value = sortedDate.value
  totalCount.value = totalData !== undefined ? totalData.value.length : 0
  totalPage.value =
    Math.ceil(totalCount.value / limit.value) !== 0 ? Math.ceil(totalCount.value / limit.value) : 1
  totalData.value = disassemble(selectPages.value - 1, totalData.value, limit.value)
}

const disassemble = (index, data, size) => {
  const res = new Array()

  for (let i = 0; i < data.length; i += size) {
    res.push(data.slice(i, i + size))
  }
  return res[index]
}

totalData.value = disassemble(selectPages.value - 1, totalData.value, limit.value)

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
  // clearCheckedIndex();
}
</script>

<style lang="scss" scoped>
</style>