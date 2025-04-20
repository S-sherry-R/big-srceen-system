export interface ResponseData{
  status: number,
  message: string,
  data?: OptionData,
}
export interface OverviewObject{
  createElectricity: number,
  useElectricity: number,
  carbon: number
}
export interface ElectricTrend{
  time: string, //时间
  createElectricity: number, //发电量
  useElectricity: number, //用电量
  carbon: number //碳减排量
}
export type ElectricTrendArr = ElectricTrend[]
export interface Total{
  name: string,
  value: number,
  unit: string
}
export type TotalArr = Total[]
export interface Option{
  name: string,
  value: number,
  color?: string,
  center?: string[],
  actual?: number,
  expect?: number,
  value1?: number,
  unit?: string
}
export type OptionData = Option[]
export interface Company{
  id?: string,
  name: string
}
export type CompanyArr = Company[]
export interface CompanyInfo{
  moneyTotal: number, //企业资产总额
  income: number, //企业营业收入
  taxRevenue: number, //纳税总额
  personTotal: number, //企业成员数量
  cost: number, // 企业营业成本
  debt: number, // 企业负债总额
  profit: number, //营业利润
}
export interface MonthEnergyInfo{
  totalEnergy: number,
  percentEnergy: number,
  rateEnergy: number
}
export interface EnergyRate{
  area: string, //区域
  energy: number, // 能耗
  monthMnMonth: number, //同比
  ringRatio: number //环比
}
export type EnergyRateArr = EnergyRate[]
export interface Params{
// { month, year, timeLabel, company }
  month?: string,
  year: string,
  timeLabel: string,
  company?: string
}
export interface Consumption{
  electricity:number,
  water:number,
  gas:number,
  estimateElectricity?:number,
  estimateWater?:number,
  estimateGas?:number,
  name?:string
}
export type ConsumptionArr = Consumption[]
