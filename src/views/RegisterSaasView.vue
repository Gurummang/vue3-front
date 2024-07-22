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

let responseData = ref(null);
let error = ref(null);

const fetchPosts = async () => {
  try {
    const response = await axios.get('/api/v1/org-saas/1');
    // console.log('response 전체 : ', response);
    if(response.status == '200') {
      return await response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    throw err;  // 에러를 다시 throw하여 호출자가 처리할 수 있게 합니다.
  }
};

responseData.value = fetchPosts();

// 주의: 이 시점에서 콘솔에 responseData를 출력하면 아직 undefined일 수 있습니다.
console.log('RegisterSaasView responseData:', responseData);

// responseData = [
//   { id: 1, name: 'Jira', status: 'connect', adminEmail: 'aabbcccc@구름.com', webhookUrl: 'webhook@구름.com', alias: 'Jira연결', registerDate: '2024-00-01', apiToken: '1234'},
//   { id: 2, name: 'Slack', status: 'connecting', adminEmail: 'aaabbccc@구름.com', webhookUrl: 'webhook@구름.com', alias: 'Slack 연결', registerDate: '2024-00-02', apiToken: '2345'},
//   { id: 3, name: 'Slack', status: 'connect', adminEmail: 'aaabbccc@구름.com', webhookUrl: '-', alias: '', registerDate: '2024-00-03', apiToken: '9876'},
//   { id: 4, name: 'Jira', status: 'failconnect', adminEmail: 'aabbcccc@구름.com', webhookUrl: 'webhook@구름.com', alias: '', registerDate: '2024-00-04', apiToken: ''},
//   { id: 5, name: 'Jira', status: 'failconnect', adminEmail: '-', webhookUrl: '-', alias: '', registerDate: '-', apiToken: ''},
// ];


</script>
