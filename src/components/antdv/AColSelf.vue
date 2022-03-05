<script setup lang="ts">
import { breakpointMatchListKey } from './injectionSymbols'

interface Props {
  flex?: string | number
  offset?: number
  order?: number
  pull?: number
  push?: number
  span?: number
  xs?: number | Props
  sm?: number | Props
  md?: number | Props
  lg?: number | Props
  xl?: number | Props
  xxl?: number | Props
  xxxl?: number | Props
}

const props = defineProps<Props>()

const breakpointMatchList = inject(breakpointMatchListKey)

const colProp = computed(() => {
  const breakpointName = breakpointMatchList?.value.find(
    (name) => props?.[name],
  )
  const span: Props = {}
  if (breakpointName) {
    if (_.isObject(props[breakpointName])) {
      _.merge(span, props[breakpointName])
    } else {
      _.merge(span, {
        span: props[breakpointName],
      })
    }
  }
  const obj: Props = {
    flex: props.flex,
    offset: props.offset,
    order: props.order,
    pull: props.pull,
    push: props.push,
    span: props.span,
    ...span,
  }
  return obj
})
</script>

<template>
  <a-col v-bind="colProp">
    <slot />
  </a-col>
</template>
