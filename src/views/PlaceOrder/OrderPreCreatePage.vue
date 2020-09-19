<template>
  <section class="mp-pc-order-pre-create-page-comp-wrap">
    <header class="gray">
      <span @click="onReturnClick"><i class="el-icon-arrow-left is-font-24 is-cancel"></i> 返回下单</span>
    </header>
    <div class="main">
      <Table4UnPayList />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import Table4UnPayList from '@/components/QuotationComps/PreCreateComps/Table4UnPayList.vue';

export default {
  components: {
    Table4UnPayList,
  },
  computed: {
    ...mapState('Quotation', ['orderFile4PreCreateData', 'PreCreateData']),
  },
  methods: {
    onReturnClick() {
      this.$router.replace('/placeOrder');
    },
  },
  mounted() {
    console.log(this.orderFile4PreCreateData);
    if (!this.orderFile4PreCreateData || !this.PreCreateData) this.$router.replace('/placeOrder');
  },
};
</script>

<style lang='scss'>
.mp-pc-order-pre-create-page-comp-wrap {
  width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  > header {
    padding-top: 4px;
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
}
</style>
