/* eslint-disable object-curly-newline */
import api from '@/api';
import ClassType from './ClassType';
// import { Message } from 'element-ui';
// import massage from '@/assets/js/utils/message';
// import asyncNonCurrentFunc from '../assets/js/utils/asyncNonCurrentFunc';

export default {
  namespaced: true,
  state: {
    /** 账单页面相关
    ---------------------------------------- */
    FundBillList: [], // --------- 账单信息列表
    FundBillListNumber: 0,
    condition4FundBillList: {
      Date: {
        First: '',
        Second: '',
      },
      DateType: 'today',
      Page: 1,
      PageSize: 20,
      Type: '',
    },
  },
  getters: {
  },
  mutations: {
    /** 设置账单信息列表
    ---------------------------------------- */
    setFundBillList(state, [list, num]) {
      state.FundBillList = list;
      if (num || num === 0) state.FundBillListNumber = num;
    },
    setCondition4FundBillList(state, [[key1, key2], value]) {
      if (key2) state.condition4FundBillList[key1][key2] = value;
      else state.condition4FundBillList[key1] = value;
    },
    setDate4ConditionDate(state, key) {
      ClassType.setDate(state[key]);
    },
  },
  actions: {
    /** 账单页面相关
    ---------------------------------------- */
    async getFundBillList({ state, commit }, page = 1) {
      commit('setCondition4FundBillList', [['Page', ''], page]);
      commit('setFundBillList', [[], undefined]);
      commit('setDate4ConditionDate', 'condition4FundBillList');
      const _obj = ClassType.filter(state.condition4FundBillList);
      const res = await api.getCustomerFundBill(_obj);
      if (res.data.Status === 1000) {
        commit('setFundBillList', [res.data.Data, res.data.DataNumber]);
      }
    },
  },
};
