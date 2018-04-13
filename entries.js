/*
 * @Author: chen gong
 * @Date: 2018-04-12 17:37:29
 * @Last Modified by:   chen gong
 * @Last Modified time: 2018-04-12 17:37:29
 */
'use strict';
const path = require('path');
const resolve = str => path.resolve(__dirname, str);
const entries = {
    'app': resolve('src/pages/home/index') //多页应用请配置多个页面入口
}
module.exports = entries;
