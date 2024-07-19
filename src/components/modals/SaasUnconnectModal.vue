<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
      <div class="p-4">
        <div class="flex justify-end">
          <button @click="$emit('close')" class="text-gray-400 hover:text-black">
            <v-icon>mdi-close</v-icon>
          </button>
        </div>
        <div class="flex justify-center p-4">
          <img src="@/assets/grummang_mascot_small.png" alt="구름망 캐릭터" class="w-1/4 h-1/4 object-cover rounded-full">
        </div>
        <div class="flex justify-center">
          <img class="h-8 w-8 float-left rounded-full mr-2" :src="getSaasImg(props.selectedSaas.name)" :alt="props.selectedSaas.name"/>
          <h1 class="text-2xl font-bold mb-4">{{ props.selectedSaas.name }}</h1>
        </div>

        <p class="text-xl font-bold text-center mb-4">별칭 : {{ props.selectedSaas.alias }}</p>
        <p class="text-xl text-red-700 font-bold text-center mb-4">위 SaaS의 연동 해제하시겠습니까?</p>
        <p class="text-base text-black text-center mb-4">
          위 SaaS의 연동 해제하면은<br> 앞으로 CASB에서 관리될 수 없습니다.<br>
          정말 Jira의 연동을 해제하시겠습니까?
        </p>

        <div class="py-4">
          <label class="inline-flex items-center">
            <input type="checkbox" v-model="confirmed" class="form-checkbox w-5 h-5" />
            <span class="ml-2 text-base font-bold">위 SaaS 연동을 해제하는 것에 동의하겠습니다.</span>
          </label>
        </div>

            <!-- class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50" -->
        <div class="grid grid-cols-2 gap-4">
          <button 
            class="inline-block rounded border border-indigo-900 px-6 py-3 align-text-bottom text-base font-bold text-indigo-900 hover:bg-indigo-900 hover:text-white active:bg-indigo-900"
            @click="$emit('close')"
          >
            아니요. 연동 해제 X
          </button>
            <!-- :class="['inline-block rounded px-6 py-3 align-text-bottom text-base font-bold text-rose-600', confirmed ? 'hover: border border-rose-600 bg-rose-600 hover:text-white active:bg-rose-600' : 'bg-gray-400 cursor-not-allowed']" -->
          <button
            :class="['inline-block px-6 py-3 rounded align-text-bottom text-white text-base font-bold', confirmed ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed']"
            :disabled="!confirmed"
            @click="UnconnectSaas(saasId)"
          >
            예. 연동 해제 O
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { defineProps, defineEmits } from 'vue'
import { getSaasImg } from '@/utils/utils.js'

const props = defineProps({
  selectedSaas: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close'])

const saasId = ref(props.selectedSaas.id);

const UnconnectSaas = (saasId) => {
  console.log(saasId);
  // 해제 API 요청하기

  emit('close');
}

const confirmed = ref(false)
</script>