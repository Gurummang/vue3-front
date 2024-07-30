<template>
  <side-nav class="w-1/6 float-left"></side-nav>
  <div class="w-5/6 float-right px-5">
    <header-breadcrumb></header-breadcrumb>
    <main class="scroll-h scroll overflow-auto rounded-lg">
      <div>
        <saas-score></saas-score>
        <saas-statistics
          :fileStatistics="fileStatistics"></saas-statistics>
        <div class="grid grid-cols-2 gap-5 mb-5">
          <file-ratio-chart></file-ratio-chart>
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
import { getFileStatistics } from '@/apis/saas.js'
import SideNav from '@/components/SideNav.vue'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb.vue'
import TheFooter from '@/components/TheFooter.vue'
import ContentError from '@/components/ContentError.vue'
import SaasScore from '@/components/saas/SaasScore.vue'
import SaasStatistics from '@/components/saas/SaasStatistics.vue'
import FileRatioChart from '@/components/saas/FileRatioChart.vue'
import RecentUploadList from '@/components/saas/RecentUploadList.vue'
import UsersTop5 from '@/components/saas/UsersTop5.vue'

let fileStatistics = ref(null);

const data = {
  "email": "hsp003636@gmail.com"
}

// Promise.all([
//   getFileStatistics('slack', data)]).then((values) => {
//   fileStatistics = values[0];
//   console.log(values[0]);
// });

getFileStatistics('slack', data).then((response) => {
  fileStatistics.value = response;
  // console.log(response);
});

console.log(fileStatistics);

// console.log(fileStatistics);
// let fileStatistics = getFileStatistics('slack', data);

</script>
