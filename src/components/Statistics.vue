<template>
  <div class="top">
    <div v-for="item in list" :key="item.name">
      <span>{{item.name}}</span><br>
      <span class="top-num">{{item.value.toLocaleString('en-US')}}<span class="top-unit">{{item.unit}}</span></span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  list:Array
})
</script>

<style scoped lang="scss">
.top{
  height: 53px;
  margin: 6px 0;
  width: 100%;
  background-image: url("@/assets/images/waterBox.png");
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .top-num{
    margin-top: 5px;
    display: inline-block;
    .top-unit{
      font-size: 12px;
      margin-left: 5px
    }
  }
}
</style>
