<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'

const router = useRouter()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function select({ key }: any) {
  router.push(key as string)
}
</script>

<template>
  <a-config-provider :locale="zhCN">
    <div class="nav">
      <a-menu
        :selected-keys="[$route.path]"
        theme="dark"
        mode="horizontal"
        @select="select"
      >
        <a-menu-item key="/">首页</a-menu-item>
        <a-menu-item key="/modal-demo">弹窗 Demo</a-menu-item>
        <a-menu-item key="/grid-demo">栅格 Demo</a-menu-item>
      </a-menu>
    </div>
    <div class="view">
      <router-view />
    </div>
  </a-config-provider>
</template>

<style scoped lang="scss">
.nav {
  z-index: 10000;
  position: sticky;
  top: 0;
}
.view {
  padding: 24px;
}
</style>
