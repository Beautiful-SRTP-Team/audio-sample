<script lang="ts" setup>
import {Bar as ChartBar} from "vue-chartjs";
import {BarElement, CategoryScale, Chart as ChartJs, Legend, TimeScale, Title, Tooltip} from "chart.js";
import "chartjs-adapter-luxon"
import {ref} from "vue";
import {LearnRecord} from "@/utils/LearnRecord";

ChartJs.register(TimeScale, Title, Tooltip, Legend, BarElement, CategoryScale,)

const OriginDataSet = ref([
  new LearnRecord(new Date(2023, 6, 1), 13),
  new LearnRecord(new Date(2023, 6, 2), 12),
  new LearnRecord(new Date(2023, 6, 3), 15),
  new LearnRecord(new Date(2023, 6, 4), 16),
  new LearnRecord(new Date(2023, 6, 5), 12),
  new LearnRecord(new Date(2023, 6, 6), 11)
])

const chartJsData = ref({
  labels: OriginDataSet.value.map(record => record.mapToLabels()),
  datasets: [{
    backgroundColor: 'rgba(99,130,255,0.2)',
    borderColor: 'rgba(51,78,255,0.2)',
    label: "学习记录",
    fill: false,
    data: OriginDataSet.value.map(record => record.mapToData()),
    borderWidth: 4,
    borderRadius: 20,
    borderSkipped: false,
  }]
})
const chartJsOptions = {
  responsive: true,
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
          console.log(date)
          const formatter = new Intl.DateTimeFormat("zh-cn",
              {dateStyle:"medium"} as any)
          return formatter.format(date)
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        // Include a dollar sign in the ticks
        callback: function(value, index, ticks) {
          return '$' + value;
        }
      }

    },
    x: {
      type: 'time',
      adapters:{
        date:{
          locale:"zh-cn"
        }
      },
      time: {
        minUnit:"day",
        // Luxon format string
        tooltipFormat: 'DD T',
      },

    }
  }
}
const randomReset =()=>{
  OriginDataSet.value.map(data=>{


    return data
  })
  }
</script>

<template>
  <chart-bar :data="chartJsData" :options="chartJsOptions" class="elevation-3 rounded-lg ma-5 h-50"/>
</template>

<style scoped>

</style>