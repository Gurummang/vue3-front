<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg w-1/2">
      <div class="flex justify-between px-4 py-3">
        <div class="flex items-center">
          <v-icon :size="25" class="text-orange">mdi-email-plus-outline</v-icon>
          <h2 class="text-lg font-bold text-gray-700 ml-1.5">이메일알림 생성</h2>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-black">
          <v-icon>mdi-close</v-icon>
        </button>
      </div>
      <div class="px-4">
        <div class="mb-2">
          <label for="emailTitle" class="block text-sm font-semibold text-gray-700"> 이메일 제목 </label>
          <input
            type="text"
            id="emailTitle"
            placeholder="이메일의 제목을 입력해주세요."
            class="mt-1 p-1.5 w-full rounded-md shadow-sm text-xs border-2 border-gray-300"
            v-model="emailTitle"
          />
        </div>
        <div class="mb-2">
          <label for="SaaSEmail" class="block text-sm font-semibold text-gray-700"> 이메일 수신 계정 </label>
          <div class="mt-1 flex flex-wrap items-center border-2 border-gray-300 rounded-md focus-within:border-black">
            <template v-for="(email, index) in emails" :key="index">
              <span class="flex items-center m-0.5 px-2 py-1 bg-orange text-white rounded-full text-xs">
                {{ email }}
              <v-icon :size="12" @click="removeEmail(index)" class="ml-1.5 hover:text-orange-900">mdi-close</v-icon>
              </span>
            </template>
            <input
              v-model="newEmail"
              type="email"
              @keydown.enter.prevent="addEmail"
              placeholder="이메일 주소 입력 후 엔터를 눌러주세요."
              class="flex-grow p-1.5 text-xs rounded-md focus:outline-none"
              ref="emailInput"
            >
          </div>
          <p v-if="errorEmail" class="mt-1 text-sm text-rose-500">{{ errorEmail }}</p>
        </div> 
        <div class="mb-5">
          <label for="SaaSEmail" class="block text-sm font-semibold text-gray-700"> 이메일 내용 </label>
          <textarea 
            rows="7" 
            class="mt-1 p-1.5 w-full rounded-md shadow-sm text-xs border-2 border-gray-300"
            v-model="emailContent"
          ></textarea>
        </div> 
        <!-- Items Toggle -->
        <div class="flex justify-between mb-5 pb-2 w-60 border-b-2">
          <span class="text-sm font-semibold text-gray-700">악성코드 탐지</span>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="gscanCheck" class="sr-only peer">
            <div class="relative w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange"></div>
          </label>
        </div> 
        <div class="flex justify-between mb-5 pb-2 w-60 border-b-2">
          <span class="text-sm font-semibold text-gray-700">DLP 탐지</span>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="dlpCheck" class="sr-only peer">
            <div class="relative w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange"></div>
          </label>
        </div> 
        <div class="flex justify-between mb-2 pb-2 w-60 border-b-2">
          <span class="text-sm font-semibold text-gray-700">VirusTotal 탐지</span>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="vtCheck" class="sr-only peer">
            <div class="relative w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange"></div>
          </label>
        </div> 
      </div>

      <div class="flex justify-end p-3 gap-2">
        <button @click="emit('close')" class="bg-white text-orange px-4 py-2 rounded text-sm font-semibold border border-orange hover:bg-orange-600 hover:text-white">알림 취소</button>
        <button @click="emailMake" class="bg-orange-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-orange-600">알림 생성</button>
      </div>
    </div>
  </div>
<!-- <saas-error-modal
  v-if="isErrorModalOpen"
  :errorCode="errorCode"
  :errorType="'연동'"
  @close="closeErrorModal"
></saas-error-modal> -->

</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import axios from 'axios';
import saasErrorModal from '@/components/modals/SaasErrorModal.vue'
import { alertMakeApi } from '@/apis/email.js'
import { validateEmail } from '@/utils/validation.js'
import { htmlEscape, specialChar } from '@/utils/security.js';

let emit = defineEmits(['close'])

// 임의의 값 넣기
const emailTitle = ref('')
const emailContent = ref('')
const emails = ref([])
const newEmail = ref('')
const errorEmail = ref('')
const emailInput = ref(null)
const gscanCheck = ref(false)
const dlpCheck = ref(false)
const vtCheck = ref(false)

let isErrorModalOpen = ref(false);
let errorCode = ref(null);

const openErrorModal = () => {
  isErrorModalOpen.value = true;
};

const closeErrorModal = () => {
  isErrorModalOpen.value = false;
}

// 구분선
const addEmail = () => {
  const email = newEmail.value.trim()
  if (email && validateEmail(email)) {
    if (!emails.value.includes(email)) {
      emails.value.push(email)
      newEmail.value = ''
      errorEmail.value = ''
    } else {
      errorEmail.value = '이미 등록된 이메일입니다.'
    }
  } else if (email) {
    errorEmail.value = '유효하지 않은 이메일 주소입니다.'
  }
}

const removeEmail = (index) => {
  emails.value.splice(index, 1)
}

const emailMake = () => {
  if(!emailTitle.value) {
    alert('이메일 제목이 없습니다. \n이메일의 제목을 작성해주세요.')
    return;
  }
  if(emails.value.length === 0) {
    alert('이메일이 없습니다. \n알림할 이메일을 추가해주세요.')
    return;
  }
  if(!emailContent.value) {
    alert('이메일 내용이 없습니다. \n이메일의 내용을 작성해주세요.')
    return;
  }
  if(!(gscanCheck.value || dlpCheck.value || vtCheck.value)) {
    alert('탐지할 항목들이 없습니다. \n 탐지할 항목을 선택해주세요.')
    return;
  }
  let data = {
    "email": emails.value,
    "title": emailTitle.value,
    "content": emailContent.value,
    "suspicious": gscanCheck.value,
    "sensitive": dlpCheck.value,
    "vt": vtCheck.value
  };

  alertMakeApi(data).then((response) => {
    if(response.data.message.includes("완료")) {
      emit('close')
    }
    else {
      alert("일부 이메일에 알림할 수 없습니다. 메일함에서 링크를 확인하세요")
    }
  })
  .catch(err => alert(err + "\n서버에 문제가 발생했어요."));
}

</script>
