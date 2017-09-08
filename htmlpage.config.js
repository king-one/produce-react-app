/**
 * Created by dell on 2017/8/20.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolve = str => path.resolve(__dirname, str);
const isProduction = function() {
  return process.env.NODE_ENV ? process.env.NODE_ENV.trim() === 'production' : false;
};
const htmlPages = [{
  template: resolve('WEB-INF/recommend/index.html'),
  filename: resolve('WEB-INF/recommend/index.jsp')
  // chunks: ['index'],
}];
let pagePlugins = function(htmlPages){
  if(!htmlPages) {
    return [];
  }
  let plugins = [];
  for(let i = 0;i < htmlPages.length; i++){
    if(isProduction() && fs.existsSync(htmlPages[i].template) && fs.existsSync(htmlPages[i].filename)){
      fs.unlinkSync(htmlPages[i].filename)
      console.log('----remove file already have---' + htmlPages[i].filename)
    }
    plugins.push(new HtmlWebpackPlugin({
      template: htmlPages[i].template,
      filename: htmlPages[i].filename,
      inject:false
      /* chunks: htmlPages[i].chunks,
      minify: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
      },*/
      //暂时不要这种hash算法
      //hash: true
    }));
  }
  return plugins;
}
module.exports = {
  // 定义html
  plugin: pagePlugins(htmlPages)
};