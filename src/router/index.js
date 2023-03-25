// 配置路由‘器’的地方
import Vue from 'vue';   // 注意大小写
import VueRouter from 'vue-router';
// 使用插件
Vue.use(VueRouter);
// 引入路由组件
import Home from '@/pages/Home/indexHome'
import Login from '@/pages/Login/indexLogin'
import Register from '@/pages/Register/indexRegister'
import Search from '@/pages/Search/indexSearch'
export default new VueRouter({
  // 配置路由，并对外暴露
  routes: [{
    path: '/home',    // 注意路由的路径不是 os的文件路径！不要用./
    component: Home
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/Register',
    component: Register
  }, {
    path: '/Search',
    component: Search
  }]
})
// 这里只是写了一个 js 文件，一个模块，需要被执行一次。也就是说，要在入口文件中引入且注册