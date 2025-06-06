<template>
  <div class="left">
    <LeftInfo :companyInfo="companyInfo"></LeftInfo>
    <div class="left-bottom">
      <div class="overview">
        <Title title="能源总览"></Title>
        <Time @chooseTime="overviewTime" :val=overviewTimeVal></Time>
        <Overview :data="overviewData"></Overview>
      </div>
      <div class="waterTrend">
        <Title title="用水量统计趋势"></Title>
        <WaterTrend :water="waterData" :waterTrendData="waterTrendData" name="用水量">
          <Time @chooseTime="waterTrendTime" :val=waterTrendTimeVal></Time>
        </WaterTrend>
      </div>
      <div class="powerFrequency">
        <Title title="充电次数统计趋势"></Title>
        <WaterTrend :water="powerData" :waterTrendData="powerTrendData" name="充电次数">
          <Time @chooseTime="powerTime" :val=powerTimeVal></Time>
        </WaterTrend>
      </div>
    </div>
  </div>
  <div class="right">
    <div class="trend">
      <Title title="发电/用电量及碳减排量趋势图"></Title>
      <Time @chooseTime="trendTime" :val="trendTimeVal"></Time>
      <Trend :data="trendData"></Trend>
    </div>
    <div class="powerTotal">
      <Title title="充电总量统计趋势"></Title>
      <BarTrend :powerData="powerTotalData" :powerTotalTrendData="powerTotalTrendData">
        <Time @chooseTime="powerTotalTime" :val=powerTotalTimeVal></Time>
      </BarTrend>
    </div>
    <div class="gas">
      <Title title="燃气量统计趋势"></Title>
      <PictorialBar :gasData="gasData" :gasTrendData="gasTrendData">
        <Time @chooseTime="gasTime" :val=gasTimeVal></Time>
      </PictorialBar>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {CompanyInfo, ElectricTrendArr, OptionData, TotalArr,OverviewObject} from "@/api/type";
import LeftInfo from "@/views/energy/chart/leftInfo.vue";
import Overview from "@/views/situation/chart/Overview.vue";
import Title from "@/components/Title.vue";
import Time from "@/components/Time.vue";
import WaterTrend from "@/views/situation/chart/waterTrend.vue";
import Trend from "@/views/situation/chart/trend.vue";
import BarTrend from "@/views/situation/chart/barTrend.vue";
import PictorialBar from "@/views/situation/chart/PictorialBar.vue";
import {getOverview, getTrend, getWaterTrend, getCompanyData, getPower, getPowerTotal, getGas} from "@/api";
import {useStore} from "vuex";
const $store = useStore()

