/* 对axios 进行二次封装 */
import axios from 'axios';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

const requests = axios.create({
  baseURL: '/api',    // 基础路径，当使用这个axios实例发送请求时，他的路径参数就不需要加/api了，直接写/api后面的即可
  timeout: 5000    // 请求超时的时间,到达这个时间还没有响应 那就是请求失败
})

// 设置请求拦截器 => 在每一个请求发送出去之前,会执行一些我们想要的动作
// 两个参数分别为成功回调和失败回调
// config是请求的配置信息，可以设置请求头字段等
requests.interceptors.request.use((config) => {
  nprogress.start();
  // 如果请求路径中不能携带参数，那就用请求头来携带参数。比如添加购物车时求情url只有name和num参数，
  // 但是服务器需要用户id才能知道添加到谁的购物车，这时候url中无法再添加多余的参数，只好在请求头headers中添加了。
  // userTempId这个请求头信息要与后端同步
  config.headers.userTempId = localStorage.getItem('uuid_token')
  return config;
})

// 设置响应拦截器 => 在收到响应数据后,执行成功回调;若没有任何响应,执行失败回调函数
// 两个参数分别为成功回调和失败回调
requests.interceptors.response.use((res) => {
  nprogress.done();
  return res;
}, () => Promise.reject())

export default requests