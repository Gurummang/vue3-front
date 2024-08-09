<template>
  <div class="bg-white p-4 rounded-lg shadow-sm">
    <h2 class="text-lg font-semibold mb-2">{{ props.title }}</h2>
    <canvas ref="chartRef" class=""></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Chart, LineController, LineElement,PointElement, LinearScale, Title,CategoryScale,RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, RadialLinearScale, ArcElement, Tooltip, Legend);

const props = defineProps({
  historyTrends: {
    type: Object,
    required: true
  }
});

const chartRef = ref(null);

const chartData = props.historyTrends;

console.log(chartData);

// onMounted(() => {
//   const ctx = chartRef.value.getContext('2d');
  
//   new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: chartData.map(row => row.date),
//       datasets: [{
//         label: '업로드',
//         data: chartData.map(row => row.upload),
//         fill: false,
//         borderColor: 'rgb(200, 200, 200)',
//         hoverBorderColor: 'rgb(249, 115, 22)',
//         // backgroundColor: 'rgb(249, 115, 22)',
//         tension: 0.1,
//         borderWidth: 2,
//         pointHoverRadius: 2,
//         pointHoverBorderWidth: 2
//       },
//       {
//         label: '수정',
//         data: chartData.map(row => row.edit),
//         fill: false,
//         borderColor: 'rgb(200, 200, 200)',
//         hoverBorderColor: 'rgb(251, 191, 36)',
//         // backgroundColor: 'rgb(251, 191, 36)',
//         tension: 0.1,
//         borderWidth: 2,
//         pointHoverRadius: 2,
//         pointHoverBorderWidth: 2
//       },
//       {
//         label: '삭제',
//         data: chartData.map(row => row.delete),
//         fill: false,
//         borderColor: 'rgb(200, 200, 200)',
//         hoverBorderColor: 'rgb(148, 163, 184)',
//         // backgroundColor: 'rgb(148, 163, 184)',
//         tension: 0.1,
//         borderWidth: 2,
//         pointHoverRadius: 2,
//         pointHoverBorderWidth: 2
//       }]
//     },
//     options: {
//       responsive: true,
//       aspectRatio: 4,
//       hover: {
//         mode: 'dataset',
//         intersect: false
//       },
//       plugins: {
//         legend: {
//           display: true,
//           position: 'bottom',
//           labels: {
//             usePointStyle: false,
//             pointStyle: '',
//             generateLabels: function(chart) {
//               const datasets = chart.data.datasets;
//               return datasets.map((dataset, i) => ({
//                 text: dataset.label,
//                 fillStyle: dataset.hoverBorderColor,
//                 hidden: !chart.isDatasetVisible(i),
//                 lineCap: dataset.borderCapStyle,
//                 lineDash: dataset.borderDash,
//                 lineDashOffset: dataset.borderDashOffset,
//                 lineJoin: dataset.borderJoinStyle,
//                 lineWidth: dataset.borderWidth,
//                 strokeStyle: dataset.hoverBorderColor,
//                 pointStyle: 'circle',
//                 datasetIndex: i
//               }));
//             }
//           }
//         },
//         tooltip: {
//           mode: 'nearest',
//           intersect: true,
//           backgroundColor: 'rgba(0, 0, 0, 0.7)',
//           titleColor: 'white',
//           bodyColor: 'white',
//           borderColor: function(context) {
//             if (context.tooltip && context.tooltip.dataPoints && context.tooltip.dataPoints.length > 0) {
//               return context.tooltip.dataPoints[0].dataset.hoverBorderColor;
//             }
//             return 'white';
//           },
//           borderWidth: 2,
//           callbacks: {
//             labelColor: function(context) {
//               return {
//                 borderColor: context.dataset.hoverBorderColor,
//                 backgroundColor: context.dataset.hoverBorderColor
//               };
//             },
//           }
//         }
//       },
//       scales: {
//         y: {
//           beginAtZero: true,
//           title: {
//             display: true,
//             text: '크기'  // MB 단위 제거
//           },
//           ticks: {
//             stepSize: 10
//             // callback 함수 제거
//           }
//         },
//         x: {
//           title: {
//             display: true,
//             text: '날짜'
//           },
//           ticks: {
//             font: { size: 10 },
//             maxTicksLimit: 20
//           }
//         }
//       }
//     }
//   });
// });

onMounted(() => {
  const ctx = chartRef.value.getContext('2d');
  
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartData.map(row => row.date),
      datasets: [{
        label: '업로드',
        data: chartData.map(row => row.upload),
        fill: false,
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgb(249, 115, 22)',
        tension: 0.1,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 2,
        pointHoverBorderWidth: 2,
        hoverBorderColor: 'rgb(249, 115, 22)',
      },
      {
        label: '수정',
        data: chartData.map(row => row.edit),
        fill: false,
        borderColor: 'rgb(251, 191, 36)',
        backgroundColor: 'rgb(251, 191, 36)',
        tension: 0.1,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 2,
        pointHoverBorderWidth: 2,
        hoverBorderColor: 'rgb(251, 191, 36)',
      },
      {
        label: '삭제',
        data: chartData.map(row => row.delete),
        fill: false,
        borderColor: 'rgb(148, 163, 184)',
        backgroundColor: 'rgb(148, 163, 184)',
        tension: 0.1,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 2,
        pointHoverBorderWidth: 2,
        hoverBorderColor: 'rgb(148, 163, 184)',
      }]
    },
    options: {
      responsive: true,
      aspectRatio: 4,
      hover: {
        mode: 'dataset',
        intersect: false
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          titleColor: 'white',
          bodyColor: 'white',
          borderColor: 'white',
          borderWidth: 1,
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '크기'
          },
          ticks: {
            stepSize: 10
          }
        },
        x: {
          title: {
            display: true,
            text: '날짜'
          },
          ticks: {
            font: { size: 10 },
            maxTicksLimit: 20
          }
        }
      },
      interaction: {
        mode: 'index',
        intersect: false
      }
    },
    plugins: [{
      id: 'hoverLine',
      beforeDraw: (chart) => {
        if (chart.tooltip._active && chart.tooltip._active.length) {
          const activePoint = chart.tooltip._active[0];
          const ctx = chart.ctx;
          const x = activePoint.element.x;
          const topY = chart.scales.y.top;
          const bottomY = chart.scales.y.bottom;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
          ctx.stroke();
          ctx.restore();
        }
      }
    }]
  });

  // Store original colors
  chart.data.datasets.forEach((dataset, i) => {
    dataset.originalBorderColor = dataset.borderColor;
    dataset.originalBackgroundColor = dataset.backgroundColor;
  });

  // Add hover effect
  chart.options.onHover = (event, activeElements) => {
    if (activeElements.length === 0) {
      // Reset all colors when not hovering
      chart.data.datasets.forEach((dataset, i) => {
        dataset.borderColor = dataset.originalBorderColor;
        dataset.backgroundColor = dataset.originalBackgroundColor;
      });
    } else {
      const datasetIndex = activeElements[0].datasetIndex;
      chart.data.datasets.forEach((dataset, i) => {
        if (i === datasetIndex) {
          // Highlight the hovered dataset
          dataset.borderColor = dataset.originalBorderColor;
          dataset.backgroundColor = dataset.originalBackgroundColor;
        } else {
          // Set other datasets to gray
          dataset.borderColor = 'rgb(200, 200, 200)';
          dataset.backgroundColor = 'rgb(200, 200, 200)';
        }
      });
    }
    chart.update();
  };
});
</script>