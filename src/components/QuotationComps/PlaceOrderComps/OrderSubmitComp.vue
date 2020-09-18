<template>
  <section class="mp-pc-place-order-upload-and-submit-comp-wrap">
    <header class="bg-gray"></header>
    <div class="comp-title float">
      <span class="left is-bold">印刷内容</span>
    </div>
    <div class="content">
      <ul>
        <li class="file-content-box">
          <span class="title">文件内容：</span>
          <el-input v-model="fileContent" placeholder="文件内容"></el-input>
        </li>
        <li class="upload-box">
          <UploadComp4BreakPoint :successFunc="successFunc" />
        </li>
      </ul>
      <div class="price-wrap">
        <div class="price-box">
          <div class="price-left">
            <p>原价：</p>
            <p>优惠券：</p>
            <p>运费：</p>
            <p class="final-price">成交价<i class="is-font-12 gray">（不含运费）</i>：</p>
          </div>
          <div class="price-right">
            <template v-if="ProductQuotationResult">
              <p>¥ {{ProductQuotationResult.OriginalCost}}</p>
              <p :class="coupon && coupon > 0 ? 'is-pink' : ''">
                <template v-show='coupon'>{{'¥ ' + (coupon ? coupon : 0)}}</template>
              </p>
              <p>¥ {{ProductQuotationResult.ExpressCost}}</p>
              <p class="final-price is-pink">¥ <i class="is-font-24 is-bold">{{Cost}}</i></p>
            </template>
          </div>
        </div>
      </div>
      <div class="submit-btn-wrap">
        <el-button class="button-title-pink" @click="goToGoodsCar">
          <i class="iconfont icon-jiarugouwuche"></i>加入购物车</el-button>
        <el-button type="danger">直接下单</el-button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import UploadComp4BreakPoint from '@/components/common/UploadComp/UploadComp4BreakPoint.vue';

export default {
  components: {
    UploadComp4BreakPoint,
  },
  computed: {
    ...mapState('Quotation', ['selectedCoupon', 'ProductQuotationResult']),
    coupon() {
      if (!this.ProductQuotationResult) return '';
      if (!this.selectedCoupon) return '';
      if (this.ProductQuotationResult.CurrentCost >= this.selectedCoupon.MinPayAmount) {
        return this.selectedCoupon.Amount;
      }
      return '';
    },
    Cost() {
      if (!this.ProductQuotationResult) return '';
      if (!this.selectedCoupon) return this.ProductQuotationResult.CurrentCost;
      if (this.ProductQuotationResult.CurrentCost >= this.selectedCoupon.MinPayAmount) {
        const num = this.ProductQuotationResult.CurrentCost - this.selectedCoupon.Amount;
        return num > 0 ? num : 0;
      }
      return this.ProductQuotationResult.CurrentCost;
    },
  },
  data() {
    return {
      fileContent: '',
    };
  },
  methods: {
    successFunc(e) {
      console.log(e);
    },
    goToGoodsCar(evt) {
      let { target } = evt;
      if (target.nodeName === 'SPAN') {
        target = evt.target.parentNode;
      }
      target.blur();
    },
  },
};
</script>

<style lang='scss'>
.mp-pc-place-order-upload-and-submit-comp-wrap {
  > .content {
    margin-top: 22px;
    > ul {
      border-bottom: 1px solid #eee;
      // padding-bottom: 8px;
      > li {
        margin-bottom: 30px;
        &.file-content-box {
          > .el-input {
            width: 700px;
            > input {
              height: 30px;
            }
          }
        }
        &.upload-box {
          text-align: right;
        }
      }
    }
    > .price-wrap {
      height: 215px;
      text-align: right;
      > .price-box {
        height: 100%;
        overflow: hidden;
        display: inline-block;
        > div {
          padding-top: 33px;
          > p {
            line-height: 33px;
            &.final-price {
              margin-top: 6px;
            }
          }
          &.price-left {
            float: left;
          }
          &.price-right {
            float: right;
            margin-left: 10px;
            > p {
              min-width: 80px;
            }
          }
        }
      }
    }
    > .submit-btn-wrap {
      text-align: right;
      padding-bottom: 30px;
      > button {
        width: 150px;
        height: 45px;
        padding: 0;
        line-height: 43px;
        > span > i {
          font-size: 19px;
          vertical-align: middle;
          margin-right: 14px;
          position: relative;
          top: -3px;
        }
        & + button {
          margin-left: 50px;
        }
      }
    }
  }
}
</style>
