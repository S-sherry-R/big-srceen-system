<template>
  <div id="index" ref="appRef">
    <div class="bg" :class="liActive">
      <div class="title-bar">
        <div class="title-text">{{title}}</div>
        <div class="title-com">
          <div>
            <div class="title-year" v-if="statisticsShow">
              <span class="year" @click.stop="yearActive = !yearActive">{{year}}年<i class="iconfont icon-triangle" :class="yearActive ? 'rotateTriangle' : ''"></i></span>
              <span class="month" @click.stop="monthActive = !monthActive">{{month}}月<i class="iconfont icon-triangle" :class="monthActive ? 'rotateTriangle' : ''"></i></span>
              <transition name="slide">
                <ul class="year-list" v-show="yearActive">
                  <li v-for="item in YEAR" :key="item" @click="chooseYear(item)">{{item}}年</li>
                </ul>
              </transition>
              <transition name="slide">
                <ul class="month-list" v-if="monthActive">
                  <li v-for="item in MONTH" :key="item" @click="chooseMonth(item)">{{item}}月</li>
                </ul>
              </transition>
            </div>
            <div class="title-year" v-if="companyShow">
              <span class="company" @click.stop="companyActive = !companyActive"><span>{{company}}</span><i class="iconfont icon-triangle" :class="companyActive ? 'rotateTriangle' : ''"></i></span>
              <transition name="slide">
                <ul class="company-list" v-show="companyActive">
                  <li v-for="item in companyList" :key="item.id" @click="chooseCompany(item.name)">{{item.name}}</li>
                </ul>
              </transition>
            </div>
          </div>
          <div class="title-time">
            <span>&nbsp;
              {{ timeInfo.dateWeek }}&nbsp;&nbsp;
              {{ timeInfo.dateYear }}&nbsp;&nbsp;
              {{ timeInfo.dateDay }}
            </span>
            <dv-decoration3 style="width:240px;height:30px;" :color="['#00bf94']"/>
          </div>
        </div>
      </div>
      <div class="contain">
        <router-view v-slot="{Component}">
          <component :is="Component" ref="child"></component>
        </router-view>
      </div>
      <div class="footer">
        <ul>
          <li @click="goPage('situation')">
            <div class="out" :class="liActive === 'situation' ? 'outActive' : ''">
              <div class="in" :class="liActive === 'situation' ? 'inActive' : ''">
                <i class="iconfont icon-zonghetaishi"></i>
              </div>
            </div>综合态势</li>
          <li @click="goPage('energy')">
            <div class="out" :class="liActive === 'energy' ? 'outActive' : ''">
              <div class="in" :class="liActive === 'energy' ? 'inActive' : ''">
                <i class="iconfont icon-haonengbeifen"></i>
              </div>
            </div>企业耗能</li>
          <li @click="goPage('statistics')">
            <div class="out" :class="liActive === 'statistics' ? 'outActive' : ''">
              <div class="in" :class="liActive === 'statistics' ? 'inActive' : ''">
                <i class="iconfont icon-tongji"></i>
              </div>
            </div>统计分析</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, onUnmounted, reactive, ref, watch, nextTick} from 'vue'
import useDraw from '@/utils/useDraw'
import { title, YEAR, MONTH, WEEK } from '@/constant/index'
import {formatTime} from "@/utils";
import type {CompanyArr, ResponseData} from "@/api/type";
import { getCompany } from "@/api";
import { useRouter,useRoute } from "vue-router";
import { useStore } from "vuex";
const $store = useStore()
const $router = useRouter()
const $route = useRoute()
const child = ref()
// * 适配处理
const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw()
//年
const yearActive = ref<boolean>(false)
const year = ref<string>('2025')
const chooseYear = (val:string) =>{
  year.value = val
  $store.commit('setYear',val)
  child.value.searchAll()
}
//月
const monthActive = ref<boolean>(false)
const month = ref<string>('01')
const chooseMonth = (val:string) =>{
  month.value = val
  $store.commit('setMonth',val)
  child.value.searchAll()
}
//公司
const companyActive = ref<boolean>(false)
const company = ref<string>('')
const companyList = ref<CompanyArr>([])
const companyShow = ref<boolean>(false)
const chooseCompany = (val:string) =>{
  company.value = val
  $store.commit('setCompany',val)
  child.value.searchAll()
}
const getCompanyList = async () =>{
  const result:{status:number,message?:string,data?:CompanyArr} = await getCompany()
  if(result.status === 0){
    companyList.value = result.data
    chooseCompany(result.data[0].name)
  }
}
//统计分析页面按钮都不显示
const statisticsShow = ref<boolean>(true)
//时间信息
const timeInfo = reactive({
  setInterval: 0,
  dateDay: '',
  dateYear: '',
  dateWeek: ''
})
const handleTime = () => {
  timeInfo.setInterval = setInterval(() => {
    const date = new Date()
    timeInfo.dateDay = formatTime(date, 'HH: mm: ss')
    timeInfo.dateYear = formatTime(date, 'yyyy-MM-dd')
    timeInfo.dateWeek = WEEK[date.getDay()]
  }, 1000)
}
//菜单响应
const liActive = ref<string>('situation')
const goPage = (str:string) => {
  liActive.value = str
  $router.push('/'+str)
  nextTick(() => {
    if(str === 'energy'){
      getCompanyList()
    }
  })
}
//监听
watch(() =>$route.path,()=>{
  companyShow.value = $route.meta.companyShow as boolean
  statisticsShow.value = $route.meta.statisticsShow as boolean
})
// 生命周期
onMounted(() => {
  handleTime()
  // todo 屏幕适应
  windowDraw()
  calcRate()
  document.addEventListener('click',()=> {
    yearActive.value = false
    monthActive.value = false
    companyActive.value = false
  })
  liActive.value = ($route.name as string).toLowerCase()
  companyShow.value = $route.meta.companyShow as boolean
  statisticsShow.value = $route.meta.statisticsShow as boolean
  if($route.path === '/energy'){
    nextTick(()=>{
      getCompanyList()
    })
  }
})
onUnmounted(() => {
  unWindowDraw()
  clearInterval(timeInfo.setInterval)
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/index';
</style>
