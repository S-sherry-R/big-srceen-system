<template>
  <div class="choose-main">
    <div class="choose">
      <div class="energy" :class="chooseVal === 'electricity' ? 'chooseActive' : ''" @click="choose('electricity')">电耗</div>
      <div class="water" :class="chooseVal === 'water' ? 'chooseActive' : ''" @click="choose('water')">水耗</div>
      <div class="gas" :class="chooseVal === 'gas' ? 'chooseActive' : ''" @click="choose('gas')">气耗</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const emit = defineEmits(['chooseBth'])
const chooseVal = ref<string>('electricity')
const choose = (str:string) => {
  chooseVal.value = str
  emit('chooseBth',str)
}
</script>

<style scoped lang="scss">
.choose-main{
  height: 24px;
  .choose{
    margin-top: 10px;
    margin-right: 10px;
    height: 24px;
    background-color: rgba(31, 58, 60, 1);
    display: flex;
    //width: 84px;
    float: right;
    div{
      height: 100%;
      width: 46px;
      cursor: pointer;
      text-align: center;
      line-height: 24px;
    }
    .energy,.water{
      border-right: 1px solid rgba(43, 74, 76, 1);
    }
    .chooseActive{
      background-color: rgba(19, 126, 90, 1);
    }
  }
}
</style>
