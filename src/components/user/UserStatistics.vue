<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
    <div class="flex items-center bg-white shadow-sm rounded-lg p-4">
      <div>
        <h3 class="font-semibold text-gray-700">총 사용자 수</h3>
        <p class="text-3xl font-semibold">{{ animatedStats[0] }}</p>
      </div>
      <v-icon :size="44" class="text-gray-800 ml-auto">mdi-account</v-icon>
    </div>

    <div class="flex items-center bg-white shadow-sm rounded-lg p-4">
      <div>
        <h3 class="font-semibold text-gray-700">휴면 사용자 수</h3>
        <p class="text-3xl font-semibold">{{ animatedStats[1] }}</p>
      </div>
      <v-icon :size="44" class="text-gray-400 ml-auto">mdi-account-cancel</v-icon>
    </div>

    <div class="flex items-center bg-white shadow-sm rounded-lg p-4">
      <div>
        <h3 class="font-semibold text-gray-700">DLP 업로드 사용자 수</h3>
        <p class="text-3xl font-semibold">{{ animatedStats[2] }}</p>
      </div>
      <v-icon :size="44" class="text-amber-400 ml-auto">mdi-account-search</v-icon>
    </div>

    <div class="flex items-center bg-white shadow-sm rounded-lg p-4">
      <div>
        <h3 class="font-semibold text-gray-700">악성 업로드 사용자 수</h3>
        <p class="text-3xl font-semibold">{{ animatedStats[3] }}</p>
      </div>
      <v-icon :size="44" class="text-red-600 ml-auto">mdi-account-alert</v-icon>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps } from "vue";

const props = defineProps({
  userStatistics: {
    type: Object,
    required: true,
  },
});

let animatedStats = ref([0, 0, 0, 0]);

watch(
  () => props.userStatistics,
  (newVal) => {
    if (newVal) {
      animateCountUp(0, animatedStats.value[0], newVal[0], (val) => animatedStats.value[0] = val);
      animateCountUp(1, animatedStats.value[1], newVal[1], (val) => animatedStats.value[1] = val);
      animateCountUp(2, animatedStats.value[2], newVal[2], (val) => animatedStats.value[2] = val);
      animateCountUp(3, animatedStats.value[3], newVal[3], (val) => animatedStats.value[3] = val);
    }
  },
  { immediate: true }
);

function animateCountUp(index, start, end, callback) {
  const duration = 500; // duration of animation in ms
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
