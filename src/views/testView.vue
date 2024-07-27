<template>
  <side-nav class="w-1/6 float-left"></side-nav>
  <div class="w-5/6 float-right">
    <header-breadcrumb></header-breadcrumb>
    <main>
      <Suspense>
      <register-main 
        v-if="responseData"
        :responseData="responseData"></register-main>
      <content-error v-else></content-error>
      </Suspense>
    </main>
    <cycle-loading></cycle-loading>
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
import RegisterMain from '@/components/RegisterMain.vue'
import ContentError from '@/components/ContentError.vue'

import CycleLoading from '@/components/CycleLoading.vue'

let responseData = ref(null);

</script>
