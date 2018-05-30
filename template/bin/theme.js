/*
 * @Author: chen gong
 * @Date: 2018-04-12 17:38:42
 * @Last Modified by: chen gong
 * @Last Modified time: 2018-04-12 17:39:11
 */
/*
 更换配色方案  npm run theme  -原颜色:目标颜色，支持多个，空格隔开
 缺陷  暂时不支持 rga
*/
'use strict'
var fs = require('fs')
var path = require('path')

var option = process.argv.slice(2)
var colorRule = {}
var sourceColors = []
option.forEach(function(item) {
  item = item.slice(1).split(':')
  colorRule[item[0]] = item[1]
  sourceColors.push(item[0])
})
var sheets = []
function pushSheet(dir) {
  fs.readdirSync(dir).forEach(function(item) {
    var _dir = path.join(dir, item)
    if (fs.statSync(_dir).isDirectory()) {
      pushSheet(_dir)
    } else {
      var ext = path.extname(item)
      if (ext === '.less' || ext === '.css') {
        sheets.push(_dir)
      }
    }
  })
}
// pushSheet(path.join(__dirname, '../app'))
// pushSheet(path.join(__dirname, '../variables.less'))
var reg = new RegExp(sourceColors.join('|'), 'gi')
sheets.forEach(function(sheet) {
  var content = fs.readFileSync(sheet, 'utf-8')
  content = content.replace(reg, function(match) {
    return colorRule[match]
  })
  fs.writeFileSync(sheet, content)
})
