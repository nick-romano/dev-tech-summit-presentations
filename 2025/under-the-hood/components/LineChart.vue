<script setup>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const props = defineProps({
  csvPath: { type: String, required: true }, // Path to CSV file
  title: { type: String, default: "Lines of Code" }, // Optional title
  color: { type: String, default: "blue" } // Optional line color
});

const chartRef = ref(null);

onMounted(async () => {
  const ctx = chartRef.value.getContext('2d');

  const response = await fetch(props.csvPath);
  const text = await response.text();
  const rows = text.split('\n').slice(1); // Skip header

  const timestamps = [];
  const codeValues = [];
  const testsValues = [];

  for (const row of rows) {
    if (row.trim() === '') {
      continue;
    }

    const [timestamp, code, tests] = row.split(',').map(x => x.trim());
    timestamps.push(new Date(parseInt(timestamp) * 1000).toISOString().split('T')[0]); // Format date
    codeValues.push(parseInt(code, 10));
    testsValues.push(parseInt(tests, 10));
  }

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: timestamps,
      datasets: [{
        label: "Code (sloc)",
        data: codeValues,
        backgroundColor: "rgb(100, 200, 255)",
        pointBackgroundColor: "rgb(100, 200, 255)",
        borderWidth: 0,
        fill: false
      },{
        label: "Tests (sloc)",
        data: testsValues,
        backgroundColor: "rgb(100, 255, 100)",
        pointBackgroundColor: "rgb(100, 255, 100)",
        borderWidth: 0,
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {

        legend: {
          labels: {
            color: "white"
          }
        },
      },
      scales: {
        x: {
          ticks: {
            color: "white",
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.2)'  // Grid line color for x-axis
          }
        },
        y: {
          ticks: {
            color: "white"
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.2)'  // Grid line color for x-axis
          }
        }
      }
    }
  });
});
</script>

<template>
  <canvas ref="chartRef" style="width: 100%; height: 100%; margin: 2em"></canvas>
</template>
