<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg w-1/4 max-w-lg">
      <div class="flex justify-end p-3">
        <button @click="$emit('close')" class="text-gray-400 hover:text-black">
          <v-icon>mdi-close</v-icon>
        </button>
      </div>
      <div class="px-4">
        <div class="mb-2 space-y-2 text-center">
          <label for="saasType" class="block pb-2 text-2xl font-semibold text-red-600"> 
            <v-icon :size="30">mdi-delete-outline</v-icon> 파일삭제 </label>
          <p class="text-base pb-3">SaaS에 저장된 <strong>n</strong>개의 파일을 <br/>정말 삭제하겠습니까?</p>
          <p class="text-xs text-red-600 font-semibold">파일을 삭제하면은 더 이상 복구할 수 없습니다.</p>
        </div>
      </div>
      <div class="flex justify-center p-3 space-x-2">
        <button  @click="$emit('close')" class="w-1/2 border border-red-600 px-3 py-2 align-text-bottom text-sm font-semibold text-red-600 hover:bg-red-800 hover:text-white active:bg-red-800">아니오</button>
        <button @click="close" class="w-1/2 bg-red-600 border border-red-600 px-3 py-2 align-text-bottom text-sm font-semibold text-white hover:bg-red-800 active:bg-red-800">예</button>
      </div>
    </div>
  </div>

  <saas-error-modal
    v-if="isErrorModalOpen"
    :errorCode="errorCode"
    :errorType="'연동'"
    @close="closeErrorModal"
  ></saas-error-modal>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import axios from 'axios';
import saasErrorModal from '@/components/modals/SaasErrorModal.vue'
import { validateEmail } from '@/utils/validation.js'
import { getWebhookApi, TokenValidationApi, connectSaasApi } from '@/apis/register.js'

let emit = defineEmits(['close']);

// 임의의 값 넣기
let saasType = ref('None');
let alias = ref('');
let saasEmail = ref('');
let webhookUrl = ref('');
let apiToken = ref('');
let agreeToTerms = ref(false);

let showPassword = ref(true);
let isValidEmail = ref(true);
let isValidApiToken = ref(true);
let selectedSaaS = ref(null);
let isErrorModalOpen = ref(false);
let errorCode = ref(null);

const openErrorModal = () => {
  isErrorModalOpen.value = true;
};

const closeErrorModal = () => {
  isErrorModalOpen.value = false;
}

const syncSaaS = () => {
  if(!saasType.value || saasType.value === 'None') {
    alert('연동할 SaaS가 정의되지 않았습니다.');
    return;
  }
  if(!SaasAlias.value) {
    alert('연동 별칭이 정의되지 않았습니다.\n해당 칸에 작성해주세요.');
    return;
  }
  if(!SaaSEmail.value) {
    alert('SaaS 관리자 이메일이 정의되지 않았습니다.\n해당 칸에 다시 작성해주세요.');
    return;
  }
  else if(!isValidEmail.value) {
    alert('이메일 형식이 올바르지 않습니다.\n다시 작성해주세요.');
    return;
  }
  if(!apiToken.value) {
    alert('SaaS의 API Key 값이 정의되지 않았습니다.\n해당 칸에 작성해주세요.');
    return;
  }
  else if(!isValidApiToken.value) {
    alert('해당 API Token이 올바르지 않습니다.\n다시 작성해주세요.');
    return;
  }
  if (!agreeToTerms.value) {
    alert('SaaS 연동을 위해 체크박스로 연동에 동의 해야합니다.');
    return;
  }

  // 다음 스텝 -> 해당 값들을 POST로 보내기
  let connectData = {
    "orgId": 1,     // samsung
    "saasId": saasType.value,    // slack
    "alias": alias.value,
    "adminEmail": saasEmail.value,
    "apiToken": apiToken.value,
    "webhookUrl": webhookUrl.value
  };

  connectSaasApi(connectData).then((response) => {
    console.log(response);
    errorCode = response.errorCode;
    if(errorCode != 200) {
      openErrorModal();
      watch(isErrorModalOpen, (afterValue, beforeValue) => {
        if (afterValue === false) {
          emit('close');
        }
      });
    }
    else {
      emit('close');
    }
  })
  .catch(err => alert(err + "\n서버에 문제가 발생했어요."));
};


const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const validateAdminEmail = () => {
  isValidEmail.value = validateEmail(saasEmail.value);
};

const validateWebhook = () => {
  if(saasType.value != 'None') {
    getWebhookApi(saasType.value).then((response) => {
      webhookUrl.value = response;
    });
  }
}

const validateApiToken = () => {
  let data = {
    "apiToken": apiToken.value
  }
  TokenValidationApi(data, 1).then((response) => {
    isValidApiToken.value = response;
  });
  console.log('API 토큰 검증이래:  '+ isValidApiToken.value);
}

watch(saasEmail, validateAdminEmail);
watch(apiToken, validateApiToken);
watch(saasType, validateWebhook);

</script>

<style scoped>

</style>
