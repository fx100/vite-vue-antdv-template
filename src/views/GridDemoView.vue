<script setup lang="ts">
let width1 = $ref(80)
let width2 = $ref(80)
</script>

<template>
  <a-typography-title>媒体查询响应式</a-typography-title>
  <a-slider v-model:value="width1" />
  <div class="wrap" :style="{ width: `${width1}%` }">
    <a-row :gutter="[16, 24]">
      <a-col
        v-for="i in 24"
        :key="i"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        :xl="4"
        :xxl="3"
        :xxxl="2"
      >
        <div class="item">{{ i }}</div>
      </a-col>
    </a-row>
  </div>
  <a-divider />
  <a-typography-title>相对父容器响应式</a-typography-title>
  <a-slider v-model:value="width2" />
  <div class="wrap" :style="{ width: `${width2}%` }">
    <a-row-self :gutter="[16, 24]">
      <a-col-self
        v-for="i in 24"
        :key="i"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        :xl="4"
        :xxl="3"
        :xxxl="2"
      >
        <div class="item">{{ i }}</div>
      </a-col-self>
    </a-row-self>
  </div>
</template>

<style scoped lang="scss">
.wrap {
  border: 4px dashed #001529;
}
.item {
  background-color: #00a0e9;
  height: 60px;
  color: #fff;
  font-size: 14px;
  line-height: 60px;
  text-align: center;
}
</style>
