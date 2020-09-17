/* eslint-disable max-len */
// eslint-disable-next-line import/no-cycle
import instance from '@/api/axios';

const api = {
  /* 登录注册部分api
  ----------------------------------------------------------------------------------- */
  getLogin(data) { // POST /Api/Customer/Login
    return instance.post('/Api/Customer/Login', data);
  },
  getSmsCode(Mobile, Type = 0) {
    return instance.post('/Api/Sms/Send', { Mobile, Type });
  },
  getReg(data) { // POST /Api/Customer/Reg
    return instance.post('/Api/Customer/Reg', data);
  },
  getCheckCode(data) { // 验证重置短信息
    return instance.post('/Api/FindPassword/CheckCode', data);
  },
  getResetPassword(data) { // 重置密码
    return instance.post('/Api/FindPassword/ResetPassword', data);
  },

  /* 产品报价部分api
  ----------------------------------------------------------------------------------- */
  getProductClassify() { // 获取产品分类
    return instance.post('/Api/Constant/VersionValid', { Key: 6 });
  },
  getProductLists() { // 获取列表头部产品第三级列表
    return instance.post('/Api/Product/ProductList', {
      FieldType: 1,
      TakeOrderWay: 1,
    });
  },
  getProductDetail(productID) { // 根据产品ID获取到产品详细信息  GET /Api/Product/GetProductDetail  productID
    return instance.get(
      `/Api/Product/GetProductDetail?productID=${productID}&placeOrder=${true}`,
    );
  },
  getProductPrice(data) { // 价格信息计算  POST /Api/Calculate/ProductPrice
    return instance.post('/Api/Calculate/ProductPrice', data);
  },
  getCraftRelationList() { // GET /Api/Craft/GetCraftRelationList 获取工艺关系列表
    return instance.get('/Api/Craft/GetCraftRelationList');
  },

  /* 优惠券部分api
  ----------------------------------------------------------------------------------- */
  getCouponList(data) { // POST /Api/Customer/CouponList  下单界面使用
    return instance.post('/Api/Customer/CouponList', { FieldType: 3, OrderType: 2, ...data });
  },
  getMyCoupon(data) { // POST /Api/Customer/MyCoupon    --- UseStatus：  0 未使用  1 已使用  2 已过期
    return instance.post('/Api/Customer/MyCoupon', { FieldType: 1, OrderType: 2, ...data });
  },
  getCouponActivate(data) { // POST /Api/Coupon/Activate    优惠券激活
    return instance.post('/Api/Coupon/Activate', data);
  },

  /* 客户信息 配送方式 等公共部分api
  ----------------------------------------------------------------------------------- */
  getCustomerDetail() { // GET /Api/Customer/Detail  客户基础信息
    return instance.get('/Api/Customer/Detail');
  },
  getExpressList(data) { // 获取配送方式
    return instance.get('/Api/Express/List', data);
  },
  getAddressIDList(data) { // 查询地址ID
    return instance.get(`/Api/District/List?parentID=${data}`);
  },
};

export default api;
