import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://grummang.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        cookieDomainRewrite: 'localhost',
      }
    }
    // proxy: {
    //   '/api': {
    //     target: 'https://back.grummang.com',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
    //     secure: false,
    //     ws: true,
    //     cookieDomainRewrite: 'localhost',
    //   }
    // }
    // proxy: {
    //   'api/': {
    //     target: 'https://back.grummang.com/api/', // Spring 서버 주소
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
