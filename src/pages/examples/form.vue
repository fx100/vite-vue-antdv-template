<script setup lang="ts">
import { message } from 'ant-design-vue/es'
import { useForm } from 'ant-design-vue/es/form'

const formModal = reactive({
  input: undefined,
  inputNumber: undefined,
  select: undefined,
  selectMultiple: undefined,
  radio: undefined,
  checkbox: undefined,
  date: undefined,
  dateRangeStart: undefined,
  dateRangeEnd: undefined,
  time: undefined,
  timeRangeStart: undefined,
  timeRangeEnd: undefined,
})

const formRules = reactive({
  input: [
    {
      required: true,
      message: '必填',
    },
  ],
  inputNumber: [
    {
      required: true,
      message: '必填',
    },
  ],
  select: [
    {
      required: true,
      message: '必选',
    },
  ],
  selectMultiple: [
    {
      required: true,
      message: '必选',
    },
  ],
  radio: [
    {
      required: true,
      message: '必选',
    },
  ],
  checkbox: [
    {
      required: true,
      message: '必选',
    },
  ],
  date: [
    {
      required: true,
      message: '必选',
    },
  ],
  dateRangeStart: [
    {
      required: true,
      message: '必选',
    },
  ],
  time: [
    {
      required: true,
      message: '必选',
    },
  ],
  timeRangeStart: [
    {
      required: true,
      message: '必选',
    },
  ],
})

const { resetFields, validate, validateInfos } = useForm(formModal, formRules)

async function submit() {
  try {
    await validate()
    console.log(toRaw(formModal))
    message.success('提交成功')
  } catch (err) {
    // 校验失败
  }
}
</script>

<template>
  <a-form
    style="padding: 24px"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 8 }"
  >
    <a-row :gutter="[8, 0]">
      <a-col :span="24">
        <a-form-item label="输入框" v-bind="validateInfos.input">
          <a-input v-model:value="formModal.input" addon-after=".com" />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="数字输入" v-bind="validateInfos.inputNumber">
          <a-input-number
            v-model:value="formModal.inputNumber"
            addon-before="¥"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="下拉选择" v-bind="validateInfos.select">
          <a-select v-model:value="formModal.select" :allow-clear="true">
            <a-select-option v-for="i in 3" :key="i" :value="i">
              值{{ i }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="下拉多选" v-bind="validateInfos.selectMultiple">
          <a-select v-model:value="formModal.selectMultiple" mode="multiple">
            <a-select-option v-for="i in 3" :key="i" :value="i">
              值{{ i }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="单选" v-bind="validateInfos.radio">
          <a-radio-group v-model:value="formModal.radio">
            <a-radio v-for="i in 3" :key="i" :value="i">值{{ i }}</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="单选按钮" v-bind="validateInfos.radio">
          <a-radio-group v-model:value="formModal.radio">
            <a-radio-button v-for="i in 3" :key="i" :value="i">
              值{{ i }}
            </a-radio-button>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="多选" v-bind="validateInfos.checkbox">
          <a-checkbox-group v-model:value="formModal.checkbox">
            <a-checkbox v-for="i in 3" :key="i" :value="i">
              值{{ i }}
            </a-checkbox>
          </a-checkbox-group>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="日期选择" v-bind="validateInfos.date">
          <dayjs
            v-slot="props"
            v-model:value="formModal.date"
            unit-type="startOf"
            unit="day"
          >
            <a-date-picker v-bind="props" />
          </dayjs>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="日期段选择" v-bind="validateInfos.dateRangeStart">
          <dayjs-range
            v-slot="props"
            v-model:start="formModal.dateRangeStart"
            v-model:end="formModal.dateRangeEnd"
            :start-options="{ unitType: 'startOf', unit: 'day' }"
            :end-options="{ unitType: 'endOf', unit: 'day' }"
          >
            <a-range-picker v-bind="props" />
          </dayjs-range>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="时间选择" v-bind="validateInfos.time">
          <dayjs v-slot="props" v-model:value="formModal.time">
            <a-time-picker v-bind="props" />
          </dayjs>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="时间段选择" v-bind="validateInfos.timeRangeStart">
          <dayjs-range
            v-slot="props"
            v-model:start="formModal.timeRangeStart"
            v-model:end="formModal.timeRangeEnd"
          >
            <a-time-range-picker v-bind="props" />
          </dayjs-range>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-space>
            <a-button type="primary" @click="submit">提交</a-button>
            <a-button @click="resetFields">重置</a-button>
          </a-space>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>
