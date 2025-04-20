<template>
  <div class="content">
    <echart ref="chartRef" height="210px" width="100%" />
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
const props = defineProps({data: Array,chooseLabel: String})
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
      let color = '#137e5a'
      let seriesName = '电耗'
      let unit = 'kwh'
      if(props.chooseLabel === 'electricity'){
        color = '#137e5a'
        seriesName = '电耗'
        unit = 'kwh'
      } else if(props.chooseLabel === 'water'){
        color = '#f69b52'
        seriesName = '水耗'
        unit = 'm³'
      } else if(props.chooseLabel === 'gas') {
        color = '#9bd801'
        seriesName = '气耗'
        unit = 'nm³'
      }
      option = {
        color: [color],
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
          bottom: '3%',
          top: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          axisLine: {
            show: false
          },
          data: xData
        },
        series: [
          {
            name: seriesName,
            type: 'bar',
            label: {
              show: true,
              formatter: `{c}${unit}`,
              offset: [0,2],
              position: 'insideRight'
            },
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
}
</style>
