'use strict';
const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.config');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
const devConfig = {
  devtool: '#eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname),
    port: 8880
  },
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:8880/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': 'true'
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:8880/'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    ...config.commonPluginsConfig
  ]
};
module.exports = Object.assign(config.baseConfig, devConfig);