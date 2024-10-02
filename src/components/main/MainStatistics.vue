<template>
  <div class="grid grid-cols-2 grid-rows-4 gap-5 mb-5">
    <div class="flex items-center bg-white shadow-sm rounded-lg p-4">
      <div>
        <h3 class="font-semibold text-gray-700">연결된 SaaS</h3>
        <p class="text-3xl font-semibold">{{ animatedStats[0] }}</p>
      </div>
      <v-icon :size="44" class="text-orange ml-auto">mdi-file-cloud-outline</v-icon>
    </div>

    <div class="flex items-center bg-white shadow-sm rounded-lg p-4">
      <div>
        <h3 class="font-semibold text-gray-700">이메일 알림 개수</h3>
        <p class="text-3xl font-semibold">{{ animatedStats[1] }}</p>
      </div>
      <v-icon :size="44" class="text-amber-400 ml-auto">mdi-file-search-outline</v-icon>
    </div>

    <div class="flex items-center bg-white shadow-sm rounded-lg p-4">
      <div>
        <h3 class="font-semibold text-gray-700">DLP 개수</h3>
        <p class="text-3xl font-semibold">{{ animatedStats[2] }}</p>
      </div>
      <v-icon :size="44" class="text-red-600 ml-auto">mdi-file-code-outline</v-icon>
    </div>

    <div class="flex items-center bg-white shadow-sm rounded-lg p-4">
      <div>
        <h3 class="font-semibold text-gray-700">전체 사용자 수</h3>
        <p class="text-3xl font-semibold">{{ animatedStats[3] }}</p>
      </div>
      <v-icon :size="44" class="text-red-600 ml-auto">mdi-file-code-outline</v-icon>
    </div>

    <div class="col-span-2 flex items-center bg-white shadow-sm rounded-lg p-4">
      <div>
        <h3 class="font-semibold text-gray-700">총 파일 개수</h3>
        <p class="text-3xl font-semibold">{{ animatedStats[4] }}</p>
      </div>
      <v-icon :size="44" class="text-red-600 ml-auto">mdi-file-code-outline</v-icon>
    </div>

    <div class="col-span-2 flex items-center bg-white shadow-sm rounded-lg p-4">
      <div>
        <h3 class="font-semibold text-gray-700">총 파일 크기</h3>
        <p class="text-3xl font-semibold">{{ animatedStats[5] }}</p>
      </div>
      <v-icon :size="44" class="text-red-600 ml-auto">mdi-file-code-outline</v-icon>
    </div>

  </div>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue'

const props = defineProps({
  statisticsValue: {
    type: Object,
    required: true
  }
});

let animatedStats = ref([
  props.statisticsValue.totalSaaS,
  props.statisticsValue.totalAlert,
  props.statisticsValue.totalDlp,
  props.statisticsValue.totalUser,
  props.statisticsValue.totalFile,
  props.statisticsValue.totalFileSize
])

animateCountUp(0, 0, animatedStats.value[0], (val) => animatedStats.value[0] = val);
animateCountUp(1, 0, animatedStats.value[1], (val) => animatedStats.value[1] = val);
animateCountUp(2, 0, animatedStats.value[2], (val) => animatedStats.value[2] = val);
animateCountUp(3, 0, animatedStats.value[3], (val) => animatedStats.value[3] = val);
animateCountUp(4, 0, animatedStats.value[4], (val) => animatedStats.value[4] = val);
animateCountUp(5, 0, animatedStats.value[5], (val) => animatedStats.value[5] = val);

function animateCountUp(index, start, end, callback) {
  const duration = 1000; // duration of animation in ms
  const frameDuration = 1000 / 60; // 60 frames per second
  const totalFrames = Math.round(duration / frameDuration);
  const easeOutQuad = t => t * (2 - t);
  
  let frame = 0;
  const countUp = () => {
    frame++;
    const progress = easeOutQuad(frame / totalFrames);
    const currentValue = Math.round(start + (end - start) * progress);
    callback(currentValue);
    if (frame < totalFrames) {
      requestAnimationFrame(countUp);
    }
  };
  countUp();
}
</script>

<style scoped>
/* Add your styles here */
</style>
