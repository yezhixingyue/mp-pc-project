import axios from 'axios';
import { Loading, Message } from 'element-ui';
import router from '@/router';
import store from '../store';
import messageBox from '../assets/js/utils/message';

let loadingInstance;
let closeTip = false;
let closeLoading = false;
axios.interceptors.request.use(
  (config) => {
    const curConfig = config;
    let token = sessionStorage.getItem('token');
    if (!token) token = localStorage.getItem('token');
    closeTip = curConfig.closeTip;
    closeLoading = curConfig.closeLoading;
    const url = curConfig.url.split('?')[0];
    const arrWithOutToken = ['/Api/Customer/Reg', '/Api/Customer/Login'];
    if (token && !arrWithOutToken.includes(url)) curConfig.headers.common.Authorization = `Bearer ${token}`;
    let key = true;
    const arr = ['/Api/Order/Create', '/Api/PaymentOrder/PayResult', '/Api/Upload/File']; // 不需要展示loading的api地址
    for (let i = 0; i < arr.length; i += 1) {
      if (curConfig.url.includes(arr[i]) || store.state.common.isLoading) {
        key = false;
      }
    }
    if (key && !closeLoading) {
      // let _color = 'rgba(0, 0, 0, 0.4)';
      let _color = 'rgba(255, 255, 255, 0.5)';
      let _text = '加载中';
      let _customClass = 'mp-general-loading-box opAnimate';
      // console.log(url);
      if (url === '/Api/Quotation/Save' || url === '/Api/Order/Create') {
        _color = 'rgba(0, 0, 0, 0.7)';
        _text = '上传完成，正在提交...';
        _customClass = 'mp-general-loading-box';
      }
      if (url === '/Api/Customer/CouponList') _text = '优惠券信息获取中...';
      if (url === '/Api/Express/ValidList') _text = '获取可用配送方式列表...';
      if (url === '/Api/Product/GetProductDetail') _text = '正在获取产品信息...';
      if (url === '/Api/Quotation/List') _text = '正在获取购物车信息...';
      if (url === '/Api/Product/ProductList') _text = '获取产品列表信息...';
      // console.log(url, closeLoading);
      loadingInstance = Loading.service({
        lock: true,
        text: _text,
        spinner: 'el-icon-loading',
        background: _color,
        customClass: _customClass,
      });
    }
    return curConfig;
  },
  (error) => {
    if (loadingInstance) loadingInstance.close();
    messageBox.failSingleError({ msg: error });
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    if (loadingInstance) loadingInstance.close();
    // eslint-disable-next-line max-len
    const _list2NotNeed2Toast = ['/Api/Calculate/ProductPrice', '/Api/Order/Create', '/Api/AfterSales/Excel', '/Api/Customer/OrderExcel'];
    const _statusList2NotNeed2Toast = [1000, 9062, 9169];
    // 包含以上的状态码 或 以上的请求路径  不会弹窗报错  其余以外都会报错出来

    const _url = response.config.url.split('?')[0];

    if ([7025, 8037].includes(response.data.Status)) {
      Message({
        showClose: true,
        message: `${response.data.Message}`,
        type: 'error',
      });
      router.replace('/login');
      sessionStorage.removeItem('token');
      localStorage.removeItem('token');
      return response;
    // eslint-disable-next-line max-len
    } if ((!_statusList2NotNeed2Toast.includes(response.data.Status) && !_list2NotNeed2Toast.includes(_url) && (!closeTip)) || [7025, 8037].includes(response.data.Status)) {
      const _obj = { msg: `[ ${response.data.Message} ]` };
      if ([7025, 8037].includes(response.data.Status)) {
        _obj.successFunc = () => {
          router.replace('/login');
          sessionStorage.removeItem('token');
          localStorage.removeItem('token');
        };
      } else {
        _obj.successFunc = undefined;
      }
      let _msg = '错误';
      if (_url === '/Api/Customer/Login') _msg = '登录失败';
      if (_url === '/Api/Customer/Reg') _msg = '注册失败';
      if (_url === '/Api/Sms/Send/VerificationCode') _msg = '验证失败';
      if (_url === '/Api/FindPassword/ResetPassword') _msg = '重置密码失败';
      if (_url === '/Api/Customer/ChangePassword') _msg = '密码修改失败';
      if (_url === '/Api/Coupon/Activate') _msg = '激活失败';
      if (_url === '/Api/Order/Create' || _url === '/Api/Order/PreCreate') _msg = '下单失败';
      if (_url === '/Api/FindPassword/CheckCode') _msg = '验证码错误';
      if (_url === '/Api/Coupon/Receive') _msg = '领取失败';
      if (_url === '/Api/Quotation/Save') _msg = '添加失败';
      if (_url === '/Api/Upload/File') _msg = '文件上传失败';

      _obj.title = _msg;
      messageBox.failSingleError(_obj);
    }
    return response;
  },
  async (error) => {
    if (!store.state.common.isLoading) {
      if (loadingInstance) loadingInstance.close();
      if (error.response) {
        let key = false;
        let b;
        let r;
        let buffterRes;
        let buffterErr = '文件导出数据过大，请缩小导出时间区间或精确筛选条件';
        switch (error.response.status) {
          case 401:
            router.replace('/login');
            sessionStorage.removeItem('token');
            localStorage.removeItem('token');
            key = true;
            break;
          case 413: // 处理文件导出错误
            b = new Blob([error.response.data]);
            r = new FileReader();
            r.readAsText(b, 'utf-8');
            buffterRes = await new Promise(resolve => { r.onload = res => resolve(res); });
            if (buffterRes && buffterRes.currentTarget && buffterRes.currentTarget.result) {
              buffterErr = buffterRes.currentTarget.result;
            }
            messageBox.failSingleError({ msg: `${buffterErr}`, title: '导出失败' });
            key = true;
            break;
          default:
            // eslint-disable-next-line max-len
            messageBox.failSingleError({ title: '操作失败', msg: `${error.response.data && error.response.data.Message ? error.response.data.Message : error.response.statusText}` });
            key = true;
            break;
        }
        if (key) return Promise.reject(error.response);
      }
      if (error.message === 'Network Error') {
        Message({
          showClose: true,
          message: '网络错误',
          type: 'error',
        });
      } else if (error.message.includes('timeout')) {
        Message({
          showClose: true,
          message: '网络超时',
          type: 'error',
        });
      } else if (error.response && error.response.status === 404) {
        Message({
          showClose: true,
          message: '404错误',
          type: 'error',
        });
      } else {
        let msg = '未知错误';
        if (error.response && error.response.data && error.response.data.Message) {
          msg = error.response.data.Message;
        }
        Message({
          showClose: true,
          message: msg,
          type: 'error',
        });
      }
    }
    return Promise.reject(error);
  },
);

export default axios;
