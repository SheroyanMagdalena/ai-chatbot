import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/chat': {
        target: 'https://sampleee12.app.n8n.cloud/webhook/29a8fead-5a90-403d-b164-d9e2d33898d9',
        changeOrigin: true,
        rewrite: (path) => path.replace('/api/chat', '/chat'),
      }
    }
  }
})