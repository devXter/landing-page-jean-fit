// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://jeanfit.cl',
  base: '/',
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'auto',
  },
  integrations: [tailwind(), react()],
  vite: {
    css: {
      devSourcemap: true,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['lucide-react', 'framer-motion'],
          },
        },
      },
    },
  },
});