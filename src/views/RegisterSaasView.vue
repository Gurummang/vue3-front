<template>
  <side-nav class="w-1/6 float-left"></side-nav>
  <div class="w-5/6 float-right">
    <header-breadcrumb></header-breadcrumb>
    <main>
      <register-main v-if="true"></register-main>
      <content-error v-else></content-error>
    </main>
  </div>

  <!-- <footer>
    <the-footer></the-footer>
  </footer> -->
</template>

<script setup>
import SideNav from '@/components/SideNav.vue'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb.vue'
import TheFooter from '@/components/TheFooter.vue'
import RegisterMain from '@/components/RegisterMain.vue'
import ContentError from '@/components/ContentError.vue'

</script>
