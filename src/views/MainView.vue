<template>
  <side-nav class="w-1/6 float-left"></side-nav>
  <div class="w-5/6 float-right px-5">
    <header-breadcrumb></header-breadcrumb>
    <main>
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
// import { gasbUserValidateApi } from '@/apis/signup.js'

// console.log(gasbUserValidateApi());

// if(gasbUserValidateApi() === true) {
//   console.log('인증되었용.');
// } else {
//   console.log('너 모르는 놈이야.');
// }
let responseData = ref(null);

</script>
