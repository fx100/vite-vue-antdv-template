<script setup lang="ts">
let visible = $ref(false)
</script>

<template>
  <a-button @click="visible = true">打开弹窗</a-button>
  <my-modal v-model:visible="visible" title="弹窗 固定高度：60%" height="60%">
    <p v-for="i in 99" :key="i" style="white-space: nowrap">
      {{ `${i}`.repeat(50) }}
    </p>
  </my-modal>
</template>
