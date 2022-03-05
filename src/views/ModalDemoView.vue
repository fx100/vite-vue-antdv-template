<script setup lang="ts">
let visible1 = $ref(false)
let visible2 = $ref(false)
let visible3 = $ref(false)
</script>

<template>
  <a-space>
    <a-button @click="visible1 = true">打开 a-modal</a-button>
    <a-button @click="visible2 = true">打开 a-modal-plus</a-button>
    <a-button @click="visible3 = true">打开 a-modal-plus 滚动条</a-button>
  </a-space>

  <a-modal v-model:visible="visible1" title="a-modal">
    <modal-demo-view />
  </a-modal>

  <a-modal-plus v-model:visible="visible2" title="a-modal-plus">
    <modal-demo-view />
  </a-modal-plus>

  <a-modal-plus v-model:visible="visible3" title="a-modal-plus 滚动条">
    <modal-demo-view />
    <div style="width: 200%">
      <a-typography v-for="i in 10" :key="i">
        <a-divider />
        <a-typography-title>介绍</a-typography-title>
        <a-typography-paragraph>
          蚂蚁的企业级产品是一个庞大且复杂的体系。这类产品不仅量级巨大且功能复杂，而且变动和并发频繁，常常需要设计与开发能够快速的做出响应。同时这类产品中有存在很多类似的页面以及组件，可以通过抽象得到一些稳定且高复用性的内容。
        </a-typography-paragraph>
        <a-typography-paragraph>
          随着商业化的趋势，越来越多的企业级产品对更好的用户体验有了进一步的要求。带着这样的一个终极目标，我们（蚂蚁金服体验技术部）经过大量的项目实践和总结，逐步打磨出一个服务于企业级产品的设计体系
          Ant Design。基于
          <a-typography-text mark>『确定』和『自然』</a-typography-text>
          的设计价值观，通过模块化的解决方案，降低冗余的生产成本，让设计者专注于
          <a-typography-text strong>更好的用户体验</a-typography-text>
          。
        </a-typography-paragraph>
      </a-typography>
    </div>
  </a-modal-plus>
</template>
