<script lang="ts" setup>
import {Chart,Scatter} from "vue-chartjs";
import {
  CategoryScale,
  Chart as ChartJs,
  Legend,
  LineElement,
  LogarithmicScale,
  PointElement,
  TimeScale,
  Title,
  Tooltip
} from "chart.js";
import "chartjs-adapter-luxon"
import {computed, ref} from "vue";
import {LearnRecord} from "@/utils/LearnRecord";

ChartJs.register(TimeScale, Title, Tooltip, Legend, CategoryScale, PointElement, LineElement, LogarithmicScale)

const OriginDataSet = ref([
  new LearnRecord(new Date(2023, 6, 1), 13),
  new LearnRecord(new Date(2023, 6, 2), 12),
  new LearnRecord(new Date(2023, 6, 3), 15),
  new LearnRecord(new Date(2023, 6, 4), 16),
  new LearnRecord(new Date(2023, 6, 5), 12),
  new LearnRecord(new Date(2023, 6, 6), 11),
  new LearnRecord(new Date(2023, 6, 7), 12),
  new LearnRecord(new Date(2023, 6, 8), 12),
  new LearnRecord(new Date(2023, 6, 9), 12),
  new LearnRecord(new Date(2023, 6, 10), 12),
  new LearnRecord(new Date(2023, 6, 11), 12),
  new LearnRecord(new Date(2023, 6, 12), 12),
  new LearnRecord(new Date(2023, 6, 13), 12),
  new LearnRecord(new Date(2023, 6, 14), 12),
  new LearnRecord(new Date(2023, 6, 15), 12),
])

const chartJsOptions = {
  responsive: true,
  interaction: {
    intersect: false,
    mode: 'index',
  },

  layout: {
    padding: 5
  },
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "学习记录"
    },
    tooltip: {
      callbacks: {
        title: (data) => {
          const date = new Date(data[0].parsed.x)
          const formatter = new Intl.DateTimeFormat("zh-cn",
              {dateStyle: "medium"} as any)
          return formatter.format(date)
        },
        label: (data) => {
          const id = data.dataset.id
          const value = data.raw.y
          const label = data.dataset.label

          if (id === 1 || id === 2) {
            return `${label}: ${value}题`
          } else {
            return `${label}: ${(value * 100.0).toFixed(2)}%`
          }

        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        // Include a dollar sign in the ticks
        callback: function (value, index, ticks) {
          return `${value}题`;
        },
        padding: 5
      },
      grid: {
        // display:false
      }

    },
    x: {
      stacked: true,
      type: 'time',
      adapters: {
        date: {
          locale: "zh-cn"
        }
      },
      time: {
        minUnit: "day",
        // Luxon format string
        tooltipFormat: 'DD T',
      },
      grid: {
        display: false
      }
    },
    rateAxis: {
      type: "logarithmic",
      position: "right",
      ticks: {
        callback: (value, _index, _tick) => {
          return `${(value * 100.0).toFixed(2)}%`
        }

      }
      , grid: {
        display: false
      }
    }
  }
}
const randomReset = () => {
  OriginDataSet.value = OriginDataSet.value.map(data => {
    data.total = Math.floor(Math.random() * 50) + 1
    data.correct = Math.floor(Math.random() * (data.total)) + 1
    return data
  })
}
const ComputedChartData = computed(() => {
  return {
    // labels: OriginDataSet.value.map(record => record.mapToLabels()),
    datasets: [{
      order: 0,
      id: 3,
      type: "line",
      label: "正确率",
      data: OriginDataSet.value.slice(0, 10).map(record => record.mapToCorrectRate())
      ,
      tension: 0.1,
      yAxisID: "rateAxis"
      , backgroundColor: 'rgb(24,75,69)',
      borderColor: 'rgb(24,75,69)',
      borderWidth: 2,
    },{
      id: 1,
      type: "bar",
      backgroundColor: 'rgb(169,14,16)',
      borderColor: 'rgb(169,14,16)',
      label: "完成题目",
      data: OriginDataSet.value.slice(0, 10).map(record => record.mapToData()),
      borderWidth: 1,
      borderRadius: 5,
      order: 2,
    },
      {
        id: 2,
        order: 1,
        type: "bar",
        backgroundColor: 'rgb(52,133,141)',
        borderColor: 'rgb(52,133,141)',
        label: "正确题目",
        data: OriginDataSet.value.slice(0, 10).map(record => record.mapToCorrectData()),
        borderWidth: 1,
        borderRadius: 5,
      }
    ]
  }
})

</script>

<template>
  <scatter :data="ComputedChartData" :options="chartJsOptions" class="elevation-3 rounded-lg ma-5 h-50"/>
  <v-btn @click="randomReset()">Random Reset</v-btn>
</template>

<style scoped>

</style>