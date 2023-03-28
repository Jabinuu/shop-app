/* 对axios 进行二次封装 */
import axios from 'axios';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

const requests = axios.create({
  baseURL: '/api',
  timeout: 5000    // 请求超时的时间,到达这个时间还没有响应 那就是请求失败
})

// 设置请求拦截器 => 在每一个请求发送出去之前,会执行一些我们想要的动作
// 两个参数分别为成功回调和失败回调
requests.interceptors.request.use((config) => {
  nprogress.start();
  return config;
})

// 设置响应拦截器 => 在收到响应数据后,执行成功回调;若没有任何响应,执行失败回调函数
// 两个参数分别为成功回调和失败回调
requests.interceptors.response.use((res) => {
  nprogress.done();
  return res;
}, () => Promise.reject())

export default requests