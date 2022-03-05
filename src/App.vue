<script setup lang="ts">
const router = useRouter()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function select({ key }: any) {
  router.push(key as string)
}
</script>

<template>
  <a-menu @select="select" mode="horizontal" :selected-keys="[$route.path]">
    <a-menu-item key="/">首页</a-menu-item>
  </a-menu>
  <router-view />
</template>
