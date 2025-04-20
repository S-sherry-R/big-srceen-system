//用户管理模块的接口
import request from "@/utils/request";
//引入数据类型
import type {ResponseData, Params} from "./type";

//公司列表
export const getCompany = () => request.get<any, any>('/bigScreen/getCompany')
//能源总览
export const getOverview = (param: Params) => request.post<any, any>('/bigScreen/getOverview', param)
//发电/用电量及碳减排量趋势图
export const getTrend = (param: Params) => request.post<any, any>('/bigScreen/getTrend', param)
//用水量统计趋势
export const getWaterTrend = (param: Params) => request.post<any, any>('/bigScreen/getWaterTrend', param)
//地图
export const getMap = () => request.get<any, any>('/bigScreen/getMap')
//充电次数统计趋势
export const getPower = (param: Params) => request.post<any, any>('/bigScreen/getPower', param)
//充电总量统计趋势
export const getPowerTotal = (param: Params) => request.post<any, any>('/bigScreen/getPowerTotal', param)
//燃气量统计趋势
export const getGas = (param: Params) => request.post<any, any>('/bigScreen/getGas', param)
//公司数据
export const getCompanyData = (param: Params) => request.post<any, any>('/bigScreen/getCompanyData', param)
//小区列表
export const getApartment = () => request.get<any, any>('/bigScreen/getApartment')
//能耗总览
export const getConsumptionOverview = (apartment: string, year: string) => request.post('/bigScreen/getConsumptionOverview', {
  apartment,
  year
})
//年度能源计划
export const getPlan = (apartment: string, year: string) => request.post<any, any>('/bigScreen/getPlan', {
  apartment,
  year
})
//本月能耗排行
export const getOrder = (apartment: string, year: string, orderChoose: string) => request.post<any, any>('/bigScreen/getOrder', {
  apartment,
  year,
  orderChoose
})
//每月能耗总览
export const getMonthEnergy = (apartment: string, year: string) => request.post<any, any>('/bigScreen/getMonthEnergy', {
  apartment,
  year
})
//各能耗月对比
export const getMonthCompare = (apartment: string, year1: string, year2: string) => request.post<any, any>('/bigScreen/getMonthCompare', {
  apartment,
  year1,
  year2
})
//能耗分析
export const getAnalysis = (apartment: string) => request.post<any, any>('/bigScreen/getAnalysis', {apartment,})
