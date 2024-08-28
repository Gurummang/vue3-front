<template>
  <side-nav class="w-1/6 float-left"></side-nav>
  <div class="w-5/6 float-right px-5">
    <header-breadcrumb></header-breadcrumb>
    <cycle-loading
      v-if="loading"></cycle-loading>
    <main 
      class="scroll-h scroll overflow-auto rounded-lg"
      v-else-if="!loading && isApiOk">
      <div>
        <saas-score
          :saasScore="saasScore"></saas-score>
        <saas-statistics
          :fileStatistics="fileStatistics"></saas-statistics>
        <div class="grid grid-cols-2 gap-5 mb-5">
          <file-ratio-chart
            :fileSize="fileSize"
          ></file-ratio-chart>
          <recent-upload-list
            :fileRecent="fileRecent"></recent-upload-list>
        </div>
        <users-top-5
          :usersTop5="usersTop5"></users-top-5>
      </div>
    </main>
    <content-error
      v-else></content-error>
  </div>
  <!-- <footer>
    <the-footer></the-footer>
  </footer> -->
</template>

<script setup>
import { ref } from 'vue'
import { saasScoreApi, fileStatisticsApi, fileSizeApi, fileRecentApi, usersTop5Api } from '@/apis/saas.js'
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

let loading = ref(true);
let isApiOk = ref(false);

let saasScore = ref(0);
let fileSize = ref(null);
let fileStatistics = ref(null);
let fileRecent = ref(null);
let usersTop5 = ref(null);

const saas = '';

Promise.all([
  saasScoreApi(saas),
  fileStatisticsApi(saas),
  fileSizeApi(saas),
  fileRecentApi(saas),
  usersTop5Api(saas),
  ]).then((values) => {
  saasScore.value = values[0];
  fileStatistics.value = values[1];
  fileSize.value = values[2];
  fileRecent.value = values[3];
  usersTop5.value = values[4];

  // console.log(values[0], values[1], values[2]);  
  isApiOk.value = true;
}).catch((err) => {
  console.log(err);
}).finally(() => {
  loading.value = false;
});

</script>
