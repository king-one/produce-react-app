'use strict';
const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.config');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const devConfig = {
  devServer: {
    contentBase: path.resolve(__dirname),
    port: 8880
  },
  devtool: '#eval-source-map',
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
    new webpack.NoEmitOnErrorsPlugin(),
    ...config.commonPluginsConfig,
        new OpenBrowserPlugin({
      url: 'http://localhost:8880/'
    })
  ]
};
module.exports = Object.assign(config.baseConfig, devConfig);