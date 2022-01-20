<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
</script>

<template>
  <a-config-provider :locale="zhCN">
    <h1>App</h1>
    <div class="page">
      <router-view />
    </div>
  </a-config-provider>
</template>

<style scoped>
.page {
  outline: #000 dashed 1px;
}
</style>
