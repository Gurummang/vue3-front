<template>
  <Handle type="target" :position="Position.Left" />
  <div class="custom-node">
    <!-- <h3>{{ data.eventType }}</h3> -->
    
    <!-- <ul>
      <li><strong>파일명:</strong> <br>{{ data.fileName }}</li>
      <li><strong>사용자:</strong> <br>{{ data.email }}</li>
      <li><strong>히스토리 시각:</strong> <br>{{ formattedDate }}</li>
      <li><strong>파일 경로:</strong> <br>{{ data.uploadChannel }}</li>
    </ul> -->
    <table class="tg">
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
    </table>
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
.custom-node {
  /* padding: 10px; */
  border-radius: 5px;
  background-color: white;
  border: 2px solid saddlebrown;
  font-size: 12px;
  line-height: 1.5;
  width: 300px;
  text-align: left;
}

.tg  {border-collapse:collapse;border-spacing:0; width: 100%;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-size:10px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-size:10px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-baqh{text-align:center;vertical-align:top}
.tg .tg-5frq{}
.tg .tg-amwm{font-weight:bold;text-align:center;vertical-align:top}
</style>