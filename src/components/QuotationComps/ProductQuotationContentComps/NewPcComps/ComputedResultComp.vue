<template>
  <div class="result" v-if="ProductQuotationResult" :class="showExpressCost ? 'showExpressCost' : ''">
    <span class="no-margin">
      <template>
        {{ProductQuotationResult.OriginalCost > Cost ? '官网上传优惠价' : '成交价'}}
        <em class="is-gray is-font-12" v-if="showExpressCost">(不含运费)</em>：</template>
      <!-- <i class="is-pink is-font-16"></i> -->
      <i class="is-pink is-bold is-font-20">{{+(Cost.toFixed(2))}}</i>
      <i class="is-pink is-font-15"> 元</i>
    </span>
    <div v-if="ProductQuotationResult.OriginalCost > Cost
        || selectedCoupon || ProductQuotationResult.ProducePeriod || showExpressCost">
      <span style="margin-right: 0">(</span>
      <!-- <em class="is-gray is-font-12">不含运费</em> -->
      <span> 原价：<i>{{ProductQuotationResult.OriginalCost}}元</i></span>
      <span v-if="promotePrice > 0">活动：<i class="is-pink">{{'-' + promotePrice}}元</i></span>
      <span>优惠券：<i v-if="selectedCoupon && coupon" class="is-pink">{{'-' + coupon}}元</i>
      <i v-else-if="!selectedCoupon || coupon === 0">{{coupon}}元</i></span>
      <span class="gray no-cursor ml-0 is-font-12" v-if="selectedCoupon && !showExpressCost" @click.stop="null" >已选择满
        {{selectedCoupon.MinPayAmount}}元减{{selectedCoupon.Amount}}元
        <i class="is-pink"> {{ couponConditionText }}</i>
      </span>
      <span v-if="ProductQuotationResult.Weight>0"> 重量：<i>{{ProductQuotationResult.Weight}}kg</i></span>
      <span v-if="(ProductQuotationResult.ExpressCost || ProductQuotationResult.ExpressCost === 0) && showExpressCost"
       >运费：<i>{{ProductQuotationResult.ExpressCost}}元</i></span>
      <template v-if="ProductQuotationResult.ProducePeriod">
        <span class="is-pink ml-0"> -- {{ ProductQuotationResult.ProducePeriod | getPayTime }}</span>
        <span class="is-pink is-bold is-font-16">{{ ProductQuotationResult.ProducePeriod | getDoneTime }}</span>
      </template>
      <span class="mg-left"> )</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['ProductQuotationResult', 'selectedCoupon', 'showExpressCost'],
  computed: {
    Cost() {
      if (!this.ProductQuotationResult) return '';
      if (!this.selectedCoupon) return this.ProductQuotationResult.CurrentCost;
      if (this.ProductQuotationResult.CurrentCost >= this.selectedCoupon.MinPayAmount) {
        const num = +(this.ProductQuotationResult.CurrentCost - this.selectedCoupon.Amount).toFixed(2);
        return num > 0 ? num : 0;
      }
      return this.ProductQuotationResult.CurrentCost;
    },
    // 活动价格
    promotePrice() {
      if (!this.ProductQuotationResult) return '';
      return +(this.ProductQuotationResult.OriginalCost - this.ProductQuotationResult.CurrentCost).toFixed(2);
    },
    coupon() {
      if (!this.ProductQuotationResult) return 0;
      if (!this.selectedCoupon) return 0;
      if (this.ProductQuotationResult.CurrentCost >= this.selectedCoupon.MinPayAmount) {
        return this.selectedCoupon.Amount;
      }
      return 0;
    },
    couponConditionText() {
      if (!this.ProductQuotationResult) return '( 点击 计算价格 查看是否可使用 )';
      if (!this.coupon) return '(尚未满足使用条件)';
      return '';
    },
  },
};
</script>

<style lang='scss' scoped>
.result {
  display: inline-block;
  margin-right: 6px;
  line-height: 33px;
  // white-space: nowrap;
  white-space: normal;
  position: absolute;
  left: 160px;
  top: -18px !important;
  height: 72px;
  width: 538px;
  &.showExpressCost {
    width: 470px;
  }
  > span, > div > span {
    margin-right: 16px;
    // white-space: nowrap;
    float: left;
    &.no-margin {
      margin: 0;
      margin-right: 8px !important;
    }
    &.mg-left {
      margin-left: -12px;
    }
  }
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  > div {
    // display: inline-block;
    // white-space: nowrap;
    white-space: normal;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
  }
  > em {
    margin-right: 18px;
  }
  &.center::before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    margin-right: -0.25em; /* Adjusts for spacing */
  }
}
</style>
