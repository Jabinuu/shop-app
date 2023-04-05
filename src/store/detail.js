import { reqGoodsDetail, reqAddShopCart } from '@/api/index.js'
import { getUuid } from '@/utils/uuid_token';

const state = {
  goodsDetail: {},
  uuid_token: getUuid()
};
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
  },

  // 这个操作就不需要向仓库提交数据了，仅仅向服务器发送数据即可。但你需要通知用户是否添加成功，
  // 因此让该函数把请求结果返回即可，不需要提交到仓库
  /*
    async 异步函数的返回值必定是promise实例 
    如果显式return的值不是promise对象，那么会自动被包装为解决的promise
   */
  // 如果有必须要占位的形参，但又不需要用，以免exlint报错，解决方案是用 _ 占位
  async addShopCart(_, data) {
    let { data: res } = await reqAddShopCart(data);
    // console.log(res);
    if (res.code == 200) {
      return '加入购物车成功！'
    } else {
      return Promise.reject(new Error('加入购物车失败！'))
    }
  }
};
const getters = {
  categoryView: state => state.goodsDetail.categoryView || {},
  skuInfo: state => state.goodsDetail.skuInfo || {},
  spuSaleAttrList: state => state.goodsDetail.spuSaleAttrList || []
};

export default {
  state,
  mutations,
  actions,
  getters
}

