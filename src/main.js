import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/mock/mockServe'     // 引入 让这个js文件执行一次
import ElementUI from 'element-ui'
// import VueLazyload from 'vue-lazyload'
// import loadimage from '@/assets/loading.gif'
import 'element-ui/lib/theme-chalk/index.css';
import TypeNav from '@/components/TypeNav'
import GoodsPagination from '@/components/GoodsPagination'
import * as api from '@/api'     //引用js文件夹中的所有暴漏对象
// 将商品分类三级联动组件注册为全局组件，以至于任何组件都无须再注册
Vue.component('TypeNav', TypeNav);
Vue.component('GoodsPagination', GoodsPagination);
Vue.use(ElementUI);
// ********注册图片懒加载插件 和相关参数
// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   loading: loadimage,
//   attempt: 1
// })
// ********

new Vue({
  // render、template、el这三个DOM选项要一起看
  // render渲染函数里的形参h函数（即createElement()）负责创建一个VNode，
  // render函数将在befoeMount()生命周期钩子函数里被调用,返回的VNode将用于渲染成真实DOM节点($el)
  render: h => h(App),

  router,   // 注册路由！key value相同省略key,组件属性上都会有$route和$router属性

  store,      // 注册仓库:组件实例上会多出一个$store属性

  beforeCreate() {       // 配置全局事件总线$bus
    Vue.prototype.$bus = this;
    Vue.prototype.$api = api;    // 在所有vue、vuecomponent实例的原型上挂载自定义的对象（全部api），此后所有的实例都无需再引入api了
  }
}).$mount('#app')   // $mount()作用是把这个Vue实例手动挂载到index.html（单页面程序的主页）的根节点
// “虚拟 DOM”是我们对 由 Vue 组件树建立起来的整个 VNode 树的称呼。 