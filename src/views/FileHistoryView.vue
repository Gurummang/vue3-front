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
        <history-details :historyDetails="historyDetails"></history-details>
      </div>

      <!-- <file-test></file-test> -->
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
import { historyStatisticsApi, historyDetailsApi } from '@/apis/file.js'
import SideNav from '@/components/SideNav.vue'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb.vue'
import TheFooter from '@/components/TheFooter.vue'
import ContentError from '@/components/ContentError.vue'
import CycleLoading from '@/components/CycleLoading.vue'
import HistoryStatistics from '@/components/file/HistoryStatistics.vue'
import HistoryTrends from '@/components/file/HistoryTrends.vue'
import HistoryDetails from '@/components/file/HistoryDetails.vue'
import FileTest from '@/components/file/FileTest.vue'

let loading = ref(true);
let isApiOk = ref(false);

let historyStatistics = ref([]);
let historyTrends = ref([]);
let historyDetails = ref([]);

Promise.all([
  historyStatisticsApi(),
  historyDetailsApi(),
]).then((values) => {
  historyStatistics.value = [values[0].data.totalUpload, values[0].data.totalChanged, values[0].data.totalDeleted];
  historyTrends.value = values[0].data.fileHistoryStatistics;
  historyDetails.value = values[1].data[0];
  isApiOk.value = true;
}).catch((err) => {

}).finally(() => {
  loading.value = false;
});

</script>
