<template>
  <side-nav class="w-1/6 float-left"></side-nav>
  <div class="w-5/6 float-right px-5">
    <header-breadcrumb></header-breadcrumb>
    <cycle-loading v-if="loading"></cycle-loading>
    <main class="scroll-h scroll overflow-auto rounded-lg" v-else-if="!loading && isApiOk">
      <div>
        <p>{{ connectSaas }}</p>
        <p>{{ mainStatisticsValue }}</p>
        <p>{{ saasFileSize }}</p>
        <p>{{ saasFileCount }}</p>
        <p>{{ todayFileDetect }}</p>
        <p>{{ fileAnalysisRate }}</p>
        <p>{{ fileHistoryInfo }}</p>
        <p>{{ fileHistoryLine }}</p>
        <p>{{ dlpStatistics }}</p>
        <p>{{ dlpPiis }}</p>
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

let responseData = ref(null)
let connectSaas = ref(null)
let mainStatisticsValue = ref(null)
let saasFileSize = ref(null)
let saasFileCount = ref(null)
let todayFileDetect = ref(null)
let fileAnalysisRate = ref(null)
let fileHistoryInfo = ref(null)
let fileHistoryLine = ref(null)
let dlpStatistics = ref(null)
let dlpPiis = ref(null)

// 로그인 유도
import { fileScanApi } from '@/apis/file.js'
Promise.all([
  mainTotalApi(),
  mainStatisticsApi(),
  mainDlpApi()
  ]).then((values) => {
  connectSaas = values[0].data.saas,
  mainStatisticsValue = values[0].data
  saasFileSize = values[0].data.fileSizeBySaaS,
  saasFileCount = values[0].data.fileUploadBySaaS,
  todayFileDetect = values[1].data.fileScanInToday,
  fileAnalysisRate = values[1].data.fileAnalysis,
  fileHistoryInfo = values[1].data.fileHistoryInfo, 
  fileHistoryLine = values[1].data.fileHistoryStatistics,
  dlpStatistics = values[2].data.statisticsByPolicies,
  dlpPiis = values[2].data.statisticsByPiis,
  isApiOk.value = true;
}).catch((err) => {
  
}).finally(() => {
  loading.value = false;
});

</script>
