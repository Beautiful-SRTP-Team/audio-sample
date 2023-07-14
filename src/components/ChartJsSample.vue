<script lang="ts" setup>
import {Line as ChartLine} from "vue-chartjs";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  Legend,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip
} from "chart.js";
import "chartjs-adapter-luxon"
import {computed, reactive, ref} from "vue";
import {LearnRecord} from "@/utils/LearnRecord";
import {da} from "vuetify/locale";

ChartJs.register(TimeScale, Title, Tooltip, Legend, CategoryScale,PointElement,LineElement)

const OriginDataSet = ref([
  new LearnRecord(new Date(2023, 6, 1), 13),
  new LearnRecord(new Date(2023, 6, 2), 12),
  new LearnRecord(new Date(2023, 6, 3), 15),
  new LearnRecord(new Date(2023, 6, 4), 16),
  new LearnRecord(new Date(2023, 6, 5), 12),
  new LearnRecord(new Date(2023, 6, 6), 11)
])

// const chartJsData = reactive({
//   labels: OriginDataSet.value.map(record => record.mapToLabels()),
//   datasets: [{
//     backgroundColor: 'rgba(99,130,255,0.2)',
//     borderColor: 'rgba(51,78,255,0.2)',
//     label: "学习记录",
//     fill: false,
//     data: OriginDataSet.value.map(record => record.mapToData()),
//     borderWidth: 4,
//     borderRadius: 20,
//     borderSkipped: false,
//   }]
// })
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
  OriginDataSet.value = OriginDataSet.value.map(data=>{
    data.total = Math.floor(Math.random() * 25)
    console.log("new total " + data.total + "for " + data.date)
    return data
  })
  }
const ComputedChartData = computed(()=>{
  return {
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
  }
})

</script>

<template>
  <chart-line :data="ComputedChartData" :options="chartJsOptions" class="elevation-3 rounded-lg ma-5 h-50"/>
  <v-btn @click="randomReset()" >Random Reset</v-btn>
</template>

<style scoped>

</style>