<template>
  <side-nav class="w-1/6 float-left"></side-nav>
  <div class="w-5/6 float-right px-5">
    <header-breadcrumb></header-breadcrumb>
    <cycle-loading v-if="loading"></cycle-loading>
    <main class="scroll-h scroll overflow-auto rounded-lg" v-else-if="!loading && isApiOk">
      <div>
        <!-- <file-details :fileDetails="fileDetails"></file-details> -->
        <PolicyDetails :fileDetails="fileDetails"></PolicyDetails>
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
import PolicyDetails from '@/components/dlp/PolicyDetails.vue'

let loading = ref(true)
let isApiOk = ref(false)

let detectionFileCount = ref(null)
let fileDetails = ref(null)

Promise.all([
  fileScanApi()
  ])
  .then((values) => {
    fileDetails.value = values[0]
    isApiOk.value = true
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    loading.value = false
  })
</script>
