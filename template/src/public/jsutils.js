/*
 * @Author: chen gong 
 * @Date: 2018-01-10 14:27:18 
 * @Last Modified by: chen gong
 * @Last Modified time: 2018-04-12 12:30:44
 */
//该文件为基础工具封装  请用原生js修改 避免使用es6 一些活动页面可能会用
; (function (root, factory) {
  'use strict'
  if (typeof define === 'function' && define.amd) {
    define('jsutils', factory)
  } else if (typeof exports === 'object') {
    exports = module.exports = factory()
  } else {
    root.jsuntils = factory();
    root.Jsuntils = factory();
  }
}(this, function () {
  'use strict'
  function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return decodeURIComponent(arr[2]);
    else
      return null;
  }
  function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }
  function setCookie(name, value, time) {
    var exp = new Date();
    exp.setTime(exp.getTime() + time);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
  }
  function getQuery(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  }
  /**
   判断两个数组是否相等
  */
  function arrayEqual(arr1, arr2) {
    if (arr1 === arr2)
      return true;
    if (arr1.length != arr2.length)
      return false;
    for (var i = 0; i < arr1.length; ++i) {
      if (arr1[i] !== arr2[i])
        return false;
    }
    return true;
  }
  /**
   深拷贝 只允许使用 String、 Number、 Array、 Object 4种简单类型数据。
   */
  function deepClone(target) {
    if (target && typeof target === 'object') {
      var newObj = target instanceof Array ? [] : {};
      for (var key in target) {
        var val = target[key];
        newObj[key] = deepClone(val);
      }
      return newObj;
    } else {
      return target;
    }
  }
  /**
   数组去重
   */
  function uniqueArray(array) {
    var n = [];
    for (var i = 0; i < array.length; i++) {
      n.indexOf(array[i]) == -1 && n.push(array[i]);
    }
    return n;
  }
  function addClass(obj, cls) {
    var obj_class = obj.className,
      blank = (obj_class != '') ? ' ' : '',//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
    added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
    obj.className = added;//替换原来的 class.
  }
  function removeClass(obj, cls) {
    var obj_class = ' ' + obj.className + ' ',//获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
      obj_class = obj_class.replace(/(\s+)/gi, ' '),//将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
      removed = obj_class.replace(' ' + cls + ' ', ' '),//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
      removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
      obj.className = removed;//替换原来的 class.
  }
  function hasClass(obj, cls) {
    var obj_class = obj.className,//获取 class 内容.
      obj_class_lst = obj_class.split(/\s+/);//通过split空字符将cls转换成数组.
    for (var x in obj_class_lst) {
      if (obj_class_lst[x] == cls) {//循环数组, 判断是否包含cls
        return true;
      }
    }
    return false;
  }
  return {
    getCookie: getCookie,
    delCookie: delCookie,
    setCookie: setCookie,
    getQuery: getQuery,
    arrayEqual: arrayEqual,
    deepClone: deepClone,
    uniqueArray: uniqueArray,
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
  }
}))



