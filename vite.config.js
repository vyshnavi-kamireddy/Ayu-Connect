import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  preview: {
    host: true,
    port: 10000,
    allowedHosts: ['ayu-connect-tqjk.onrender.com']  // ✅ Add this line
  }
})
