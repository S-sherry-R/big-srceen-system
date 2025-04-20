<template>
  <div class="title">
    <div>
      <img src="@/assets/images/windmill.png">
      <span>{{title}}</span>
    </div>
    <slot></slot>
  </div>
  <div class="title-line"></div>
</template>

<script setup lang="ts">
// eslint-disable-next-line no-undef
defineProps({
  title: String
})

</script>

<style scoped lang="scss">
.title{
  background-image: url("@/assets/images/box.png");
  background-repeat: repeat;
  padding-left: 10px;
  height: 40px;
  div{
    height: 40px;
    display: flex;
    align-items: center;
    line-height: 40px;
    float: left;
    span{
      margin-left: 15px;
      font-weight: 600;
      font-size: 16px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 1) 29.17%, rgba(19, 126, 90, 1) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
.title-line{
  margin-top: 4px;
  border: 1px solid;
  width: 100%;
  border-image: linear-gradient(to right, #104b37, transparent) 1;
}
</style>
