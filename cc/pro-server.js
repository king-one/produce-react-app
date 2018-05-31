/* 测试环境是否需要起node服务 */
'use strict';
const express = require('express')
const proxy = require('http-proxy-middleware');
const path = require('path')
var serveIndex = require('serve-index');
const config = require('./webpack.pro.config')
const port = 8080 // npm start 3030  默认888
const publicPath = config.output.publicPath;
const nodeProxy = proxy({
  target: 'http://192.168.0.238:8889',
  // target: 'http://192.168.110.204:8080',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  }
});
const app = express()
//这里不使用 webpack-dev-server 的原因 ： 独立Server能够更方便的处理Mock中Post请求以及Prox等问题，自由度更大
app.use('/server', serveIndex(__dirname, { 'icons': true })) //服务器目录浏览
app.use(express.static(path.join(__dirname), { index: false }))
app.use('/api/', nodeProxy)
app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname  + publicPath +'/index.html'))
})
app.listen(port, function () {
  console.log('Server listening on http://localhost:' + port + ', Ctrl+C to stop')
})
