import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    manifest: 'manifest.json',
    outDir: 'build',
    assetsDir: 'static',
    rollupOptions: {
      output: {
        entryFileNames: `static/[name].js`,
        chunkFileNames: `static/[name].js`,
        assetFileNames: `static/[name].[ext]`,
      },
    }
  },
  server: {
    host: '127.0.0.1'
  },
  optimizeDeps: {
    include: ['@emotion/styled']
  }
})
