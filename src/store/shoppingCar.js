import api from '@/api';

export default {
  namespaced: true,
  state: {
    /** 购物车信息列表
    ---------------------------------------- */
    shoppingDataList: [],
    /** 购物车信息列表条数
    ---------------------------------------- */
    shoppingDataNumber: 0,
    /** 当前购物车订单详情
    ---------------------------------------- */
    curShoppingCarDetailData: null,
  },
  getters: {
  },
  mutations: {
    /** 设置购物车信息列表
    ---------------------------------------- */
    setShoppingDataList(state, { Data, DataNumber }) {
      state.shoppingDataList = Data;
      state.shoppingDataNumber = DataNumber;
    },
    /** 设置当前购物车订单详情
    ---------------------------------------- */
    setCurShoppingCarDetailData(state, data) {
      state.curShoppingCarDetailData = data;
    },
  },
  actions: {
    /** 获取购物车信息列表
    ---------------------------------------- */
    async getQuotationList({ commit }) {
      const res = await api.getQuotationList();
      if (res.data.Status === 1000) {
        commit('setShoppingDataList', res.data);
      }
    },
  },
};
