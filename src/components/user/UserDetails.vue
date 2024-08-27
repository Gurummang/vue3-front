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
            <option value="month">활동 종류</option>
            <option value="year">파일명</option>
            <option value="year" selected>히스토리 시각</option>
            <option value="year">최초시각</option>
            <option value="year">사용자</option>
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
              <th class="px-6 py-3 text-left text-sm font-bold font-medium text-white tracking-wider">전체 업로드 수</th>
              <th class="px-6 py-3 text-left text-sm font-bold font-medium text-white tracking-wider">DLP파일</th>
              <th class="px-6 py-3 text-left text-sm font-bold font-medium text-white tracking-wider">악성파일</th>
              <th class="px-6 py-3 text-left text-sm font-bold font-medium text-white tracking-wider">마지막 활동 날짜</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(detail, index) in totalData" :key="index">
              <!-- <td class="pl-6 pr-1 py-2 whitespace-nowrap">
                <input
                  type="radio"
                  name="detail"
                  class="form-radio size-3"
                  :value="detail"
                  v-model="selectedHistory"
                />
              </td>
              <td class="px-6 py-2 whitespace-nowrap text-center text-xs">{{ index + 1 }}</td> -->
              <td class="px-6 py-2 whitespace-nowrap align-middle">
                <div class="flex items-center">
                  <img class="w-5 h-5 mr-2" :src="getSaasImg(detail.saas)" :alt="detail.saas" />
                  <span class="text-sm capitalize"> {{ detail.saas }}</span>
                </div>
              </td>
              <!-- <td class="px-6 py-2 whitespace-nowrap text-xs align-middle">
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
              <td class="px-6 py-2 whitespace-nowrap text-xs">{{ detail.fileName }}</td>
              <td class="px-6 py-2 whitespace-nowrap text-xs">
                {{ removeWordDate(detail.eventTs) }}
              </td>
              <td class="px-6 py-2 whitespace-nowrap text-xs">
                {{ removeWordDate(detail.uploadTs) }}
              </td>
              <td class="px-6 py-2 whitespace-nowrap text-xs">{{ detail.email }}</td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <the-pagination :totalPage="totalPage" @send-event="reset" :test="test"></the-pagination>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, onMounted } from 'vue'
import { getSaasImg, getDate, removeWordDate } from '@/utils/utils.js'
import ThePagination from '@/components/ThePagination.vue'
import HistoryVisualizationModal from '@/components/modals/HistoryVisualizationModal.vue'
import { historyVisualizatuonApi } from '@/apis/file'

const props = defineProps({
  historyDetails: {
    type: Object,
    required: true
  }
})

