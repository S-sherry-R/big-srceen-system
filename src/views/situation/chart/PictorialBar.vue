<template>
  <Statistics :list="gasData"></Statistics>
  <slot></slot>
  <echart ref="chartRef" height="130px" width="100%" />
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import Statistics from "@/components/Statistics.vue";
import Time from "@/components/Time.vue";
import * as echarts from "echarts";

const props = defineProps({
  gasData: Object,
  gasTrendData: Array
})
const chartRef = ref()
let option = {}
watch(
    () => props.gasTrendData,
    (val: any) => {
      const xData = []
      const seriesData = []
      val.forEach(item => {
        xData.push(item.name)
        seriesData.push(item.value)
      })
      option = {
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
            name: '燃气量',
            data: seriesData,
            type: 'pictorialBar',
            symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(19, 126, 90, 1)'
                },
                {
                  offset: 1,
                  color: 'rgba(19, 126, 90, .2)'
                }
              ])
            },
            emphasis: {
              itemStyle: {
                color: 'rgba(19,126,90,1)'
              }
            },
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
