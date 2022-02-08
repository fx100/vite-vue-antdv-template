<script setup lang="ts">
import dayjs, { Dayjs, OpUnitType } from 'dayjs'

type ValueType = number | string

interface Options {
  format?: string
  unitType?: 'startOf' | 'endOf'
  unit?: OpUnitType
}

const props = defineProps<{
  start?: ValueType
  startOptions?: Options
  end?: ValueType
  endOptions?: Options
}>()

const emit = defineEmits<{
  (e: 'update:start', value?: ValueType): void
  (e: 'update:end', value?: ValueType): void
}>()

let start = $(useVModel(props, 'start', emit))
let end = $(useVModel(props, 'end', emit))

const valueComputed = $computed<[Dayjs, Dayjs] | undefined>(() =>
  start && end ? [dayjs(start), dayjs(end)] : undefined,
)

function handleUpdateMember(newDayjsObj: Dayjs | string, index: number) {
  if (index === 0) {
    // start
    let obj = newDayjsObj
    if (obj === null || obj === undefined) {
      start = undefined
      return
    } else if (typeof obj === 'string') {
      obj = dayjs(obj)
    }
    if (props?.startOptions?.unitType && props?.startOptions?.unit) {
      obj = obj[props.startOptions.unitType](props.startOptions.unit)
    }
    if (props?.startOptions?.format) {
      start = obj.format(props.startOptions.format)
    } else {
      start = obj.valueOf()
    }
    // start
  } else if (index === 1) {
    // end
    let obj = newDayjsObj
    if (obj === null || obj === undefined) {
      end = undefined
      return
    } else if (typeof obj === 'string') {
      obj = dayjs(obj)
    }
    if (props?.endOptions?.unitType && props?.endOptions?.unit) {
      obj = obj[props.endOptions.unitType](props.endOptions.unit)
    }
    if (props?.endOptions?.format) {
      end = obj.format(props.endOptions.format)
    } else {
      end = obj.valueOf()
    }
    // end
  }
}

function handleUpdate(arr: [Dayjs | string, Dayjs | string] | null) {
  if (arr) {
    arr?.forEach(handleUpdateMember)
  } else {
    start = undefined
    end = undefined
  }
}
</script>

<template>
  <slot :value="valueComputed" :onUpdate:value="handleUpdate" />
</template>