const mockupData = [
  {
    id: 1,
    saas: 'slack',
    user: 'JohnDoe',
    account: 'johndoe@example.com',
    totalUpload: 45,
    sensitive: 3,
    malware: 1,
    lastDate: '2024-08-15T09:23:11'
  },
  {
    id: 2,
    saas: 'o365',
    user: 'JaneSmith',
    account: 'janesmith@company.com',
    totalUpload: 32,
    sensitive: 1,
    malware: 0,
    lastDate: '2024-08-18T14:45:22'
  },
  {
    id: 3,
    saas: 'googledrive',
    user: 'MikeJohnson',
    account: 'mike.johnson@gmail.com',
    totalUpload: 78,
    sensitive: 5,
    malware: 2,
    lastDate: '2024-08-20T11:12:33'
  },
  {
    id: 4,
    saas: 'slack',
    user: 'EmilyBrown',
    account: 'emily.brown@example.com',
    totalUpload: 56,
    sensitive: 2,
    malware: 1,
    lastDate: '2024-08-22T16:30:44'
  },
  {
    id: 5,
    saas: 'o365',
    user: 'DavidLee',
    account: 'david.lee@company.com',
    totalUpload: 41,
    sensitive: 4,
    malware: 0,
    lastDate: '2024-08-25T10:05:55'
  },
  {
    id: 6,
    saas: 'googledrive',
    user: 'SarahWilson',
    account: 'sarah.wilson@gmail.com',
    totalUpload: 63,
    sensitive: 3,
    malware: 1,
    lastDate: '2024-08-27T13:40:06'
  },
  {
    id: 7,
    saas: 'slack',
    user: 'ChrisTaylor',
    account: 'chris.taylor@example.com',
    totalUpload: 29,
    sensitive: 1,
    malware: 0,
    lastDate: '2024-08-29T08:15:17'
  },
  {
    id: 8,
    saas: 'o365',
    user: 'LisaAnderson',
    account: 'lisa.anderson@company.com',
    totalUpload: 52,
    sensitive: 2,
    malware: 1,
    lastDate: '2024-09-01T15:50:28'
  },
  {
    id: 9,
    saas: 'googledrive',
    user: 'KevinMartinez',
    account: 'kevin.martinez@gmail.com',
    totalUpload: 87,
    sensitive: 6,
    malware: 2,
    lastDate: '2024-09-03T12:25:39'
  },
  {
    id: 10,
    saas: 'slack',
    user: 'AmyGarcia',
    account: 'amy.garcia@example.com',
    totalUpload: 38,
    sensitive: 2,
    malware: 0,
    lastDate: '2024-09-05T17:00:50'
  },
  {
    id: 11,
    saas: 'o365',
    user: 'RyanClark',
    account: 'ryan.clark@company.com',
    totalUpload: 71,
    sensitive: 4,
    malware: 1,
    lastDate: '2024-09-07T09:35:01'
  },
  {
    id: 12,
    saas: 'googledrive',
    user: 'OliviaRodriguez',
    account: 'olivia.rodriguez@gmail.com',
    totalUpload: 49,
    sensitive: 3,
    malware: 1,
    lastDate: '2024-09-09T14:10:12'
  },
  {
    id: 13,
    saas: 'slack',
    user: 'DanielLewis',
    account: 'daniel.lewis@example.com',
    totalUpload: 33,
    sensitive: 1,
    malware: 0,
    lastDate: '2024-09-11T11:45:23'
  },
  {
    id: 14,
    saas: 'o365',
    user: 'SophiaLee',
    account: 'sophia.lee@company.com',
    totalUpload: 59,
    sensitive: 3,
    malware: 1,
    lastDate: '2024-09-13T16:20:34'
  },
  {
    id: 15,
    saas: 'googledrive',
    user: 'WilliamWalker',
    account: 'william.walker@gmail.com',
    totalUpload: 82,
    sensitive: 5,
    malware: 2,
    lastDate: '2024-09-15T10:55:45'
  },
  {
    id: 16,
    saas: 'slack',
    user: 'EmmaHall',
    account: 'emma.hall@example.com',
    totalUpload: 43,
    sensitive: 2,
    malware: 0,
    lastDate: '2024-09-17T13:30:56'
  },
  {
    id: 17,
    saas: 'o365',
    user: 'JamesWhite',
    account: 'james.white@company.com',
    totalUpload: 67,
    sensitive: 4,
    malware: 1,
    lastDate: '2024-09-19T08:05:07'
  },
  {
    id: 18,
    saas: 'googledrive',
    user: 'AvaThompson',
    account: 'ava.thompson@gmail.com',
    totalUpload: 55,
    sensitive: 3,
    malware: 1,
    lastDate: '2024-09-21T15:40:18'
  },
  {
    id: 19,
    saas: 'slack',
    user: 'AlexanderScott',
    account: 'alexander.scott@example.com',
    totalUpload: 36,
    sensitive: 2,
    malware: 0,
    lastDate: '2024-09-23T12:15:29'
  },
  {
    id: 20,
    saas: 'o365',
    user: 'MiaNguyen',
    account: 'mia.nguyen@company.com',
    totalUpload: 74,
    sensitive: 5,
    malware: 2,
    lastDate: '2024-09-25T16:50:40'
  },
  {
    id: 21,
    saas: 'googledrive',
    user: 'EthanBrown',
    account: 'ethan.brown@gmail.com',
    totalUpload: 51,
    sensitive: 3,
    malware: 1,
    lastDate: '2024-09-27T09:25:51'
  },
  {
    id: 22,
    saas: 'slack',
    user: 'IsabellaKim',
    account: 'isabella.kim@example.com',
    totalUpload: 39,
    sensitive: 2,
    malware: 0,
    lastDate: '2024-09-29T14:00:02'
  },
  {
    id: 23,
    saas: 'o365',
    user: 'BenjaminChen',
    account: 'benjamin.chen@company.com',
    totalUpload: 68,
    sensitive: 4,
    malware: 1,
    lastDate: '2024-10-01T11:35:13'
  },
  {
    id: 24,
    saas: 'googledrive',
    user: 'CharlotteDavis',
    account: 'charlotte.davis@gmail.com',
    totalUpload: 85,
    sensitive: 6,
    malware: 2,
    lastDate: '2024-10-03T16:10:24'
  },
  {
    id: 25,
    saas: 'slack',
    user: 'LucasMoore',
    account: 'lucas.moore@example.com',
    totalUpload: 42,
    sensitive: 2,
    malware: 1,
    lastDate: '2024-10-05T10:45:35'
  },
  {
    id: 26,
    saas: 'o365',
    user: 'HarperWilson',
    account: 'harper.wilson@company.com',
    totalUpload: 57,
    sensitive: 3,
    malware: 0,
    lastDate: '2024-10-07T13:20:46'
  },
  {
    id: 27,
    saas: 'googledrive',
    user: 'JacksonLee',
    account: 'jackson.lee@gmail.com',
    totalUpload: 79,
    sensitive: 5,
    malware: 2,
    lastDate: '2024-10-09T08:55:57'
  },
  {
    id: 28,
    saas: 'slack',
    user: 'ScarlettTaylor',
    account: 'scarlett.taylor@example.com',
    totalUpload: 34,
    sensitive: 1,
    malware: 0,
    lastDate: '2024-10-11T15:30:08'
  },
  {
    id: 29,
    saas: 'o365',
    user: 'LoganGarcia',
    account: 'logan.garcia@company.com',
    totalUpload: 61,
    sensitive: 4,
    malware: 1,
    lastDate: '2024-10-13T12:05:19'
  },
  {
    id: 30,
    saas: 'googledrive',
    user: 'GraceMartin',
    account: 'grace.martin@gmail.com',
    totalUpload: 76,
    sensitive: 5,
    malware: 2,
    lastDate: '2024-10-15T16:40:30'
  }
];

const selectedHistory = ref(null)
const isHistoryVisualizationModalOpen = ref(false)
const visualizationInfo = ref(null)

// 페이지 네비게이션
const items = ref([])
const totalData = ref([])
const selectPages = ref(1) // 1이라는 페이지로 셋팅
const totalPage = ref(0) // totalData의 개수에 따라 페이지네이션을 그려지는 리스트를 뜻합니다.
const totalCount = ref(null)
const limit = ref(20) // 한 페이지에 보여줄 아이템 개수

const getData = () => {
  totalData.value = mockupData
  // console.log('totalData', totalData.value);
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
      console.log(response)
      visualizationInfo.value = response
      console.log('!!!!', visualizationInfo.value)
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