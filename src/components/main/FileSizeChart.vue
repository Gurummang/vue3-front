<template>
  <div class="flex flex-col p-4 mb-5 bg-white border rounded-lg shadow-sm">
    <h2 class="text-xl font-bold mb-4">SaaS별 파일 크기 비율</h2>
    <div class="my-2">
      <div class="my-0 mx-auto size-56">
        <canvas ref="myChart"></canvas>
      </div>
      <div class="mt-4">
        <ul class="space-y-1.5">
          <li v-for="(data, idx) in chartData" :key="idx" class="flex items-center mb-3 px-2.5">
            <img class="size-5 rounded-full mr-2" :src="getSaasImg(convertSaasName(data.saas))" :alt="data.saas" />
            <span class="flex-1 text-base capitalize">{{ convertSaasName(data.saas) }}</span>
            <span class="text-green-700 text-xs text-center w-13 mr-2 py-0.5 rounded-xl">{{ data.dailyDifference ? '+ ' + getfileSize(data.dailyDifference).replace(/(\d+)\.\d+(\s\w+)/, '$1$2') : '' }}</span>
            <span class="bg-orange-300 text-white text-sm text-center w-20 py-0.5 px-2 rounded-xl">{{ data.size ? getfileSize(data.size) : '0 Bytes' }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import { removeZeroDivision, getfileSize, getSaasImg, convertSaasName } from '@/utils/utils.js';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const props = defineProps({
  saasFileSize: Object,
});

const myChart = ref(null);
const chartData = ref(props.saasFileSize);

const data = {
  labels: chartData.value.map(row => convertSaasName(row.saas)),
  datasets: [
    {
      data: chartData.value.map(row => row.size),
      backgroundColor: [ //'#2EB67D', '#FFD388', '#485561'
        'rgb(49 46 129)',
        'rgb(79 70 229)',
        'rgb(129 140 248)',
      ],
      weight: 10,
      hoverOffset: 4
    },
  ]
}

const config = {
  type: 'doughnut',
  data: data,
  options: {
    responsive: true,
    cutout: '70%', 
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: ''
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = ' '
            label += context.parsed ? getfileSize(context.parsed) : '0 Bytes'
            return label
          }
        }
      }
    },
  }
};

onMounted(() => {
  const ctx = myChart.value.getContext('2d');
  new Chart(ctx, config);
});

</script>

<style scoped>
</style>
