<template>
  <side-nav class="w-1/6 float-left"></side-nav>
  <div class="w-5/6 float-right px-5">
    <header-breadcrumb></header-breadcrumb>
    <cycle-loading v-if="loading"></cycle-loading>
    <main class="scroll-h scroll overflow-auto rounded-lg" v-else-if="!loading && isApiOk">
      <div>
        <PolicyDetails :policyDetails="policyDetails"></PolicyDetails>
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
import { dlpPolicyListApi } from '@/apis/dlp.js'
import SideNav from '@/components/SideNav.vue'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb.vue'
import TheFooter from '@/components/TheFooter.vue'
import ContentError from '@/components/ContentError.vue'
import CycleLoading from '@/components/CycleLoading.vue'
import PolicyDetails from '@/components/dlp/PolicyDetails.vue'

let loading = ref(true)
let isApiOk = ref(false)

let policyDetails = ref(null)

Promise.all([
  dlpPolicyListApi()
  ])
  .then((values) => {
    policyDetails.value = values[0]
    // if(policyDetails.value[0].message.includes("No") || false) {
    //   policyDetails.value = []
    // }
    isApiOk.value = true
  })
  .catch((err) => {

  })
  .finally(() => {
    loading.value = false
  })
</script>
