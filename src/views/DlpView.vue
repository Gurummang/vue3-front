<template>
  <side-nav class="w-1/6 float-left"></side-nav>
  <div class="w-5/6 float-right px-5">
    <header-breadcrumb></header-breadcrumb>
    <cycle-loading v-if="loading"></cycle-loading>
    <main class="scroll-h scroll overflow-auto rounded-lg" v-else-if="!loading && isApiOk">
      <div>
        <PolicyDetails :policyDetails="policyDetails"></PolicyDetails>
        <the-pagination></the-pagination>
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
// import { fileScanApi } from '@/apis/file.js'
import SideNav from '@/components/SideNav.vue'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb.vue'
import TheFooter from '@/components/TheFooter.vue'
import ContentError from '@/components/ContentError.vue'
import CycleLoading from '@/components/CycleLoading.vue'
import PolicyDetails from '@/components/dlp/PolicyDetails.vue'

let loading = ref(true)
let isApiOk = ref(false)

let policyDetails = ref(null)

Promise.all([
  ])
  .then((values) => {
    policyDetails.value = {
      "status": "success",
      "policy": [
        {
          "id": 1,
          "name": "정책v1",
          "description": "정책v1에 대한 설명입니다.",
          "fileType": ["pdf", "xlsx", "hwp"]
        },
        {
          "id": 2,
          "name": "환경보호정책",
          "description": "지속 가능한 발전을 위한 환경보호 DLP 가이드라인입니다.",
          "fileType": ["pdf", "docx", "pptx"]
        },
        {
          "id": 3,
          "name": "인사관리규정",
          "description": "직원 채용, 평가, 승진에 관한 DLP 규정입니다.",
          "fileType": ["pdf", "hwp", "txt"]
        },
        {
          "id": 4,
          "name": "정보보안지침",
          "description": "회사 정보 자산 보호를 위한 DLP 보안 지침입니다.",
          "fileType": ["pdf", "docx", "html"]
        },
        {
          "id": 5,
          "name": "품질관리매뉴얼",
          "description": "제품 및 서비스 품질 향상을 위한 DLP 관리 지침입니다.",
          "fileType": ["pdf", "xlsx", "csv"]
        },
        {
          "id": 6,
          "name": "고객서비스정책",
          "description": "고객 만족도 향상을 위한 서비스 DLP 정책입니다.",
          "fileType": ["pdf", "pptx", "mp4"]
        },
        {
          "id": 7,
          "name": "재무관리규정",
          "description": "회사의 재무 건전성 유지를 위한 DLP 관리 규정입니다.",
          "fileType": ["pdf", "xlsx", "json"]
        }
      ]
    }
    isApiOk.value = true
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    loading.value = false
  })
</script>
