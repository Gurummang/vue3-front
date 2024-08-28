<template>
  <div class="flex flex-col p-4 bg-white col-span-2 border rounded-lg shadow-sm h-full">
    <h2 class="text-xl font-bold mb-4">사용자 Top 5</h2>
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
  fileSize: Number,
  required: true
});

const myChart = ref(null);

const data = {
  labels: ['TOP 1', 'TOP 2', 'TOP 3', 'TOP 4', 'TOP 5'],
  datasets: [{
    data: [300, 250, 200, 150, 100],
    backgroundColor: [
      // 'rgb(245 158 11)',
      // 'rgb(251 191 36)',
      'rgb(251 191 36)',
      // 'rgb(252 211 77)',
      // 'rgb(253 230 138)'
    ],
    categoryPercentage: 0.5,
    barPercentage: 0.5,
    barThickness: 20,
    maxBarThickness: 20
  },
  {
    data: [100, 80, 60, 50, 20],
    backgroundColor: [
      'rgb(220 38 38)',
      // 'rgb(239 68 68)',
      // 'rgb(248 113 113)',
      // 'rgb(252 165 165)',
      // 'rgb(254 202 202)'
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
        beginAtZero: true
      }
    }
  },
};

onMounted(() => {
  const ctx = myChart.value.getContext('2d');
  new Chart(ctx, config);
});
</script>