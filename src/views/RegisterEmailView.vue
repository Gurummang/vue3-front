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
// import { fileScanApi } from '@/apis/file.js'
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
])
.then((values) => {
  emailDetails.value = {
    "status": "success",
    "emails": [
      {
        "id": 1,
        "email": "test@grummang.com",
        "title": "test",
        "description": "이메일 발송 리스트 목록 테스트입니다.",
        "gscanCheck": true,
        "dlpCheck": false,
        "vtCheck": true
      },
      {
        "id": 2,
        "email": "test123123@grummang.com",
        "title": "test123123",
        "description": "test123123 이메일 테스트",
        "gscanCheck": false,
        "dlpCheck": false,
        "vtCheck": true
      },
      {
        "id": 3,
        "email": "test3333@grummang.com",
        "title": "test3333",
        "description": "test3333test3333test3333test3333",
        "gscanCheck": true,
        "dlpCheck": true,
        "vtCheck": true
      },
    ]
  }
  isApiOk.value = true
})
.catch((err) => {
  console.log(err)
})
.finally(() => {
  loading.value = false
})
</script>
