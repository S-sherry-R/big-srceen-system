<template>
  <div class="content">
    <echart ref="chartRef" height="210px" width="100%"/>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import type { OptionData } from "@/api/type";

const props = defineProps<{data:OptionData,chooseLabel:string}>()
const chartRef = ref()
let option = {}
watch(
    () => props.data,
    (val: any) => {
      const xData = []
      const seriesData1 = []
      const seriesData2 = []
      val.forEach(item => {
        xData.push(item.name)
        seriesData1.push(item.value)
        seriesData2.push(item.value1)
      })
      let seriesName = '电耗'
      let unit = 'kwh'
      if(props.chooseLabel === 'energy'){
        seriesName = '电耗'
        unit = 'kwh'
      } else if(props.chooseLabel === 'water'){
        seriesName = '水耗'
        unit = 'm³'
      } else if(props.chooseLabel === 'gas') {
        seriesName = '气耗'
        unit = 'nm³'
      }
      option = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(19, 126, 90, 0.4)',
          borderColor: '#137e5a',
          textStyle: {
            color: '#fff'
          },
          axisPointer: {
            type: 'shadow'
          }
        },
        legend:{
          show: true
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '0%',
          top: '20%',
          containLabel: true
        },
        yAxis: {
          name: unit,
          nameLocation: 'end',
          type: 'value',
          boundaryGap: [0, 0.01],
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true
          }
        },
        xAxis: {
          type: 'category',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999'
            }
          },
          data: xData
        },
        series: [
          {
            name: seriesName+ '2023年',
            type: 'line',
            itemStyle: {
              color: '#f69b52'
            },
            data: seriesData1
          },
          {
            name: seriesName+ '2024年',
            type: 'line',
            itemStyle: {
              color: '#2CC2B7'
            },
            data: seriesData2
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
.content{
  width: 100%;
  height: calc(100% - 50px);
  background-color: rgba(19, 126, 90, 0.1);
  display: flex;
  .total-info{
    border: 1px solid #137e5a;
    height: 156px;
    width: 125px;
    margin-left: 20px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    span{
      font-size: 20px;
      display: inline-block;
      width: 100%;
      text-align: center;
    }
    .info-unit{
      color: #ddd;
      font-size: 12px;
    }
    .total-energy{
      color: #66FFFF;
    }
    .percent-energy{
      color: #f69b52;
    }
  }
}
</style>
