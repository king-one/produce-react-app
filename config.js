/**
 * 全局配置
 */

import xhr from 'bfd/xhr'
import message from 'bfd/message'
import auth from 'public/auth'
import { browserHistory } from 'react-router'


axios.defaults.timeout = 5000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           if (__DEV__) {
  axios.defaults.baseURL = 'http://10.11.6.170:8080/api/' //开发测试地址
} else {
  axios.defaults.baseURL = '/api/'
}
//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  //在发送请求之前做某件事
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
     _.toast("错误的传参", 'fail');
    return Promise.reject(error);
});
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
  //对响应数据做些事
   if (typeof res !== 'object') {
    comsole.log('response data should be JSON')
      if(!res.data.success){
      return Promise.reject(res);
    }
  }
   if(!res.data.success){
      return Promise.reject(res);
  }
  switch (res.code) {
    case 200:
      break
    case 401:
      browserHistory.push('/login')
      break
    default:
      console.log(res.message || 'unknown error');
  }
    return res;
}, (error) => {
    _.toast("网络异常", 'fail');
    return Promise.reject(error);
});

