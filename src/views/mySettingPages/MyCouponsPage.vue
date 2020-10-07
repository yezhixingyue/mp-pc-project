<template>
  <section class="mp-pc-my-setting-pages-my-coupons-page-wrap">
    <header>
      <span class="blue-v-line is-bold is-black">我的优惠券</span>
      <div class="add-box">
        <span>优惠券激活：</span>
        <el-input v-model="couponCode2Add" placeholder="请输入优惠券激活码"></el-input>
        <el-button type="primary" @click="getCouponActivate">激活</el-button>
      </div>
      <div class="jump-btn">
        <el-button>
          <i class="iconfont icon-lingquan"></i>
          <span>领券中心</span>
        </el-button>
      </div>
    </header>
    <section class="page-content">
      <header>
        <span class="title">状态：</span>
        <span class="status-item active">未使用（0）</span>
        <span class="status-item">已使用（0）</span>
        <span class="status-item">已过期（0）</span>
      </header>
      <ul class="coupon-list">
        <li class="coupon-item">
          <div class="top"></div>
          <div class="bottom"></div>
        </li>
      </ul>
      <footer></footer>
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      couponCode2Add: '',
      couponList: [],
    };
  },
  computed: {
    ...mapState('common', ['customerInfo']),
  },
  methods: {
    async getCouponActivate() {
      if (!this.couponCode2Add) return;
      await this.$store.dispatch('common/getCustomerDetail');
      if (!this.customerInfo) return;
      const { CustomerID } = this.customerInfo;
      const CouponCode = this.couponCode2Add;
      const _obj = { CustomerID, CouponCode };
      const res = await this.api.getCouponActivate(_obj);
      if (res.data.Status !== 1000) return;
      this.couponCode2Add = '';
      this.messageBox.successSingle({
        title: '激活成功',
        successFunc: () => {
          this.couponList.push(res.data.Data);
        },
      });
    },
    async getCouponList() {
      const _obj = {};
      _obj.Product = {};
      const res = await this.api.getCouponList(_obj);
      if (res.data.Status !== 1000) return;
      this.couponList = res.data.Data;
    },
  },
  mounted() {
    this.getCouponList();
  },
};
</script>

<style lang='scss'>
.mp-pc-my-setting-pages-my-coupons-page-wrap {
  width: 930px;
  > header {
    position: relative;
    padding-bottom: 50px;
    width: 930px;
    padding-top: 10px;
    > .add-box {
      // margin-bottom: 50px;
      padding-top: 45px;
      padding-left: 128px;
      > .el-input {
        width: 350px;
        > input {
          height: 30px;
          // line-height: 26px;
          &::placeholder {
            font-size: 12px;
            color: #cbcbcb;
          }
        }
      }
      > span {
        // color: #888;
        margin-right: 6px;
      }
      > button {
        height: 30px;
        width: 90px;
        line-height: 28px;
        padding: 0;
        margin-left: 20px;
      }
    }
    > .jump-btn {
      line-height: 16px;
      position: absolute;
      right: 0;
      top: 0;
      > button {
        line-height: 16px;
        width: 120px;
        padding: 0;
        height: 40px;
        > span {
          > i {
            color: #ddd;
            margin-right: 10px;
            transition: color 0.2s;
          }
        }
        &:hover, &:focus {
          > span > i {
            color: #428dfa;
          }
        }
      }
    }
  }
  > .page-content {
    > header {
      box-shadow: 0px 2px 7px 1px rgba(238, 238, 238, 0.7);
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
      > .status-item {
        margin-right: 40px;
        cursor: pointer;
        transition: 0.2s;
        &.active, &:hover {
          color: #428dfa;
        }
      }
      > .title {
        margin-right: 12px;
      }
    }
    > ul.coupon-list {
      > li.coupon-item {
        width: 260px;
        padding-top: 40px;
        padding-right: 45px;
        display: inline-block;
        > .top {
          background-color: #9399ff;
          height: 170px;
        }
        > .bottom {
          height: 180px;
          background-color: #f5f5f5;
        }
      }
    }
  }
}
</style>
