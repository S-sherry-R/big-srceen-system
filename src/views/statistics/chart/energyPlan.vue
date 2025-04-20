<template>
  <div class="content">
    <echart ref="chartRef" height="180px" width="100%" />
    <div class="pieInfo">
      <div>
        <span>预计&nbsp;{{data[0] ? data[0].expect : 0}}kwh</span><br>
        <span>实际&nbsp;{{data[0] ? data[0].actual : 0}}kwh</span><br>
      </div>
      <div>
        <span>预计&nbsp;{{data[1] ? data[0].expect : 0}}m³</span><br>
        <span>实际&nbsp;{{data[1] ? data[0].actual : 0}}m³</span><br>
      </div>
      <div>
        <span>预计&nbsp;{{data[2] ? data[0].expect : 0}}nm³</span><br>
        <span>实际&nbsp;{{data[2] ? data[0].actual : 0}}nm³</span><br>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch, withDefaults} from 'vue'
import {OptionData} from "@/api/type";
// eslint-disable-next-line no-undef
const props = withDefaults(defineProps<{data: OptionData}>(),{
  data: () => [
    {name:'',value: 0,expect: 0, actual: 0},
    {name:'',value: 0,expect: 0, actual: 0},
    {name:'',value: 0,expect: 0, actual: 0},
  ]
})
const chartRef = ref()
let option = {}
watch(
    () => props.data,
    (val: any) => {
      const seriesData = []
      props.data.forEach(item => {
        seriesData.push({
          z: 0,
          type: 'pie',
          radius: ['0', '40%'],
          center: item.center,
          itemStyle: {
            color: item.color,
          },
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          data: [100]
        })
        seriesData.push({
          z: 1,
          name: item.name,
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          min: 0,
          max: 100,
          center: item.center,
          radius: '60%',
          axisLine: {
            show: false,
          },
          progress: {
            show: true,
            itemStyle: {
              color: item.color
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          pointer: {
            show: false,
          },
          title: {
            show: true,
            color: '#fff',
            fontSize: 14,
            offsetCenter: [0,'30%']
          },
          detail: {
            color: '#fff',
            fontSize: 22,
            formatter: '{value}%',
            offsetCenter: [0,'-10%']
          },
          data: [item]
        })
      })
      option = {
        series: seriesData
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
  position: relative;
  background-color: rgba(19, 126, 90, 0.1);
  .pieInfo{
    position: absolute;
    bottom: 20px;
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
}
</style>
