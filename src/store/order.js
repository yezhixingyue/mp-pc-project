/* eslint-disable object-curly-newline */
import api from '@/api';
import CommonClassType from './CommonClassType';
// import { Message } from 'element-ui';
// import massage from '@/assets/js/utils/message';
// import asyncNonCurrentFunc from '../assets/js/utils/asyncNonCurrentFunc';

export default {
  namespaced: true,
  state: {
    /** 账单页面相关
    ---------------------------------------- */
    OrderList: [], // --------- 账单信息列表
    OrderListNumber: 0,
    condition4OrderList: {
      Date: {
        First: '',
        Second: '',
      },
      DateType: 'today',
      ProductClass: {
        First: '',
        Second: '',
      },
      ProductID: '',
      Page: 1,
      PageSize: 20,
      Status: '',
      KeyWords: '',
    },
  },
  getters: {
  },
  mutations: {
    /** 设置账单信息列表
    ---------------------------------------- */
    setOrderList(state, [list, num]) {
      state.OrderList = list;
      if (num || num === 0) state.OrderListNumber = num;
    },
    setCondition4OrderList(state, [[key1, key2], value]) {
      if (key2) state.condition4OrderList[key1][key2] = value;
      else state.condition4OrderList[key1] = value;
    },
    setDate4ConditionDate(state, key) {
      CommonClassType.setDate(state[key]);
    },
  },
  actions: {
    /** 账单页面相关
    ---------------------------------------- */
    async getOrderList({ state, commit }, page = 1) {
      commit('setCondition4OrderList', [['Page', ''], page]);
      commit('setOrderList', [[], undefined]);
      commit('setDate4ConditionDate', 'condition4OrderList');
      const _obj = CommonClassType.filter(state.condition4OrderList);
      const res = await api.getCustomerOrderList(_obj);
      if (res.data.Status === 1000) {
        commit('setOrderList', [res.data.Data, res.data.DataNumber]);
      }
    },
  },
};
