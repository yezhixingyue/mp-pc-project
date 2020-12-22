<template>
  <el-form :model="ruleForm" :rules="rules"
    ref="ruleForm" label-width="0px" class="demo-ruleForm">
    <el-form-item prop="Mobile">
      <el-input placeholder="请输入手机号码" clearable v-model.trim="Mobile">
          <i slot="prefix" class="iconfont icon-shouji"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="Password">
      <el-input
       placeholder="请输入密码"
       type="password"
       clearable
       v-model.trim="Password"
       @focus="onPwdFocus"
       @keyup.enter.native="submitForm('ruleForm')"
       >
        <i slot="prefix" class="iconfont icon-mima"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="rememberPwd" class="rememberPwd-box">
      <el-checkbox-group v-model="ruleForm.rememberPwd">
        <el-checkbox label="自动登录" name="rememberPwd"></el-checkbox>
      </el-checkbox-group>
      <span class="span-title-blue" @click="go2FundPwd">找回密码</span>
    </el-form-item>
    <!-- <p>{{ msg }}</p> -->
    <el-form-item>
      <el-button type="primary" :disabled='!disableLogin' @click="submitForm('ruleForm')">登录</el-button>
      <p><span class="span-title-blue" @click="() => this.$emit('changePanel', 'second')">新用户注册</span></p>
    </el-form-item>
  </el-form>
</template>

<script>
import { Base64 } from 'js-base64';

export default {
  data() {
    const validateMobile = (rule, value, callback) => {
      if (this.validateCheck(value, this.defineRules.Mobile, callback)) callback();
    };
    const validatePassword = (rule, value, callback) => {
      if (this.validateCheck(value, this.defineRules.Password, callback)) callback();
    };
    return {
      ruleForm: {
        Mobile: '',
        Password: '',
        rememberPwd: true,
      },
      rules: {
        Mobile: [
          { validator: validateMobile, trigger: 'blur' },
        ],
        Password: [
          { validator: validatePassword, trigger: 'blur' },
        ],
      },
      defineRules: {
        Mobile: [
          { strategy: 'isNotEmpty', errorMsg: '请输入手机号!' },
          { strategy: 'shouldLength:11', errorMsg: '请输入11位手机号码' },
          { strategy: 'isPhone', errorMsg: '手机号码格式不正确' },
        ],
        Password: [
          { strategy: 'isNotEmpty', errorMsg: '请输入密码!' },
          { strategy: 'minLength:6', errorMsg: '密码最小长度为6位' },
          { strategy: 'maxLength:16', errorMsg: '密码最大长度为16位' },
        ],
      },
      rememberInfo: {
        Password: '',
        timeStamp: '',
      },
      isRemember: false,
      // msg: '123',
      repath: '/placeOrder',
    };
  },
  computed: {
    Mobile: {
      get() {
        return this.ruleForm.Mobile;
      },
      set(newVal) {
        this.ruleForm.Mobile = newVal.replace(/[^\d.]/g, '');
        this.ruleForm.Password = '';
        if (this.isRemember) this.isRemember = false;
      },
    },
    Password: {
      get() {
        return this.ruleForm.Password;
      },
      set(newVal) {
        this.ruleForm.Password = newVal;
        if (this.isRemember) this.isRemember = false;
      },
    },
    disableLogin() {
      if (this.Mobile && this.Mobile.length === 11 && this.Password && this.Password.length >= 6) return true;
      return false;
    },
  },
  methods: {
    handleSuccessLogin(token, rememberPwd, pwd) {
      this.$store.commit('Quotation/clearStateForNewCustomer');
      this.$store.commit('common/clearStateForNewCustomer');
      this.$store.commit('order/clearStateForNewCustomer');
      this.$store.commit('shoppingCar/clearStateForNewCustomer');
      this.$store.commit('summary/clearStateForNewCustomer');
      this.$store.commit('unpayList/clearStateForNewCustomer');
      // sessionStorage.removeItem('customerInfo');
      sessionStorage.removeItem('couponCenterData');
      sessionStorage.setItem('token', token);
      if (rememberPwd) {
        const _obj2Keep = { ...this.ruleForm };
        _obj2Keep.Password = pwd;
        _obj2Keep.timeStamp = Date.now();
        localStorage.setItem('info', JSON.stringify(_obj2Keep));
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('info');
        localStorage.removeItem('token');
      }
      // this.$router.push(`${this.repath}`);
      this.$router.push('/placeOrder');
    },
    handleFailLogin(status) {
      localStorage.removeItem('info');
      localStorage.removeItem('token');
      if (status === 8017) this.ruleForm.Password = '';
      if (this.isRemember) this.isRemember = false;
    },
    async submitForm(formName) {
      sessionStorage.removeItem('customerInfo');
      if (this.isRemember) {
        const { Mobile, rememberPwd } = this.ruleForm;
        const Password = `${this.rememberInfo.Password}`;
        const obj = { Mobile, Password, Terminal: 1 };
        this.$emit('setPanelLoading', [true, '正在登录中...']);
        const res = await this.api.getLogin(obj);
        this.$emit('setPanelLoading', [false, '']);
        if (res.data.Status === 1000) {
          this.handleSuccessLogin(res.data.Data, rememberPwd, Password);
        } else {
          this.handleFailLogin();
        }
      } else {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
          // 成功
            const { Mobile, Password, rememberPwd } = this.ruleForm;
            const pwd = Base64.encode(Password);
            const _obj = { Mobile, Password: pwd, Terminal: 1 };
            this.$emit('setPanelLoading', [true, '正在登录中...']);
            const res = await this.api.getLogin(_obj);
            this.$emit('setPanelLoading', [false, '']);
            if (res.data.Status === 1000) {
              this.handleSuccessLogin(res.data.Data, rememberPwd, _obj.Password);
            } else {
              this.handleFailLogin(res.data.Status);
            }
          }
          return false;
        });
      }
    },
    go2FundPwd() {
      this.$router.push('/findPassword');
    },
    onPwdFocus() {
      if (this.isRemember) {
        this.ruleForm.Password = '';
        this.isRemember = false;
      }
    },
  },
  mounted() {
    const info = localStorage.getItem('info');
    if (info) {
      const temp = JSON.parse(info);
      if (temp && Object.prototype.toString.call(temp) === '[object Object]') {
        const {
          Mobile, Password, rememberPwd, timeStamp,
        } = temp;
        if (Date.now() - temp.timeStamp < 24 * 60 * 60 * 60 * 1000 * 30) {
          this.ruleForm.Mobile = Mobile;
          this.ruleForm.rememberPwd = rememberPwd;
          this.ruleForm.Password = '******';
          this.rememberInfo.Password = Password;
          this.rememberInfo.timeStamp = timeStamp;
          this.isRemember = true;
        }
      }
    }
    if (this.$route.query.redirect) {
      this.repath = this.$route.query.redirect;
    }
  },
};
</script>

<style>

</style>
