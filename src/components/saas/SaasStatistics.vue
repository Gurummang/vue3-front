<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
    <div class="flex items-center bg-white shadow-sm rounded-lg p-4">
      <div>
        <h3 class="font-semibold text-gray-700">총 파일 개수</h3>
        <p class="text-3xl font-semibold">{{ statistics[0] }}</p>
      </div>
      <v-icon :size="44" class="text-orange ml-auto">mdi-file-cloud-outline</v-icon>
    </div>

    <div class="flex items-center bg-white shadow-sm rounded-lg p-4">
      <div>
        <h3 class="font-semibold text-gray-700">민감 파일 개수</h3>
        <p class="text-3xl font-semibold">{{ statistics[1] }}</p>
      </div>
      <v-icon :size="44" class="text-amber-400 ml-auto">mdi-file-search-outline</v-icon>
    </div>

    <div class="flex items-center bg-white shadow-sm rounded-lg p-4">
      <div>
        <h3 class="font-semibold text-gray-700">악성 파일 개수</h3>
        <p class="text-3xl font-semibold">{{ statistics[2] }}</p>
      </div>
      <v-icon :size="44" class="text-red-600 ml-auto">mdi-file-code-outline</v-icon>
    </div>

    <div class="flex items-center bg-white shadow-sm rounded-lg p-4">
      <div>
        <h3 class="font-semibold text-gray-700">연동 계정 개수</h3>
        <p class="text-3xl font-semibold">{{ statistics[3] }}</p>
      </div>
      <v-icon :size="44" class="text-gray-600 ml-auto">mdi-account</v-icon>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const statistics = ref([2024, 7, 29, 11]);


</script>

<style lang="scss" scoped>

</style>