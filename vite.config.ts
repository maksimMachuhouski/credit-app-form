import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 5173 is reqMgmt's client; this app runs next to it.
  server: { port: 5174, strictPort: true },
})
