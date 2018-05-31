/*
 * @Author: chen gong
 * @Date: 2018-04-12 17:38:10
 * @Last Modified by: chen gong
 * @Last Modified time: 2018-05-30 13:45:40
 */
/**
 * 全局配置
 */
import axios from 'axios';
import authority from 'public/authority';
import { browserHistory } from 'react-router';
import NProgress from 'nprogress'
//开发测试地址
const baseConfig = {
  baseURL: process.env.NODE_ENV === "development" ? '/api' : "/",
  timeout: 5000,
}
//POST传参序列化(添加请求拦截器)
const axiosFactory = istance => {
  istance.interceptors.request.use((config) => {
    //在发送请求之前做某件事
    NProgress.start()
    if (!authority.user) {
       browserHistory.push('/')
    }
    if (config.method === 'post') {
      if (config.data instanceof FormData) {
        let getValue = config.data.entries(),
          parts = [];
        for (var pair of getValue) {
          parts.push(pair[0] + "=" + pair[1]);
        }
        config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
        config.data = parts.join("&")

      } else {
        config.headers.post['Content-Type'] = 'application/json; charset=UTF-8'
        config.data = JSON.stringify(config.data);
      }
    }
    return config;
  }, (error) => {
    throw new Error("illegal parameter");
  });
  //返回状态判断(添加响应拦截器)
  istance.interceptors.response.use((res) => {
    //对响应数据做些事
    NProgress.done()
    if (typeof res !== 'object') {
      throw new Error('response data should be JSON');
    }
    if (res.data.code != "success") {
      return Promise.reject(res);
    }
    switch (res.status) {
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
}
export { baseConfig, axiosFactory }
