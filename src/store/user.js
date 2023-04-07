import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqUserLogout } from "@/api";
import { setToken, getToken, removeToken } from "@/utils/token.js"
const state = {
  code: '',
  token: getToken(),   //初始状态为已登录的用户token
  userInfo: {}
};

const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  USERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  CLEAR(state) {
    state.token = '';
    state.userInfo = {};
  }
};

const actions = {
  async getCode({ commit }, phoneNumber) {
    let { data } = await reqGetCode(phoneNumber);
    if (data.code == 200) {
      commit('GETCODE', data.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },

  async userRegister(_, info) {
    let { data } = await reqUserRegister(info);
    if (data.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error(`注册失败！${data.message}`))
    }
  },

  // 登录业务 token
  async userLogin({ commit }, info) {
    let { data } = await reqUserLogin(info);
    // 服务器下发token ==> 用户唯一标识符（uuid）
    // 将来经常通过带 token 找服务器要用户信息进行展示
    if (data.code == 200) {
      commit('USERLOGIN', data.data.token);
      // 持久化存储 token
      setToken(data.data.token);
      return 'ok';
    } else {
      return Promise.reject(new Error('登录失败！'))
    }
  },

  async userInfo({ commit }) {
    let { data } = await reqUserInfo();
    if (data.code == 200) {
      commit('USERINFO', data.data);
      return 'ok';
    } else {
      return Promise.reject(new Error('获取用户信息失败！'))
    }
  },

  async userLogout({ commit }) {
    /* 
    退出登录：1。通知服务器退出登录并清除token
    2。 清除本地仓库中的token和所有用户数据
    */
    let { data } = await reqUserLogout();
    if (data.code == 200) {
      commit('CLEAR');
      removeToken();
      return 'ok'
    } else {
      return Promise.reject(new Error('退出登录失败！'))
    }
  }
};

const getters = {

};

export default {
  state,
  mutations,
  actions,
  getters
}