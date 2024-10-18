<template>
  <div class="flex flex-col p-4 bg-white border rounded-lg shadow-sm">
    <h2 class="text-xl font-bold mb-4">DLP 식별종류별 개수</h2>
    <div class="mt-2">
      <div class="my-0 mx-auto w-88 h-60">
        <canvas ref="myChart"></canvas>
      </div>
      <div class="mt-4">
        <ul class="space-y-1.5">
          <!-- <li v-for="(data, idx) in chartData" :key="idx" class="flex items-center mb-3">
            <img class="size-5 rounded-full mr-2" :src="getSaasImg(convertSaasName(data.saas))" :alt="data.saas" />
            <span class="flex-1 text-base capitalize">{{ convertSaasName(data.saas) }}</span>
            <span class="bg-orange-300 text-white text-sm text-center w-14 py-0.5 px-2 rounded-xl">{{ data.upload }} 개</span>
            <span class="text-green-700 text-xs text-center w-9 ml-2 py-0.5 rounded-xl">{{ data.dailyDifference ? '+ ' + data.dailyDifference + ' 개': '' }}</span>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { removeZeroDivision, getfileSize, getSaasImg, convertSaasName } from '@/utils/utils.js';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const props = defineProps({
  dlpPiis: Object,
  required: true
});

const myChart = ref(null);
const chartData = ref(props.dlpPiis);

const transperatePii = {
  'identify': '주민등록번호',
  'passport': '여권번호',
  'drive': '운전면허번호',
  'foreigner': '외국인등록번호'
}

const piiColors = {
  'identify': 'rgb(49 46 129)',
  'passport': 'rgb(79 70 229)',
  'drive': 'rgb(129 140 248)', 
  'foreigner': 'rgb(165 180 252)'
}

const data = {
  labels: chartData.value.map(row => transperatePii[row.pii]),
  datasets: [{
    data: chartData.value.map(row => row.total),
    backgroundColor: chartData.value.map(row => piiColors[row.pii]),
    categoryPercentage: 0.5,
    barPercentage: 0.5,
    barThickness: 20,
    maxBarThickness: 20
  }]
};

const config = {
  type: 'bar',
  data: data,
  options: {
    // indexAxis: 'y',
    responsive: true,
    aspectRatio: 2,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true
        },
        ticks: {
          stepSize: 10,
          maxTicksLimit: 8,
          callback: function(value) {
            return value + ' 개';
          }
        }
      }
    }
  },
};

onMounted(() => {
  const ctx = myChart.value.getContext('2d');
  new Chart(ctx, config);
});
</script>

<style scoped>
</style>
