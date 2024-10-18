<template>
  <div class="flex flex-col p-4 bg-white border rounded-lg shadow-sm h-full">
    <h2 class="text-xl font-bold mb-4">민감 업로드 Top 5 사용자</h2>
    <div class="flex-grow relative">
      <canvas ref="myChart" class="absolute inset-0"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const props = defineProps({
  topSensitiveUser: Object,
  required: true
});

const myChart = ref(null);

const data = {
  labels: props.topSensitiveUser.map(row => row.user),
  datasets: [{
    data: props.topSensitiveUser.map(row => row.sensitive),
    backgroundColor: [
      'rgb(180 83 9)',
      'rgb(245 158 11)',
      'rgb(251 191 36)',
      'rgb(252 211 77)',
      'rgb(253 230 138)',
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
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: function(context) {
            const max = context.chart.scales.x.max;
            if (max <= 10) return 1;
            if (max <= 100) return 10;
            if (max <= 1000) return 100;
            return Math.pow(10, Math.floor(Math.log10(max) - 1));
          },
          callback: function(value) {
            return value + ' 개';
          }
        }
      },
      y: {
        grid: {
          display: false
        },
      }
    }
  },
};

onMounted(() => {
  const ctx = myChart.value.getContext('2d');
  new Chart(ctx, config);
});
</script>