import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves the built app under the repo's name; the dev server stays at the root.
  base: command === 'build' ? '/credit-app-form/' : '/',
  // 5173 is reqMgmt's client; this app runs next to it.
  server: { port: 5174, strictPort: true },
}))
