<template>
  <side-nav class="w-1/6 float-left"></side-nav>
  <div class="w-5/6 float-right px-5">
    <header-breadcrumb></header-breadcrumb>
    <main>
      <PolicyAdd :orgSaasList="orgSaasList"></PolicyAdd>
      <!-- <content-error></content-error> -->
    </main>
  </div>

  <!-- <footer>
    <the-footer></the-footer>
  </footer> -->
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SideNav from '@/components/SideNav.vue'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb.vue'
import TheFooter from '@/components/TheFooter.vue'
import ContentError from '@/components/ContentError.vue'
import PolicyAdd from '@/components/dlp/PolicyAdd.vue'
// 로그인 유도
import { getSaasListApi } from '@/apis/register.js'

const router = useRouter();
let orgSaasList = ref(null);
let orgId = 1

Promise.all([
  getSaasListApi(orgId),
]).then((values) => {
  orgSaasList.value = values[0],
  isApiOk.value = true;
}).catch((err) => {
  console.log(err);
}).finally(() => {
  loading.value = false;
});



</script>
