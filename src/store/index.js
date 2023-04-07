import Vue from 'vue';
import Vuex from 'vuex';
import home from '@/store/home.js'   // 引入小仓库
import search from '@/store/search.js'
import detail from '@/store/detail.js'
import shopcart from '@/store/shopcart.js';
import user from '@/store/user.js'
import trade from '@/store/trade.js'
// 对于插件必须要安装，才能用它来创建实例
Vue.use(Vuex);

export default new Vuex.Store({
  // 实现Vuex仓库模块式开发存储数据
  // 把Vuex仓库分为了home和search两个小仓库
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade
  }
})