import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    crx({ manifest })
  ],
  build: {
    rollupOptions: {
      input: {
        popup: 'index.html',
        background: 'src/background.ts'
      }
    }
  },
  server: {
    port: 5173,
    hmr: {
      port: 5173
    }
  }
})
