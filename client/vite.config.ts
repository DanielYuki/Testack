import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['app-icon.svg', 'vite.svg'],
      manifest: {
        // === REQUIRED PROPERTIES ===
        name: 'TeStack - Modern React Template', // Full app name
        short_name: 'TeStack', // Short name for home screen
        description: 'A modern React template with TypeScript, Tailwind CSS, and Supabase',

        // === VISUAL & DISPLAY ===
        theme_color: '#3b82f6', // Browser UI color
        background_color: '#ffffff', // Splash screen background
        display: 'standalone', // App display mode
        orientation: 'portrait', // Preferred orientation

        // === NAVIGATION ===
        start_url: '/', // Launch URL
        scope: '/', // App scope

        // === ICONS (REQUIRED) ===
        icons: [
          {
            src: 'app-icon.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
          {
            src: 'app-icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
          },
          {
            src: 'app-icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable', // For Android adaptive icons
          },
        ],

        // === OPTIONAL ENHANCEMENTS ===
        categories: ['productivity', 'utilities'], // App store categories
        lang: 'en-US', // Primary language

        // === APP SHORTCUTS (Optional - for context menus) ===
        shortcuts: [
          {
            name: 'Gallery',
            short_name: 'Gallery',
            description: 'View image gallery',
            url: '/gallery',
            icons: [{ src: 'app-icon.svg', sizes: '192x192' }],
          },
          {
            name: 'Profile',
            short_name: 'Profile',
            description: 'View user profile',
            url: '/profile',
            icons: [{ src: 'app-icon.svg', sizes: '192x192' }],
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
              },
            },
          },
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
              },
              networkTimeoutSeconds: 10,
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
})
