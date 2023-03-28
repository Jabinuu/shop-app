// 配置路由‘器’的地方
import Vue from 'vue';   // 注意大小写
import VueRouter from 'vue-router';
// 安装插件,添加全局功能(调用了插件暴露的install方法)
Vue.use(VueRouter);
// 引入路由组件
import Home from '@/pages/Home/HomeIndex'
import Login from '@/pages/Login/LoginIndex'
import Register from '@/pages/Register/RegisterIndex'
import Search from '@/pages/Search/SearchIndex'
export default new VueRouter({
  // 配置路由，并对外暴露
  routes: [
    // 注意路由的路径不是 os的文件路径！不要用./
    {
      path: '/home',
      component: Home,
      meta: { showFooter: true }
    },
    {
      path: '/login',
      name: 'loginRouter',
      component: Login,
      meta: { showFooter: false }
    },
    {
      path: '/Register',
      component: Register,
      meta: { showFooter: false }
    },
    {
      path: '/search/:searchWord?',// 动态路由传递params参数的占位符。默认params必须传递，加上?设置params可传可不传
      name: 'searchRouter',           // 通过path和name都可所引到对应的路由
      component: Search,
      meta: { showFooter: true },
      // 设置路由组件的props传递，而不是在组件中直接用$route.params.xxx，可实现解耦，建议使用
      // 这里是函数式写法，$route只是形参，可以改成别的。其他的方式还有布尔式（只能传params），对象式（只能额外加，不嫩恶搞穿params和query）
      props: ($route) => ({ searchWord: $route.params.searchWord, keyword: $route.query.searchWord })
    },
    {
      path: '/',
      redirect: '/home'
    }   // 这里是路由重定向，打开域名直接跳转到首页
  ]
})

/* 由于不允许连续跳转同一个路由从而报错，为了消除这个错误信息，有以下办法
   1. 为push返回的Promise对象添加rejected的回调函数.catch(每次调用push都要写)
   2. 重写在router/index.js中的VueRouter原型的push函数（一劳永逸的）
*/
// 对$router.push()和replace()进行二次封装，添加了promise拒绝的回调函数catch()
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (location) {
  // 二次封装时要考虑原函数的this指向，如果只是originalPush()这样调用，那他里面的this指向的是window
  // 这列我们用call调用，指明原函数的this指向。这里的this指向VueRouter的实例$router，即调用它的对象
  originalPush.call(this, location).catch(() => { });
}

VueRouter.prototype.replace = function (location) {
  originalReplace.call(this, location).catch(() => { })
}
// 这里只是写了一个 js 文件，一个模块，需要被执行一次。也就是说，要在入口文件中引入且注册