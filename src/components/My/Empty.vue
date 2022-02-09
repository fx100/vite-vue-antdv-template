<script setup lang="ts">
import { Empty } from 'ant-design-vue/es'
import type { CSSProperties } from 'vue'
import type { VueNode } from 'ant-design-vue/es/_util/type'

const props = defineProps<{
  prefixCls?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  class?: any
  style?: string | CSSProperties
  imageStyle?: CSSProperties
  image?: VueNode | null
  description?: VueNode
}>()
</script>

<template>
  <a-empty v-bind="props" :image="Empty.PRESENTED_IMAGE_SIMPLE" />
</template>
