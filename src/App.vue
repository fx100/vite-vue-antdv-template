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
    <a-menu
      :selected-keys="[$route.path]"
      theme="dark"
      mode="horizontal"
      @select="select"
    >
      <a-menu-item key="/">首页</a-menu-item>
      <a-menu-item key="/modal-demo">弹窗 Demo</a-menu-item>
    </a-menu>
    <router-view />
  </a-config-provider>
</template>
