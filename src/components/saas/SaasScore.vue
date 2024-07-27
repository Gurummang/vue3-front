<template>
  <div class="flex items-center justify-between p-1.5 mb-5 bg-white shadow-sm rounded-lg">
      <div class="flex items-center space-x-4">
        <h1 class="text-xl font-semibold text-gray-700 px-3 content-center">
          <!-- <v-icon size="30">mdi-chevron-right</v-icon>  -->
          {{ $route.name.slice($route.name.lastIndexOf(' ')) }}
        </h1>
      </div>
      
    </div>
</template>

<script setup>



</script>

<style lang="scss" scoped>

</style>