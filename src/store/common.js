/* eslint-disable object-curly-newline */
import api from '@/api/index';

export default {
  namespaced: true,
  state: {
    /** 工艺关系列表信息
    ---------------------------------------- */
    CraftRelationList: [],
    /** 单位类型列表
    ---------------------------------------- */
    UnitTypeList: [
      {
        label: '米',
        value: 11,
      },
      {
        label: '厘米',
        value: 12,
      },
      {
        label: '毫米',
        value: 13,
      },
      {
        label: '专版印张数量',
        value: 15,
      },
      {
        label: '平方米',
        value: 21,
      },
      {
        label: '平方厘米',
        value: 22,
      },
      {
        label: '平方毫米',
        value: 23,
      },
      {
        label: '克',
        value: 31,
      },
      {
        label: '盎司',
        value: 32,
      },
      {
        label: '吨',
        value: 33,
      },
      {
        label: '丝',
        value: 34,
      },
      {
        label: '千克',
        value: 35,
      },
      {
        label: 'P',
        value: 41,
      },
      {
        label: '个',
        value: 42,
      },
      {
        label: '根/条/束',
        value: 43,
      },
      {
        label: '块',
        value: 44,
      },
      {
        label: '令',
        value: 45,
      },
      {
        label: '套',
        value: 46,
      },
      {
        label: '面',
        value: 47,
      },
      {
        label: '款',
        value: 60,
      },
      {
        label: '模位',
        value: 61,
      },
      {
        label: '总量',
        value: 62,
      },
      {
        label: '增量',
        value: 63,
      },
      {
        label: '大版占位单价',
        value: 64,
      },
      {
        label: '盒',
        value: 151,
      },
      {
        label: '张',
        value: 152,
      },
      {
        label: '本',
        value: 153,
      },
      {
        label: '件',
        value: 154,
      },
      {
        label: '副',
        value: 155,
      },
      {
        label: '包',
        value: 156,
      },
      {
        label: '幅',
        value: 157,
      },
      {
        label: '自定义',
        value: 255,
      },
    ],
    /** 配送列表
    ---------------------------------------- */
    ExpressList: [],
    /** 地址列表
    ---------------------------------------- */
    addressList: [],
    /** 客户信息
    ---------------------------------------- */
    customerInfo: null,
    /** 客户子账号列表
    ---------------------------------------- */
    customerAccountList: [],
    /** 客户资金余额
    ---------------------------------------- */
    customerBalance: null,
    /** 客户账单交易类型筛选方式列表
    ---------------------------------------- */
    TransactionTypeList: [
      {
        label: '所有',
        value: '',
      },
      {
        label: '充值',
        value: '11',
      },
      {
        label: '支出',
        value: '21',
      },
    ],
    /** 客户账单交易渠道列表
    ---------------------------------------- */
    formatTransactionCurrencyList: [
      { name: '不限', ID: '' },
      { name: '余额', ID: 1 },
      { name: '支付宝', ID: 3 },
      { name: '微信支付', ID: 4 },
      { name: '物流代收', ID: 5 },
      { name: '退款', ID: 12 },
      { name: '返现', ID: 15 },
      { name: '手动入账', ID: 16 },
      { name: '手动扣款', ID: 23 },
      { name: '支付订单', ID: 24 },
    ],
    /* 订单状态列表
    -------------------------------*/
    OrderStatusList: [
      { label: '不限', value: '' },
      { label: '待分发', value: 20 },
      { label: '待审稿', value: 30 },
      { label: '待拼版', value: 40 },
      { label: '待生产', value: 50 },
      { label: '生产中', value: 55 },
      { label: '生产完成', value: 60 },
      { label: '已揽收', value: 70 },
      { label: '已发货', value: 80 },
      { label: '交易成功', value: 200 },
      { label: '已取消', value: 254 },
      { label: '已过期', value: 255 },
      { label: '问题件', value: 35 },
    ],
    /* 订单状态列表 --- 包裹列表专用
    -------------------------------*/
    OrderStatusList4PackageList: [
      { label: '不限', value: 0 },
      { label: '待分发', value: 20 },
      { label: '待审稿', value: 30 },
      { label: '待拼版', value: 40 },
      { label: '待生产', value: 50 },
      { label: '生产中', value: 55 },
      { label: '未揽收', value: 60 },
      { label: '已揽收', value: 70 },
      { label: '已发货', value: 80 },
      { label: '交易成功', value: 200 },
      { label: '已取消', value: 254 },
      { label: '已过期', value: 255 },
      { label: '问题件', value: 35 },
    ],
  },
  getters: {
  },
  mutations: {
    /** 设置工艺条件信息
    ---------------------------------------- */
    setCraftRelationList(state, data) {
      state.CraftRelationList = data;
    },
    /** 设置客户信息
    ---------------------------------------- */
    setCustomerInfo(state, data) {
      state.customerInfo = data;
      if (!data || !data.FundInfo) return;
      const { Amount } = data.FundInfo;
      if ((Amount || Amount === 0) && Amount !== state.customerBalance) state.customerBalance = Amount;
    },
    SetDefaultAddress(state, AddressID) {
      if (!state.customerInfo || !state.customerInfo.Address || state.customerInfo.Address.length === 0) return;
      state.customerInfo.Address.forEach(it => {
        const _it = it;
        _it.IsDefault = false;
      });
      const _t = state.customerInfo.Address.find(it => it.AddressID === AddressID);
      _t.IsDefault = true;
    },
    handleDelAddressOnStore(state, AddressID) {
      if (!state.customerInfo || !state.customerInfo.Address || state.customerInfo.Address.length === 0) return;
      state.customerInfo.Address = state.customerInfo.Address.filter(it => it.AddressID !== AddressID);
    },
    handleAddOrEditAddressOnStore(state, [obj, type]) {
      if (!state.customerInfo || !state.customerInfo.Address || !obj) return;
      if (type === 'add') state.customerInfo.Address.push(JSON.parse(JSON.stringify(obj)));
      else if (type === 'edit') {
        const { AddressID } = obj;
        const _t = state.customerInfo.Address.find(it => it.AddressID === AddressID);
        // eslint-disable-next-line max-len
        const { AddressDetail, Consignee, ExpressArea, CustomerID, HavePosition, IsDefault, Latitude, Longitude, Mobile } = obj;
        _t.Consignee = Consignee;
        _t.Mobile = Mobile;
        _t.CustomerID = CustomerID;
        _t.AddressDetail = AddressDetail;
        _t.HavePosition = HavePosition;
        _t.IsDefault = IsDefault;
        _t.Latitude = Latitude;
        _t.Longitude = Longitude;
        const { RegionalName, RegionalID, CityName, CityID, CountyName, CountyID } = ExpressArea;
        _t.ExpressArea.RegionalName = RegionalName;
        _t.ExpressArea.RegionalID = RegionalID;
        _t.ExpressArea.CityName = CityName;
        _t.ExpressArea.CityID = CityID;
        _t.ExpressArea.CountyName = CountyName;
        _t.ExpressArea.CountyID = CountyID;
      }
    },
    /** 设置客户子账号列表
    ---------------------------------------- */
    setCustomerAccountList(state, data) {
      state.customerAccountList = data;
    },
    /** 设置客户资金余额
    ---------------------------------------- */
    setCustomerBalance(state, balance) {
      state.customerBalance = balance;
    },
    /** 设置配送列表
    ---------------------------------------- */
    setExpressList(state, data) {
      state.ExpressList = data;
    },
    /** 地址列表
    ---------------------------------------- */
    setAddressList(state, data) {
      state.addressList = data;
    },
  },
  actions: {
    async getCraftRelationList({ state, commit }) {
      if (state.CraftRelationList.length > 0) return;
      const res = await api.getCraftRelationList();
      if (res.data.Status === 1000) {
        commit('setCraftRelationList', res.data.Data);
      }
    },
    async getCustomerDetail({ state, commit }) { // 获取账号基本信息
      if (state.customerInfo) return;
      const res = await api.getCustomerDetail();
      if (res.data.Status === 1000) {
        commit('setCustomerInfo', res.data.Data);
      }
    },
    async getCustomerFundBalance({ commit }) {
      const res = await api.getCustomerFundBalance();
      if (res.data.Status === 1000) {
        commit('setCustomerBalance', res.data.Data);
      }
    },
    async getExpressList({ state, commit }) {
      if (state.ExpressList.length > 0) return;
      const res = await api.getExpressList();
      if (res.data.Status === 1000) {
        commit('setExpressList', res.data.Data);
      }
    },
    async getAddressIDList({ state, commit }, parent = undefined) {
      if (state.addressList.length > 0) return;
      const res = await api.getAddressIDList(parent);
      if (res.data.Status === 1000) {
        commit('setAddressList', res.data.Data);
      }
    },
    async getCustomerAccountList({ state, commit }, key = false) {
      if (state.customerAccountList.length > 0 && !key) return;
      const res = await api.getCustomerAccountList();
      if (res.data.Status === 1000) {
        commit('setCustomerAccountList', res.data.Data);
      }
    },
  },
};
