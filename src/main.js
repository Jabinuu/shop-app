import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  // render、template、el这三个DOM选项要一起看
  // render渲染函数里的形参h函数（即createElement()）负责创建一个VNode节点，
  // 然后render渲染函数将该VNode渲染成为DOM节点
  render: h => h(App),
}).$mount('#app')   // $mount()作用是把这个Vue实例手动挂载到index.html（单页面程序的主页）的根节点下
