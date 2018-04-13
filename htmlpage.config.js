/*
 * @Author: chen gong
 * @Date: 2018-04-12 17:38:00
 * @Last Modified by:   chen gong
 * @Last Modified time: 2018-04-12 17:38:00
 */

'use strict';
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolve = str => path.resolve(__dirname, str);
const isProduction = function () {
  return process.env.NODE_ENV ? process.env.NODE_ENV.trim() === 'production' : false;  //注意这里的trim()
};
const htmlPages = [{
  template: resolve('src/pages/home/index.html'),
  filename: resolve('dist/index.html'),
  favicon: 'favicon.ico',
},{
  template: resolve('src/pages/other/index.html'),
  filename: resolve('dist/other.html'),
  favicon: 'favicon.ico',
}
];
const pagePlugins = function (htmlPages) {
  if (!htmlPages) {
    return [];
  }
  const plugins = [];
  for (let i = 0; i < htmlPages.length; i++) {
   /* 在jsp页面使用html 目的是使用html-loader处理img标签引用图片
    if(isProduction() && fs.existsSync(htmlPages[i].template) && fs.existsSync(htmlPages[i].filename)){
    fs.unlinkSync(htmlPages[i].filename)
    console.log('----remove file already have---' + htmlPages[i].filename)
    }*/
    plugins.push(new HtmlWebpackPlugin({
      template: htmlPages[i].template,
      filename: htmlPages[i].filename, //输出路径 还可以是jsp或者php后缀 可以实现html转jsp等后台模板
      inject: true, //js插入的位置，true/'head'/'body'/false
      chunks: htmlPages[i].chunks,
      chunksSortMode:"dependency",
      minify: {
        collapseWhitespace: false,//删除空白符与换行符
        removeComments: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
      // hash: true, //为静态资源生成hash值  已经在output和loader中配置过
    }));
  }
  return plugins;
}
module.exports = {
  plugin: pagePlugins(htmlPages)
};
