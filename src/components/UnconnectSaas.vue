<template>
<div class="h-[80vh] flex items-center justify-center bg-white p-4 rounded-lg shadow-sm">
  <div class="text-center">
    <v-icon size="160" color="#FF9A00">mdi-cloud-cancel-outline</v-icon>
    <h1 class="mt-4 text-xl font-bold tracking-tight text-gray-900">{{ $route.name.slice($route.name.lastIndexOf(' ')) }}가 연동되지 않았습니다.</h1>
    
    <div class="flex justify-center">
      <button class="inline-flex items-center mt-6 bg-orange text-white font-bold py-2 px-4 text-center rounded" @click="router.push('/register/saas')">
        <span>SaaS 연동하기</span>
        <v-icon :size="20" class="ml-1">mdi-arrow-right-thin</v-icon>
      </button>
    </div>
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