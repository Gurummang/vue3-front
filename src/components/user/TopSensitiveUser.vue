<template>
  <div class="flex flex-col p-4 bg-gray-800 border rounded-lg shadow-sm h-full">
    <h2 class="text-xl font-bold mb-4 text-white">DLP 업로드 Top 5 사용자</h2>
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
});

const myChart = ref(null);

const data = {
  labels: ['유저 1', '유저 2', '유저 3', '유저 4', '유저 5'],
  datasets: [{
    data: [300, 250, 200, 150, 100],
    backgroundColor: [
      'rgb(245 158 11)',
      'rgb(251 191 36)',
      'rgb(251 191 36)',
      'rgb(252 211 77)',
      'rgb(253 230 138)'
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
          color: 'white'  // x축 숫자 색상을 흰색으로 설정
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'  // x축 그리드 선 색상을 흰색으로 설정 (투명도 10%)
        }
      },
      y: {
        ticks: {
          color: 'white'  // y축 라벨 (유저 이름) 색상을 흰색으로 설정
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'  // y축 그리드 선 색상을 흰색으로 설정 (투명도 10%)
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