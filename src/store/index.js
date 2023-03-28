import Vue from 'vue';
import Vuex from 'vuex';
import home from '@/store/home.js'   // 引入小仓库
import search from '@/store/search.js'
// 对于插件必须要安装
Vue.use(Vuex);

export default new Vuex.Store({
  // 实现Vuex仓库模块式开发存储数据
  // 把Vuex仓库分为了home和search两个小仓库
  modules: {
    home,
    search
  }
})