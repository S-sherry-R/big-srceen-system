<template>
  <Statistics :list="water"></Statistics>
  <slot></slot>
  <echart ref="chartRef" height="130px" width="100%" />
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import * as echarts from 'echarts'
import Statistics from "@/components/Statistics.vue";

const props = defineProps({
  water: Object,
  waterTrendData: Array,
  name: String
})
const chartRef = ref()
let option = {}
watch(
    () => props.waterTrendData,
    (val: any) => {
      const xData = []
      const seriesData = []
      val.forEach(item => {
        xData.push(item.name)
        seriesData.push(item.value)
      })
      option = {
        color: ['#137e5a'],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(19, 126, 90, 0.4)',
          borderColor: '#137e5a',
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          top: '5%',
          left: '3%',
          right: '4%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: xData
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          splitLine: {
            show: true,
            showMinLine: false,
            lineStyle: {
              type: 'dashed',
              color: '#676a68'
            }
          }
        },
        series: [
          {
            name: props.name,
            data: seriesData,
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(19, 126, 90, 1)'
                },
                {
                  offset: 1,
                  color: 'rgba(19, 126, 90, .1)'
                }
              ])
            }
          },
        ]
      }
      // 手动触发更新
      if (chartRef.value) {
        // 通过初始化参数打入数据
        chartRef.value.initChart(option)
      }
    },
    {
      immediate: true,
      deep: true
    }
)
</script>

<style scoped lang="scss">
</style>
