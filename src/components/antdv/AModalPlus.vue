<script setup lang="ts">
import { nanoid } from 'nanoid'

const props = defineProps<{
  visible?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
}>()

let visible = $(useVModel(props, 'visible', emit))

// 弹窗实例的唯一ID，用于获取dom
const id = nanoid()

// 是否已经获取数据
let isReady = $ref(false)

// modal dom 元素
let modalWrapEl = $ref<HTMLElement>()
let modalEl = $ref<HTMLElement>()
let modalHeaderEl = $ref<HTMLElement>()

// 用以保证关闭时收缩动画收缩到的位置的准确性
let originX = $ref(0)
let originY = $ref(0)

// ant-modal-wrap 元素尺寸
let { width: wrapWidth, height: wrapHeight } = $(
  useElementSize($$(modalWrapEl)),
)

// ant-modal 元素尺寸
let { width, height } = $(useElementSize($$(modalEl)))

// ant-modal 的位置
let { x, y } = $(useDraggable($$(modalHeaderEl)))

// 弹窗 css
const style = $computed(() =>
  isReady
    ? {
        left: `${x}px`,
        top: `${y}px`,
        transformOrigin: `${originX - x}px ${originY - y}px`,
      }
    : {},
)

// x超出边界修正
watchEffect(() => {
  if (x < 0) {
    x = 0
  } else if (width > 0 && wrapWidth > 0 && x + width > wrapWidth) {
    x = Math.max(wrapWidth - width, 0)
  }
})

// y超出边界修正
watchEffect(() => {
  if (y < 0) {
    y = 0
  } else if (height > 0 && wrapHeight > 0 && y + height > wrapHeight) {
    y = Math.max(wrapHeight - height, 0)
  }
})

// 获取dom，每次 visible === true 都要重新获取，因为 transform-origin 是每次打开弹出时根据鼠标位置变化的
watchEffect(async () => {
  if (visible) {
    isReady = false
    await nextTick()
    modalEl = document.getElementsByClassName(id)[0] as HTMLElement
    modalHeaderEl = modalEl.getElementsByClassName(
      'ant-modal-header',
    )[0] as HTMLElement
    x = modalEl.offsetLeft
    y = modalEl.offsetTop
    modalWrapEl = modalEl.parentNode as HTMLElement
    await nextTick()
    const [transformOriginX, transformOriginY] = modalEl.style.transformOrigin
      .split(' ')
      .map((str) => parseFloat(str))
    originX = x + transformOriginX
    originY = y + transformOriginY
    isReady = true
  }
})
</script>

<template>
  <a-modal
    v-bind="$attrs"
    v-model:visible="visible"
    wrap-class-name="S9UDf2YCOBi0KGmKOXawv"
    :class="{ [id]: true, isReady }"
    :style="style"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
    <template v-if="$slots.closeIcon" #closeIcon>
      <slot name="closeIcon" />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
    <template v-if="$slots.cancelText" #cancelText>
      <slot name="cancelText" />
    </template>
    <template v-if="$slots.okText" #okText>
      <slot name="okText" />
    </template>
  </a-modal>
</template>

<style lang="scss">
// 因为a-modal的 实际dom 是挂载到 body 下的 style scoped + v-deep 的方式无法使用
// 只能使用 全局css + 全局唯一className 的方式保证 css 不污染其他元素
// S9UDf2YCOBi0KGmKOXawv 是使用 nanoid 生产的一个唯一ID
.S9UDf2YCOBi0KGmKOXawv {
  overflow: hidden;
  .ant-modal {
    // body 区域最小高度为 48px 整体最小高度为 156px
    min-height: 156px;
    // 默认：max-width: calc(100vw - 32px);
    max-width: 100vw;
    &.isReady {
      position: absolute;
      // 清除默认 padding-bottom: 24px
      padding: 0;
      // 页面宽度小于768时会多一个margin: 8px auto
      margin: 0;
    }
    .ant-modal-header {
      user-select: none;
      cursor: move;
    }
    .ant-modal-content {
      max-height: 100vh;
      display: flex;
      flex-direction: column;
      .ant-modal-header,
      .ant-modal-footer {
        flex: none;
      }
      .ant-modal-body {
        // 超出最大高度后将出现滚动条
        flex: 0 1;
        overflow: auto;
      }
    }
  }
}
</style>
