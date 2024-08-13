<template>
  <div>
    <Handle type="target" :position="Position.Top" />
    <div class="custom-node">
      <h3>{{ data.eventType }}</h3>
      <ul>
        <li><strong>파일명:</strong> <br>{{ data.fileName }}</li>
        <li><strong>사용자:</strong> <br>{{ data.email }}</li>
        <li><strong>히스토리 시각:</strong> <br>{{ formattedDate }}</li>
        <li><strong>파일 경로:</strong> <br>{{ data.uploadChannel }}</li>
      </ul>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
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
  padding: 10px;
  border-radius: 5px;
  background-color: white;
  border: 2px solid saddlebrown;
  font-size: 12px;
  line-height: 1.5;
  width: 300px;
  text-align: left;
}
</style>