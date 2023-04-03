import { reqGoodsDetail } from '@/api/index.js'

const states = { goodsDetail: {} };
const mutations = {
  GOODSDETAIL(state, goodsDetail) {
    state.goodsDetail = goodsDetail
  }
};
const actions = {
  async getGoodsDetail({ commit }, skuid) {
    const { data } = await reqGoodsDetail(skuid)
    if (data.code == 200) {
      commit('GOODSDETAIL', data.data);
    }
  }
};
const getters = {};

export default {
  states,
  mutations,
  actions,
  getters
}

