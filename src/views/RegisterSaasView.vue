<template>
  <!-- <main> -->
  <header-breadcrumb></header-breadcrumb>
  <side-nav></side-nav>
  <!-- <the-footer></the-footer> -->
  <!-- </main> -->
</template>

<script>
import SideNav from '@/components/SideNav.vue'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb.vue'
import TheFooter from '@/components/TheFooter.vue'

export default {
  name: 'RegisterSaaS',
  components: {
    TheFooter,
    SideNav,
    HeaderBreadcrumb,
  },
}
</script>
