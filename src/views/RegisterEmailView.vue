<template>
  <side-nav class="w-1/6 float-left"></side-nav>
  <div class="w-5/6 float-right px-5">
    <header-breadcrumb></header-breadcrumb>
    <cycle-loading v-if="loading"></cycle-loading>
    <main class="scroll-h scroll overflow-auto rounded-lg" v-else-if="!loading && isApiOk">
      <div>
        <EmailDetails :emailDetails="emailDetails"></EmailDetails>
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
import { alertsListApi } from '@/apis/email.js'
import SideNav from '@/components/SideNav.vue'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb.vue'
import TheFooter from '@/components/TheFooter.vue'
import ContentError from '@/components/ContentError.vue'
import CycleLoading from '@/components/CycleLoading.vue'
import EmailDetails from '@/components/email/EmailDetails.vue'

let loading = ref(true)
let isApiOk = ref(false)

let emailDetails = ref(null)

Promise.all([
  alertsListApi()
])
.then((values) => {
  emailDetails.value = values[0]
  isApiOk.value = true
})
.catch((err) => {
  
})
.finally(() => {
  loading.value = false
})
</script>
