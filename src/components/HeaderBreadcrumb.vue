<template>
  <header>
    <div class="flex items-center justify-between p-1.5 mb-5 bg-white shadow-sm rounded-lg">
      <div class="flex items-center space-x-4">
        <h1 class="text-xl font-semibold text-gray-700 px-3 content-center">
          <v-icon size="30">mdi-chevron-right</v-icon> 
          {{ route.name }}
        </h1>
      </div>
      <div class="flex items-center space-x-4">
        <!-- <button class="relative p-2 text-gray-400 hover:text-gray-500">
          <v-icon size="25">mdi-bell</v-icon>
        </button> -->
        <button class="flex items-center p-2 text-sm text-gray-400 hover:text-gray-700" @click="handleSettingsClick">
          <v-icon size="23" class="mr-1">mdi-logout-variant</v-icon> 로그아웃
        </button>
        <!-- <button class="w-10 h-10 overflow-hidden rounded-full">
          <img src="/api/placeholder/40/40" alt="User avatar" class="object-cover w-full h-full" />
        </button> -->
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { gasbLogoutApi } from '@/apis/signup.js'

const router = useRouter()
const route = useRoute()

const handleSettingsClick = async () => {
  const result = await gasbLogoutApi()
  if(result) {
    router.push('/')
  }
}
</script>

<style>
.arrow-icon {
  font-size: 35px;
}
</style>