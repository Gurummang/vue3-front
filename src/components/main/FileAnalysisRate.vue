<template>
  <div class="bg-white shadow-sm rounded-lg p-4 mb-5">
    <div class="mb-2">
      <h2 class="text-xl font-bold mb-4">파일 분석율</h2>
    </div>
    <div class="flex flex-col space-y-5 items-center">
      <div v-for="(item, index) in chartData" :key="index" class="flex items-center">
        <div class="size-32 relative">
          <canvas :ref="el => { if (el) chartRefs[index] = el }"></canvas>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-xl font-bold">{{ item.score }} / {{ item.total }}</span>
          </div>
          <!-- <div class="absolute inset-0 flex items-center justify-center">
            <div class="relative">
              <span class="text-xl text-right w-10 font-bold absolute -top-3 -left-11">{{ item.score }}</span>
              <span class="text-lg font-bold">/</span>
              <span class="text-xl text-left w-10 font-bold absolute -bottom-3 -right-11">{{ item.total }}</span>
            </div>
          </div>   -->
        </div>
        <div class="w-20 ml-12">
          <div class="text-2xl font-bold">{{ item.percentage }}%</div>
          <div class="text-gray-600">{{ item.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
  fileAnalysisRate: Object,
  required: true
})

const chartData = ref([
  { score: props.fileAnalysisRate.suspiciousAnalysis, total: props.fileAnalysisRate.totalCount, percentage: Math.round((props.fileAnalysisRate.suspiciousAnalysis / props.fileAnalysisRate.totalCount) * 100), label: '악성 탐지', color: '#FFA500' },
  { score: props.fileAnalysisRate.dlpAnalysis, total: props.fileAnalysisRate.totalCount, percentage: Math.round((props.fileAnalysisRate.dlpAnalysis / props.fileAnalysisRate.totalCount) * 100), label: 'DLP', color: '#FFD700' },
  { score: props.fileAnalysisRate.vtAnalysis, total: props.fileAnalysisRate.totalCount, percentage: Math.round((props.fileAnalysisRate.vtAnalysis / props.fileAnalysisRate.totalCount) * 100), label: 'VirusTotal', color: '#1E90FF' }
])

const chartRefs = ref([]);

onMounted(() => {
  chartData.value.forEach((item, index) => {
    new Chart(chartRefs.value[index], {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [item.score, item.total - item.score],
          backgroundColor: [item.color, '#E0E0E0'],
          borderWidth: 0,
        }]
      },
      options: {
        cutout: '80%',
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true
          }
        }
      }
    });
  });
});
</script>