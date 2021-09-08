import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import pkg from './package.json'
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components';

process.env.VITE_APP_BUILD_EPOCH = new Date().getTime()
process.env.VITE_APP_VERSION = pkg.version

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    ViteComponents({
      customComponentResolvers: [AntDesignVueResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
