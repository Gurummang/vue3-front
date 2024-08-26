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
            <span class="w-4 h-4 rounded-lg bg-amber-400 mr-2"></span>
            <span class="flex-1 text-sm">민감 파일 비율</span>
            <span class="bg-amber-300 text-slate-50 text-sm text-center w-16 py-0.5 px-2 rounded-xl">{{ dlpRatio }}%</span>
          </li>
          <li class="flex items-center">
            <span class="w-4 h-4 rounded-lg bg-red-600 mr-2"></span>
            <span class="flex-1 text-sm">악성 파일 비율</span>
            <span class="bg-red-600 text-slate-50 text-sm text-center w-16 py-0.5 px-2 rounded-xl">{{ malwareRatio }}%</span>
          </li>
          <li class="flex items-center">
            <span class="w-4 h-4 rounded-lg bg-gray-200 mr-2"></span>
            <span class="flex-1 text-sm">전체 파일 크기</span>
            <span class="bg-gray-200 text-slate-900 text-sm text-center w-16 py-0.5 px-2 rounded-xl">{{ fileVolume }}GB</span>
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
const fileVolume = ref(Math.round(120 * 100) / 100);
const dlpRatio = ref(Math.round((123123123 / 1203012300) * 100));
const malwareRatio = ref(Math.round((123123 / 1200230) * 100));
const normalRatio = ref(100 - dlpRatio.value - malwareRatio.value);

const data = {
  labels: ['DLP', 'Malware', 'Normal'],
  datasets: [
    {
      data: [dlpRatio.value, malwareRatio.value, normalRatio.value],
      backgroundColor: ['#fbbf24', '#dc2626', '#22c55e'],
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

watch(() => props.fileSize, (newSize) => {
  if (newSize) {
    fileVolume.value = Math.round(newSize.totalSize * 100) / 100;
    dlpRatio.value = Math.round((newSize.sensitiveSize / newSize.totalSize) * 100);
    malwareRatio.value = Math.round((newSize.maliciousSize / newSize.totalSize) * 100);
    normalRatio.value = 100 - dlpRatio.value - malwareRatio.value;
    
    // 차트 업데이트
    myChart.value.data.datasets[0].data = [dlpRatio.value, malwareRatio.value, normalRatio.value];
    myChart.value.options.plugins.title.text = `Total File Volume: ${fileVolume.value} GB`;
    myChart.value.update();
  }
}, { deep: true });

</script>