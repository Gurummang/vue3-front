<template>
  <div class="flex flex-col p-4 mb-5 bg-white border rounded-lg shadow-sm">
    <h2 class="text-xl font-bold mb-4">SaaS별 업로드 개수</h2>
    <div class="my-2">
      <div class="my-0 mx-auto w-80 h-56">
        <canvas ref="myChart"></canvas>
      </div>
      <div class="mt-4">
        <ul class="space-y-2">
          <li v-for="(data, idx) in chartData" :key="idx" class="flex items-center mb-2 px-2.5">
            <img class="size-5 rounded-full mr-2" :src="getSaasImg(convertSaasName(data.saas))" :alt="data.saas" />
            <span class="flex-1 text-base capitalize">{{ convertSaasName(data.saas) }}</span>
            <span v-if="data.dailyDifference" class="flex items-center text-green-700 text-xs text-center font-bold w-14 mr-1 rounded-xl">
              <v-icon :size=14 class="mr-1">mdi-arrow-up-bold</v-icon>
              {{ data.dailyDifference + ' 개' }}
            </span>
            <span class="bg-orange-400 text-white text-sm text-center w-20 py-0.5 px-2 rounded-xl">{{ data.upload }} 개</span>
          </li>
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
  saasFileCount: Object,
  required: true
});

const myChart = ref(null);
const chartData = ref(props.saasFileCount);

const data = {
  labels: chartData.value.map(row => convertSaasName(row.saas)),
  datasets: [{
    data: chartData.value.map(row => row.upload),
    backgroundColor: [
      'rgb(49 46 129)',
      'rgb(79 70 229)',
      'rgb(129 140 248)',
    ],
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
    aspectRatio: 1,
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
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
        },
        ticks: {
          stepSize: 10,
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
