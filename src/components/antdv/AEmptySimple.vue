<script setup lang="ts">
import { Empty } from 'ant-design-vue/es'
import type { CSSProperties } from 'vue'
import type { VueNode } from 'ant-design-vue/es/_util/type'

interface Props {
  prefixCls?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  class?: any
  style?: string | CSSProperties
  imageStyle?: CSSProperties
  image?: VueNode | null
  description?: VueNode
}

const props = defineProps<Props>()
</script>

<template>
  <a-empty v-bind="props" :image="Empty.PRESENTED_IMAGE_SIMPLE" />
</template>
