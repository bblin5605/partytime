import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/partytime/',  // 替換成你的倉庫名稱
  plugins: [react()]
})
