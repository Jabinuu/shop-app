import { reqShopcartList, reqDeleteShopCart, reqUpdateChecked } from "@/api";

const state = {
  shopCartList: [{}]
}

const mutations = {
  SHOPCARTLIST(state, shopCartList) {
    state.shopCartList = shopCartList;
  }
}

const actions = {
  // context是actions的形参，它是具有和store完全一样的属性和方法的对象，这里{commit} 就是解构出context的commit方法
  async getShopcartList({ commit }) {
    let { data } = await reqShopcartList();
    if (data.code == 200) {
      commit('SHOPCARTLIST', data.data.length === 0 ? [{}] : data.data)
    }
  },

  async deleteCartList(_, skuId) {
    let { data } = await reqDeleteShopCart(skuId);
    if (data.code == 200) {
      return 'ok';       //返回的是一个解决的promise
    }
    else {
      return Promise.reject(new Error('faile'))
    }
  },

  // 函数参数的解构赋值
  async updateChecked(_, { skuId, checked }) {
    let { data } = await reqUpdateChecked(skuId, checked);
    if (data.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(data.message)
    }
  },

  // 虽然没有购物车全部删除的api，但可以通过多次调用单个商品删除的api来实现全部删除
  // 组合actions的使用（在一个action中派发另一个action）：解构出context形参的disptach
  deleteAllChecked({ getters, dispatch }) {
    const promisAll = [];
    getters.shopCartList.forEach(elem => {
      if (elem.isChecked == 1) {   // 注意请求到的数据都是json字符串！！慎用全等===
        promisAll.push(dispatch('deleteCartList', elem.skuId));
      }
    });
    // Promise.all：当数组中的所有promise都解决时返回一个解决的promise，一旦有一个拒绝，便返回一个拒绝的promise
    return Promise.all(promisAll);
  },

  // 组合actions
  updateAllChecked({ getters, dispatch }, cur) {
    let promisAll = [];
    getters.shopCartList.forEach((elem) => {
      promisAll.push(dispatch('updateChecked', { skuId: elem.skuId, checked: cur ? 1 : 0 }))
    });
    return Promise.all(promisAll);
  }
}

const getters = {
  shopCartList: state => state.shopCartList[0].cartInfoList || []
}

export default {
  state,
  mutations,
  actions,
  getters
}