<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg w-1/4 max-w-lg">
      <div class="flex justify-end p-3">
        <button @click="$emit('close')" class="text-gray-400 hover:text-black">
          <v-icon>mdi-close</v-icon>
        </button>
      </div>
      <div class="flex justify-center p-3">
        <img src="@/assets/grummang_mascot_small.png" alt="구름망 캐릭터" class="size-1/3 object-cover rounded-full">
      </div>
      <div class="px-4">
        <div class="mb-2">
          <label for="saasType" class="block text-sm font-semibold text-gray-700"> SaaS 종류 </label>
          <select name="SaasType"
            id="SaasType" 
            size="1" 
            class="mt-1 p-1.5 w-full rounded-md shadow-sm text-xs border-2 border-gray-300"
            v-model="saasType"
          >
            <option value="None" selected disabled hidden>연동할 SaaS를 선택해주세요.</option>
            <option value="2">Jira</option>
            <option value="1">Slack</option>
            <option value="3">O365</option>
          </select>
        </div>
        <div class="mb-2">
          <label for="SaasAlias" class="block text-sm font-semibold text-gray-700"> 연동 별칭 </label>
          <input
            type="text"
            id="SaasAlias"
            placeholder="연동할 SaaS의 별칭을 입력해주세요."
            class="mt-1 p-1.5 w-full rounded-md shadow-sm text-xs border-2 border-gray-300"
            v-model="alias"
          />
        </div>
        <div class="mb-2">
          <label for="SaaSEmail" class="block text-sm font-semibold text-gray-700"> SaaS 관리자 이메일 </label>
          <input
            type="email"
            required
            id="SaaSEmail"
            placeholder="SaaS의 관리자 계정 이메일을 입력해주세요."
            class="mt-1 p-1.5 w-full rounded-md shadow-sm text-xs border-2 border-gray-300"
            v-model="saasEmail"
          />
          <p v-if="!isValidEmail" class="text-rose-500">이메일 형식을 맞춰서 작성해주세요.</p>
        </div>
        <div class="mb-2 relative">
          <label for="ApiKey" class="block text-sm font-semibold text-gray-700">API Key</label>
          <div class="relative">
            <form>
              <input
                :type="showPassword ? 'password' : 'text'"
                id="ApiKey"
                v-model="apiToken"
                placeholder="SaaS의 API Key를 입력해주세요."
                class="mt-1 p-1.5 w-full pr-10 rounded-md shadow-sm text-xs border-2 border-gray-300"
                autocomplete="on"
              />
              <button 
                @click="togglePasswordVisibility" 
                type="button"
                :class="['absolute right-0 pr-2 flex items-center', isValidApiToken ? 'top-5 bottom-5' : '-top-5 -bottom-0']"
              >
                <v-icon>{{ showPassword ? 'mdi-eye-closed' : 'mdi-eye' }}</v-icon>
              </button>
            </form>
            <p v-if="!isValidApiToken" class="text-rose-500">해당 API Token이 올바르지 않습니다.</p>
          </div>
        </div>  
        <div class="mb-2">
          <label for="WebhookUrl" class="block text-sm font-semibold text-gray-700"> Webhhook URL </label>
          <input
            type="text"
            id="WebhookUrl"
            placeholder="위 SaaS는 Webhook URL을 지원하지 않습니다."
            class="mt-1 p-1.5 w-full rounded-md shadow-sm text-xs border-2 border-gray-300"
            v-model="webhookUrl"
            readonly
          />
        </div>
        <div class="mb-2">
          <label class="inline-flex items-center">
            <input type="checkbox" v-model="agreeToTerms" class="form-checkbox size-4" />
            <span class="ml-2 text-sm">위 SaaS 연동을 동의하겠습니다.</span>
          </label>
        </div>
      </div>
      <div class="flex justify-end p-3">
        <button @click="syncSaaS" class="bg-orange-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-orange-600">SaaS 연동하기</button>
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
