/*
 * @Author: chen gong
 * @Date: 2018-04-12 17:38:10
 * @Last Modified by:   chen gong
 * @Last Modified time: 2018-04-12 17:38:10
 */
/**
 * 全局配置
 */
import axios from 'axios';
import authority from 'public/authority';
import { browserHistory } from 'react-router';
// import NProgress from 'nprogress' //暂时不用
//开发测试地址
const baseConfig = {
  baseURL: __DEV__ ? 'http://www.easy-mock.com/mock/59ae46e3e0dc6633419d14b6/example' : "/",
  timeout: 5000,
}
//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  //在发送请求之前做某件事
  // NProgress.start()
  if (config.method === 'post') {
    config.data = JSON.stringify(config.data);
  }
  return config;
}, (error) => {
  throw new Error("illegal parameter");
});
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  //对响应数据做些事
  // NProgress.done()
  if (typeof res !== 'object') {
    throw new Error('response data should be JSON');
  }
  if (!res.data.success) {
    return Promise.reject(res);
  }
  switch (res.code) {
    case 200:
      break
    case 401:
      authority.destroy()
      browserHistory.push('/login')
      break
    default:
      throw new Error(res.message || 'unknown error');
  }
  return res;
}, (error) => {
  throw new Error("网络异常", 'fail');
});
