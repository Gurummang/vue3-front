<template>
  <div class="flex flex-col p-4 mb-5 bg-white border rounded-lg shadow-sm">
    <h2 class="text-xl font-bold mb-4">DLP 정책 현황</h2>
    <div class="my-2">
      <div class="my-0 mx-auto w-full h-60">
        <canvas ref="myChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const props = defineProps({
  dlpStatistics: {
    type: Array,
    required: true
  }
});

const myChart = ref(null);

const transperatePii = {
  'identify': '주민등록번호',
  'passport': '여권번호',
  'drive': '운전면허번호',
  'foregin': '외국인등록번호'
}

const piiColors = {
  'identify': 'rgb(49 46 129)',
  'passport': 'rgb(79 70 229)',
  'drive': 'rgb(129 140 248)', 
  'foregin': 'rgb(165 180 252)'
}

onMounted(() => {
  // 고유한 PII 타입 추출
  const uniquePiiTypes = [...new Set(props.dlpStatistics.flatMap(item => 
    item.pii.map(p => p.pii)
  ))];

  // 데이터셋 생성
  const datasets = uniquePiiTypes.map(piiType => ({
    label: transperatePii[piiType],
    data: props.dlpStatistics.map(policy => {
      const piiItem = policy.pii.find(p => p.pii === piiType);
      return piiItem ? piiItem.total : 0;
    }),
    backgroundColor: piiColors[piiType] || '#666666',
    categoryPercentage: 0.5,
    barPercentage: 0.5,
    barThickness: 25,
  }));

  const data = {
    labels: props.dlpStatistics.map(item => item.policy),
    datasets: datasets
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      indexAxis: 'y',  // 가로 방향 차트로 설정
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          display: false,
          labels: {
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.raw}개`;
            }
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false
          },
          ticks: {
            callback: function(value) {
              return value + '개';
            }
          }
        },
        y: {
          stacked: true,
          grid: {
            display: false
          }
        }
      }
    }
  };

  const ctx = myChart.value.getContext('2d');
  new Chart(ctx, config);
});
</script>

<style scoped>
</style>