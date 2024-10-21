<template>
  <div>
    <div class="bg-white shadow-sm rounded-lg p-4 mb-5">
      <div class="mb-2">
        <h2 class="text-xl font-bold text-gray-800 mb-4">이메일알림 목록 - {{ totalCount }}개</h2>
        <div class="flex">
          <div class="space-x-2">
            <button
              class="inline-block rounded border border-orange px-3 py-2 align-text-bottom text-sm font-semibold text-orange hover:bg-orange hover:text-white hover:border-orange active:bg-orange"
              @click="openEmailCreatModal"
            >
              <!-- @click="openVirustotalModal" -->
              <v-icon :size="20">mdi-email-plus-outline</v-icon> 이메일 알림 생성
            </button>
            <button
              class="inline-block rounded border border-indigo-900 px-3 py-2 align-text-bottom text-sm font-semibold text-indigo-900 hover:bg-indigo-900 hover:text-white hover:border-indigo-900 active:bg-indigo-900"
              @click="openEmailModifyModal"
            >
              <!-- @click="openVirustotalModal" -->
              <v-icon :size="20">mdi-email-sync-outline</v-icon> 이메일 알림 수정
            </button>
            <button
              class="inline-block rounded border border-red-600 px-3 py-2 align-text-bottom text-sm font-semibold text-red-600 hover:bg-red-600 hover:text-white active:bg-red-600"
              @click="openEmailDeleteModal"
            >
              <v-icon :size="20">mdi-email-remove-outline</v-icon> 이메일 알림 삭제
            </button>
          </div>
          <div class="flex ml-auto space-x-2">
            
            <select v-model="sortBy" class="block w-sm text-sm font-medium transition duration-75 border border-gray-300 rounded-md shadow-sm focus:border-blue-600 focus:ring-1 focus:ring-inset focus:ring-blue-600 bg-none" >
              <!-- <option value="email">수신 이메일</option> -->
              <option value="title" selected>제목</option>
              <option value="content">설명</option>
              <option value="sensitive">DLP</option>
              <option value="suspicious">악성탐지</option>
              <option value="vt">VirusTotal</option>
            </select>
            <select v-model="sortOrder" class="block w-sm text-sm font-medium transition duration-75 border border-gray-300 rounded-md shadow-sm focus:border-blue-600 focus:ring-1 focus:ring-inset focus:ring-blue-600 bg-none" >
              <option value="asc">오름차순</option>
              <option value="desc" selected>내림차순</option>
            </select>

            <div class="relative max-w-sm">
              <input v-model="searchFilter" @keyup.enter="() => { getData(); selectPages = 1; }" class="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" type="search" placeholder="검색">
              <button @click="() => { getData(); selectPages = 1; }" class="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z" />
              </svg>
              </button>
            </div>

          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead class="bg-indigo-900">
            <tr>
              <th class="px-2 py-3 w-[4%] text-center text-sm font-bold font-medium text-white tracking-wider"></th>
              <th class="px-1 py-3 w-[20%] text-left text-sm font-bold font-medium text-white tracking-wider">수신 이메일</th>
              <th class="px-1 py-3 w-[25%] text-left text-sm font-bold font-medium text-white tracking-wider">제목</th>
              <th class="px-1 py-3 w-[25%] text-left text-sm font-bold font-medium text-white tracking-wider">내용</th>
              <th class="px-2 py-3 w-[7%] text-left text-sm font-bold font-medium text-white tracking-wider text-center">DLP</th>
              <th class="px-2 py-3 w-[7%] text-left text-sm font-bold font-medium text-white tracking-wider text-center">악성 탐지</th>
              <th class="px-2 py-3 w-[7%] text-left text-sm font-bold font-medium text-white tracking-wider text-center">VirusTotal</th>
            </tr>
          </thead>
          <tbody v-if="sortedData" class="bg-white divide-y divide-gray-200">
            <template v-for="(details, index) in sortedData" :key="index" >
              <tr class="hover:bg-gray-100">
                <td class="px-2 py-2 text-center whitespace-nowrap">
                    <input 
                    type="radio" 
                    name="email"
                    class="form-radio size-3"
                    :value="details"
                    v-model="selectedEmail"
                  />
                </td>
                <td class="px-2 py-2 whitespace-nowrap text-xs">
                  <span v-for="(em, idx) in details.email" :key="idx">
                    <span class="bg-gray-200 text-gray-900 text-xs font-medium me-1 px-1.5 py-0.5 rounded">{{ em }}</span>
                  </span>
                </td>
                <td class="px-2 py-2 whitespace-nowrap text-xs">{{ details.title }}</td>
                <td class="px-2 py-2 whitespace-nowrap text-xs">{{ details.content }}</td>
                <td class="px-2 py-2 whitespace-nowrap text-xs text-center">
                  <!-- <input type="checkbox" class="size-3.5 rounded border-indigo-900 " :checked="details.sensitive" disabled/> -->
                  <label class="inline-flex items-center">
                    <input type="checkbox" v-model="details.sensitive" class="sr-only peer" disabled>
                    <div class="relative flex items-center justify-center rounded size-4 bg-gray-100 border border-gray-400 peer peer-checked:bg-indigo-900">
                      <svg v-if="details.sensitive" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </label>
                </td>
                <td class="px-2 py-2 whitespace-nowrap text-xs text-center">
                  <!-- <input type="checkbox" class="size-3.5 rounded border-indigo-900 " :checked="details.suspicious" disabled/> -->
                  <label class="inline-flex items-center">
                    <input type="checkbox" v-model="details.suspicious" class="sr-only peer" disabled>
                    <div class="relative flex items-center justify-center rounded size-4 bg-gray-100 border border-gray-400 peer peer-checked:bg-indigo-900">
                      <svg v-if="details.suspicious" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </label>
                </td>
                <td class="px-2 py-2 whitespace-nowrap text-xs text-center">
                  <!-- <input type="checkbox" class="size-3.5 rounded border-indigo-900 " :checked="details.vt" disabled/> -->
                  <label class="inline-flex items-center">
                    <input type="checkbox" v-model="details.vt" class="sr-only peer" disabled>
                    <div class="relative flex items-center justify-center rounded size-4 bg-gray-100 border border-gray-400 peer peer-checked:bg-indigo-900">
                      <svg v-if="details.vt" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </label>
                </td>
              </tr>
            </template>
              <!-- Accordion row -->
          </tbody>
          <tbody v-else class="bg-white h-full">
            <tr class="h-full">
              <td colspan="7" class="text-center py-7 h-full">
                <div class="flex flex-col items-center justify-center h-full">
                  <img src="@/assets/grummang_mascot_small.png" alt="구름망 캐릭터" class="size-20 object-cover rounded-full mb-5">
                  <p class="text-gray-500 text-base">이메일 알림이 없습니다.</p>
                </div>
              </td>
            </tr>
          </tbody>

        </table>
      </div>
    </div>

    <the-pagination :totalPage="totalPage" @send-event="reset" :selectPages="selectPages"></the-pagination>
  </div>

