<template>
  <div class="p-4 bg-white border rounded-lg">
    <h2 class="text-xl font-bold mb-4">최근 업로드 파일</h2>
    <div class="overflow-x-auto">
      <table class="w-full table-fixed bg-white">
        <thead class="bg-indigo-900">
          <tr>
            <th class="w-3/6 px-3 py-3 text-left text-sm font-bold text-white tracking-wider">파일명</th>
            <th class="w-1/6 px-2 py-3 text-left text-sm font-bold text-white tracking-wider">사용자</th>
            <th class="w-1/12 px-2 py-3 text-center text-sm font-bold text-white tracking-wider">유형</th>
            <th class="w-1/6 px-2 py-3 text-center text-sm font-bold text-white tracking-wider">생성 시각</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(file, index) in files" :key="index">
            <td class="px-3 py-1">
              <div class="w-full text-xs">{{ file.name }}</div>
            </td>
            <td class="px-2 py-1">
              <div class="w-full text-xs truncate">{{ file.user }}</div>
            </td>
            <td class="px-2 py-1">
              <div class="w-full text-center text-xs">{{ file.type }}</div>
            </td>
            <td class="px-2 py-1">
              <div class="w-full text-center text-xs leading-3">{{ file.date }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you have the MDI icons installed

const files = ref([
  { name: 'aaaaa.txt', user: '구름망', type: 'txt', date: '2024-00-00 00:00:00' },
  { name: 'aaaaa.txt', user: 'aabb12312@gmail.com', type: 'txt', date: '2024-00-00 00:00:00' },
  { name: '2024-07-29일 txt파일을 테스트해볼려고 일부러 글자를 길게 합니다.txt', user: '구름망', type: 'txt', date: '2024-00-00 00:00:00' },
  { name: 'aaaaa.txt', user: '구름망', type: 'txt', date: '2024-00-00 00:00:00' },
  { name: 'aaaaa.txt', user: '구름망', type: 'txt', date: '2024-00-00 00:00:00' },
  { name: 'aaaaa.txt', user: 'adsaaaaafaeawfdk@naver.com', type: 'txt', date: '2024-00-00 00:00:00' },
  { name: 'aaaaa.txt', user: '구름망', type: 'txt', date: '2024-00-00 00:00:00' },
  { name: 'aaaaa.txt', user: '구름망', type: 'txt', date: '2024-00-00 00:00:00' },
  { name: 'aaaaa.txt', user: '구름망', type: 'txt', date: '2024-00-00 00:00:00' },
  { name: 'aaaaa.txt', user: '구름망', type: 'txt', date: '2024-00-00 00:00:00' }
]);
</script>

<style scoped>
/* You can add custom styles here if needed */
</style>