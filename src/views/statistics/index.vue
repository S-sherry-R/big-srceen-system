<template>
  <div class="left">
    <div class="title">
      <img src="@/assets/images/titleSet.png">
      <span>小区选择</span>
    </div>
    <ul>
      <li :class="apartment === item.apartment ? 'liActive': ''" v-for="item in apartmentList" :key="item"
          @click="searchAll(item.apartment)"><span>{{ item.apartment }}</span></li>
    </ul>
  </div>
  <div class="right">
    <div class="right-top">
      <div class="overview">
        <Title title="能耗总览"></Title>
        <Overview :data="overviewData"></Overview>
      </div>
      <div class="energy-plan">
        <Title title="年度能源计划"></Title>
        <EnergyPlan :data="energyPlanData"></EnergyPlan>
      </div>
      <div class="energy-order">
        <Title title="本月能耗排行TOP7">
          <Choose @chooseBth="chooseOrder"></Choose>
        </Title>
        <BarOrder :data="energyOrderData" :chooseLabel="orderChoose"></BarOrder>
      </div>
    </div>
    <div class="right-center">
      <Title title="每月能耗总览">
        <Choose @chooseBth="chooseMonth"></Choose>
      </Title>
      <MonthBar :data="monthBarData" :chooseLabel="monthEnergyChoose" :info="monthEnergyInfo"></MonthBar>
    </div>
    <div class="right-bottom">
      <div class="bottom-left">
        <Title title="各能耗月对比">
          <Choose @chooseBth="chooseCompare"></Choose>
        </Title>
        <MonthCompare :data="monthCompare" :choose-label="monthCompareChoose"></MonthCompare>
      </div>
      <div class="bottom-right">
        <Title title="月度能耗分析">
          <Choose @chooseBth="chooseAnalysis"></Choose>
        </Title>
        <MonthAnalysis :data="monthAnalysisPie" :choose-label="monthAnalysisPieChoose"
                       :tableData="tableData"></MonthAnalysis>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import {OptionData, MonthEnergyInfo, ConsumptionArr} from "@/api/type";
import Overview from "@/views/situation/chart/Overview.vue";
import Title from "@/components/Title.vue";
import EnergyPlan from "@/views/statistics/chart/energyPlan.vue";
import BarOrder from "@/views/statistics/chart/barOrder.vue";
import Choose from "@/components/Choose.vue";
import MonthBar from "@/views/statistics/chart/monthBar.vue";
import MonthCompare from "@/views/statistics/chart/monthCompare.vue";
import MonthAnalysis from "@/views/statistics/chart/monthAnalysis.vue";
import {
  getApartment,
  getConsumptionOverview,
  getPlan,
  getOrder,
  getMonthEnergy,
  getMonthCompare,
  getAnalysis
} from "@/api";

