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
  <button type="button" @click="add">count is: {{ count }}</button>
  <p>鼠标位置: ({{ x }}, {{ y }})</p>
</template>
