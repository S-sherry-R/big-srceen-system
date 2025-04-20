<template>
  <Statistics :list="powerData"></Statistics>
  <slot></slot>
  <echart ref="chartRef" height="130px" width="100%" />
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import Statistics from "@/components/Statistics.vue";
import Time from "@/components/Time.vue";

const props = defineProps({
  powerData: Object,
  powerTotalTrendData: Array
})
const chartRef = ref()
let option = {}
watch(
    () => props.powerTotalTrendData,
    (val: any) => {
      const xData = []
      const seriesData = []
      val.forEach(item => {
        xData.push(item.name)
        seriesData.push(item.value)
      })
      option = {
        color: ['rgba(19,126,90,0.2)'],
        aria:{
          enabled: true,
          decal:{
            show:true
          }
        },
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
            name: '充电总量',
            data: seriesData,
            type: 'bar',
            itemStyle: {
              decal: {
                symbol: 'rect',
                color: '#137e5a',
                backgroundColor: 'rgba(19,126,90,0.2)',
                dashArrayY: [4, 2],
                rotation: 0
              }
            },
            barWidth: 10
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

<style scoped lang="less">

</style>
