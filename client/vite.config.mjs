import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],

  // 👇 Alternative fix for JSX processing
  esbuild: {
    // Tells esbuild that files using the 'js' loader should be treated as JSX
    jsx: 'automatic', 
  },
  // Set dev server port and proxy to FastAPI backend (Port 8000)
  server: {
    port: 3000, 
    proxy: {
      '/api': 'http://localhost:8000', 
    },
  },
  // Alias for clean imports
  resolve: {
    alias: {
      '/src/': './src/',
    },
  },
});