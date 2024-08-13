<template>
  <Handle type="target" :position="Position.Left" />
  <div class="rounded-lg bg-white w-[300px] text-sm text-left border-2 border-black">
    <div class="flex justify-between items-center pl-2 pr-2 border-b-2 border-black bg-orange-100 h-10 rounded-t-lg">
      <div class="flex items-center">
        <v-icon :size="25" class="text-orange mr-2">mdi-file-upload-outline</v-icon>
        <p class="font-semibold">{{ data.eventType }}</p>
      </div>
      <div class="flex items-center">
        <v-icon :size="25" class="text-green-700">mdi-cloud-check</v-icon>
      </div>
    </div>
    <div class="pl-2 py-1 leading-6 ">
      <p><strong>파일명 : </strong>{{ data.fileName }}</p>
      <p><strong>사용자 : </strong>{{ data.email }}</p>
      <p><strong>히스토리 시각 : </strong>{{ formattedDate }}</p>
      <p><strong>파일 경로 : </strong>{{ data.uploadChannel }}</p>
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
</script>

<style scoped>

</style>