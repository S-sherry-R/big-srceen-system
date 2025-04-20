<template>
  <div class="time-main">
    <div class="time">
      <div class="year" :class="timeVal === 'year' ? 'timeActive' : ''" @click="timeClick('year')">年</div>
      <div class="month" :class="timeVal === 'month' ? 'timeActive' : ''" @click="timeClick('month')">月</div>
<!--      <div class="day" :class="timeVal === 'day' ? 'timeActive' : ''" @click="timeClick('day')">日</div>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
// eslint-disable-next-line no-undef
const emit = defineEmits(['chooseTime'])
// eslint-disable-next-line no-undef
const props = defineProps<{val: string}>()
const timeVal = ref<string>(props.val)
const timeClick = (str:string) => {
  timeVal.value = str
  emit('chooseTime',str)
}
// onMounted(() => {
//   if(!props.year){
//     timeVal.value = 'month'
//   }
// })
</script>

<style scoped lang="scss">
.time-main{
  height: 24px;
  margin: 6px 0;
  .time{
    height: 24px;
    background-color: rgba(31, 58, 60, 1);
    display: flex;
    //width: 84px;
    float: right;
    div{
      height: 100%;
      width: 28px;
      cursor: pointer;
      text-align: center;
      line-height: 24px;
    }
    .year,.month{
      border-right: 1px solid rgba(43, 74, 76, 1);
    }
    .timeActive{
      background-color: rgba(19, 126, 90, 1);
    }
  }
}
</style>
