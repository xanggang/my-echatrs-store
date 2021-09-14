<template>
  <div class='echarts-container' ref='dom'></div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps<{
  title?: string,
  option?: any
}>()

const dom = ref<HTMLDivElement | null>(null)
let myChart: any = null

onMounted(() => {
  if (!dom.value) return
  myChart = echarts.init(dom.value)

  const option = {
    title: {
      text: props.title
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }]
  }

  myChart.setOption(option)
})

watch(props, () => {
  console.log('-----')
  const option = {
    title: props.option,
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }]
  }
  myChart.setOption(option)
})
</script>

<style lang='less' scoped>

.echarts-container {
  width: 100%;
  height: 100%;
}
</style>
