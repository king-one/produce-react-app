'use strict';
const path = require('path');
const resolve = str => path.resolve(__dirname, str);
const entries = {
    'app': resolve('src/app')
}//多页应用请配置多个页面入口
module.exports = entries;