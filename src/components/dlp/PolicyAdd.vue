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

        <h3 class="font-semibold text-gray-700 mb-2">적용할 SaaS 종류</h3>
        <div class="flex flex-wrap gap-2 mb-3">
          <div
            v-for="chip in chips"
            :key="chip.id"
            class="cursor-pointer border flex rounded-full px-3 py-1 text-sm"
            :class="{
              'bg-orange text-white border-orange-900': isSelected(chip.id),
              'bg-gray-100 text-black border-gray-400': !isSelected(chip.id)
            }"
            @click="singleToggleChip(chip)"
          >
            <img class="w-5 h-5 mr-2" :src="getSaasImg(convertSaasName(chip.name))" :alt="chip.name" /> {{ chip.alias }}
          </div>
        </div>

        <div class="flex space-x-4 mb-3">
          <div class="w-1/2">
            <h3 class="font-semibold text-gray-700 mb-1">식별 목록</h3>
            <select multiple class="w-full h-40 border rounded-md p-2" v-model="selectedLeft">
              <option v-for="item in leftList" :key="item" :value="item">{{ item }}</option>
            </select>
          </div>
          <div class="flex flex-col justify-center space-y-4">
            <button @click="moveToRight" class="bg-orange text-white px-4 py-2 rounded-md text-xs" v-html="'&#9654;'"></button>
            <button @click="moveToLeft" class="bg-orange text-white px-4 py-2 rounded-md text-xs" v-html="'&#9664;'"></button>
          </div>
          <div class="w-1/2">
            <h3 class="font-semibold text-gray-700 mb-1">선택한 식별 목록</h3>
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
            v-model="action"
          />
        </div>

      </div>
      <div class="flex justify-end py-3 gap-2">
        <button @click="router.go(-1)" class="bg-white text-orange-500 px-4 py-2 rounded border border-orange text-sm font-semibold hover:bg-orange-600 hover:text-white">정책 취소</button>
        <button @click="policyMake" class="bg-orange-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-orange-600">정책 추가</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, watch, defineProps, onMounted } from 'vue'
import { dlpPolicyMakeApi } from '@/apis/dlp.js'
import { useRouter } from 'vue-router'
import { getSaasImg, convertSaasName } from '@/utils/utils.js'

const props = defineProps({
  orgSaasList: {
    type: Object,
    required: true
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
// 선택된 칩들 저장
const selectedChips = ref([]);

let name = ref("");
let description = ref("");
let action = ref("");

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

// 주어진 chips 데이터
const chips = props.orgSaasList;

// 칩 선택 여부 확인
const isSelected = (id) => {
  return selectedChips.value.some(chip => chip.id === id);
};

// 칩 선택/해제 토글(단일)
const singleToggleChip = (chip) => {
  if (isSelected(chip.id)) {
    selectedChips.value = [];
  } else {
    selectedChips.value = [chip];
  }
};

// 칩 선택/해제 토글(다중)
const multipleToggleChip = (chip) => {
  if (isSelected(chip.id)) {
    selectedChips.value = selectedChips.value.filter(c => c.id !== chip.id);
  } else {
    selectedChips.value.push(chip);
  }
};

const policyMake = () => {
  if(!name.value) {
    alert('정책명이 정의되지 않았습니다.\n해당 칸에 작성해주세요.');
    return;
  }
  if(!description.value) {
    alert('정책 설명이 정의되지 않았습니다.\n해당 칸에 작성해주세요.');
    return;
  }
  if(!selectedChips.value.length) {
    alert('적용할 SaaS가 선택되지 않았습니다.\n선택해주세요.');
    return;
  }
  if(!rightList.value.length) {
    alert('식별할 항목을 선택하지 않았습니다.\n선택해주세요.');
    return;
  }
  if(!action.value) {
    alert('권장 조치가 정의되지 않았습니다.\n해당 칸에 작성해주세요.');
    return;
  }
  let policyData = {
    "policyName": name.value,
    "orgSaasId": selectedChips.value.map(chip => ( chip.id )),
    "description": description.value,
    "identify": rightList.value.includes('주민등록번호'),
    "passport": rightList.value.includes('여권번호'),
    "drive": rightList.value.includes('운전면허번호'),
    "foreigner": rightList.value.includes('외국인등록번호'),
    "comment": action.value
  }

  dlpPolicyMakeApi(policyData).then((response) => {
    if(response[0].success) {
      router.go(-1)
    }
    else {
      alert("정책 생성 과정에서 오류가 발생했습니다.")
    }
  })
  .catch(err => alert(err + "\n서버에 문제가 발생했어요."))

}
</script>

<style scoped>
</style>
