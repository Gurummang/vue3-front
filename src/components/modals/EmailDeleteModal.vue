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
            <v-icon :size="30">mdi-email-remove-outline</v-icon> 이메일 알림 삭제 </label>
          <p class="text-base pb-1 font-semibold">"{{ props.selectedEmail.title }}"</p>
          <p class="text-base pb-3">위 이메일 알림을 정말 삭제하겠습니까?</p>
          <p class="text-xs text-red-600 font-semibold">해당 이메일 알림을 삭제하면은 <br>앞으로 탐지 알림을 발송하지 않습니다.</p>
        </div>
      </div>

      <div class="px-3 pt-3">
        <label class="inline-flex items-center">
          <input type="checkbox" v-model="confirmed" class="form-checkbox size-3.5" />
          <span class="ml-2 text-xs font-semibold">위 이메일 알림을 삭제하는 것에 동의하겠습니다.</span>
        </label>
      </div>

      <div class="flex justify-center p-3 space-x-2">
        <button  
          @click="$emit('close')" 
          class="w-1/2 border border-red-600 px-3 py-2 align-text-bottom text-sm font-semibold text-red-600 hover:bg-red-800 hover:text-white active:bg-red-800"
        >아니오
        </button>
        <button 
          @click="$emit('close')" 
          :disabled="!confirmed"
          :class="['w-1/2 border px-3 py-2 align-text-bottom text-sm font-semibold text-white', confirmed ? 'bg-red-600 border-red-600 hover:bg-red-800 active:bg-red-800' : 'bg-gray-400 border-gray-400 cursor-not-allowed']"
        >예
        </button>
      </div>
    </div>
  </div>

  <saas-error-modal
    v-if="isErrorModalOpen"
    :errorCode="errorCode"
    :errorType="'해제'"
    @close="closeErrorModal"
  ></saas-error-modal>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'
import saasErrorModal from '@/components/modals/SaasErrorModal.vue'
import { getSaasImg } from '@/utils/utils.js'
import { unconnectSaasApi } from '@/apis/register.js'

const props = defineProps({
  selectedEmail: {
    type: Object,
    required: true
  }
});

let emit = defineEmits(['close'])

let emailId = ref(props.selectedEmail.id);
let confirmed = ref(false);
let isErrorModalOpen = ref(false);
let errorCode = ref(null);

console.log(emailId.value);

const openErrorModal = () => {
  isErrorModalOpen.value = true;
};

const closeErrorModal = () => {
  isErrorModalOpen.value = false;
}

</script>