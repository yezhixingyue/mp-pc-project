<template>
  <section class="mp-pc-common-page-header-common-wrap float" :style="oStyles">
    <header>
      <div>
        <img src="../../assets/images/logo-color.png" alt />
        <span>会员中心</span>
      </div>
      <ul>
        <li>
          <a href="http://www.mpzj.cn/">首页</a>
        </li>
        <li>
          <a href="http://www.mpzj.cn/about_complex.aspx">关于我们</a>
        </li>
      </ul>
    </header>
    <footer>
      <div class="common-header-menus-wrap float">
        <ul class="menu-list float">
          <router-link tag="li" to="/placeOrder">
            <i class="iconfont icon-xiadan"></i>
            <span>下单</span>
          </router-link>
          <router-link tag="li" to="/shopping">
            <i class="iconfont icon-gouwuche"></i>
            <span>购物车</span>
          </router-link>
          <router-link tag="li" to="/unpay">
            <i class="iconfont icon-weifukuan"></i>
            <span>未付款</span>
          </router-link>
          <router-link tag="li" to="/order">
            <i class="iconfont icon-dingdan"></i>
            <span>订单</span>
          </router-link>
          <router-link tag="li" to="/serviceAfterSales">
            <i class="iconfont icon-shouhoudan"></i>
            <span>售后单</span>
          </router-link>
          <router-link tag="li" to="/bill">
            <i class="iconfont icon-zhangdan"></i>
            <span>账单</span>
          </router-link>
        </ul>
        <div class="customer-box" v-if="customerInfo">
          <span>
            <span>{{customerInfo.CustomerName}} </span>
            <i class="title">/ 余额：</i>
            <i class="price">￥{{customerBalance?customerBalance:0}}</i>
          </span>
          <el-button round @click="setShowRechange">在线充值</el-button>
          <el-dropdown trigger="click" @command='onCommand'>
            <span class="el-dropdown-link">
              {{formatMobile(customerInfo.Account.Mobile)}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" class="mp-pc-my-set-drop-down-wrap">
              <el-dropdown-item
                :class="{active: $route.name === 'mySettingAccount'}"
                command='account' icon="el-icon-user-solid">账户信息</el-dropdown-item>
              <el-dropdown-item
                :class="{active: $route.name === 'mySettingAddress'}"
                command='address' icon="el-icon-location">收货地址</el-dropdown-item>
              <el-dropdown-item
                :class="{active: $route.name === 'mySettingCouponCenter'}"
                command='couponCenter' icon="el-icon-s-goods">领券中心</el-dropdown-item>
              <el-dropdown-item
                :class="{active: $route.name === 'mySettingMyCoupons'}"
                command='myCoupons' icon="el-icon-s-claim">我的优惠券</el-dropdown-item>
              <el-dropdown-item
                :class="{active: $route.name === 'subAccountManage'}"
                command='subAccountManage' icon="el-icon-menu">子账号管理</el-dropdown-item>
              <el-dropdown-item
                :class="{active: $route.name === 'mySettingChangePwd'}"
                command='changePwd' icon="el-icon-s-help">修改密码</el-dropdown-item>
              <el-dropdown-item
                :class="{active: $route.name === 'mySettingChangeMobile'}"
                command='changeMobile' icon="el-icon-s-order">修改手机号</el-dropdown-item>
              <el-dropdown-item command='loginOut'>
                <span class="iconfont icon-tuichudenglu"></span>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </footer>
    <el-drawer
      :visible.sync="showRechange"
      :with-header="false"
      size='350px'
      direction="ttb"
      custom-class="mp-recharge-drawer-wrap"
      :before-close="setShowRechange">
      <div class="recharge-box" :class="showRechange? 'showRechange' : ''">
        <RechargeComp :showRechange='showRechange' @handleClose='setShowRechange' />
      </div>
    </el-drawer>
    <!-- <div class="recharge-remark" :class="{ show:showRemark, showBg: showRechange }"  @click.self='onRemarkClick'>
      <div class="recharge-box" :class="showRechange? 'showRechange' : ''">
        <RechargeComp :showRechange='showRechange' @handleClose='setShowRechange' />
      </div>
    </div> -->
  </section>
</template>

<script>
import { mapState } from 'vuex';
import RechargeComp from './RechargeComp.vue';

export default {
  components: {
    RechargeComp,
  },
  computed: {
    ...mapState('common', ['customerInfo', 'customerBalance']),
  },
  data() {
    return {
      showRechange: false,
      showRemark: false,
      oStyles: {
        zIndex: 1000,
      },
    };
  },
  methods: {
    formatMobile(mobile) {
      if (!mobile || mobile.length !== 11) return '';
      const _arr = mobile.split('');
      const _arr1 = _arr.map((it, i) => {
        if (i > 2 && i < 7) return '.';
        return it;
      });
      return _arr1.join('');
    },
    setShowRechange() {
      this.showRechange = !this.showRechange;
      if (this.showRechange) {
        this.$store.dispatch('common/getCustomerFundBalance');
        this.showRemark = true;
        // console.log('kai');
        this.oStyles.zIndex = 3000;
      }
      if (!this.showRechange) {
        this.oStyles.zIndex = 1000;
        setTimeout(() => {
          this.showRemark = false;
        }, 200);
      }
    },
    onRemarkClick() {
      this.setShowRechange();
    },
    onCommand(command) {
      console.log(command);
      if (command === 'loginOut') {
        this.messageBox.warnCancelNullMsg({
          title: '确定退出登录吗?',
          successFunc: () => {
            this.$router.replace('/login');
            sessionStorage.removeItem('token');
            // 另外再需清除状态
          },
        });
        return;
      }
      let _path = '';
      switch (command) {
        case 'account':
          _path = '/mySetting/account';
          break;
        case 'address':
          _path = '/mySetting/address';
          break;
        case 'couponCenter':
          _path = '/mySetting/couponCenter';
          break;
        case 'myCoupons':
          _path = '/mySetting/myCoupons';
          break;
        case 'subAccountManage':
          _path = '/mySetting/subAccountManage';
          break;
        case 'changePwd':
          _path = '/mySetting/changePwd';
          break;
        case 'changeMobile':
          _path = '/mySetting/changeMobile';
          break;
        default:
          break;
      }
      if (this.$route.path !== _path) this.$router.push(_path);
    },
  },
  mounted() {
    this.$store.dispatch('common/getCustomerDetail');
    this.$store.dispatch('common/getCustomerFundBalance');
  },
};
</script>

<style lang='scss'>
.mp-pc-common-page-header-common-wrap {
  user-select: none;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  width: 100%;
  z-index: 1000;
  > header {
    width: 1200px;
    height: 80px;
    margin: 0 auto;
    > div {
      float: left;
      > img {
        width: 143px;
        height: 34px;
        margin-top: 23px;
        margin-right: 25px;
        vertical-align: -66%;
      }
      > span {
        color: #585858;
        font-size: 18px;
      }
    }
    > ul {
      float: right;
      padding-right: 75px;
      > li {
        float: left;
        height: 80px;
        width: 120px;
        > a {
          height: 100%;
          width: 100%;
          color: #333;
          text-decoration: unset;
          font-size: 16px;
          text-align: center;
          display: block;
          line-height: 78px;
          transition: 0.3s;
        //   &::after {
        //     height: 2px;
        //     width: 0%;
        //     transition: 0.25s;
        //     background-color: rgb(66, 141, 250);
        //     position: absolute;
        //     content: "";
        //     left: 50%;
        //     bottom: 16px;
        //     transform: translateX(-50%);
        //   }
          &:hover {
            position: relative;
            color: rgb(66, 141, 250);
            // &::after {
            //   width: 100%;
            // }
          }
        }
      }
    }
  }
  > footer {
    width: 100%;
    height: 55px;
    overflow: hidden;
    background-color: #428dfa;
    position: relative;
    > .common-header-menus-wrap {
      width: 1200px;
      margin: 0 auto;
      > .menu-list {
        float: left;
        > li {
          float: left;
          height: 100%;
          line-height: 55px;
          width: 105px;
          color: #fff;
          font-size: 14px;
          text-align: center;
          transition: 0.2s;
          cursor: pointer;
          > i {
            font-size: 19px;
            margin-right: 8px;
            vertical-align: bottom;
          }
          &.router-link-active {
            > span {
              font-weight: 600;
            }
            background-color: #2260ff;
          }
          &:hover {
            background-color: rgba($color: #2260ff, $alpha: 0.35);
          }
        }
      }
      > div.customer-box {
        float: right;
        color: #fff;
        line-height: 55px;
        max-width: 560px;
        text-align: right;
        white-space: nowrap;
        > span {
          font-size: 12px;
          display: inline-block;
          // max-width: 360px;
          overflow: hidden;
          height: 55px;
          vertical-align: top;
          text-align: end;
          overflow-x: auto;
          > span {
            display: inline-block;
            margin-right: 4px;
            max-width: 175px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            vertical-align: -44%;
          }
          &::-webkit-scrollbar {
            height: 6px;
            // background: #fff;
          }
          &::-webkit-scrollbar-thumb {
            height: 4px;
            background-color: rgba($color: #000000, $alpha: 0.2);
            border-radius: 2px;
            cursor: pointer;
            margin-bottom: 2px;
          }
          > i {
            font-size: 14px;
            height: 55px;
            display: inline-block;
            vertical-align: top;
            &.price {
              font-weight: 600;
              font-size: 16px;
            }
          }
        }
        > button {
          height: 35px;
          margin: 0 25px 1px;
          padding: 9px 16px;
          background-color: #428dfa;
          color: #fff;
          width: 90px;
          &:hover {
            box-shadow: 0 0 3px #fff;
            text-shadow: 0 0 1px #fff;
          }
        }
        // .customer-btn {
        //   font-size: 14px;
        //   > i {
        //     font-size: 15px;
        //     margin-left: 8px;
        //   }
        // }
        > div {
          color: #fff;
          > span {
            cursor: pointer;
            line-height: 30px;
            display: inline-block;
            padding: 0 6px;
            border-radius: 3px;
            outline: none;
            z-index: 3;
            transition: 0.2s;
            // border: 1px solid #428dfa;
            &:hover {
              // background-color: rgba($color: #428dfa, $alpha: 0.3) !important;
              // border-color: #000;
              background-color:  mix(#428dfa, #000, 90%);;
              // color: mix(#f4a307, #fff, 40%);
              // color: #428dfa;
            }
          }
        }
      }
    }
  }
  > .recharge-remark {
    position: fixed;
    top: 135px;
    left: 0;
    right: 0;
    bottom: 0;
    height: 0;
    z-index: 666;
    background-color: rgba($color: #000000, $alpha: 0.5);
    opacity: 0;
    transition: opacity 0.2s;
    &.show {
      height: 100%;
    }
    &.showBg {
      opacity: 1;
    }
    > .recharge-box {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 0px;
      background-color: #fff;
      overflow: hidden;
      z-index: -1;
      transition: height .3s cubic-bezier(0.78, 0.14, 0.15, 0.86), opacity .3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
      opacity: 0;
      &.showRechange {
        height: 348px;
        opacity: 1;
        box-shadow: 0 8px 10px -5px rgba(0,0,0,.2), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12);
      }
    }
  }
  .recharge-box {
      // position: absolute;
      // top: 0;
      // left: 0;
      // right: 0;
      // height: 0px;
      background-color: #fff;
      overflow: hidden;
      // z-index: -1;
      // transition: height .3s cubic-bezier(0.78, 0.14, 0.15, 0.86), opacity .3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
      opacity: 0;
      height: 348px;
      opacity: 1;
      &.showRechange {
        height: 348px;
        opacity: 1;
        // box-shadow: 0 8px 10px -5px rgba(0,0,0,.2), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12);
      }
  }
  > .el-drawer__wrapper {
    top: 135px;
    outline: none;
    > div {
      outline: none;
      > div {
        outline: none;
      }
    }
  }
}
.mp-pc-my-set-drop-down-wrap {
  > li {
    font-size: 13px;
    transition: 0.2s;
    margin: 5px 0;
    > i {
      font-size: 16px;
      margin-right: 8px;
      vertical-align: -8%;
    }
    > span {
      font-size: 17px;
      vertical-align: -2%;
      margin-right: 8px;
    }
    &.active {
      color: #428dfa;
      font-weight: 700;
    }
  }
}
</style>
