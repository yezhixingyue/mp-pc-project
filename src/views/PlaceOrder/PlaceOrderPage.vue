<template>
  <section class="mp-pc-place-order-page-wrap">
    <header>
      <PlaceOrderProductClassifyComp />
    </header>
    <div class="content">
      <ProductQuotationContentComp v-if="curProductInfo2Quotation" :data='curProductInfo2Quotation' />
      <div v-else-if='initPageText' class="empty">
        <span class="iconfont icon-wancheng is-success"></span>
        <span>{{initPageText}}</span>
      </div>
      <div v-else class="bg-empty-wrap"></div>
    </div>
  </section>
</template>

<script>
import PlaceOrderProductClassifyComp from '@/components/QuotationComps/PlaceOrderProductClassifyComp.vue';
// eslint-disable-next-line max-len
import ProductQuotationContentComp from '@/components/QuotationComps/ProductQuotationContentComps/ProductQuotationContentComp.vue';
import { mapState } from 'vuex';

export default {
  components: {
    PlaceOrderProductClassifyComp,
    ProductQuotationContentComp,
  },
  computed: {
    ...mapState('Quotation', ['curProductInfo2Quotation', 'initPageText']),
  },
};
</script>

<style lang='scss'>
.mp-pc-place-order-page-wrap {
  > .content {
    > .empty {
      text-align: center;
      margin-top: 88px;
      font-size: 18px;
      color: #585858;
      > .iconfont {
        font-size: 30px;
        margin-right: 12px;
        vertical-align: -10%;
      }
    }
    > .bg-empty-wrap {
      background: url('../../assets/images/placeorderisempty.png') no-repeat center/100% 100%;
      height: 180px;
      width: 418px;
      margin: 170px auto 0;
    }
  }
}
</style>