onMounted(() => {
  searchApartment()
})
//小区列表
const apartment = ref<string>('')
const apartmentList = ref<[{ apartment: string }]>()
const searchApartment = async () => {
  const result = await getApartment()
  if (result.status === 0) {
    apartmentList.value = result.data
    searchAll(result.data[0].apartment)
  }
}
const searchAll = (name: string) => {
  apartment.value = name
  searchOverview()
  searchPlan()
  searchOrder()
  searchMonthEnergy()
  searchMonthCompare()
  searchAnalysis()
}
//能好总览
const overviewData = reactive<OptionData>([
  {name: '电耗', value: 0, unit: 'kWh'},
  {name: '水耗', value: 0, unit: 'm³'},
  {name: '气耗', value: 0, unit: 'nm³'},
])
const searchOverview = async () => {
  const result: {
    status: number,
    message?: string,
    data?: ConsumptionArr
  } = await getConsumptionOverview(apartment.value, '2024')
  if (result.status === 0) {
    overviewData[0].value = result.data[0].electricity
    overviewData[1].value = result.data[0].water
    overviewData[2].value = result.data[0].gas
  }
}
//年度能源计划
const energyPlanData = ref<OptionData>([
  {value: 0, name: '电耗', color: '#137e5a', center: ['17%', '45%'], actual: 0, expect: 0},
  {value: 0, name: '水耗', color: '#f69b52', center: ['50%', '35%'], actual: 0, expect: 0},
  {value: 0, name: '气耗', color: '#9bd801', center: ['83%', '45%'], actual: 0, expect: 0},
])
const searchPlan = async () => {
  const result: { status: number, message?: string, data?: ConsumptionArr } = await getPlan(apartment.value, '2024')
  if (result.status === 0) {
    const data = result.data[0]
    energyPlanData.value[0].value = parseFloat((data.electricity / data.estimateElectricity).toFixed(2)) * 100
    energyPlanData.value[0].actual = data.electricity
    energyPlanData.value[0].expect = data.estimateElectricity
    energyPlanData.value[1].value = parseFloat((data.water / data.estimateWater).toFixed(2)) * 100
    energyPlanData.value[1].actual = data.water
    energyPlanData.value[1].expect = data.estimateWater
    energyPlanData.value[2].value = parseFloat((data.gas / data.estimateGas).toFixed(2)) * 100
    energyPlanData.value[2].actual = data.gas
    energyPlanData.value[2].expect = data.estimateGas
  }
}
//本月能耗排行TOP7
const energyOrderData = ref<OptionData>([])
const orderChoose = ref<string>('electricity')
const chooseOrder = (str: string) => {
  orderChoose.value = str
  searchOrder()
}
const searchOrder = async () => {
  const result: {
    status: number,
    message?: string,
    data?: ConsumptionArr
  } = await getOrder(apartment.value, '2024', orderChoose.value)
  if (result.status === 0) {
    energyOrderData.value = []
    result.data.forEach(item => {
      energyOrderData.value.push({name: item.name, value: item[orderChoose.value]})
    })
  }
}
//每月能耗总览
const monthEnergyChoose = ref<string>('electricity')
const monthBarData = ref<OptionData>([])
const monthEnergyInfo = reactive<MonthEnergyInfo>({
  totalEnergy: 0,
  percentEnergy: 0,
  rateEnergy: 0
})
const chooseMonth = (str: string) => {
  monthEnergyChoose.value = str
  searchMonthEnergy()
}
const searchMonthEnergy = async () => {
  const result: {
    status: number,
    message?: string,
    data?: ConsumptionArr
  } = await getMonthEnergy(apartment.value, '2024')
  if (result.status === 0) {
    monthBarData.value = []
    let max = 0
    Object.assign(monthEnergyInfo, {totalEnergy: 0, percentEnergy: 0, rateEnergy: 0})
    result.data.forEach(item => {
      monthBarData.value.push({name: item.name + '月', value: item[monthEnergyChoose.value]})
      monthEnergyInfo.totalEnergy += Number(item[monthEnergyChoose.value])
      if (Number(item[monthEnergyChoose.value]) > max) {
        max = Number(item[monthEnergyChoose.value])
      }
    })
    monthEnergyInfo.percentEnergy = parseFloat((monthEnergyInfo.totalEnergy / 12).toFixed(2))
    monthEnergyInfo.rateEnergy = parseFloat((monthEnergyInfo.percentEnergy / max).toFixed(2))
  }
}
//各能耗月对比
const monthCompare = ref<OptionData>([])
const monthCompareChoose = ref<string>('electricity')
const chooseCompare = (str: string) => {
  monthCompareChoose.value = str
  searchMonthCompare()
}
const searchMonthCompare = async () => {
  const result: {
    status: number,
    message?: string,
    data?: any
  } = await getMonthCompare(apartment.value, '2023', '2024')
  if (result.status === 0) {
    monthCompare.value = []
    const result1 = result.data.result1
    const result2 = result.data.result2
    for (let i = 0; i < result1.length; i++) {
      monthCompare.value.push({
        name: result1[i].name,
        value: result1[i][monthCompareChoose.value],
        value1: result2[i][monthCompareChoose.value]
      })
    }
  }
}
//月能耗分析
const monthAnalysisPie = ref<OptionData>([])
const monthAnalysisPieChoose = ref<string>('electricity')
const tableData = ref([])
const chooseAnalysis = (str: string) => {
  monthAnalysisPieChoose.value = str
  searchAnalysis()
}
const searchAnalysis = async () => {
  const result: { status: number, message?: string, data?: any } = await getAnalysis(apartment.value)
  if (result.status === 0) {
    const result1 = result.data.result1[0]
    const result2 = result.data.result2
    tableData.value = []
    if (monthAnalysisPieChoose.value === 'electricity') {
      monthAnalysisPie.value = [
        {name: '监控用电', value: result1.jkyd},
        {name: '空调用电', value: result1.ktyd},
        {name: '公区照明', value: result1.gqzm},
        {name: '电梯供电', value: result1.dtgd},
        {name: '家庭照明', value: result1.jtzm},
        {name: '家电用电', value: result1.jdyd},
        {name: '供水用电', value: result1.gsyd},
      ]
      result2.forEach(item => {
        tableData.value.push([
          item.floor,
          item.electricity,
          item.electricityTB > 0 ? '↑' + Math.abs(item.electricityTB) + '%' : '↓' + Math.abs(item.electricityTB) + '%',
          item.electricityHB > 0 ? '↑' + Math.abs(item.electricityHB) + '%' : '↓' + Math.abs(item.electricityHB) + '%'])
      })
    }
    if (monthAnalysisPieChoose.value === 'water') {
      monthAnalysisPie.value = [
        {name: '饮用水供应', value: result1.yys},
        {name: '家庭水耗', value: result1.jtsh},
        {name: '公区水耗', value: result1.gqsh},
      ]
      result2.forEach(item => {
        tableData.value.push([
          item.floor,
          item.water,
          item.waterTB > 0 ? '↑' + Math.abs(item.waterTB) + '%' : '↓' + Math.abs(item.waterTB) + '%',
          item.waterHB > 0 ? '↑' + Math.abs(item.waterHB) + '%' : '↓' + Math.abs(item.waterHB) + '%'])
      })
    }
    if (monthAnalysisPieChoose.value === 'gas') {
      monthAnalysisPie.value = [
        {name: '家庭用气', value: result1.jtyq},
        {name: '冷热源用气', value: result1.lsryq},
      ]
      result2.forEach(item => {
        tableData.value.push([
          item.floor,
          item.gas,
          item.gasTB > 0 ? '↑' + Math.abs(item.gasTB) + '%' : '↓' + Math.abs(item.gasTB) + '%',
          item.gasHB > 0 ? '↑' + Math.abs(item.gasHB) + '%' : '↓' + Math.abs(item.gasHB) + '%'])
      })
    }
  }
}

