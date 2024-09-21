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
            <v-icon :size="30">mdi-alarm-light-off-outline</v-icon> 정책삭제 </label>
          <p class="text-base pb-3">선택한 <strong>{{ fileCount }}</strong>개의 정책을 <br/>정말 삭제하겠습니까?</p>
          <p class="text-xs text-red-600 font-semibold">정책을 삭제하면은 앞으로 해당 정책으로 탐지하지 않습니다.</p>
        </div>
      </div>

      <div class="px-3 pt-3">
        <label class="inline-flex items-center">
          <input type="checkbox" v-model="confirmed" class="form-checkbox size-3.5" />
          <span class="ml-2 text-xs font-semibold">위 정책을 삭제하는 것에 동의하겠습니다.</span>
        </label>
      </div>

      <div class="flex justify-center p-3 space-x-2">
        <button  
          @click="$emit('close')" 
          class="w-1/2 border border-red-600 px-3 py-2 align-text-bottom text-sm font-semibold text-red-600 hover:bg-red-800 hover:text-white active:bg-red-800"
        >아니오
        </button>
        <button 
          @click="policyDelete" 
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
  :errorType="'연동'"
  @close="closeErrorModal"
></saas-error-modal>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import { dlpPolicyDeleteApi } from '@/apis/dlp.js'
import saasErrorModal from '@/components/modals/SaasErrorModal.vue'

const props = defineProps({
  checkedIndex: {
    type: Object,
    required: true
  }
});

let emit = defineEmits(['close']);

let fileCount = ref(Object.keys(props.checkedIndex).length);;
// 리스트 값
let confirmed = ref(false);
let isErrorModalOpen = ref(false);
let errorCode = ref(null);

const openErrorModal = () => {
  isErrorModalOpen.value = true;
};

const closeErrorModal = () => {
  isErrorModalOpen.value = false;
}

const policyDelete = () => {
  let deleteData = {
    "policyId": props.checkedIndex
  }

  console.log('policyId', props.checkedIndex)
  dlpPolicyDeleteApi(deleteData).then((response) => {
    if(response.some(item => item.success === true)) {
      emit('close');
    }
    else {
      alert("해당 정책을 삭제하는 과정에서 문제가 발생했습니다.")
    }
  }).catch(err => alert(err + "\n서버에 문제가 발생했어요."));
}
</script>

<style scoped>

</style>
