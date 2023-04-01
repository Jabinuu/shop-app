import axios from "axios";
import nProgress from "nprogress";
import 'nprogress/nprogress.css';
const requestMock = axios.create({
  baseURL: '/mock',
  timeout: 5000
})

// 请求拦截器，请求发生之前的动作
requestMock.interceptors.request.use((config) => {
  nProgress.start();
  return config
})

// 响应拦截器，收到响应先做的动作
requestMock.interceptors.response.use((res) => {
  nProgress.done();
  return res;
})

export default requestMock;