import React from 'react';
import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'


import react from '@vitejs/plugin-react'


export default defineConfig({

  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],

  server : {

    proxy : {

      "/api" : "http://localhost:5500", 
  
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
    rollupOptions: {
        output:{
            manualChunks(id) {
                if (id.includes('node_modules')) {
                    return id.toString().split('node_modules/')[1].split('/')[0].toString();
                }
            }
        }
    },
   

},

  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },



})
