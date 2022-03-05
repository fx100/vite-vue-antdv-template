import * as path from 'path'
import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname)

  return {
    plugins: [
      createHtmlPlugin({
        inject: {
          data: {
            ...env,
          },
        },
        minify: true,
      }),
      vue({
        reactivityTransform: true,
      }),
      eslint({
        fix: true,
      }),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          '@vueuse/core',
          {
            'ant-design-vue/es': ['message', 'notification'],
            'ant-design-vue/es/form': ['useForm'],
          },
        ],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
        dts: 'src/auto-imports.d.ts',
      }),
      Components({
        resolvers: [AntDesignVueResolver()],
        dts: 'src/components.d.ts',
      }),
    ],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
      },
    },
  }
})
