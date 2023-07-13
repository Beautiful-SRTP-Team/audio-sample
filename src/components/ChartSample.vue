<template>
  <v-container>
    <v-card>
      <template v-slot:title>使用 Google Chart 样式</template>
      <template v-slot:subtitle>
        <v-btn href="https://madewithvuejs.com/go/vue-js-google-charts">查看</v-btn>
      </template>
      <template v-slot:text>

        <g-chart
            :data="GoogleChartData"
            :options="GoogleChartOption"
            type="ColumnChart"
        />
      </template>
    </v-card>
    <v-divider/>
    <v-card>
      <template v-slot:title>使用 Chart.Js 样式</template>
      <template v-slot:subtitle>
        <v-btn href="https://madewithvuejs.com/go/vue-chartjs">查看</v-btn>
      </template>
      <template v-slot:text>

        <bar
            :data="chartJsData"
            :options="chartJsOptions"
        />
      </template>
    </v-card>

    <v-divider/>
    <v-card>
      <template v-slot:title>使用 HighChart 样式</template>
      <template v-slot:subtitle>
        <v-btn href="https://github.com/highcharts/highcharts-vue?ref=madewithvuejs.com#demo-apps">查看</v-btn>
      </template>
      <template v-slot:text>

        <HighChart
            :options="higtChartOptions"
        />
      </template>
    </v-card>

  </v-container>
</template>

<script lang="ts" setup>
import {defineComponent, ref} from "vue";

// google chart
import {GChart} from "vue-google-charts";
import type {GoogleChartOptions,} from "vue-google-charts/dist/types";

// chart js
import {Bar} from "vue-chartjs";
import {BarElement, CategoryScale, Chart as ChartJs, Legend, LinearScale, Title, Tooltip} from "chart.js";
import {Chart as HighChart} from "highcharts-vue";

ChartJs.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const GoogleChartData = ref([
      ['Year', 'Sales', 'Expenses', 'Profit'],
      ['2014', 1000, 400, 200],
      ['2015', 1170, 460, 250],
      ['2016', 660, 1120, 300],
      ['2017', 1030, 540, 350]
    ]
)

const GoogleChartOption: GoogleChartOptions = {
  title: 'Company Performance',
  subtitle: 'Sales, Expenses, and Profit: 2014-2017',
}

const chartJsData = ref({
  labels: ['January', 'February', 'March'],
  datasets: [{data: [20, 20, 12]}]
})
const chartJsOptions = {responsive: true}

defineComponent({highcharts: HighChart})

const higtChartOptions = {
  series: [{
    data: [1, 2, 3] // sample data
  }]
}
</script>


<style scoped>

</style>