<script setup lang="ts">
import { nanoid } from 'nanoid'
/**
 * template 中的 a-modal class="vB-gWURJj6yaDCJAqHcLo" 说明
 * 因为 a-modal 的dom和当前组件dom并不在同一颗树上 style scoped + deep 的方式无法使用
 * vB-gWURJj6yaDCJAqHcLo是使用nanoid生成的全局唯一class以保证全局css不受污染
 */

const attrs = useAttrs()
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
let modalEl = $ref<HTMLElement>()
let modalSizeEl = $ref<HTMLElement>()
let modalHeaderEl = $ref<HTMLElement>()

// 用以保证关闭时收缩动画收缩到的位置的准确性
let originX = $ref(0)
let originY = $ref(0)

let { x, y } = $(useDraggable($$(modalHeaderEl)))
let { width, height } = $(useElementSize($$(modalEl)))
let { width: windowWidth, height: windowHeight } = $(
  useElementSize($$(modalSizeEl)),
)

// 弹窗 css
const style = computed(() => {
  if (!isReady) {
    return {}
  }
  return {
    left: `${x}px`,
    top: `${y}px`,
    transformOrigin: `${originX - x}px ${originY - y}px`,
  }
})

// x超出边界修正
watchEffect(() => {
  if (windowWidth > 0) {
    if (x < 0) {
      x = 0
    } else if (windowWidth > 0 && windowWidth - width < x) {
      const newX = Math.max(windowWidth - width, 0)
      if (x !== newX) {
        x = newX
      }
    }
  }
})

// y超出边界修正
watchEffect(() => {
  if (y < 0) {
    y = 0
  } else if (windowHeight > 0 && windowHeight - height < y) {
    const newY = Math.max(windowHeight - height, 0)
    if (y !== newY) {
      y = newY
    }
  }
})

// 获取dom，每次 visible === true 都要重新获取，因为transform-origin时每次打开时根据鼠标位置变化的
watchEffect(async () => {
  if (visible === true) {
    isReady = false
    await nextTick()
    modalEl = document.getElementsByClassName(id)[0] as HTMLElement
    if (!modalSizeEl) {
      modalSizeEl = document.createElement('div')
      modalSizeEl.style.width = '100%'
      modalSizeEl.style.height = '100%'
      modalEl.parentNode?.appendChild(modalSizeEl)
    }
    modalHeaderEl = modalEl.getElementsByClassName(
      'ant-modal-header',
    )[0] as HTMLElement
    x = modalEl.offsetLeft
    y = modalEl.offsetTop
    await nextTick()
    const [transformOriginX, transformOriginY] = modalEl.style.transformOrigin
      .split(' ')
      .map(parseInt)
    originX = x + transformOriginX
    originY = y + transformOriginY
    isReady = true
  }
})
</script>

<template>
  <a-modal
    v-model:visible="visible"
    v-bind="attrs"
    wrap-class-name="vB-gWURJj6yaDCJAqHcLo"
    :class="{ draggable: isReady, [id]: true }"
    :style="style"
  >
    <slot />
  </a-modal>
</template>

<style lang="scss">
.vB-gWURJj6yaDCJAqHcLo {
  overflow-x: hidden;
  .ant-modal {
    // 默认：max-width: calc(100vw - 32px);
    max-width: 100%;
    &.draggable {
      position: absolute;
      // 清除默认样式
      padding: 0;
      // 页面宽度小于768时会多一个margin: 8px auto
      margin: 0;
      .ant-modal-header {
        user-select: none;
        cursor: move;
      }
    }
  }
}
</style>
