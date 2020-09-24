/* eslint-disable object-curly-newline */
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
    /** 当前完成第一步预下单 [前] 的购物车提交的订单列表数据
    ---------------------------------------- */
    curShoppingCarDataBeforeFirstPlace: null,
    /** 当前完成第一步预下单的购物车订单数据
    ---------------------------------------- */
    curShoppingCarData4FirstPlace: null,
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
    /** 当前完成第一步预下单 [前] 的购物车提交的订单列表数据
    ---------------------------------------- */
    setCurShoppingCarDataBeforeFirstPlace(state, list) {
      state.curShoppingCarDataBeforeFirstPlace = list;
    },
    /** 设置当前完成第一步预下单的购物车订单数据
    ---------------------------------------- */
    setCurShoppingCarData4FirstPlace(state, data) {
      state.curShoppingCarData4FirstPlace = data;
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
    /** 购物车提交第一步
    ---------------------------------------- */
    async getOrderPreCreateFromShoppingCar({ commit }, list) {
      const _obj = { OrderType: 2, PayInFull: false, List: list };
      const res = await api.getOrderPreCreate(_obj);
      if (res.data.Status === 1000) {
        commit('setCurShoppingCarData4FirstPlace', res.data.Data);
        commit('setCurShoppingCarDataBeforeFirstPlace', list);
        return true;
      }
      return false;
    },
  },
};
