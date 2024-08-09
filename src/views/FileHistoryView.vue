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
        <history-statistics :historyStatistics="historyStatistics"></history-statistics>
        <history-trends :historyTrends="historyTrends"></history-trends>
        <!-- <file-test :historyTrends="historyTrends"></file-test> -->
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
import { historyStatisticsApi, historyTrendsApi, historyInfoApi } from '@/apis/file.js'
import SideNav from '@/components/SideNav.vue'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb.vue'
import TheFooter from '@/components/TheFooter.vue'
import ContentError from '@/components/ContentError.vue'
import CycleLoading from '@/components/CycleLoading.vue'
import HistoryStatistics from '@/components/file/HistoryStatistics.vue'
import HistoryTrends from '@/components/file/HistoryTrends.vue'
import FileTest from '@/components/file/FileTest.vue'

let loading = ref(true);
let isApiOk = ref(false);

let historyStatistics = ref([]);
let historyTrends = ref([]);
let dateTrends = ref([]);
let uploadTrends = ref([]);
let editTrends = ref([]);
let deleteTrends = ref([]);
let historyInfo = ref([]);

const data = {
  "email": "hsp003636@gmail.com"
}

Promise.all([
  historyStatisticsApi(data),
  historyTrendsApi(data),
]).then((values) => {
  historyStatistics.value = values[0];
  historyTrends.value = values[1];
  dateTrends.value = values[1].map(row => row.date);
  uploadTrends.value = values[1].map(row => row.upload);
  editTrends.value = values[1].map(row => row.edit);
  deleteTrends.value = values[1].map(row => row.delete);
  console.log(historyTrends.value);
  isApiOk.value = true;
}).catch((err) => {
  console.log(err);
}).finally(() => {
  loading.value = false;
});

</script>
