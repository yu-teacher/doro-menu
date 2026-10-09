import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

/** 게이트웨이가 /menu 접두사를 떼고 전달하며, 빌드는 상대 경로(base './')라서 매니페스트와 서비스 워커도 상대 경로를 쓴다(/menu/ 아래에서 동작). */
const THEME_COLOR = '#ec4899';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['apple-touch-icon.png'],
      manifest: {
        name: '도로메뉴',
        short_name: '도로메뉴',
        description: '오늘 뭐 먹지 고민될 땐? 메뉴 정해주는 도로롱!',
        lang: 'ko',
        start_url: './',
        scope: './',
        display: 'standalone',
        background_color: '#fff1f2',
        theme_color: THEME_COLOR,
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        // 앱 셸(js/css/html)만 캐시한다. 외부 호출이 없는 정적 앱이라 런타임 캐시는 두지 않는다.
        runtimeCaching: [],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3300,
  },
});
