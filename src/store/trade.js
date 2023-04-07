import { reqAddressInfo, reqOrderInfo } from "@/api"

const state = {
  addressInfo: [{}],
  orderInfo: {}
}

const mutations = {
  ADDRESSINFO(state, data) {
    state.addressInfo = data;
  },
  ORDERINFO(state, data) {
    state.orderInfo = data;
  }
}

const actions = {
  async getAddressInfo({ commit }) {
    let { data } = await reqAddressInfo();
    if (data.code == 200) {
      commit('ADDRESSINFO', data.data);
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },

  async getOrderInfo({ commit }) {
    let { data } = await reqOrderInfo();
    if (data.code == 200) {
      commit('ORDERINFO', data.data)
      return 'ok'
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}