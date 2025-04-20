<template>
  <div class="content">
    <echart ref="chartRef" height="860px" width="100%"></echart>
    <div class="map-num">
      <div class="num-img">
        <img src="@/assets/images/map2.png">
        <div>
          <span>充电站个数</span>
          <span><span class="num">{{count.station}}</span>个</span>
        </div>
      </div>
      <div class="num-img">
        <img src="@/assets/images/map1.png">
        <div>
          <span>充电装机总功率</span>
          <span><span class="num">{{count.power}}</span>kW</span>
        </div>
      </div>
      <div class="num-img">
        <img src="@/assets/images/map5.png">
        <div>
          <span>正常充电枪数量</span>
          <span><span class="num">{{count.normal}}</span>个</span>
        </div>
      </div>
      <div class="num-img">
        <img src="@/assets/images/map4.png">
        <div>
          <span>故障充电枪数量</span>
          <span><span class="num">{{ count.fault }}</span>个</span>
        </div>
      </div>
      <div class="num-img">
        <img src="@/assets/images/map3.png">
        <div>
          <span>充电枪总数</span>
          <span><span class="num">4789</span>个</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, watch} from 'vue'
// eslint-disable-next-line no-undef
const props = defineProps<{data: [[{power: number,total:number,normal:number,fault:number,value:string}],[]]}>()
const chartRef = ref()
// 配置项
// let options = shallowReactive({tooltip:null,geo:null,series:null})
let options = {}
const power = require('@/assets/images/map1.png')
const total = require('@/assets/images/map3.png')
const normal = require('@/assets/images/map5.png')
const fault = require('@/assets/images/map4.png')
const num = require('@/assets/images/map2.png')
const count = reactive({
  power: 0,station:0,total:0,normal:0,fault:0
})
// 监听
watch(
    () => props.data,
    (val: any) => {
      Object.assign(count,{
        power: 0,station:0,total:0,normal:0,fault:0
      })
      if(val[0]){
        count.station = props.data[0].length
        props.data[0].forEach(item=>{
          count.power += item.power
          count.total += item.total
          count.fault += item.fault
          count.normal += item.normal
        })
      }
      options = {
        legend: {
          show: true,
          right: '3%',
          bottom: '3%',
          orient: 'vertical',
          itemWidth: 30,
          itemHeight: 30
        },
        tooltip: {
          trigger: 'item',
        },
        geo: [
          // 底部背景图层
          {
            show: true,
            aspectScale: 0.85, //长宽比
            zoom: 1.04,
            z: 0,
            top: '20%',
            left: '10%',
            map: '成都',
            roam: false,
            emphasis: {
              itemStyle: {
                areaColor: 'rgba(5,21,35,0.6)',
                borderColor: '#67ece0',
                borderWidth: 2,
              }
            },
            tooltip: {
              show: false,
            },
            itemStyle: {
              borderColor: '#67ece0',
              shadowOffsetY: 15,
              shadowOffsetX: 10,
              shadowColor: 'rgba(0,0,0,0.8)',
              shadowBlur: 15,
              borderWidth: 2,
              areaColor: 'rgba(5,21,35,0.6)'
            }
          },
          //地图内图层
          {
            type: 'map',
            aspectScale: 0.85, //长宽比
            zoom: 1, //缩放
            map: '成都', // 自定义扩展图表类型
            top: '18%',
            z: 3,
            left: '10%',
            tooltip: {
              show: false,
            },
            label: {
              color: '#fff'
            },
            emphasis: {
              label: {
                color: '#fff',
              },
              itemStyle: {
                areaColor: '#137e5a',
              }
            },
            itemStyle: {
              areaColor: 'transparent',
              borderColor: '#67ece0',
              borderWidth: 1,
            },
          },
          //渐变图层
          {
            type: 'map',
            aspectScale: 0.85, //长宽比
            zoom: 1, //缩放
            map: 'cd', // 自定义扩展图表类型
            top: '18%',
            z: 2,
            left: '10%',
            tooltip: {
              show: false,
            },
            itemStyle: {
              normal: {
                // 背景渐变色
                areaColor: {
                  type: 'radial',
                  x: 0.4,
                  y: 0.4,
                  r: 1,
                  colorStops: [{
                    offset: 0,
                    color: '#5debf3' // 0% 处的颜色
                  }, {
                    offset: 0.3,
                    color: '#2f7881' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#07222b' // 100% 处的颜色
                  }],
                },
                borderColor: '#67ece0',
                borderWidth: 4,
              },
            },
          },
        ],
        series: [
          {
            geoIndex: 1,
            name: '充电站分布',
            type: 'scatter',
            z: 4,
            coordinateSystem: 'geo',
            symbol: 'image://cdz.svg',
            symbolSize: 50,
            emphasis: {
              itemStyle:{
                shadowColor: '#F69B52',
                shadowBlur: 10
              }
            },
            itemStyle:{
              shadowBlur: 0,
              opacity: 1,
            },
            tooltip: {
              show: true,
              trigger: 'item',
              backgroundColor: 'rgba(22,44,42,0.9)',
              borderColor: '#137e5a',
              textStyle: {
                color: '#fff'
              },
              renderMode: 'html',
              formatter: params => {
                return `<div>
                        <div><img style="float: left" src="${total}"><div style="float: left;height: 44px;margin-left: 10px">充电枪总数<br>${params.data.total}个</div></div>
                        <div><img style="float: left" src="${normal}"><div style="float: left;height: 44px;margin-left: 10px">正常充电枪数量<br>${params.data.normal}个</div></div>
                        <div><img style="float: left" src="${fault}"><div style="float: left;height: 44px;margin-left: 10px">故障充电枪数量<br>${params.data.fault}个</div></div>
                        <div><img style="float: left" src="${power}"><div style="float: left;height: 44px;margin-left: 10px">充电装机总功率<br>${params.data.power}kw</div></div>
                        </div>`
              },
              extraCssText: 'z-index: 999'
            },
            data: props.data[0],
          },
          {
            geoIndex: 1,
            name: '企业分布',
            type: 'scatter',
            z: 4,
            coordinateSystem: 'geo',
            symbol: 'image://qy.svg',
            symbolSize: 50,
            emphasis: {
              itemStyle:{
                shadowColor: '#3CFAE4',
                shadowBlur: 10
              }
            },
            itemStyle:{
              shadowBlur: 0,
              opacity: 1,
            },
            tooltip: {
              show: true,
              trigger: 'item',
              backgroundColor: 'rgba(22,44,42,0.9)',
              borderColor: '#137e5a',
              textStyle: {
                color: '#fff'
              },
              renderMode: 'html',
              formatter: params => {
                return `<div>
                            <span style="font-weight: 600">${params.data.name}</span>
                            <div style="width: 200px;
                            word-break: break-word;
                            word-wrap: break-word;
                            overflow-wrap: anywhere;
                            hyphens: auto;
                            white-space: normal;
                            border-top: 1px solid #41b2a4;
                            padding-top:15px">${params.data.info}</div>
                        </div>`
              },
              extraCssText: 'z-index: 999'
            },
            data: props.data[1],
          },
        ],
      }
      // 手动触发更新
      if (chartRef.value) {
        // 通过初始化参数打入数据
        chartRef.value.initChart(options)
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
  height: 860px;
  position: relative;
  .map-num{
    position: absolute;
    top: 20px;
    right: 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row-reverse;
    width: 500px;
    .num-img{
      width: 250px;
      margin-top:10px;
      img{
        float: left;
      }
      div{
        float: left;
        margin-left:10px;
        display: flex;
        flex-direction: column;
        .num{
          font-size: 18px;
          margin-right: 6px;
        }
      }
    }
  }
}

</style>
