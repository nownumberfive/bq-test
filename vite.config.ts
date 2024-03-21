import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const DEV_SERVER_PORT = Number(process.env.DEV_SERVER_PORT) || 3000;
const globalEnv = loadEnv('', process.cwd(), '');

export default defineConfig({
  server: {
    port: DEV_SERVER_PORT,
  },
  define: {
    'import.meta.env.BACKEND_URL': JSON.stringify(globalEnv.BACKEND_URL),
    'import.meta.env.BASE_URL': JSON.stringify(globalEnv.BASE_URL),
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
