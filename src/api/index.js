/* eslint-disable max-len */
// eslint-disable-next-line import/no-cycle
import instance from '@/api/axios';

const api = {
  /* 登录注册部分api
  ----------------------------------------------------------------------------------- */
  getLogin(data) { // POST /Api/Customer/Login
    return instance.post('/Api/Customer/Login', data);
  },
};

export default api;
