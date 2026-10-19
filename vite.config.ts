import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'WaveCast Podcast Player',
        short_name: 'WaveCast',
        description: 'Offline Podcast & Audio Player PWA',
        theme_color: '#4f46e5',
        background_color: '#020617',
        display: 'standalone',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.(mp3|m4a|wav|aac)/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'podcast-audio-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/.*\.(xml|rss)/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'podcast-rss-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 24 * 60 * 60, // 1 Day
              }
            }
          }
        ]
      }
    })
  ]
})
