<script setup lang="ts">
import type { breakpointName } from './types'
import { breakpointMatchListKey } from './injectionSymbols'

interface Props {
  align?: 'top' | 'middle' | 'bottom'
  gutter?: number | [number, number] | Partial<Record<breakpointName, number>>
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
  wrap?: boolean
}

const props = defineProps<Props>()

const breakpoints = (
  [
    [0, 'xs'],
    [576, 'sm'],
    [768, 'md'],
    [992, 'lg'],
    [1200, 'xl'],
    [1600, 'xxl'],
    [2000, 'xxxl'],
  ] as Array<[number, breakpointName]>
).sort(([a], [b]) => a - b)

const rowEl = ref()
const { width: selfWidth } = $(useElementSize(rowEl))

const breakpointMatchList = computed(() =>
  breakpoints
    .filter((breakpoint) => selfWidth >= breakpoint[0])
    .map((breakpoint) => breakpoint[1])
    .reverse(),
)

provide(breakpointMatchListKey, breakpointMatchList)
</script>

<template>
  <div ref="rowEl">
    <a-row v-bind="props">
      <slot />
    </a-row>
  </div>
</template>