//查询所有
const searchAll = () => {
  searchCompanyData()
  searchOverview()
  searchTrend()
  searchWaterTrend()
  searchPower()
  searchPowerTotal()
  searchGas()
}
//公司数据
const companyInfo = reactive<CompanyInfo>({
  moneyTotal:0,
  income: 0,
  taxRevenue: 0,
  personTotal: 0,
  cost: 0,
  debt: 0,
  profit: 0
})
const searchCompanyData = async () =>{
  const result: { status: number, message?: string, data?: CompanyInfo } = await getCompanyData($store.state)
  if (result.status === 0) {
    Object.assign(companyInfo,result.data[0])
  }
}
//能源总览
const overviewData = reactive<OptionData>([
  {name: '累计发电量', value: 0, unit: '万kWh'},
  {name: '累计用电量', value: 0, unit: '万kWh'},
  {name: '累计碳减排量', value: 0, unit: 'Kg'},
])
const overviewTimeVal = ref<string>('year')
const overviewTime = (str: string) => {
  overviewTimeVal.value = str
  searchOverview()
}
const searchOverview = async () => {
  const result: { status: number, message?: string, data?: OverviewObject } = await getOverview({
    ...$store.state,
    timeLabel: overviewTimeVal.value
  })
  if (result.status === 0) {
    overviewData[0].value = result.data[0].createElectricity
    overviewData[1].value = result.data[0].useElectricity
    overviewData[2].value = result.data[0].carbon
  }
}
//用水量统计趋势
const waterTrendTimeVal = ref<string>('month')
const waterTrendTime = (str: string) => {
  waterTrendTimeVal.value = str
  searchWaterTrend()
}
const waterData = reactive<TotalArr>([
  {name: '当年累计用水量', unit: 't', value: 0},
  {name: '当月累计用水量', unit: 't', value: 0},
  // {name: '当日累计用水量', unit: 't', value: 43},
])
const waterTrendData = ref<OptionData>([])
const searchWaterTrend = async () => {
  const result: any = await getWaterTrend({...$store.state, timeLabel: waterTrendTimeVal.value})
  if (result.status === 0) {
    waterData[0].value = result.data.yearWater.yearWater
    waterData[1].value = result.data.monthWater.monthWater
    waterTrendData.value = result.data.list
  }
}
//发电/用电量及碳减排量趋势图
const trendData = ref<ElectricTrendArr>([])
const trendTimeVal = ref<string>('month')
const trendTime = (str: string) => {
  trendTimeVal.value = str
  searchTrend()
}
const searchTrend = async () => {
  const result: { status: number, message: string, data: ElectricTrendArr } = await getTrend({
    ...$store.state,
    timeLabel: trendTimeVal.value
  })
  if (result.status === 0) {
    trendData.value = result.data
  }
}
//充电次数统计趋势
const powerTimeVal = ref<string>('month')
const powerTime = (str: string) => {
  powerTimeVal.value = str
  searchPower()
}
const powerData = reactive<TotalArr>([
  {name: '当年累计充电次数', unit: '次', value: 0},
  {name: '当月累计充电次数', unit: '次', value: 0},
  // {name: '当日累计充电次数', unit: '次', value: 125},
])
const powerTrendData = ref<OptionData>([])
const searchPower = async () => {
  const result: any = await getPower({...$store.state, timeLabel: powerTimeVal.value})
  if (result.status === 0) {
    powerData[0].value = result.data.yearCharge.yearCharge
    powerData[1].value = result.data.monthCharge.monthCharge
    powerTrendData.value = result.data.list
  }
}
//充电总量统计趋势
const powerTotalTimeVal = ref<string>('month')
const powerTotalTime = (str: string) => {
  powerTotalTimeVal.value = str
  searchPowerTotal()
}
const powerTotalData = reactive<TotalArr>([
  {name: '当年累计充电总量', unit: 'kWh', value: 0},
  {name: '当月累计充电总量', unit: 'kWh', value: 0},
  // {name: '当日累计充电总量', unit: 'kWh', value: 125},
])
const powerTotalTrendData = ref<OptionData>([])
const searchPowerTotal = async () => {
  const result: any = await getPowerTotal({...$store.state, timeLabel: powerTotalTimeVal.value})
  if (result.status === 0) {
    powerTotalData[0].value = result.data.yearChargeCapacity.yearChargeCapacity
    powerTotalData[1].value = result.data.monthChargeCapacity.monthChargeCapacity
    powerTotalTrendData.value = result.data.list
  }
}
//燃气量统计趋势
const gasTimeVal = ref<string>('month')
const gasTime = (str: string) => {
  gasTimeVal.value = str
  searchGas()
}
const gasData = reactive<TotalArr>([
  {name: '当年累计燃气量', unit: 'Nm³', value: 0},
  {name: '当月累计燃气量', unit: 'Nm³', value: 0},
  // {name: '当日累计燃气量', unit: 'Nm³', value: 34},
])
const gasTrendData = ref<OptionData>([])
const searchGas = async () => {
  const result: any = await getGas({...$store.state, timeLabel: gasTimeVal.value})
  if (result.status === 0) {
    gasData[0].value = result.data.yearGas.yearGas
    gasData[1].value = result.data.monthGas.monthGas
    gasTrendData.value = result.data.list
  }
}
// eslint-disable-next-line no-undef
defineExpose({searchAll})
</script>

<style scoped lang="scss">
  .left{
    width: 1332px;
    height: 100%;
    float: left;
    .left-bottom{
      height: 260px;
      width: 100%;
      display: flex;
      .overview{
        height: 260px;
        width: 500px;
      }
      .waterTrend{
        height: 260px;
        width: 424px;
        margin-left: 30px
      }
      .powerFrequency{
        height: 260px;
        width: 424px;
        margin-left: 30px
      }
    }
  }
  .right{
    height: 100%;
    width: 500px;
    margin-left: 30px;
    float: left;
    .trend{
      height: 260px;
      width: 500px;
    }
    .powerTotal{
      height: 260px;
      width: 500px;
      margin-top: 30px
    }
    .gas{
      height: 260px;
      width: 500px;
      margin-top: 30px
    }
  }
</style>
