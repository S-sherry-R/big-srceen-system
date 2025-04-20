<template>
  <div class="content">
    <div class="total-info">
      <span class="total-energy">{{info.totalEnergy}}</span>
      <span class="info-unit">总能耗/kwh</span>
      <span class="percent-energy">{{info.percentEnergy}}</span>
      <span class="info-unit">平均月耗</span>
      <span class="rate-energy">{{info.rateEnergy}}%</span>
      <span class="info-unit">负荷率</span>
    </div>
    <echart ref="chartRef" height="210px" width="100%"/>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import type { OptionData,MonthEnergyInfo } from "@/api/type";

// eslint-disable-next-line no-undef
const props = defineProps<{data:OptionData,chooseLabel:string,info:MonthEnergyInfo}>()
const chartRef = ref()
let option = {}
watch(
    () => props.data,
    (val: any) => {
      const xData = []
      const seriesData = []
      val.forEach(item => {
        xData.push(item.name)
        seriesData.push(item.value)
      })
      let seriesName = '电耗'
      let unit = 'kwh'
      if(props.chooseLabel === 'electricity'){
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
        grid: {
          left: '3%',
          right: '4%',
          bottom: '0%',
          top: '20%',
          containLabel: true
        },
        yAxis: {
          name: `单位：${unit}`,
          nameLocation: 'end',
          type: 'value',
          boundaryGap: [0, 0.01],
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
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
            name: seriesName,
            type: 'bar',
            label: {
              show: true,
              position: 'top'
            },
            markLine: {
              data: [
                { name: '月平均能耗',  type: 'average',}
              ],
              lineStyle: {
                color: '#f69b52',
                type: 'solid'
              }
            },
            itemStyle: {
              color:  {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(51, 253, 207, 1)'
                }, {
                  offset: 1, color: 'rgba(6, 161, 150, 1)'
                }],
              }
            },
            barWidth: 20,
            data: seriesData
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
    height: 186px;
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
