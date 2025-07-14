import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [basicSsl(), tailwindcss(), react()],
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
    host: true,
    // allowedHosts: ['https://825f0b1f8524.ngrok-free.app'],
    https: true,
    // serve over HTTPS using temporary self-signed cert
    proxy: {
      // Proxy TON Connect default bridge to avoid CORS issues in development
      '/tonconnect-bridge': {
        target: 'https://walletbot.me/tonconnect-bridge',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/tonconnect-bridge/, ''),
      },
      // Proxy Bybit bridge events endpoint to avoid CORS issues
      '/bybit-bridge': {
        target: 'https://api-node.bybit.com/spot/api/web3/bridge/ton',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/bybit-bridge/, ''),
      },
      // Proxy Dewallet bridge events endpoint to avoid CORS issues
      '/dewallet-bridge': {
        target: 'https://bridge.dewallet.pro/bridge',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/dewallet-bridge/, ''),
      },
      // Proxy TobiWallet bridge events endpoint to avoid CORS issues
      '/tobiwallet-bridge': {
        target: 'https://ton-bridge.tobiwallet.app/bridge',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/tobiwallet-bridge/, ''),
      },
      // Proxy TON wallet bridges to avoid CORS issues
      '/tonkeeper-bridge': {
        target: 'https://bridge.tonkeeper.com/bridge',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/tonkeeper-bridge/, ''),
      },
      '/openmask-bridge': {
        target: 'https://bridge.openmask.app/bridge',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/openmask-bridge/, ''),
      },
      '/tonhubapi-bridge': {
        target: 'https://bridge.tonhubapi.com/bridge',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/tonhubapi-bridge/, ''),
      },
      '/toncenter-bridge': {
        target: 'https://bridge.toncenter.com/bridge',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/toncenter-bridge/, ''),
      },
      '/tonwallet-bridge': {
        target: 'https://bridge.tonwallet.io/bridge',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/tonwallet-bridge/, ''),
      },
      '/wallettg-bridge': {
        target: 'https://tonconnect-bridge.wallet.tg/bridge',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/wallettg-bridge/, ''),
      },
      '/tonapi-bridge': {
        target: 'https://bridge.tonapi.io/bridge',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/tonapi-bridge/, ''),
      },
      '/tonwhales-bridge': {
        target: 'https://bridge.tonwhales.com/bridge',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/tonwhales-bridge/, ''),
      },
      '/tonspace-bridge': {
        target: 'https://bridge.tonspace.io/bridge',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/tonspace-bridge/, ''),
      },
      '/tonbank-bridge': {
        target: 'https://bridge.tonbank.app/bridge',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/tonbank-bridge/, ''),
      },
      '/tonconsole-bridge': {
        target: 'https://bridge.tonconsole.com/bridge',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/tonconsole-bridge/, ''),
      },
      '/tonkeeperio-bridge': {
        target: 'https://bridge.tonkeeper.io/bridge',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/tonkeeperio-bridge/, ''),
      },
      '/tonsafe-bridge': {
        target: 'https://bridge.tonsafe.com/bridge',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/tonsafe-bridge/, ''),
      },
      '/tonpurse-bridge': {
        target: 'https://bridge.tonpurse.com/bridge',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/tonpurse-bridge/, ''),
      },
    },
  },
  // server: {
  //   allowedHosts: ['6fbd9481f413.ngrok-free.app'],
  // },
});
