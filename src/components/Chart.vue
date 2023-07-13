<script setup>
import { reactive } from 'vue'

const props = defineProps(['data'])
import * as CanvasJS from '@canvasjs/charts'

CanvasJS.addColorSet('colors1', ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff'])

const options = reactive({
  exportEnabled: true,
  animationEnabled: true,
  height: 730,
  backgroundColor: 'transparent',
  theme: 'dark2',
  title: {
    text: 'Yil Sarhisobi',
    fontColor: '#fff'
  },
  axisY: {
    title: 'Number of Visits'
  },
  toolTip: {
    shared: true
  },
  legend: {
    cursor: 'pointer',
    itemclick: function (e) {
      if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
        e.dataSeries.visible = false
      } else {
        e.dataSeries.visible = true
      }
      e.chart.render()
    }
  },
  data: [
    {
      type: 'line',
      name: 'Visitors',

      toolTipContent: '{name}: {y};',
      showInLegend: true,
      color: '#fff',
      dataPoints: [
        { label: 'January', y: '' },
        { label: 'February', y: '' },
        { label: 'March', y: '' },
        { label: 'April', y: '' },
        { label: 'May', y: '' },
        { label: 'June', y: '' },
        { label: 'July', y: 44 },
        { label: 'August', y: 55 },
        { label: 'September', y: 49 },
        { label: 'October', y: 101 },
        { label: 'November', y: 150 },
        { label: 'December', y: 105 }
      ]
    }
  ]
})
const styleOptions = reactive({
  width: '100%',
  height: '360px'
})
</script>

<template>
  <CanvasJSChart :options="options" />
</template>

<style lang="scss" scoped></style>
