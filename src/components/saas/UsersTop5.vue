<template>
  <div class="p-4 bg-white border rounded-lg shadow-sm mb-1">
    <h2 class="text-xl font-bold mb-4">위험 사용자 TOP5</h2>
    <div class="overflow-x-auto">
      <table class="w-full table-fixed bg-white">
        <thead class="bg-indigo-900">
          <tr>
            <th class="w-[7%] px-4 py-3 text-left text-sm font-bold text-white tracking-wider">순위</th>
            <th class="w-[20%] px-4 py-3 text-left text-sm font-bold text-white tracking-wider">사용자</th>
            <th class="w-[20%] px-4 py-3 text-center text-sm font-bold text-white tracking-wider">민감 파일</th>
            <th class="w-[20%] px-4 py-3 text-center text-sm font-bold text-white tracking-wider">악성 파일</th>
            <th class="w-[37%] px-4 py-3 text-center text-sm font-bold text-white tracking-wider">마지막 업로드 시각</th>
          </tr>
        </thead>
        <tbody v-if="users.length" class="bg-white divide-y divide-gray-200">
          <tr v-for="(user, index) in users" :key="index" class="hover:bg-gray-100">
            <td class="px-4 py-3">
              <!-- <v-icon size="25" :class="'text-indigo-900'">mdi-numeric-{{ index + 1 }}-box</v-icon> -->
              <v-icon size="25" :style="'color: #0000' + `${99 - (10 * index)}` + ';'">mdi-numeric-{{ index + 1 }}-box</v-icon>
            </td>
            <td class="px-4 py-3">
              <div class="w-full text-sm truncate">{{ user.userName }}</div>
            </td>
            <td class="px-4 py-3">
              <div class="w-full text-center text-sm">{{ user.sensitiveFilesCount }}</div>
            </td>
            <td class="px-4 py-3">
              <div class="w-full text-center text-sm">{{ user.maliciousFilesCount }}</div>
            </td>
            <td class="px-4 py-3">
              <div class="w-full text-center text-sm">{{ user.lastUploadedTimestamp.replace("T", " ") }}</div>
            </td>
          </tr>
        </tbody>
        <tbody v-else class="bg-white h-full">
          <tr class="h-full">
            <td colspan="5" class="text-center py-7 h-full">
              <div class="flex flex-col items-center justify-center h-full">
                <img src="@/assets/grummang_mascot_small.png" alt="구름망 캐릭터" class="size-20 object-cover rounded-full mb-5">
                <p class="text-gray-500 text-base">위험 사용자가 한명도 없습니다.</p>
              </div>
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
// const users = ref([
//     {
//         "userName": "yubin",
//         "sensitiveFilesCount": 0,
//         "maliciousFilesCount": 88,
//         "lastUploadedTimestamp": "2024-10-18T18:16:29"
//     },
//     {
//         "userName": "HaHayy",
//         "sensitiveFilesCount": 3,
//         "maliciousFilesCount": 5,
//         "lastUploadedTimestamp": "2024-10-18T18:19:29"
//     },
//     {
//         "userName": "yubin",
//         "sensitiveFilesCount": 0,
//         "maliciousFilesCount": 88,
//         "lastUploadedTimestamp": "2024-10-18T18:16:29"
//     },
//     {
//         "userName": "HaHayy",
//         "sensitiveFilesCount": 3,
//         "maliciousFilesCount": 5,
//         "lastUploadedTimestamp": "2024-10-18T18:19:29"
//     },
//     {
//         "userName": "HaHayy",
//         "sensitiveFilesCount": 3,
//         "maliciousFilesCount": 5,
//         "lastUploadedTimestamp": "2024-10-18T18:19:29"
//     }
// ]);
</script>

<style scoped>

</style>