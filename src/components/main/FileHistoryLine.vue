<template>
  <div class="bg-white p-4 rounded-lg shadow-sm mb-5">
    <h2 class="text-xl font-bold mb-4">파일 히스토리 추이</h2>
    <canvas ref="chartRef" class=""></canvas>
    <div class="flex justify-end items-center">
      <span class="size-3 rounded bg-indigo-900"></span>
      <span class="text-xs px-1.5">히스토리</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Chart, LineController, LineElement,PointElement, LinearScale, Title,CategoryScale,RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, RadialLinearScale, ArcElement, Tooltip, Legend);

const props = defineProps({
  fileHistoryLine: {
    type: Object,
    required: true
  }
});

const chartRef = ref(null);

const chartData = ref(props.fileHistoryLine)
chartData.value.sort((a, b) => {
  const dateA = new Date(`${a.month}-01`)
  const dateB = new Date(`${b.month}-01`)
  return dateA - dateB
})

onMounted(() => {
  const ctx = chartRef.value.getContext('2d');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartData.value.map(row => row.month),
      datasets: [{
        label: '히스토리',
        data: chartData.value.map(row => row.total),
        fill: 'start',
        borderColor: '#4D4C7D',
        backgroundColor: 'rgba(49, 46, 129, 0.7)',
        // borderDash: [4, 3],
        // hoverBorderDash: [0, 0],
        pointRadius: 4,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 2,
        borderWidth: 2,
        // hoverBorderWidth: 2,
        tension: 0.3,
      }]
    },
    options: {
      responsive: true,
      aspectRatio: 3,
      hover: {
        mode: 'dataset',
        intersect: false
      },
      pointBackgroundColor: '#fff',
      plugins: {
        legend: {
          display: false,
          position: 'bottom',
        },
        tooltip: {
          // mode: 'nearest',
          intersect: true,
        }
      },
      scales: {
        x: {
          title: {
            display: false,
            text: '달'
          },
          grid: {
            color: 'transparent',
          },
        },
        y: {
          beginAtZero: true,
          // grid: {
          //   color: 'transparent',
          // },
          title: {
            display: false,
            text: '' 
          },
          ticks: {
            stepSize: 10,
            maxTicksLimit: 6,
          }
        },
      }
    }
  });
});
</script>