import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  server: {
    https: true,
    port: 5173,
    strictPort: true,
    host: true // Add this
  },
  plugins: [
    react(),
    mkcert()
  ],
})