import axios from 'axios';
import { Loading, Message } from 'element-ui';
import router from '@/router';
import store from '../store';
import messageBox from '../assets/js/utils/message';

let loadingInstance;
let closeTip = false;
axios.interceptors.request.use(
  (config) => {
    const curConfig = config;
    // console.log(curConfig);
    const token = sessionStorage.getItem('token');
    closeTip = curConfig.closeTip;
    const url = curConfig.url.split('?')[0];
    const arrWithOutToken = ['/Api/Sms/Send', '/Api/Customer/Reg', '/Api/Customer/Login'];
    // console.log(curConfig, `Bearer ${token}`);
    if (token && !arrWithOutToken.includes(url)) curConfig.headers.common.Authorization = `Bearer ${token}`;
    // console.log(curConfig);
    let key = true;
    const arr = []; // 不需要展示loading的api地址
    for (let i = 0; i < arr.length; i += 1) {
      if (curConfig.url.includes(arr[i]) || store.state.common.isLoading) {
        key = false;
      }
    }
    if (key) {
      loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.3)',
        customClass: 'mp-general-loading-box',
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
    const _list2NotNeed2Toast = [];
    const _statusList2NotNeed2Toast = [1000, 9062];
    // 包含以上的状态码 或 以上的请求路径  不会弹窗报错  其余以外都会报错出来

    // eslint-disable-next-line max-len
    if (!_statusList2NotNeed2Toast.includes(response.data.Status) && !_list2NotNeed2Toast.includes(response.config.url.split('?')[0]) && !closeTip) {
      const _obj = { msg: `[ ${response.data.Message} ]` };
      if ([7025, 8037].includes(response.data.Status)) _obj.successFunc = () => router.replace('/login');
      else _obj.successFunc = undefined;
      messageBox.warnSingleError(_obj);
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
            messageBox.failSingleError({ msg: '[ 错误 401：请重新登录! ]', successFunc: () => router.replace('/login') });
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
            messageBox.failSingleError({ msg: `[ 错误 413：${buffterErr} ]` });
            key = true;
            break;
          default:
            messageBox.warnSingleError({ msg: `[ 错误代码${error.response.status}：${error.response.statusText}]` });
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
        // console.log(error, error.response);
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
