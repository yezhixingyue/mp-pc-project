/* eslint-disable max-len */
// eslint-disable-next-line import/no-cycle
import instance from '@/api/axios';

const api = {
  /* 登录注册部分 与 账号相关等 api
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
  getCustomerChangeMobile(data) { // POST /Api/Customer/ChangeMobile  修改手机号
    return instance.post('/Api/Customer/ChangeMobile', data);
  },
  getCustomerChangePassword(data) { // PUT /Api/Customer/ChangePassword
    return instance.put('/Api/Customer/ChangePassword', data);
  },
  getCustomerAccountList() { // GET /Api/Customer/AccountList 获取子账号列表
    return instance.get('/Api/Customer/AccountList');
  },
  getCustomerEditSubAccount(data) { // POST /Api/Customer/EditSubAccount 添加编辑子账号
    return instance.post('/Api/Customer/EditSubAccount', data);
  },
  getCustomerRemoveAccount(accountID) { // DELETE /Api/Customer/RemoveAccount 子账号删除
    return instance.delete(`/Api/Customer/RemoveAccount?accountID=${accountID}`);
  },
  getCustomerRemoveAddress(addressID) { // DELETE /Api/Customer/RemoveAddress 收货地址删除
    return instance.delete(`/Api/Customer/RemoveAddress?addressID=${addressID}`);
  },
  getCustomerSetDefaultAddress(data) { // PUT /Api/Customer/SetDefaultAddress  设置客户默认收货地址
    return instance.put('/Api/Customer/SetDefaultAddress', data);
  },

  /* 产品报价及下单部分api
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
  getOrderPreCreate(data) { // POST /Api/Order/PreCreate  直接下单 - 预下单
    const { closeTip } = data;
    return instance.post('/Api/Order/PreCreate', data, { closeTip });
  },
  getQuotationSave(data) { // POST /Api/Quotation/Save  保存购物车
    return instance.post('/Api/Quotation/Save', data);
  },
  CreateOrderFromPreCreate(data) { // POST /Api/Order/Create
    return instance.post('/Api/Order/Create', data);
  },
  getPayResult(payCode, type) { // GET /Api/PaymentOrder/PayResult 查询付款结果
    if (!type) return instance.get(`/Api/PaymentOrder/PayResult?payCode=${payCode}`);
    return instance.get(`/Api/PaymentOrder/PayResult?payCode=${payCode}&type=${type}`);
  },
  getCustomerShortCutList() { // GET /Api/Customer/ShortCut/List 快捷方式列表
    return instance.get('/Api/Customer/ShortCut/List');
  },
  getCustomerShortCutSave(data) { // POST /Api/Customer/ShortCut/Save
    return instance.post('/Api/Customer/ShortCut/Save', data);
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
  getCustomerFundBalance() { // GET /Api/Customer/FundBalance 获取账号资金余额
    return instance.get('/Api/Customer/FundBalance');
  },
  getCustomerApplyAuthentication(data) { // POST /Api/Customer/ApplyAuthentication 申请认证
    return instance.post('/Api/Customer/ApplyAuthentication', data);
  },
  getCustomerRecharge(data) { // POST /Api/Customer/Recharge 客户充值
    return instance.post('/Api/Customer/Recharge', data);
  },

  /* 图片与文件上传api
   ----------------------------------------------------------------------------------- */
  uploadImage(data) { // 图片上传  POST /Api/Upload/Image
    const formData = new FormData();
    formData.append('file', data);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return instance.post('/Api/Upload/Image?type=1', formData, config);
  },
  UploadBigImgNormal(data, uniqueName, onUploadProgressFunc) { // 非断点上传方式上传文件
    const formData = new FormData();
    formData.append('file', data);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: onUploadProgressFunc && onUploadProgressFunc,
    };
    return instance.post(`/Api/Upload/WholeFile?uniqueName=${uniqueName}`, formData, config);
  },
  getUploadedProgress(uniqueName) { // 获取断点续传文件已上传的位置  GET /Api/FileNode
    console.log('getUploadedProgress', uniqueName);
    return instance.get(`/Api/FileNode?uniqueName=${uniqueName}`);
  },
  UploadFileBreakpointResume(data, uniqueName, first, last, length, onUploadProgressFunc) { // 断点续传上传文件 /Api/Upload/File
    const formData = new FormData();
    formData.append('file', data);
    const config = {
      headers: {
        'Content-Range': `bytes ${first}-${last}/${length}`,
      },
      onUploadProgress: onUploadProgressFunc && onUploadProgressFunc,
    };
    return instance.post(`/Api/Upload/File?uniqueName=${uniqueName}`, formData, config);
  },

  /* 购物车部分 api
   ----------------------------------------------------------------------------------- */
  getQuotationList() { // GET /Api/Quotation/List 获取购物车数据列表
    return instance.get('/Api/Quotation/List');
  },
  getQuotationRemove({ preOrderID, closeTip }) { // DELETE /Api/Quotation/Remove
    return instance.delete(`/Api/Quotation/Remove?preOrderID=${preOrderID}`, { closeTip });
  },

  /* 账单部分 api
   ----------------------------------------------------------------------------------- */
  getCustomerFundBill(data) { // /Api/Customer/FundBill 获取账单流水
    return instance.post('/Api/Customer/FundBill', data);
  },
};

export default api;
