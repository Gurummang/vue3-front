<template>
  <div class="flex flex-col p-4 bg-white border rounded-lg shadow-sm">
    <h2 class="text-xl font-bold mb-4">마지막 활동 날짜 비율</h2>
    <div class="my-auto">
      <div class="my-0 mx-auto size-64">
        <canvas ref="myChart"></canvas>
      </div>
      <div class="mt-4">
        <ul class="space-y-1.5 mx-5">
          <li class="flex items-center">
            <span class="w-4 h-4 rounded-lg bg-indigo-900 mr-2"></span>
            <span class="flex-1 text-sm">12개월 이상</span>
            <span class="bg-indigo-900 text-slate-50 text-sm text-center w-16 py-0.5 px-2 rounded-xl">{{ dlpRatio }}명</span>
          </li>
          <li class="flex items-center">
            <span class="w-4 h-4 rounded-lg bg-indigo-600 mr-2"></span>
            <span class="flex-1 text-sm">6~12개월 사이</span>
            <span class="bg-indigo-600 text-slate-50 text-sm text-center w-16 py-0.5 px-2 rounded-xl">{{ malwareRatio }}명</span>
          </li>
          <li class="flex items-center">
            <span class="w-4 h-4 rounded-lg bg-indigo-300 mr-2"></span>
            <span class="flex-1 text-sm">6개월 미만</span>
            <span class="bg-indigo-300 text-slate-900 text-sm text-center w-16 py-0.5 px-2 rounded-xl">{{ normalRatio }}명</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(PieController, ArcElement, Tooltip, Legend);

const props = defineProps({
  fileSize: Object,
});

const myChart = ref(null);
const fileVolume = ref(2024);
const dlpRatio = ref(24);
const malwareRatio = ref(123);
const normalRatio = ref(11);

const data = {
  labels: ['DLP', 'Malware', 'Normal'],
  datasets: [
    {
      data: [dlpRatio.value, malwareRatio.value, normalRatio.value],
      backgroundColor: ['rgb(49 46 129)', 'rgb(79 70 229)', 'rgb(165 180 252)'],
      hoverOffset: 4
    }
  ]
};

const config = {
  type: 'pie',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: false,
        text: `Total File Volume: ${fileVolume.value} GB`
      }
    }
  }
};

onMounted(() => {
  const ctx = myChart.value.getContext('2d');
  new Chart(ctx, config);
});

// watch(() => props.fileSize, (newSize) => {
//   if (newSize) {
//     fileVolume.value = Math.round(newSize.totalSize * 100) / 100;
//     dlpRatio.value = Math.round((newSize.sensitiveSize / newSize.totalSize) * 100);
//     malwareRatio.value = Math.round((newSize.maliciousSize / newSize.totalSize) * 100);
//     normalRatio.value = 100 - dlpRatio.value - malwareRatio.value;
    
//     // 차트 업데이트
//     myChart.value.data.datasets[0].data = [dlpRatio.value, malwareRatio.value, normalRatio.value];
//     myChart.value.options.plugins.title.text = `Total File Volume: ${fileVolume.value} GB`;
//     myChart.value.update();
//   }
// }, { deep: true });

</script>