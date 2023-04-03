// 配置路由‘器’的地方
import Vue from 'vue';   // 注意大小写
import VueRouter from 'vue-router';
import routes from '@/router/routes.js'
// 安装插件,添加全局功能(调用了插件暴露的install方法)
Vue.use(VueRouter);
// 引入路由组件

export default new VueRouter({
  // 配置路由，并对外暴露
  routes,

  // 滚动行为 
  scrollBehavior() {
    return { y: 0 }
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