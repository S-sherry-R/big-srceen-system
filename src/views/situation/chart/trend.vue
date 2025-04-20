<template>
  <div class="content">
    <echart ref="chartRef" height="180px" width="100%" />
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import type { ElectricTrendArr } from "@/api/type";
// eslint-disable-next-line no-undef
const props = defineProps<{data: ElectricTrendArr}>()
const chartRef = ref()
let option = {}
watch(
    () => props.data,
    (val: ElectricTrendArr) => {
      const xData = []
      const seriesData1 = []
      const seriesData2 = []
      const seriesData3 = []
      val.forEach(item => {
        xData.push(item.time)
        seriesData1.push(item.createElectricity)
        seriesData2.push(item.useElectricity)
        seriesData3.push(item.carbon)
      })
      option = {
        color: ['#137e5a','#f69b52','#9bd801'],
        legend: {
          bottom: '3%',
          icon: 'roundRect',
          data: ['发电量','用电量','碳减排量']
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
          top: '3%',
          left: '3%',
          right: '4%',
          bottom: '18%',
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
            name: '发电量',
            data: seriesData1,
            type: 'line',
            smooth: true,
            symbol: 'none'
          },
          {
            name: '用电量',
            data: seriesData2,
            type: 'line',
            smooth: true,
            symbol: 'none'
          },
          {
            name: '碳减排量',
            data: seriesData3,
            type: 'line',
            smooth: true,
            symbol: 'none'
          }
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
.content{
  width: 100%;
  height: 180px;
}
</style>
