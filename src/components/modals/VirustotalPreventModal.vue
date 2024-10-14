<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg w-1/4 max-w-lg">
      <div class="flex justify-end p-3">
        <button @click="$emit('close')" class="text-gray-400 hover:text-black">
          <v-icon>mdi-close</v-icon>
        </button>
      </div>
      <div class="px-4">
        <!-- <div class="flex justify-center p-3">
          <img src="../../../public/assets/virustotal.png" alt="VirusTotal 이미지" class="size-1/2">
        </div> -->
        <div class="mb-2 space-y-2 text-center">
          <label for="saasType" class="block pb-2 text-2xl font-semibold text-red-600"> 
            <v-icon size="40" class="text-red-600">mdi-weather-cloudy-alert</v-icon>
            문서 파일 불가
          </label>
          <p class="text-base pb-3">{{ "test.pdf "}}파일은 문서형 파일로 <br/><strong class="text-blue-600">VirusTotal 검사</strong> 를 진행할 수 없습니다.</p>
          <p class="text-xs"><strong>문서형 파일 종류</strong> : word, excel, ppt, pdf, hwp, txt, csv 등</p>
          <p class="text-xs text-red-600 font-semibold">구름망 CASB는 문서형 파일을 외부 유출 방지 있습니다.</p>
        </div>
      </div>
      <div class="flex justify-center p-3 space-x-2">
        <!-- <button  @click="$emit('close')" class="w-1/2 border border-blue-600 px-3 py-2 align-text-bottom text-sm font-semibold text-blue-600 hover:bg-blue-800 hover:text-white active:bg-blue-800">아니오</button>
        <button @click="uploadVirustotalScan" class="w-1/2 bg-blue-600 border border-blue-600 px-3 py-2 align-text-bottom text-sm font-semibold text-white hover:bg-blue-800 active:bg-blue-800">예</button> -->
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
    required: true
  }
});

let emit = defineEmits(['close']);

// let fileCount = ref(Object.keys(props.checkedIndex).length);
// 리스트 값

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
