<template>
  <article class="mp-pc-unpay-list-page-wrap">
    <section>
      <UnpayListTable />
    </section>
  </article>
</template>

<script>
// import { mapState } from 'vuex';
import UnpayListTable from '@/components/UnpayListComps/UnpayListTable.vue';

export default {
  components: {
    UnpayListTable,
  },
  computed: {
    // ...mapState('shoppingCar', ['shoppingDataNumber']),
  },
};
</script>

<style lang='scss'>
.mp-pc-unpay-list-page-wrap {
  width: 100%;
  background-color: #fff;
  min-height: calc(100vh - 135px - 22px);
  > section {
    margin: 0 auto;
    width: 1200px;
    padding-top: 25px;
  }
}
</style>
