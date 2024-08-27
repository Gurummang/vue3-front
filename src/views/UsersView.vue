<template>
  <side-nav class="w-1/6 float-left"></side-nav>
  <div class="w-5/6 float-right px-5">
    <header-breadcrumb></header-breadcrumb>
    <cycle-loading v-if="loading"></cycle-loading>
    <main class="scroll-h scroll overflow-auto rounded-lg" v-else-if="!loading && isApiOk">
      <div>
        <user-statistics :userStatistics="userStatistics"></user-statistics>
        <div class="grid grid-cols-3 gap-5 mb-5">
          <DormantRadioChart></DormantRadioChart>
          <TopSensitiveUser></TopSensitiveUser>
          <TopMalwareUser></TopMalwareUser>
          <!-- <TopUserRanking></TopUserRanking> -->
        </div>
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
import { historyStatisticsApi, historyDetailsApi } from '@/apis/file.js'
import SideNav from '@/components/SideNav.vue'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb.vue'

import UserStatistics from '@/components/user/UserStatistics.vue'
import DormantRadioChart from '@/components/user/DormantRadioChart.vue'
import TopSensitiveUser from '@/components/user/TopSensitiveUser.vue'
import TopMalwareUser from '@/components/user/TopMalwareUser.vue'
import TopUserRanking from '@/components/user/TopUserRanking.vue'

import TheFooter from '@/components/TheFooter.vue'
import ContentError from '@/components/ContentError.vue'
import CycleLoading from '@/components/CycleLoading.vue'

let loading = ref(true)
let isApiOk = ref(false)

const userStatistics = ref(null)

Promise.all([])
  .then((values) => {
    userStatistics.value = [2024, 0, 22, 11]
    isApiOk.value = true
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    loading.value = false
  })
</script>
