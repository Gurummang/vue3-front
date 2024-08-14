<template>
  <Handle type="target" :position="Position.Left" />
  <div class="rounded-lg bg-white w-[300px] text-sm text-left border-2 border-black shadow-xl">
    <div :class="['flex', 'justify-between', 'items-center', 'pl-2', 'pr-2', 'border-b-2', 'border-black', 'h-10', 'rounded-t-lg', headerBackgroundClass]">
      <div class="flex items-center">
        <div v-if="data.eventType=='file_uploaded'" class="flex">
          <v-icon :size="25" class="text-orange-700 mr-2">mdi-file-upload-outline</v-icon>
          <p class="font-semibold text-orange-700">파일 업로드</p>
        </div>
        <div v-if="data.eventType=='file_changed'" class="flex">
          <v-icon :size="25" class="text-amber-600 mr-2">mdi-file-edit-outline</v-icon>
          <p class="font-semibold text-amber-600">파일 수정</p>
        </div>
        <div v-if="data.eventType=='file_deleted'" class="flex">
          <v-icon :size="25" class="text-gray-600 mr-2">mdi-file-remove-outline</v-icon>
          <p class="font-semibold text-gray-600">파일 삭제</p>
        </div>
      </div>
      <div class="flex items-center">
        <!-- 파일 악성 유무 -->
        <!-- <v-icon :size="25" class="text-green-700">mdi-cloud-check</v-icon> -->
      </div>
    </div>
    <div class="pl-2 py-1 leading-6 ">
      <p class="capitalize"><strong>SaaS : </strong>{{ data.saas }}</p>
      <p><strong>파일명 : </strong>{{ data.fileName }}</p>
      <p><strong>사용자 : </strong>{{ data.email }}</p>
      <p><strong>히스토리 시각 : </strong>{{ formattedDate }}</p>
      <p><strong>파일 경로 : </strong>{{ data.uploadChannel }}</p>
      <p><strong>유사도 : </strong>{{ data.similarity }}</p>
    </div>
    <!-- <h3>{{ data.eventType }}</h3> -->
    
    <!-- <ul>
      <li><strong>파일명:</strong> <br>{{ data.fileName }}
      <li><strong>사용자:</strong> <br>{{ data.email }}
      <li><strong>히스토리 시각:</strong> <br>{{ formattedDate }}
      <li><strong>파일 경로:</strong> <br>{{ data.uploadChannel }}
    </ul> -->
    <!-- <table class="tg">
      <thead>
        <tr v-if="true">
          <th class="text-center align-top bg-orange-100" colspan="4">
            <v-icon :size="25" class="text-orange ml-auto">mdi-file-upload-outline</v-icon>
            {{ data.eventType }}
          </th>
        </tr>
      </thead>
    <tbody>
      <tr>
        <td class="tg-amwm">파일명</td>
        <td class="tg-baqh" colspan="3">{{ data.fileName }}</td>
      </tr>
      <tr>
        <td class="tg-amwm">사용자</td>
        <td class="tg-baqh" colspan="3">{{ data.email }}</td>
      </tr>
      <tr>
        <td class="tg-amwm">히스토리 시각</td>
        <td class="tg-baqh" colspan="3">{{ formattedDate }}</td>
      </tr>
      <tr>
        <td class="tg-amwm">파일 경로</td>
        <td class="tg-baqh" colspan="3">{{ data.uploadChannel }}</td>
      </tr>
    </tbody>
    </table> -->
  </div>

  <Handle type="source" :position="Position.Right" />
</template>

<script setup>
import { computed } from 'vue'
import { Position, Handle } from '@vue-flow/core'

const props = defineProps(['data'])

const formattedDate = computed(() => {
  return new Date(props.data.eventTs).toLocaleString()
})

const headerBackgroundClass = computed(() => {
  switch (props.data.eventType.toLowerCase()) {
    case 'file_uploaded':
      return 'bg-orange-100'
    case 'file_changed':
      return 'bg-amber-100'
    case 'file_deleted':
      return 'bg-gray-100'
    default:
      return 'bg-orange-100' // 기본값
  }
})
</script>

<style scoped>

</style>