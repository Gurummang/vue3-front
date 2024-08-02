<template>
  <div class="p-4 bg-white border rounded-lg shadow-sm mb-1">
    <h2 class="text-xl font-bold mb-4">위험 사용자 TOP5</h2>
    <div class="overflow-x-auto">
      <table class="w-full table-fixed bg-white">
        <thead class="bg-indigo-900">
          <tr>
            <th class="w-1/3 px-4 py-3 text-left text-sm font-bold text-white tracking-wider">사용자</th>
            <th class="w-1/6 px-4 py-3 text-center text-sm font-bold text-white tracking-wider">민감 파일</th>
            <th class="w-1/6 px-4 py-3 text-center text-sm font-bold text-white tracking-wider">악성 파일</th>
            <th class="w-1/3 px-4 py-3 text-center text-sm font-bold text-white tracking-wider">마지막 업로드 시각</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(user, index) in users" :key="index">
            <td class="px-4 py-3">
              <div class="w-full text-sm truncate">{{ user.name }}</div>
            </td>
            <td class="px-4 py-3">
              <div class="w-full text-center text-sm">{{ user.sensitive }}</div>
            </td>
            <td class="px-4 py-3">
              <div class="w-full text-center text-sm">{{ user.malware }}</div>
            </td>
            <td class="px-4 py-3">
              <div class="w-full text-center text-sm">{{ user.lastDate }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  usersTop5: {
    type: Object,
    required: true
  }
});

const users = ref(props.usersTop5);
</script>

<style scoped>

</style>