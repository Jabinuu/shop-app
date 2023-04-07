// 配置路由‘器’的地方
import Vue from 'vue';   // 注意大小写
import VueRouter from 'vue-router';
import routes from '@/router/routes.js'
import store from '@/store'

// 安装插件,添加全局功能(调用了插件暴露的install方法)
Vue.use(VueRouter);
// 引入路由组件

let router = new VueRouter({
  // 配置路由，并对外暴露
  routes,

  // 滚动行为 
  scrollBehavior() {
    return { y: 0 }
  }
})

// 全局路由守卫：前置首位（在路由跳转之前进行判断）,无论什么路由跳转都要经过全局守卫的检查
router.beforeEach(async (to, from, next) => {
  // to: 可以获取到你要跳转到的那个路由的信息
  // from：可以获取到你从哪个路由来的信息
  // next：放行函数，执行此函数才能跳转 next()放行 next(path)放行到指定路由
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  if (token) {   // 只有用户登录了才有token，用户未登录一定没token
    if (to.path === '/login') {
      next('/home');   //如果已经登录了，又还想去login，则放行到首页路由（不允许在登录状态去login）
    } else {
      if (!name) {    // 登录状态下跳转到任何路由，如果仓库没有用户信息，则向服务器请求用户信息
        try {
          await store.dispatch("userInfo");
          next();
        } catch (e) {
          Vue.prototype.$message.error('登录过期，请重新登录！');  //网络正常的情况下如果请求用户信息失败，说明是token超过有效期，此时要清除作废的token和仓库中用户数据（即退出登录），跳转到登录路由
          await store.dispatch('userLogout');
          next('/login');
        }
      } else {     //如果仓库中有用户信息，正常放行
        next();
      }
    }
  } else {    // 如果没有登录 
    if (to.path.includes('/trade') || to.path.includes('/pay') || to.path.includes('/center')) {
      next(`/login?redirect=${to.path}`)
    } else {
      next();
    }
  }
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


export default router