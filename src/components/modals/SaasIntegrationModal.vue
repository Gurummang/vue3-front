<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white rounded-lg shadow-lg w-11/12 max-w-lg">
      <div class="flex justify-end p-3">
        <button @click="$emit('close')" class="text-gray-400 hover:text-black">
          <v-icon>mdi-close</v-icon>
        </button>
      </div>
      <div class="flex justify-center p-4">
        <!-- <div class="w-24 h-24 bg-gray-200"></div> -->
        <img src="@/assets/grummang_mascot_small.png" alt="구름망 캐릭터" class="w-1/4 h-1/4 object-cover rounded-full">
      </div>
      <div class="p-4">
        <div class="mb-4">
          <!-- <label for="saas" class="block mb-1">SaaS</label>
          <input type="text" id="saas" v-model="saas" class="w-full p-2 border rounded" readonly /> -->
          <label for="saasType" class="block text-lg font-semibold text-gray-700"> SaaS 종류 </label>
          <input
            type="text"
            id="saasType"
            placeholder="SaaS"
            :value="saasType"
            class="mt-1 p-2 w-full rounded-md shadow-sm sm:text-base border-2 border-gray-300"
            readonly
          />
        </div>
        <div class="mb-4">
          <!-- <label for="registrationDate" class="block mb-1">등록날짜</label>
          <input type="text" id="registrationDate" v-model="registrationDate" class="w-full p-2 border rounded" readonly /> -->
          <label for="TodayDate" class="block text-lg font-semibold text-gray-700"> 등록 날짜 </label>
          <input
            type="date"
            id="TodayDate"
            class="mt-1 p-2 w-full rounded-md shadow-sm sm:text-base border-2 border-gray-300"
            :value="registrationDate"
          
            readonly
          />
        </div>
        <div class="mb-4">
          <!-- <label for="connectionDetails" class="block mb-1">연동 벌칭</label>
          <input type="text" id="connectionDetails" v-model="connectionDetails" class="w-full p-2 border rounded" /> -->
          <label for="SaasAlias" class="block text-lg font-semibold text-gray-700"> 연동 별칭 </label>
          <input
            type="text"
            id="SaasAlias"
            placeholder="연동할 SaaS의 별칭을 입력해주세요."
            class="mt-1 p-2 w-full rounded-md shadow-sm sm:text-base border-2 border-gray-300"
            v-model="saasAlias"
          />
        </div>
        <div class="mb-4">
          <!-- <label for="adminEmail" class="block mb-1">SaaS 관리자 이메일</label>
          <input type="email" id="adminEmail" v-model="adminEmail" class="w-full p-2 border rounded" /> -->
          <label for="SaaSEmail" class="block text-lg font-semibold text-gray-700"> SaaS 관리자 이메일 </label>
          <input
            type="email"
            required
            id="SaaSEmail"
            placeholder="SaaS의 관리자 계정 이메일을 입력해주세요."
            class="mt-1 p-2 w-full rounded-md shadow-sm sm:text-base border-2 border-gray-300"
            v-model="saasEmail"
          />
          <p v-if="!isValidEmail" class="text-rose-500">이메일 형식을 맞춰서 작성해주세요.</p>
        </div>
        <div class="mb-4 relative">
          <label for="ApiKey" class="block text-lg font-semibold text-gray-700">API Key</label>
          <div class="relative">
            <input
              :type="showPassword ? 'password' : 'text'"
              id="ApiKey"
              v-model="apiKey"
              placeholder="SaaS의 API Key를 입력해주세요."
              class="mt-1 p-2 w-full pr-10 rounded-md shadow-sm sm:text-base border-2 border-gray-300"
            />
            <button 
              @click="togglePasswordVisibility" 
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <v-icon>{{ showPassword ? 'mdi-eye-closed' : 'mdi-eye' }}</v-icon>
            </button>
          </div>
        </div>  
        <div class="mb-4">
          <!-- <label for="webhookUrl" class="block mb-1">Webhook URL</label>
          <input type="url" id="webhookUrl" v-model="webhookUrl" class="w-full p-2 border rounded" /> -->
          <label for="WebhookUrl" class="block text-lg font-semibold text-gray-700"> Webhhook URL </label>
          <input
            type="text"
            id="WebhookUrl"
            placeholder="위 SaaS는 Webhook URL을 지원하지 않습니다."
            class="mt-1 p-2 w-full rounded-md shadow-sm sm:text-base border-2 border-gray-300"
            v-model="webhookUrl"
            readonly
          />
        </div>
        <div class="mb-4">
          <label class="inline-flex items-center">
            <input type="checkbox" v-model="agreeToTerms" class="form-checkbox w-5 h-5" />
            <span class="ml-2 text-base">위 SaaS 연동을 동의하겠습니다.</span>
          </label>
        </div>
      </div>
      <div class="flex justify-end p-4">
        <button @click="syncSaaS" class="bg-orange-500 text-white px-4 py-2 rounded text-lg font-semibold">SaaS 연동하기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, watch } from 'vue';
import { validateEmail } from '@/utils/validation.js'
import { getTodayDate } from '@/utils/utils.js'

let isModalOpen = ref(false);
// 임의의 값 넣기
let saasType = ref('SSS');
let registrationDate = ref(getTodayDate());
let saasAlias = ref('');
let saasEmail = ref('');
let apiKey = ref('');
let webhookUrl = ref('');
const agreeToTerms = ref(false);

const showPassword = ref(true);
const isValidEmail = ref(true);

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

defineEmits(['close'])

// const closeModal = () => {
//   isModalOpen.value = false;
// };

const syncSaaS = () => {
  if(!saasType.value) {
    console.log(saasType.value);
    alert('연동할 SaaS가 정의되지 않았습니다.');
    return;
  }
  if(!TodayDate.value) {
    console.log(TodayDate.value);
    alert('날짜가 정의되지 않았습니다.');
    return;
  }
  if(!SaasAlias.value) {
    console.log(SaasAlias.value);
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
  if(!ApiKey.value) {
    console.log(ApiKey.value);
    alert('SaaS의 API Key 값이 정의되지 않았습니다.\n해당 칸에 작성해주세요.');
    return;
  }
  if (!agreeToTerms.value) {
    alert('SaaS 연동을 위해 체크박스로 연동에 동의 해야합니다.');
    return;
  }
  // Perform the sync action here
  console.log('Syncing SaaS:', {
    saas: saasType.value,
    registrationDate: registrationDate.value,
    saasAlias: saasAlias.value,
    saasEmail: saasEmail.value,
    apiKey: apiKey.value,
    webhookUrl: webhookUrl.value,
  });
};

const validateAdminEmail = () => {
  isValidEmail.value = validateEmail(saasEmail.value);
};

// 이메일 입력 필드가 변경될 때마다 유효성 검사 실행
watch(saasEmail, validateAdminEmail);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

</script>
