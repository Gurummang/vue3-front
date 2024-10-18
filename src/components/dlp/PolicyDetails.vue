<template>
  <div>
    <div class="bg-white shadow-sm rounded-lg p-4 mb-5">
      <div class="mb-2">
        <h2 class="text-xl font-bold text-gray-800 mb-4">DLP 정책 목록</h2>
        <div class="flex">
          <div class="space-x-2">
            <button
              class="inline-block border border-orange px-3 py-2 align-text-bottom text-sm font-semibold text-orange hover:bg-orange hover:text-white hover:border-orange active:bg-orange"
              @click="router.push('/dlp/add')"
            >
              <!-- @click="openVirustotalModal" -->
              <v-icon :size="20">mdi-magnify-plus-outline</v-icon> DLP 정책 생성
            </button>
            <button
              class="inline-block border border-red-600 px-3 py-2 align-text-bottom text-sm font-semibold text-red-600 hover:bg-red-600 hover:text-white active:bg-red-600"
              @click="openDlpDeleteModal"
            >
              <v-icon :size="20">mdi-magnify-minus-outline</v-icon> DLP 정책 삭제
            </button>
          </div>
          <div class="flex ml-auto space-x-2">
            
            <select v-model="sortBy" class="block w-sm text-sm font-medium transition duration-75 border border-gray-300 rounded-md shadow-sm focus:border-blue-600 focus:ring-1 focus:ring-inset focus:ring-blue-600 bg-none" >
              <option value="policyName" selected>정책명</option>
              <option value="saas">SaaS</option>
              <option value="description">정책설명</option>
              <option value="content">권장 조치사항</option>
            </select>
            <select v-model="sortOrder" class="block w-sm text-sm font-medium transition duration-75 border border-gray-300 rounded-md shadow-sm focus:border-blue-600 focus:ring-1 focus:ring-inset focus:ring-blue-600 bg-none" >
              <option value="asc">오름차순</option>
              <option value="desc" selected>내림차순</option>
            </select>

            <div class="relative max-w-sm">
              <input v-model="searchFilter" class="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" type="search" placeholder="검색">
              <button @click="getData" class="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
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
              <th class="px-1 py-3 w-[10%] text-left text-sm font-bold font-medium text-white tracking-wider">정책명</th>
              <th class="px-1 py-3 w-[16%] text-left text-sm font-bold font-medium text-white tracking-wider">SaaS</th>
              <th class="px-1 py-3 w-[20%] text-left text-sm font-bold font-medium text-white tracking-wider">식별종류</th>
              <th class="px-2 py-3 w-[25%] text-left text-sm font-bold font-medium text-white tracking-wider">정책설명</th>
              <th class="px-2 py-3 w-[25%] text-left text-sm font-bold font-medium text-white tracking-wider">권장 조치사항</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <template v-for="(details, index) in sortedData" :key="index" >
              <tr class="hover:bg-gray-100">
                <td class="px-2 py-2 text-center whitespace-nowrap">
                  <input 
                    type="checkbox" 
                    class="size-3.5 rounded border-gray-300" 
                    :value="details.policyId"
                    v-model="checkedIndex" 
                    onclick="event.cancelBubble = true;"
                  />
                </td>
                <td class="px-2 py-2 whitespace-nowrap text-xs">{{ details.policyName }}</td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="flex items-center">
                    <img class="size-5 rounded-full mr-2" :src="getSaasImg(convertSaasName(details.saasName))" :alt="details.saasName" />
                    <span class="text-xs"> {{ details.alias }}</span>
                  </div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap text-xs truncate">
                  <span v-if="details.identify" class="bg-gray-200 text-gray-900 text-xs font-medium me-1 px-1.5 py-0.5 rounded">주민등록번호</span>
                  <span v-if="details.passport" class="bg-gray-200 text-gray-900 text-xs font-medium me-1 px-1.5 py-0.5 rounded">여권번호</span>
                  <span v-if="details.drive" class="bg-gray-200 text-gray-900 text-xs font-medium me-1 px-1.5 py-0.5 rounded">운전면허번호</span>
                  <span v-if="details.foreigner" class="bg-gray-200 text-gray-900 text-xs font-medium me-1 px-1.5 py-0.5 rounded">외국인등록번호</span>
                  <!-- <span v-for="(type, idx) in formatFileTypes(details.fileType)" :key="idx">
                    <span v-if="type.startsWith('...')" class="text-gray-500 text-xs font-medium me-1 px-1.5 py-0.5 rounded">{{ type }}</span>
                    <span v-else class="bg-gray-200 text-gray-900 text-xs font-medium me-1 px-1.5 py-0.5 rounded">{{ type }}</span>
                  </span> -->
                </td>
                <td class="px-2 py-2 whitespace-nowrap text-xs">{{ details.description }}</td>
                <td class="px-2 py-2 whitespace-nowrap text-xs">{{ details.comment }}</td>
                <!-- <td class="px-2 py-2 whitespace-nowrap text-xs text-center">{{ removeWordDate(details.date) }}</td> -->
              </tr>
            </template>
              <!-- Accordion row -->
          </tbody>
        </table>
      </div>
    </div>

    <the-pagination :totalPage="totalPage" @send-event="reset" :selectPages="selectPages"></the-pagination>
  </div>

<DlpDeleteModal
  v-if="isDlpDeleteModalOpen"
  :checkedIndex="checkedIndex"
  @close="closeDlpDeleteModal"
></DlpDeleteModal>

</template>

<script setup>
import { ref, watch, defineProps, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DlpDeleteModal from '@/components/modals/DlpDeleteModal.vue'
import ThePagination from '@/components/ThePagination.vue'
import { getSaasImg, convertSaasName, formatFileTypes } from '@/utils/utils.js'
import { dlpPolicyListApi } from '@/apis/dlp.js'

const props = defineProps({
  policyDetails: Object,
  required: true
})
const router = useRouter();

const policys = ref(props.policyDetails)
let checkedIndex = ref([])
const isDlpDeleteModalOpen = ref(false)

const sortBy = ref('policyName')
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
  sortedData.value = [...props.policyDetails].sort((a, b) => {
    let compareResult

    switch (sortBy.value) {
      case 'policyName':
        compareResult = a.policyName.localeCompare(b.policyName)
        break
      case 'saas':
        compareResult = a.saas.localeCompare(b.saas)
        break
      case 'description':
        compareResult = a.description.localeCompare(b.description)
        break
      case 'content':
        compareResult = a.content.localeCompare(b.content)
        break
      default:
        compareResult = 0
    }
    
    return sortOrder.value === 'asc' ? compareResult : -compareResult
  })
  .filter(item => item.policyName.toLowerCase().includes(searchFilter.value.toLowerCase()))

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

// Modal Function
const openDlpDeleteModal = () => {
  if (checkedIndex.value.length) {
    isDlpDeleteModalOpen.value = true
  } else {
    alert('삭제할 정책을 선택해주세요.')
  }
}

const closeDlpDeleteModal = () => {
  isDlpDeleteModalOpen.value = false
  clearCheckedIndex()
  router.go()
  // dlpPolicyListApi().then((response) => {
  //   policys.value = response
  // })
  // .catch(err => alert(err + "\n서버에 문제가 발생했어요."))
}
</script>

<style scoped>
</style>
