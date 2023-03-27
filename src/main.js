import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import HomeTypeNav from '@/pages/Home/HomeTypeNav'
Vue.config.productionTip = false;
// 将商品分类三级联动组件注册为全局组件，以至于任何组件都无须再注册
Vue.component('HomeTypeNav', HomeTypeNav);
new Vue({
  // render、template、el这三个DOM选项要一起看
  // render渲染函数里的形参h函数（即createElement()）负责创建一个VNode节点，
  // 然后render渲染函数将该VNode渲染成为DOM节点
  render: h => h(App),
  router   // 注册路由！
}).$mount('#app')   // $mount()作用是把这个Vue实例手动挂载到index.html（单页面程序的主页）的根节点下
