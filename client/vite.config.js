import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {

    proxy : {

      "/api" : "http://localhost:5500", 
      // "/api" : "https://cartierByMoli-api.onrender.com",
      "/upload" : "http://localhost:5500",
      // "/upload" : "https://cartierByMoli-api.onrender.com",
    },

    historyApiFallback: true
    
  },

  resolve: {
    alias: {
      '@': '/src',
      '@public': '/public',
    },
  },

  optimizeDeps: {
    include: ['@fvilers/disable-react-devtools'],
  },

  build: {
    outDir: 'dist', // Make sure this matches the directory in Render settings
    assetsDir: 'assets',
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'; // All node_modules code will be in a 'vendor' chunk
            }
          },
        },
      },
    },
  },



})
