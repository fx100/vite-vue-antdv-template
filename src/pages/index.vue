<script setup lang="ts">
let count = $ref(0)

function add() {
  count++
}

const { x, y } = $(useMouse())

watchEffect(() => {
  console.log(`鼠标位置: (${x}, ${y})`)
})
</script>

<template>
  <a-button @click="add">
    <template #icon><ant-design-outlined /></template>
    count is: {{ count }}
  </a-button>
  <p>鼠标位置: ({{ x }}, {{ y }})</p>
</template>
