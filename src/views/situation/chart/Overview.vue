<script setup lang="ts">
import type { OverviewObject } from "@/api/type";

// eslint-disable-next-line no-undef
const props = defineProps<{data: OverviewObject}>()
</script>

<template>
  <div class="content">
    <div class="overview-box">
      <div class="overview-icon"><img src="@/assets/images/overviewIcon1.png"></div>
      <span>{{data[0].name}}</span>
      <span class="overview-number">{{data[0].value}}<span>{{data[0].unit}}</span></span>
    </div>
    <div class="overview-box">
      <div class="overview-icon"><img src="@/assets/images/overviewIcon2.png"></div>
      <span>{{data[1].name}}</span>
      <span class="overview-number">{{data[1].value}}<span>{{data[1].unit}}</span></span>
    </div>
    <div class="overview-box">
      <div class="overview-icon"><img src="@/assets/images/overviewIcon3.png"></div>
      <span>{{data[2].name}}</span>
      <span class="overview-number">{{data[2].value}}<span>{{data[2].unit}}</span></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content{
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
  justify-content: space-between;
  .overview-box{
    height: 100%;
    width: 146px;
    background-color: rgba(19, 126, 90, 0.1);
    display: flex;
    align-items: center;
    flex-direction: column;
    .overview-icon{
      height: 49px;
      width: 45px;
      background-image: url("@/assets/images/overviewBox.png");
      background-repeat: no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 25px 0 20px
    }
    .overview-number{
      font-size: 24px;
      color: rgba(47, 184, 138, 1);
      margin-top: 10px;
      margin-left: 10px;
      span{
        color: #fff;
        font-size: 16px;
        margin-left: 5px;
      }
    }
  }
}
</style>
