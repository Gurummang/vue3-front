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
  </div>

  <!-- <footer>
    <the-footer></the-footer>
  </footer> -->
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import axios from 'axios'
import SideNav from '@/components/SideNav.vue'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb.vue'
import TheFooter from '@/components/TheFooter.vue'
import RegisterMain from '@/components/RegisterMain.vue'
import ContentError from '@/components/ContentError.vue'
import { getSaasListApi } from '@/apis/register.js'

let responseData = ref(null);
let error = ref(null);
let orgId = 1;

let test = getSaasListApi(orgId).then((response) => {
  console.log("saasList : " + response);
  if(response.status == '200') {
    responseData.value = response.data;
  }
}).catch(err => alert(err + "\n서버에 문제가 발생했어요."));
// responseData.value = getSaasListApi();

// setInterval(console.log('test-1'), 1000);
// responseData = [
//   { id: 1, name: 'Jira', status: 'connect', adminEmail: 'aabbcccc@구름.com', webhookUrl: 'webhook@구름.com', alias: 'Jira연결', registerDate: '2024-00-01', apiToken: '1234'},
//   { id: 2, name: 'Slack', status: 'connecting', adminEmail: 'aaabbccc@구름.com', webhookUrl: 'webhook@구름.com', alias: 'Slack 연결', registerDate: '2024-00-02', apiToken: '2345'},
//   { id: 3, name: 'Slack', status: 'connect', adminEmail: 'aaabbccc@구름.com', webhookUrl: '-', alias: '', registerDate: '2024-00-03', apiToken: '9876'},
//   { id: 4, name: 'Jira', status: 'failconnect', adminEmail: 'aabbcccc@구름.com', webhookUrl: 'webhook@구름.com', alias: '', registerDate: '2024-00-04', apiToken: ''},
//   { id: 5, name: 'Jira', status: 'failconnect', adminEmail: '-', webhookUrl: '-', alias: '', registerDate: '-', apiToken: ''},
// ];


</script>
