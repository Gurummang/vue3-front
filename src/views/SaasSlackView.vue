<template>
  <side-nav class="w-1/6 float-left"></side-nav>
  <div class="w-5/6 float-right px-5">
    <header-breadcrumb></header-breadcrumb>
    <main class="scroll-h scroll overflow-auto rounded-lg">
      <saas-score></saas-score>
      <saas-statistics></saas-statistics>
      <div class="grid grid-cols-2 gap-5 mb-5">
        <file-ratio-chart></file-ratio-chart>
        <recent-upload-list></recent-upload-list>
      </div>
      <users-top-5></users-top-5>
      <!-- <content-error></content-error> -->
    </main>
  </div>

  <!-- <footer>
    <the-footer></the-footer>
  </footer> -->
</template>

<script setup>
import { ref } from 'vue'
import SideNav from '@/components/SideNav.vue'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb.vue'
import TheFooter from '@/components/TheFooter.vue'
import ContentError from '@/components/ContentError.vue'
import SaasScore from '@/components/saas/SaasScore.vue'
import SaasStatistics from '@/components/saas/SaasStatistics.vue'
import FileRatioChart from '@/components/saas/FileRatioChart.vue'
import RecentUploadList from '@/components/saas/RecentUploadList.vue'
import UsersTop5 from '@/components/saas/UsersTop5.vue'


let responseData = ref(null);

</script>
