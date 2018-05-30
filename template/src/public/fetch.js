import './config';
const { baseURL, timeout } = baseConfig;
const fetch = axios.create(baseConfig);
const crossFetch = axios.create({ baseURL, timeout, withCredentials: true }); //跨域的请求方法;
export default fetch;
export {
  fetch,
  crossFetch
}