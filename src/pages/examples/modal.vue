<script setup lang="ts">
import { message } from 'ant-design-vue/es'
import useModal from '~/composables/useModal'

const [modalProps, modalShow] = $(
  useModal({
    title: '弹窗标题',
  }),
)

async function open() {
  try {
    const res = await modalShow({ title: '弹窗标题' }, async () => {
      try {
        // 模拟请求服务器
        return await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() < 0.5) {
              resolve({ code: 0 })
            } else {
              reject({ code: 500, message: '服务器内部错误' })
            }
          }, 2000)
        })
      } catch (err) {
        message.error(JSON.stringify(err))
        throw err
      }
    })
    message.success(JSON.stringify(res))
  } catch (err) {
    message.warning('Cancel')
  }
}
</script>

<template>
  <a-button @click="open">打开弹窗</a-button>
  <!-- 可拖拽弹窗 -->
  <my-modal v-bind="modalProps">
    <!-- 引用自己 -->
    <modal />
  </my-modal>
</template>
