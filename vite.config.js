import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
    }),
    compression({
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],
  build: {
    minify: 'esbuild',
    reportCompressedSize: true,
    esbuild: {
      drop: ['console', 'debugger'], // Remove console logs
      pure: ['console.log', 'console.debug', 'console.info'],
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          firebaseCore: ['firebase/app'],
          firebaseAuth: ['firebase/auth'],
          firebaseFirestore: ['firebase/firestore'],
          firebaseStorage: ['firebase/storage'],
          ui: ['react-router', 'axios', 'react-hook-form'],
        },
      },
    },
  },
  server: {
    port: 3000
  }
})