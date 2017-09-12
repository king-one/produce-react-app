'use strict';
const path = require('path');
const resolve = str => path.resolve(__dirname, str);
const entries = {
  //'chart': resolve('javascripts/app/chart/chart')
    'recommend': resolve('javascripts/app/recommend/index'),
    'dashboard': resolve('javascripts/app/dashboard/new-index')
}
module.exports = entries;