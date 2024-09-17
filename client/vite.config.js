import React from 'react';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    react({

      babel: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-transform-runtime']
      }
    })
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
      '@public': '/publi',
    },
  },

  optimizeDeps: {
    include: ['@fvilers/disable-react-devtools'],
  },

  // build : {

  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         if (id.includes('node_modules')) {
  //           return 'vendor'; // All node_modules code will be in a 'vendor' chunk
  //         }
  //       },
  //     },
  //   },
  // },

  build: {
    rollupOptions: {
        output:{
            manualChunks(id) {
                if (id.includes('node_modules')) {
                    return id.toString().split('node_modules/')[1].split('/')[0].toString();
                }
            }
        }
    }
},


    // build: {
    //   presets: ['@babel/preset-env'],
    //   plugins: ['@babel/plugin-transform-runtime'],
    //   target: ['es2015', 'edge88', 'firefox78', 'chrome87', 'safari13'],
    //   outDir: 'dist', // Make sure this matches the directory in Render settings
    //   assetsDir: 'assets',  
    // },

  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },



})
