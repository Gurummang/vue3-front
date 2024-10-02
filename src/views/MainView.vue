<template>
  <side-nav class="w-1/6 float-left"></side-nav>
  <div class="w-5/6 float-right px-5">
    <header-breadcrumb></header-breadcrumb>
    <cycle-loading v-if="loading"></cycle-loading>
    <main class="scroll-h scroll overflow-auto rounded-lg" v-else-if="!loading && isApiOk">
      <div>
        <ConnectingSaas :connectSaas="connectSaas"></ConnectingSaas>
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

import ConnectingSaas from '@/components/main/ConnectingSaas.vue'

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
  connectSaas.value = values[0].data.saas,
  mainStatisticsValue.value = values[0].data,
  saasFileSize.value = values[0].data.fileSizeBySaaS,
  saasFileCount.value = values[0].data.fileUploadBySaaS,
  todayFileDetect.value = values[1].data.fileScanInToday,
  fileAnalysisRate.value = values[1].data.fileAnalysis,
  fileHistoryInfo.value = values[1].data.fileHistoryInfo, 
  fileHistoryLine.value = values[1].data.fileHistoryStatistics,
  dlpStatistics.value = values[2].data.statisticsByPolicies,
  dlpPiis.value = values[2].data.statisticsByPiis,
  isApiOk.value = true;
}).catch((err) => {
  
}).finally(() => {
  loading.value = false;
});

</script>
