<template>
  <side-nav class="w-1/6 float-left"></side-nav>
  <div class="w-5/6 float-right px-5">
    <header-breadcrumb></header-breadcrumb>
    <cycle-loading v-if="loading"></cycle-loading>
    <main class="scroll-h scroll overflow-auto rounded-lg" v-else-if="!loading && isApiOk">
      <div>

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
import { mainTotalApi, mainStatisticsApi, mainDlpApi } from '@/apis/main.js'
import SideNav from '@/components/SideNav.vue'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb.vue'
import TheFooter from '@/components/TheFooter.vue'
import ContentError from '@/components/ContentError.vue'
import CycleLoading from '@/components/CycleLoading.vue'

let loading = ref(true)
let isApiOk = ref(false)

let responseData = ref(null);

// router.push('/login');

// 로그인 유도
import { fileScanApi } from '@/apis/file.js'
Promise.all([
  mainTotalApi(),
  mainStatisticsApi(),
  mainDlpApi()
  ]).then((values) => {

  isApiOk.value = true;
}).catch((err) => {
  
}).finally(() => {
  loading.value = false;
});

</script>
