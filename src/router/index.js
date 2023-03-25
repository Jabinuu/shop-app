// 配置路由‘器’的地方
import Vue from 'vue';   // 注意大小写
import VueRouter from 'vue-router';
// 使用插件
Vue.use(VueRouter);
// 引入路由组件
import Home from '@/pages/Home/comHome'
import Login from '@/pages/Login/comLogin'
import Register from '@/pages/Register/comRegister'
import Search from '@/pages/Search/comSearch'
export default new VueRouter({
  // 配置路由，并对外暴露
  routes: [
    // 注意路由的路径不是 os的文件路径！不要用./
    { path: '/home', component: Home, meta: { showFooter: true } },
    { path: '/login', component: Login, meta: { showFooter: false } },
    { path: '/Register', component: Register, meta: { showFooter: false } },
    { path: '/Search', component: Search, meta: { showFooter: true } },
    { path: '/', redirect: '/home' }   // 这里是路由重定向，打开域名直接跳转到首页
  ]
})

// 重写$router.push()和replace()，添加了promise拒绝的回调函数catch()
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch(err => err) //小tip：this指向的是VueRouter的原型
}
VueRouter.prototype.replace = function (location) {
  return originalReplace.apply(this, [location]).catch(err => err)
}

// 这里只是写了一个 js 文件，一个模块，需要被执行一次。也就是说，要在入口文件中引入且注册