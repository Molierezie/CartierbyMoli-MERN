module.exports = {
  presets: [
    ['@babel/preset-env', {

      useBuiltIns: 'usage',
      corejs: 3,
      modules: false, // Important to prevent conversion to CommonJS
      targets: {
        browsers: ['>0.2%', 'not dead', 'not op_mini all']
      }

    //   useBuiltIns: 'usage',
    //   corejs: 3,
    //   targets: {
    //     browsers: ['>0.2%', 'not dead', 'not op_mini all']
    //   },


    //   modules : false

    }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      regenerator: true,
      corejs: 3
    }]
  ]
};

