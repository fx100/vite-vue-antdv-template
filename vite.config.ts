import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from '@nabla/vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    eslint({
      shouldLint: (path) => /\/.*\.([jt]sx?|vue)$/.test(path),
    }),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      directoryAsNamespace: true,
      resolvers: [AntDesignVueResolver({ resolveIcons: true })],
      dts: 'src/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
})
