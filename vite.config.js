import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist', // Specify the output directory
    sourcemap: false, // Disable source maps in production
    minify: 'terser', // Use Terser for minification
    eslint: {
      ignoreDuringBuilds: true,
    },
  },
})
