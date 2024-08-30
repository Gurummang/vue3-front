<template>
<div class="h-[50vh] place-content-center bg-white p-4 rounded-lg shadow-sm">
  <div class="text-center">
    
    <v-icon size="140" color="#FF9A00">mdi-cloud-cancel-outline</v-icon>
    <h1 class="mt-4 text-xl font-bold tracking-tight text-gray-900">{{ $route.name.slice($route.name.lastIndexOf(' ')) }}가 연동되지 않았습니다.</h1>

    <!-- <p class="mt-2 text-sm text-gray-900">연동을 좀 해줘봐.</p> -->
    <button class="mt-6 bg-gradient-to-r from-red-300 to-orange text-white font-bold py-2 px-4 rounded" @click="router.push('/register/saas')">
        SaaS 연동하기<v-icon :size=20>mdi-arrow-right-thin</v-icon>
    </button>
    <!-- <p class="mt-5 text-base font-semibold text-orange-500 italic">새로고침 해보시거나, 문제가 지속적으로 발생하면은 제조사에게 문의해주세요.</p> -->
  </div>
</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter();
</script>

<style scoped>

</style>