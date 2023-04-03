import { reqSearchResList } from '@/api'

// state:仓库存储数据的地方
const state = { searchResList: {} };
// mutation:修改state的唯一手段
const mutations = {
  SEARCHRESLIST(state, SearchResList) {
    state.searchResList = SearchResList
  }
};
// action:处理action,可以书写自己的业务逻辑,也可以处理异步操作
const actions = {
  async getSearchResList({ commit }, query) {
    let { data } = await reqSearchResList(query);
    if (data.code === 200) {
      commit('SEARCHRESLIST', data.data)
    }
  }
};
// getters:理解为计算属性,用于简化仓库数据,让组件获取仓库数据更加方便
const getters = {
  // 当请求时间很长，前者是undefined, 其实并没有什么问题，只是保持代码习惯，尽量不是undefined,
  goodsList: state => state.searchResList.goodsList || [],
  attrsList: state => state.searchResList.attrsList || [],
  trademarkList: state => state.searchResList.trademarkList || [],
  total: state => state.searchResList.total,
};
export default {
  state,
  mutations,
  actions,
  getters
}