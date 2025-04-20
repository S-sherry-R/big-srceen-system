<script setup lang="ts">
import type {CompanyInfo} from "@/api/type";
// eslint-disable-next-line no-undef
const props = defineProps<{ companyInfo: CompanyInfo }>()
</script>

<template>
  <div class="left-top">
    <div class="left-info info-left1">
      <span class="title">企业资产总额</span>
      <span class="num"><span>{{ companyInfo.moneyTotal.toLocaleString('en-US') }}</span>万元</span>
    </div>
    <div class="left-info info-left2">
      <span class="title">企业营业收入</span>
      <span class="num"><span>{{ companyInfo.income.toLocaleString('en-US') }}</span>万元</span>
    </div>
    <div class="left-info info-left3">
      <span class="title">企业成员数量</span>
      <span class="num"><span>{{ companyInfo.personTotal.toLocaleString('en-US') }}</span>人</span>
    </div>
    <div class="left-info info-left4">
      <span class="title">纳税总额</span>
      <span class="num"><span>{{ companyInfo.taxRevenue.toLocaleString('en-US') }}</span>万元</span>
    </div>
    <div class="left-info info-right1">
      <span class="title">企业营业成本</span>
      <span class="num"><span>{{ companyInfo.cost.toLocaleString('en-US') }}</span>万元</span>
    </div>
    <div class="left-info info-right2">
      <span class="title">营业利润</span>
      <span class="num"><span>{{ companyInfo.profit.toLocaleString('en-US') }}</span>万元</span>
    </div>
    <div class="left-info info-right3">
      <span class="title">企业负债总额</span>
      <span class="num"><span>{{ companyInfo.debt.toLocaleString('en-US') }}</span>万元</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.left-top {
  height: 580px;
  width: 100%;
  position: relative;

  .left-info {
    height: 124px;
    width: 165px;
    border-top: 4px solid #00bf94;
    background: linear-gradient(rgba(0, 191, 148, 0.5), rgba(0, 191, 148, 0));
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;

    .title {
      font-size: 20px;
      margin-top: 20px
    }

    .num {
      font-size: 14px;
      margin-top: 25px;

      span {
        font-size: 36px;
        font-weight: 700;
        color: #00bf94;
        margin-right: 8px;
      }
    }
  }

  .info-left1 {
    left: 70px;
    top: 140px
  }

  .info-left2 {
    left: 360px;
    top: 70px
  }

  .info-left3 {
    left: 290px;
    top: 280px
  }

  .info-left4 {
    left: 190px;
    top: 450px
  }

  .info-right1 {
    right: 150px;
    top: 70px
  }

  .info-right2 {
    right: 50px;
    top: 250px
  }

  .info-right3 {
    right: 90px;
    bottom: 40px
  }
}
</style>
