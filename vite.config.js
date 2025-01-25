import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Default port for Vite dev server
    open: true, // Automatically open the app in the browser
  },
  preview: {
    port: 5173, // Port for the preview server
  },
  build: {
    outDir: 'dist', // Output directory for the build
    sourcemap: false, // Disable source maps in production
    minify: 'terser', // Use Terser for minification
    emptyOutDir: true, // Ensure the output directory is emptied before building
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          react: ['react', 'react-dom'],
          i18next: ['i18next', 'react-i18next'],
          leaflet: ['leaflet', 'react-leaflet'],
          axios: ['axios'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'i18next', 'react-i18next', 'leaflet', 'react-leaflet', 'axios'], // Pre-bundle these dependencies
  },
});