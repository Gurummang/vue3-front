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
        <button class="relative p-2 text-gray-400 hover:text-gray-500">
          <v-icon size="25">mdi-bell</v-icon> <!-- Notification Icon -->
          <!-- <span class="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">2</span> -->
        </button>
        <button class="p-2 text-gray-400 hover:text-gray-500" @click="handleSettingsClick">
          <v-icon size="25">mdi-cog</v-icon> <!-- Settings Icon -->
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

const router = useRouter()
const route = useRoute()

const handleSettingsClick = () => {
  // 2. 쿠키 제거
  // router.push('/login')
  console.log('JWT token removed from localStorage')

}
</script>

<style>
.arrow-icon {
  font-size: 35px;
}
</style>