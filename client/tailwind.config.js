/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {


    fontFamily : {

      'dancing' : ['Dancing Script', 'cursive'],

    },


    screens: {

      'sm': { 'min': '359px' },

      'md': { 'min': '760px' },

      'lg': { 'min': '1024px' },

      'xl': { 'min': '1324px' },

      
    },

    gridTemplateColumns : {

      'auto-fit' : 'repeat(auto-fit, minmax(300px, 1fr))',
      'grid-col-nav' : 'repeat(3, 1fr)',
      'grid-col-footer' : 'repeat(4, 1fr)',
      'grid-shopMD' : 'repeat(auto-fit , minmax(200px,1fr))',
      'grid-shopSM' : 'repeat(auto-fit , minmax(150px,1fr))',
      'grid-product-detail' : 'repeat(auto-fit , minmax(400px,1fr))'
      
    },

    gridTemplateRows : {

      'grid-row-nav' : 'repeat(3, 1fr)',
      'grid-row-footer' : 'repeat(1, 1fr)',
      'sub' : 'subgrid',
    
    },
    
    gridRow : {

      'row-sub-1' : '1/5' ,
      'row-test' : 'span 4'
    },
    
  },
  plugins: [flowbitePlugin],
}




