<template>
  <side-nav class="w-1/6 float-left"></side-nav>
  <div class="w-5/6 float-right px-5">
    <header-breadcrumb></header-breadcrumb>
    <cycle-loading v-if="loading"></cycle-loading>
    <main class="scroll-h scroll overflow-auto rounded-lg" v-else-if="!loading && isApiOk">
      <div>
        <UserStatistics :userStatistics="userStatistics"></UserStatistics>
        <div class="grid grid-cols-3 gap-5 mb-5">
          <DormantRadioChart :dormantRadio="dormantRadio"></DormantRadioChart>
          <TopSensitiveUser :topSensitiveUser="topSensitiveUser"></TopSensitiveUser>
          <TopMalwareUser :topMalwareUser="topMalwareUser"></TopMalwareUser>
          <!-- <TopUserRanking></TopUserRanking> -->
        </div>
        <UserDetails :userDetails="userDetails"></UserDetails>
      </div>
    </main>
    <content-error v-else></content-error>
  </div>
  <!-- <footer>
    <the-footer></the-footer>
  </footer> -->
</template>

<script setup>
import { ref, toRef } from 'vue'
import { userStatisticsApi, userChartInfoApi, userDetailsApi } from '@/apis/user.js'
import SideNav from '@/components/SideNav.vue'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb.vue'

import UserStatistics from '@/components/user/UserStatistics.vue'
import DormantRadioChart from '@/components/user/DormantRadioChart.vue'
import TopSensitiveUser from '@/components/user/TopSensitiveUser.vue'
import TopMalwareUser from '@/components/user/TopMalwareUser.vue'
import UserDetails from '@/components/user/UserDetails.vue'
// import TopUserRanking from '@/components/user/TopUserRanking.vue'

import TheFooter from '@/components/TheFooter.vue'
import ContentError from '@/components/ContentError.vue'
import CycleLoading from '@/components/CycleLoading.vue'

let loading = ref(true)
let isApiOk = ref(false)

const userStatistics = ref(null)
const dormantRadio = ref(null);
const topSensitiveUser = ref(null);
const topMalwareUser = ref(null);
const userDetails = ref(null);

Promise.all([
  userStatisticsApi(),
  userChartInfoApi(),
  userDetailsApi()
])
  .then((values) => {
    userStatistics.value = [
      values[0].data.total,
      values[0].data.dormantTotal,
      values[0].data.dlpTotal,
      values[0].data.malwareTotal,
    ],
    dormantRadio.value = values[1].data.lastActivities,
    topSensitiveUser.value = values[1].data.topSensitive,
    topMalwareUser.value = values[1].data.topMalware,
    userDetails.value = values[2].data,
    isApiOk.value = true
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    loading.value = false
  })
</script>
