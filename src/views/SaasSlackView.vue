<template>
  <side-nav class="w-1/6 float-left"></side-nav>
  <div class="w-5/6 float-right px-5">
    <header-breadcrumb></header-breadcrumb>
    <cycle-loading
      v-if="loading"></cycle-loading>
    <main 
      class="scroll-h scroll overflow-auto rounded-lg"
      v-else>
      <div>
        <saas-score></saas-score>
        <saas-statistics
          :fileStatistics="fileStatistics"></saas-statistics>
        <div class="grid grid-cols-2 gap-5 mb-5">
          <file-ratio-chart
          :fileSize="fileSize"
          ></file-ratio-chart>
          <recent-upload-list></recent-upload-list>
        </div>
        <users-top-5></users-top-5>
      </div>
      <!-- <content-error></content-error> -->
    </main>
  </div>
  <!-- <footer>
    <the-footer></the-footer>
  </footer> -->
</template>

<script setup>
import { ref } from 'vue'
import { getFileStatistics, getFileSize } from '@/apis/saas.js'
import SideNav from '@/components/SideNav.vue'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb.vue'
import TheFooter from '@/components/TheFooter.vue'
import ContentError from '@/components/ContentError.vue'
import CycleLoading from '@/components/CycleLoading.vue'
import SaasScore from '@/components/saas/SaasScore.vue'
import SaasStatistics from '@/components/saas/SaasStatistics.vue'
import FileRatioChart from '@/components/saas/FileRatioChart.vue'
import RecentUploadList from '@/components/saas/RecentUploadList.vue'
import UsersTop5 from '@/components/saas/UsersTop5.vue'

let totalFiles = ref(0);
let sensitiveFiles = ref(0);
let maliciousFiles = ref(0);
let connectedAccounts = ref(0);
let fileSize = ref(null);
let fileStatistics = ref(null);
let loading = ref(true);

const data = {
  "email": "hsp003636@gmail.com"
}

Promise.all([
  getFileStatistics('slack', data),
  getFileSize('slack', data)])
  .then((values) => {
  fileStatistics.value = values[0];
  // totalFiles.value = values[0]['totalFiles'];
  // sensitiveFiles.value = values[0]['sensitiveFiles'];
  // maliciousFiles.value = values[0]['maliciousFiles'];
  // connectedAccounts.value = values[0]['connectedAccounts'];
  fileSize.value = values[1];

  console.log(values[0], values[1]);  
  loading.value = false;
  // console.log(totalFiles, sensitiveFiles, maliciousFiles, connectedAccounts);
});

// console.log(fileStatistics);

// console.log(fileStatistics);
// let fileStatistics = getFileStatistics('slack', data);

</script>
