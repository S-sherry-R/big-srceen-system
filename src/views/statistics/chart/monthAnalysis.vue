<template>
  <div class="content">
    <echart ref="chartRef" height="210px" width="50%"/>
    <div class="energy-table">
      <dv-scroll-board :config="config" style="width:100%;height:100%" ref="table" v-if="show"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, watch,nextTick} from 'vue'
import type { OptionData,EnergyRateArr } from "@/api/type";

// eslint-disable-next-line no-undef
const props = defineProps<{data:OptionData,chooseLabel:string,tableData:[]}>()
const seriesName = ref<string>('电耗')
const unit = ref<string>('kwh')
const config = reactive({
  header: ['区域',`耗能`, '同比', '环比'],
  data: [],
  index: false,
  columnWidth: [100],
  headerBGC: '#137e5a', //表头
  oddRowBGC: 'rgba(19,126,90,0.5)', //奇数行
  evenRowBGC: 'rgba(19,126,90,0.2)', //偶数行
  align: ['center'],
})
const chartRef = ref()
const table = ref()
const show = ref<boolean>(true)
let option = {}
watch(
    () => props.data,
    (val: any) => {
      if(props.chooseLabel === 'energy'){
        seriesName.value = '电耗'
        unit.value = 'kwh'
      } else if(props.chooseLabel === 'water'){
        seriesName.value = '水耗'
        unit.value = 'm³'
      } else if(props.chooseLabel === 'gas') {
        seriesName.value = '气耗'
        unit.value = 'nm³'
      }
      show.value = false
      config.data = props.tableData
      config.header = ['区域',`${seriesName.value}(${unit.value})`, '同比', '环比']
      nextTick(()=>{
        show.value = true
      })
      option = {
        color: ['#137e5a','#f69b52','#9bd801','#58dddf','#0068dd','#d86d71','#d8bf5c'],
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(19, 126, 90, 0.4)',
          borderColor: '#137e5a',
          textStyle: {
            color: '#fff'
          },
          formatter: '{a} <br/>{b}: {c}'+unit.value+' ({d}%)'
        },
        series: [
          {
            name: seriesName.value,
            type: 'pie',
            roseType: 'area',
            radius: ['25%', '75%'],
            center: ['50%', '50%'],
            itemStyle: {
              borderRadius: 6
            },
            label: {
              fontSize: 10,
              color: '#fff'
            },
            data: props.data
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
  .energy-table{
    width: 50%;
  }
}
</style>
