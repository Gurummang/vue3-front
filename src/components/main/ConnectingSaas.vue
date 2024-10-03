<template>
  <div class="grid grid-cols-1 lg:grid-cols-6 gap-5 mb-5">
    <button v-for="(connect, index) in connectingInfo" :key="index" class="flex flex-col items-center bg-white shadow-sm rounded-lg p-4 pointer-events-none">
      <div class="flex items-center">
        <img class="size-6 mr-2" :src="getSaasImg(convertSaasName(connect.saas))" :alt="connect.saas" />
        <span class="text-lg font-bold capitalize"> {{ convertSaasName(connect.saas) }}</span>
      </div>
      <div class="flex w-4/5 pt-2 items-center justify-center">
        <v-icon :size="25" class="text-green-500">mdi-cloud-check</v-icon>
        <p class="pl-2 text-sm truncate">{{ connect.alias }}</p>
      </div>
      <div class="flex w-full pt-2 items-center justify-center">
        <v-icon :size="16" class="text-black">mdi-key-variant</v-icon>
        <p class="pl-2 text-xs truncate">{{ connect.email }}</p>
      </div>
    </button>
    <button class="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4" @click="router.push('/register/saas')">
      <v-icon :size="36" class="text-orange mb-2">mdi-plus-circle-outline</v-icon>
      <p class="text-sm font-semibold">새로운</p>
      <p class="text-sm font-semibold">SaaS 등록하기</p>
    </button>
  </div>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { getSaasImg, convertSaasName } from '@/utils/utils.js'

const props = defineProps({
  connectSaas: {
    type: Object,
    required: true
  }
});

const router = useRouter()

let connectingInfo = ref(props.connectSaas)
</script>

<style scoped>
/* Add your styles here */
</style>
