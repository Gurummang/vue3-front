<template>
  <div class="container mx-auto p-4">
    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th class="px-4 py-2 text-left">파일명</th>
          <th class="px-4 py-2 text-left">파일 유형</th>
          <th class="px-4 py-2 text-left">SaaS</th>
          <th class="px-4 py-2 text-left">생성자</th>
          <th class="px-4 py-2 text-left">생성날짜</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, index) in tableData" :key="index">
          <tr 
            @click="toggleAccordion(index)" 
            class="cursor-pointer hover:bg-gray-100"
            :class="{ 'bg-gray-50': expandedRows.includes(index) }"
          >
            <td class="px-4 py-2">{{ item.fileName }}</td>
            <td class="px-4 py-2">{{ item.fileType }}</td>
            <td class="px-4 py-2">{{ item.saas }}</td>
            <td class="px-4 py-2">{{ item.creator }}</td>
            <td class="px-4 py-2">{{ item.createdDate }}</td>
          </tr>
          <tr v-if="expandedRows.includes(index)">
            <td colspan="5" class="px-4 py-2">
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-bold mb-2">상세 정보</h4>
                <p><strong>SHA256:</strong> {{ item.details.sha256 }}</p>
                <p><strong>타입:</strong> {{ item.details.type }}</p>
                <p><strong>위험 파일:</strong> {{ item.details.riskFile }}</p>
                <div class="mt-4">
                  <h5 class="font-bold mb-2">VirusTotal Summary Report</h5>
                  <p><strong>연관 탐지:</strong> {{ item.details.virusTotal.detectionRate }}%</p>
                  <p><strong>Score:</strong> {{ item.details.virusTotal.score }}</p>
                </div>
                <div class="mt-4">
                  <h5 class="font-bold mb-2">DLP Report</h5>
                  <p><strong>탐지 정책 수:</strong> {{ item.details.dlp.policyCount }}</p>
                  <p><strong>탐지 개수:</strong> {{ item.details.dlp.detectionCount }}</p>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tableData = ref([
  {
    fileName: 'aaabbcccc.pdf',
    fileType: 'pdf',
    saas: 'Slack',
    creator: 'Jane Doe',
    createdDate: '2024.00.00',
    details: {
      sha256: '000011112222233333444455555666667777888899999aaaabbbbccccddddeeeeffff',
      type: 'pdf',
      riskFile: '~~~~~~~~',
      virusTotal: {
        detectionRate: 14,
        score: 21
      },
      dlp: {
        policyCount: 3,
        detectionCount: 6
      }
    }
  },
  // 더 많은 데이터 항목을 여기에 추가할 수 있습니다.
]);

const expandedRows = ref([]);

const toggleAccordion = (index) => {
  const currentIndex = expandedRows.value.indexOf(index);
  if (currentIndex === -1) {
    expandedRows.value.push(index);
  } else {
    expandedRows.value.splice(currentIndex, 1);
  }
};
</script>