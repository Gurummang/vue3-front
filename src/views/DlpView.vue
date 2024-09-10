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
          "saasName": "slack",
          "description": "정책v1에 대한 설명입니다.",
          "fileType": ["주민등록번호", "외국인등록번호"],
          "action": "정책v1에 따른 기본 DLP 모니터링 실시"
        },
        {
          "id": 2,
          "name": "환경보호정책",
          "saasName": "slack",
          "description": "지속 가능한 발전을 위한 환경보호 DLP 가이드라인입니다.",
          "fileType": ["여권번호", "외국인등록번호"],
          "action": "환경 관련 데이터 유출 방지를 위한 키워드 필터링 강화"
        },
        {
          "id": 3,
          "name": "인사관리규정",
          "saasName": "o365",
          "description": "직원 채용, 평가, 승진에 관한 DLP 규정입니다.",
          "fileType": ["주민등록번호", "외국인등록번호", "여권번호"],
          "action": "개인정보 포함 문서 암호화 및 접근 권한 제한"
        },
        {
          "id": 4,
          "name": "정보보안지침",
          "saasName": "o365",
          "description": "회사 정보 자산 보호를 위한 DLP 보안 지침입니다.",
          "fileType": ["주민등록번호", "외국인등록번호", "여권번호", "운전면허번호"],
          "action": "외부 전송 시 자동 암호화 및 로그 기록"
        },
        {
          "id": 5,
          "name": "품질관리매뉴얼",
          "saasName": "googledrive",
          "description": "제품 및 서비스 품질 향상을 위한 DLP 관리 지침입니다.",
          "fileType": ["운전면허번호"],
          "action": "품질 관련 중요 문서 워터마크 적용 및 버전 관리"
        },
        {
          "id": 6,
          "name": "고객서비스정책",
          "saasName": "googledrive",
          "description": "고객 만족도 향상을 위한 서비스 DLP 정책입니다.",
          "fileType": ["외국인등록번호", "여권번호"],
          "action": "고객 데이터 포함 파일 전송 시 관리자 승인 프로세스 적용"
        },
        {
          "id": 7,
          "name": "재무관리규정",
          "saasName": "slack",
          "description": "회사의 재무 건전성 유지를 위한 DLP 관리 규정입니다.",
          "fileType": ["여권번호", "외국인등록번호"],
          "action": "재무 정보 포함 문서 외부 전송 차단 및 내부 접근 로그 분석"
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
