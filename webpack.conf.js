var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'eval-cheap-module-source-map',
  bail: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.resolve(__dirname, 'assets/js'),
          path.resolve(__dirname, 'node_modules/@bigcommerce/stencil-utils')
        ],
        query: {
          compact: false,
          cacheDirectory: true,
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  watch: true
};