import api from '@/api';

export default {
  namespaced: true,
  state: {
    /** 购物车信息列表
    ---------------------------------------- */
    shoppingDataList: [],
  },
  getters: {
  },
  mutations: {
    /** 设置购物车信息列表
    ---------------------------------------- */
    setShoppingDataList(state, list) {
      state.shoppingDataList = list;
    },
  },
  actions: {
    /** 获取购物车信息列表
    ---------------------------------------- */
    async getQuotationList({ commit }) {
      const res = await api.getQuotationList();
      if (res.data.Status === 1000) {
        commit('setShoppingDataList', res.data.Data);
      }
    },
  },
};
