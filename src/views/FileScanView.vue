<template>
  <side-nav class="w-1/6 float-left"></side-nav>
  <div class="w-5/6 float-right px-5">
    <header-breadcrumb></header-breadcrumb>
    <cycle-loading v-if="loading"></cycle-loading>
    <main class="scroll-h scroll overflow-auto rounded-lg" v-else-if="!loading && isApiOk">
      <div>
        <detection-count :detectionFileCount="detectionFileCount"></detection-count>
        <file-details :fileDetails="fileDetails"></file-details>
        <the-pagination></the-pagination>
      </div>
    </main>
    <content-error v-else></content-error>
  </div>
  <!-- <footer>
    <the-footer></the-footer>
  </footer> -->
</template>

<script setup>
import { ref } from 'vue'
import { fileScanApi } from '@/apis/file.js'
import SideNav from '@/components/SideNav.vue'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb.vue'
import TheFooter from '@/components/TheFooter.vue'
import ContentError from '@/components/ContentError.vue'
import CycleLoading from '@/components/CycleLoading.vue'
import DetectionCount from '@/components/file/DetectionCount.vue'
import FileDetails from '@/components/file/FileDetails.vue'

let loading = ref(true)
let isApiOk = ref(false)

let detectionFileCount = ref(null)
let fileDetails = ref(null)

Promise.all([fileScanApi()])
  .then((values) => {
    fileDetails.value = values[0]
    detectionFileCount.value = [
      values[0].data.total,
      values[0].data.dlpTotal,
      values[0].data.malwareTotal
    ]
    isApiOk.value = true
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    loading.value = false
  })
</script>
