<template>
  <article class="mp-pc-order-list-page-wrap">
    <section class="header">
      <div class="header-content">
        <SingleSelector v-model="OrderStatus" :optionList='OrderStatusList' />
      </div>
    </section>
    <section class="content-list"></section>
  </article>
</template>

<script>
import SingleSelector from '@/components/common/Selector/SingleSelector.vue';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  components: {
    SingleSelector,
  },
  computed: {
    ...mapState('common', ['OrderStatusList']),
    ...mapState('order', ['condition4OrderList', 'OrderList', 'OrderListNumber']),
    OrderStatus: {
      get() {
        return this.condition4OrderList.Status;
      },
      set(newVal) {
        // console.log(newVal);
        this.$store.commit('order/setCondition4OrderList', [['Status', ''], newVal]);
        this.$store.dispatch('order/getOrderList');
      },
    },
  },
  methods: {
    ...mapMutations('order', ['setCondition4OrderList']),
    ...mapActions('order', ['getOrderList']),
  },
};
</script>

<style lang='scss'>
.mp-pc-order-list-page-wrap {
  width: 100%;
  > section {
    width: 100%;
    background-color: #fff;
    height: 120px;
    margin-bottom: 25px;
    > .header-content {
      margin: 0 auto;
      width: 1200px;
    }
  }
}
</style>