<EmailCreatModal
  v-if="isEmailCreatModalOpen"
  @close="closeEmailCreatModal"  
></EmailCreatModal>
<EmailModifyModal
  v-if="isEmailModifyModalOpen"
  :selectedEmail="selectedEmail"
  @close="closeEmailDeleteModal"  
></EmailModifyModal>
<EmailDeleteModal
  v-if="isEmailDeleteModalOpen"
  :selectedEmail="selectedEmail"
  @close="closeEmailDeleteModal"  
></EmailDeleteModal>

</template>

<script setup>
import { ref, watch, defineProps, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import EmailCreatModal from '@/components/modals/EmailCreatModal.vue'
import EmailModifyModal from '@/components/modals/EmailModifyModal.vue'
import EmailDeleteModal from '@/components/modals/EmailDeleteModal.vue'
import ThePagination from '@/components/ThePagination.vue'
import { getSaasImg, convertSaasName, formatFileTypes } from '@/utils/utils.js'

const props = defineProps({
  emailDetails: Object,
  // required: true
})
const router = useRouter();

const emails = ref(props.emailDetails.data)
let checkedIndex = ref([])
const isEmailCreatModalOpen = ref(false)
const isEmailModifyModalOpen = ref(false)
const isEmailDeleteModalOpen = ref(false)
const selectedEmail = ref(null)

const sortBy = ref('title')
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
  sortedData.value = [...props.emailDetails.data].sort((a, b) => {
    let compareResult

    switch (sortBy.value) {
      case 'title':
        compareResult = a.title.localeCompare(b.title)
        break
      case 'content':
        compareResult = a.content.localeCompare(b.content)
        break
      case 'sensitive':
        compareResult = a.sensitive - b.sensitive
        break
      case 'suspicious':
        compareResult = a.suspicious - b.suspicious
        break
      case 'vt':
        compareResult = a.vt - b.vt
        break
      default:
        compareResult = 0
    }
    
    return sortOrder.value === 'asc' ? compareResult : -compareResult
  })
  .filter(item => item.title.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
                  item.content.toLowerCase().includes(searchFilter.value.toLowerCase())
  )

  totalCount.value = sortedData.value !== undefined ? sortedData.value.length : 0
  totalPage.value =
    Math.ceil(totalCount.value / limit.value) !== 0 ? Math.ceil(totalCount.value / limit.value) : 1
  sortedData.value = disassemble(selectPages.value - 1, sortedData.value, limit.value)
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

const clearCheckedIndex = () => {
  checkedIndex.value = []
}

const openEmailCreatModal = () => {
  isEmailCreatModalOpen.value = true;
};

const closeEmailCreatModal = () => {
  isEmailCreatModalOpen.value = false;
  router.go();
}

// Modal Function
const openEmailModifyModal = () => {
  if (selectedEmail.value) {
    isEmailModifyModalOpen.value = true
  } else {
    alert('수정할 Email 알림을 선택해주세요.')
  }
}

const closeEmailModifyModal = () => {
  isEmailModifyModalOpen.value = false
  clearCheckedIndex()
  router.go()
}

const openEmailDeleteModal = () => {
  if (selectedEmail.value) {
    isEmailDeleteModalOpen.value = true
  } else {
    alert('삭제할 Email 알림을 선택해주세요.')
  }
}

const closeEmailDeleteModal = () => {
  isEmailDeleteModalOpen.value = false
  clearCheckedIndex()
  router.go()
}
</script>

<style scoped>
/* input[id='indigoCheckBox']{
  display: none;
} */
</style>
