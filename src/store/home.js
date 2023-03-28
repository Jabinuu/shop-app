import { reqCategoryList } from '@/api'
// state:仓库存储数据的地方
const state = { categoryList: [] };
// mutation:修改state的唯一手段
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  }
};
// action:处理action,可以书写自己的业务逻辑,也可以处理异步操作
const actions = {
  async categoryList({ commit }) {
    let { data: res } = await reqCategoryList();   //awaut拿出解封在Promise对象中的数据
    if (res.code == 200) {
      commit('CATEGORYLIST', res.data);
    }
  }
};
// getters:理解为计算属性,用于简化仓库数据,让组件获取仓库数据更加方便
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters
}