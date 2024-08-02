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
// import { saasScoreApi, fileStatisticsApi, fileSizeApi, fileRecentApi, usersTop5Api } from '@/apis/saas.js'
import SideNav from '@/components/SideNav.vue'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb.vue'
import TheFooter from '@/components/TheFooter.vue'
import ContentError from '@/components/ContentError.vue'
import CycleLoading from '@/components/CycleLoading.vue'

let loading = ref(true);
let isApiOk = ref(false);


Promise.all([
  
  ]).then((values) => {
  
  isApiOk.value = true;
}).catch((err) => {
  console.log(err);
}).finally(() => {
  loading.value = false;
});



</script>
