import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // ✅ Only '/' unless deployed under subfolder like '/crm/'
  build: {
    outDir: '../crm-backend/static/frontend', // ✅ Your actual backend build folder
  },
  publicDir: false,
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 3001,
  },
});
