<template>
  <div>
    <div class="bg-white shadow-sm rounded-lg p-4 mb-5">
      <div class="mb-2">
        <h2 class="text-xl font-bold text-gray-800 mb-4">DLP 정책 추가</h2>

        <div class="mb-3">
          <label for="policyName" class="block font-semibold text-gray-700"> 정책명 </label>
          <input
            type="text"
            id="policyName"
            placeholder="DLP의 정책명을 입력해주세요."
            class="mt-1 p-1.5 w-full rounded-md shadow-sm text-sm border-2 border-gray-300"
            v-model="name"
          />
        </div>

        <div class="mb-3">
          <label for="policyDescription" class="block font-semibold text-gray-700"> 정책 설명 </label>
          <input
            type="text"
            id="policyDescription"
            placeholder="DLP의 정책에 대한 설명을 입력해주세요."
            class="mt-1 p-1.5 w-full rounded-md shadow-sm text-sm border-2 border-gray-300"
            v-model="description"
          />
        </div>

        <div class="flex space-x-4 mb-3">
          <div class="w-1/2">
            <h3 class="font-semibold text-gray-700 mb-1">탐지 목록</h3>
            <select multiple class="w-full h-40 border rounded-md p-2" v-model="selectedLeft">
              <option v-for="item in leftList" :key="item" :value="item">{{ item }}</option>
            </select>
          </div>
          <div class="flex flex-col justify-center space-y-4">
            <button @click="moveToRight" class="bg-orange text-white px-4 py-2 rounded-md text-xs" v-html="'&#9654;'"></button>
            <button @click="moveToLeft" class="bg-orange text-white px-4 py-2 rounded-md text-xs" v-html="'&#9664;'"></button>
          </div>
          <div class="w-1/2">
            <h3 class="font-semibold text-gray-700 mb-1">선택한 탐지 목록</h3>
            <select multiple class="w-full h-40 border rounded-md p-2" v-model="selectedRight">
              <option v-for="item in rightList" :key="item" :value="item">{{ item }}</option>
            </select>
          </div>
        </div>

        <div class="mb-3">
          <label for="SaasAlias" class="block font-semibold text-gray-700"> 권장 조치 </label>
          <input
            type="text"
            id="SaasAlias"
            placeholder="정책이 탐지 될 시에 할 권장 조치사항을 입력해주세요."
            class="mt-1 p-1.5 w-full rounded-md shadow-sm text-sm border-2 border-gray-300"
            v-model="alias"
          />
        </div>

      </div>
      <div class="flex justify-end py-3 gap-2">
        <button @click="router.go(-1)" class="bg-white text-orange-500 px-4 py-2 rounded border border-orange text-sm font-semibold hover:bg-orange-600 hover:text-white">정책 취소</button>
        <button @click="syncSaaS" class="bg-orange-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-orange-600">정책 추가</button>
      </div>
    </div>

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

const props = defineProps({
  policyDetails: {
    type: Object,
  // required: true
  },
  initialLeftList: {
    type: Array,
    default: () => ['주민등록번호', '외국인등록번호', '여권번호', '운전면허번호']
  }
})

const router = useRouter()

const leftList = ref(props.initialLeftList)
const rightList = ref([])
const selectedLeft = ref([])
const selectedRight = ref([])

const moveToRight = () => {
  rightList.value = [...rightList.value, ...selectedLeft.value]
  leftList.value = leftList.value.filter(item => !selectedLeft.value.includes(item))
  selectedLeft.value = []
}

const moveToLeft = () => {
  leftList.value = [...leftList.value, ...selectedRight.value]
  rightList.value = rightList.value.filter(item => !selectedRight.value.includes(item))
  selectedRight.value = []
}


</script>

<style scoped>
</style>
