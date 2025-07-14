import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
  define: {
    'process.env': {},
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['buffer'],
  },
  build: {
    rollupOptions: {
      external: [],
    },
  },
  server: {
    allowedHosts: ['6fbd9481f413.ngrok-free.app'],
    proxy: {
      // Proxy TON Connect bridge to avoid CORS issues in development
      '/tonconnect-bridge': {
        target: 'https://walletbot.me/tonconnect-bridge',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tonconnect-bridge/, ''),
      },
    },
  },
  // server: {
  //   allowedHosts: ['6fbd9481f413.ngrok-free.app'],
  // },
});