</script>

<style scoped lang="scss">
.left {
  width: 288px;
  height: 900px;
  float: left;
  background-image: url("@/assets/images/leftBox.png");
  background-repeat: no-repeat;
  background-size: 288px 900px;
  background-position: -6px 0;
  padding: 11px 22px;

  .title {
    height: 91px;
    background: linear-gradient(to right, rgba(47, 184, 138, 0.3) 0%, rgba(47, 184, 138, 0.2) 40%, rgba(47, 184, 138, 0) 100%);
    display: flex;
    align-items: center;
    color: #2fb88a;

    img {
      height: 76px;
      margin-right: 16px;
      margin-left: 20px;
    }
  }

  ul {
    height: 697px;
    overflow: auto;

    li {
      margin-top: 8px;
      height: 34px;
      position: relative;
      line-height: 34px;
      cursor: pointer;
      background: linear-gradient(to right, rgba(47, 184, 138, 0.3) 0%, rgba(47, 184, 138, 0.2) 40%, rgba(47, 184, 138, 0) 100%);

      span {
        margin-left: 20px;
      }
    }

    li::after {
      content: '';
      height: 1px;
      background: linear-gradient(to right, rgb(47, 184, 138) 0%, rgba(47, 184, 138, 0.43) 41.47%, rgba(47, 184, 138, 0) 100%);
      width: 100%;
      position: absolute;
      bottom: 0;
      display: block;
    }

    li:hover, .liActive {
      font-weight: 600;
      background: linear-gradient(to right, rgb(47, 184, 138, 0.8) 0%, rgba(47, 184, 138, 0.26) 41.47%, rgba(47, 184, 138, 0) 100%);
    }
  }
}

.right {
  height: 900px;
  margin-left: 23px;
  float: left;

  .right-top {
    display: flex;

    .overview {
      height: 270px;
      width: 500px;
    }

    .energy-plan {
      height: 270px;
      width: 500px;
      margin-left: 30px;
    }

    .energy-order {
      height: 270px;
      width: 500px;
      margin-left: 30px
    }
  }

  .right-center {
    height: 280px;
    margin-top: 20px;
    width: 1560px
  }

  .right-bottom {
    height: 280px;
    width: 1560px;
    margin-top: 20px;
    display: flex;

    .bottom-left {
      width: 765px;
      height: 100%;
    }

    .bottom-right {
      width: 765px;
      height: 100%;
      margin-left: 30px
    }
  }
}
</style>
