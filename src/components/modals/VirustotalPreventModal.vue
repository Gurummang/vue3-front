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
            <v-icon size="40" class="text-red-600">mdi-weather-cloudy-alert</v-icon>
            문서 파일 불가
          </label>
          
          <p class="flex text-base justify-center"><div class="font-semibold max-w-64 truncate">{{ fileName }}</div>&nbsp파일은</p>
          <!-- <p class="text-base pb-5">문서파일로 <strong class="text-blue-600">VirusTotal 검사</strong>를 할 수 없습니다.</p> -->
          <p class="text-base pb-5">문서파일로 VirusTotal 검사를 할 수 없습니다.</p>
          <p class="text-xs"><strong>문서 파일 종류</strong> : word, excel, ppt, pdf, hwp, txt, csv 등</p>
          <p class="text-xs text-orange-700 font-semibold pb-3">
            <v-icon size="16">mdi-alert-circle-outline</v-icon>
            구름망 CASB는 문서 파일의 외부 유출을 방지합니다.
          </p>
        </div>
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
import saasErrorModal from '@/components/modals/SaasErrorModal.vue'
import { fileVtUploadApi } from '@/apis/file.js'

const props = defineProps({
  checkedIndex: {
    type: Object,
    // required: true
  }
});

let fileName = ref(props.checkedIndex[0].file_name)

let emit = defineEmits(['close']);

let isErrorModalOpen = ref(false);
let errorCode = ref(null);

const openErrorModal = () => {
  isErrorModalOpen.value = true;
};

const closeErrorModal = () => {
  isErrorModalOpen.value = false;
}

</script>

<style scoped>

</style>
