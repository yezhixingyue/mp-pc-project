<template>
  <section class="mp-pc-shopping-car-detail-page-wrap" v-if="curShoppingCarDetailData">
    <header class="gray">
      <span @click="onReturnClick"><i class="el-icon-arrow-left is-font-24 is-cancel"></i> 返回购物车列表</span>
    </header>
    <ul class="content">
      <li>
        <OrderCommonSummary :showData='info4OrderSummary' />
      </li>
      <li>
        <OrderDetailCommonComp />
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState } from 'vuex';

import OrderCommonSummary from '@/components/common/OrderCommonComps/OrderCommonSummary.vue';
import OrderDetailCommonComp from '@/components/common/OrderCommonComps/OrderDetailCommonComp.vue';

export default {
  components: {
    OrderCommonSummary,
    OrderDetailCommonComp,
  },
  computed: {
    ...mapState('shoppingCar', ['curShoppingCarDetailData']),
    info4OrderSummary() {
      return {
        OutPlate: this.curShoppingCarDetailData.OutPlate ? this.curShoppingCarDetailData.OutPlate.First : '',
        Address: this.curShoppingCarDetailData.Address,
        Content: this.curShoppingCarDetailData.Content,
        FilePath: this.curShoppingCarDetailData.FilePath,
      };
    },
  },
  methods: {
    onReturnClick() {
      this.$router.replace('/shoppingCar');
      // this.$store.commit('Quotation/setIsFullPayoutDisabled', false);
    },
  },
  mounted() {
    if (!this.curShoppingCarDetailData) this.$router.replace('/shoppingCar');
  },
};
</script>

<style lang='scss'>
.mp-pc-shopping-car-detail-page-wrap {
  width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  > header {
    padding: 9px 0;
    line-height: 24px;
    background-color: rgb(245, 245, 245);
    padding-left: 26px;
    > span {
      font-size: 14px;
      > i {
        vertical-align: -15%;
      }
      cursor: pointer;
      display: inline-block;
      padding: 4px 15px 4px 8px;
      border-radius: 2px;
      &:hover {
        background-color: rgb(230, 230, 230);
      }
      &:active {
        background-color: rgb(208, 208, 208);
      }
    }
  }
  > ul > li {
    position: relative;
    margin-bottom: 15px;
    &::after {
      height: 15px;
      content: '';
      width: 100%;
      position: absolute;
      bottom: -15px;
      left: 0;
      background-color: rgb(245, 245, 245);
    }
  }
}

</style>
