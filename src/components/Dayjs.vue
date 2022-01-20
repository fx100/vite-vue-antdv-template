<script setup lang="ts">
import dayjs, { Dayjs, OpUnitType } from 'dayjs'

type ValueType = number | string

const props = defineProps<{
  value?: ValueType
  format?: string
  unitType?: 'startOf' | 'endOf'
  unit?: OpUnitType
}>()
const emit = defineEmits<{
  (e: 'update:value', value?: ValueType): void
}>()

let value = $(useVModel(props, 'value', emit))

const valueComputed = $computed(() => (value ? dayjs(value) : undefined))

function handleUpdate(newDayjsObj: Dayjs | string | null) {
  let obj = newDayjsObj
  if (obj === null || obj === undefined) {
    value = undefined
    return
  } else if (typeof obj === 'string') {
    obj = dayjs(obj)
  }
  if (props.unitType && props.unit) {
    obj = obj[props.unitType](props.unit)
  }
  if (props.format) {
    value = obj.format(props.format)
  } else {
    value = obj.valueOf()
  }
}
</script>

<template>
  <slot :value="valueComputed" :onUpdate:value="handleUpdate" />
</template>
