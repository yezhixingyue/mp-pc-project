/* eslint-disable object-curly-newline */
import api from '@/api';
import ClassType from './CommonClassType';
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
      PageSize: 12,
      Type: '',
    },
    /** 售后单页面相关
    ---------------------------------------- */
    ServiceAfterSaleList: [], // --------- 售后信息列表
    ServiceAfterSaleListNumber: 0,
    condition4ServiceAfterSaleList: {
      Date: {
        First: '',
        Second: '',
      },
      DateType: 'today',
      Page: 1,
      PageSize: 12,
      FieldType: 3,
    },
    editFeedbackData: null, // 问题反馈编辑信息
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
    /** 设置售后单信息列表
    ---------------------------------------- */
    setServiceAfterSaleList(state, [list, num]) {
      state.ServiceAfterSaleList = list;
      if (num || num === 0) state.ServiceAfterSaleListNumber = num;
    },
    setCondition4ServiceAfterSaleList(state, [[key1, key2], value]) {
      if (key2) state.condition4ServiceAfterSaleList[key1][key2] = value;
      else state.condition4ServiceAfterSaleList[key1] = value;
    },
    // setDate4ConditionDate(state, key) {
    //   ClassType.setDate(state[key]);
    // },
    setEditFeedbackData(state, data) { // 设置问题反馈编辑信息
      state.editFeedbackData = data;
    },
    /* 注销及登录状态清理
    -------------------------------*/
    clearStateForNewCustomer(state) {
      state.FundBillList = [];
      state.FundBillListNumber = 0;
      state.condition4FundBillList = {
        Date: {
          First: '',
          Second: '',
        },
        DateType: 'today',
        Page: 1,
        PageSize: 12,
        Type: '',
      };
      state.ServiceAfterSaleList = [];
      state.ServiceAfterSaleListNumber = 0;
      state.condition4ServiceAfterSaleList = {
        Date: {
          First: '',
          Second: '',
        },
        DateType: 'today',
        Page: 1,
        PageSize: 12,
        FieldType: 3,
      };
      state.editFeedbackData = null;
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
    /** 售后单页面相关
    ---------------------------------------- */
    async getServiceAfterSaleList({ state, commit }, page = 1) {
      commit('setCondition4ServiceAfterSaleList', [['Page', ''], page]);
      commit('setServiceAfterSaleList', [[], undefined]);
      commit('setDate4ConditionDate', 'condition4ServiceAfterSaleList');
      const _obj = ClassType.filter(state.condition4ServiceAfterSaleList);
      if (_obj.Date) {
        _obj.CreateTime = _obj.Date;
        delete _obj.Date;
      }
      const res = await api.getAfterSalesList(_obj);
      if (res.data.Status === 1000) {
        commit('setServiceAfterSaleList', [res.data.Data, res.data.DataNumber]);
      }
    },
  },
};
