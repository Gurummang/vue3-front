<template>
  <side-nav class="w-1/6 float-left"></side-nav>
  <div class="w-5/6 float-right px-5">
    <header-breadcrumb></header-breadcrumb>
    <cycle-loading v-if="loading"></cycle-loading>
    <main class="scroll-h scroll overflow-auto rounded-lg" v-else-if="!loading && isApiOk">
      <div>
        <register-main 
        v-if="responseData"
        :responseData="responseData"></register-main>
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
import axios from 'axios'
import SideNav from '@/components/SideNav.vue'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb.vue'
import TheFooter from '@/components/TheFooter.vue'
import RegisterMain from '@/components/RegisterMain.vue'
import CycleLoading from '@/components/CycleLoading.vue'
import ContentError from '@/components/ContentError.vue'
import { getSaasListApi } from '@/apis/register.js'

let loading = ref(true)
let isApiOk = ref(false)
let responseData = ref(null);
let error = ref(null);
let orgId = 1;

Promise.all([
  getSaasListApi()
]).then((values) => {
  responseData.value = values[0];

  isApiOk.value = true;
}).catch((err) => {
  isError.value = true;
}).finally(() => {
  loading.value = false;
});


</script>
