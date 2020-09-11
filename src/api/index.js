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
};

export default api;
