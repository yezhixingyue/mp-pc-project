<template>
  <article class="mp-pc-shopping-car-page-wrap">
    <section>
      <ShoppingCarTable />
    </section>
  </article>
</template>

<script>
import { mapState } from 'vuex';
import ShoppingCarTable from '@/components/ShoppingCarComps/ShoppingCarTable.vue';

export default {
  components: {
    ShoppingCarTable,
  },
  computed: {
    ...mapState('shoppingCar', ['shoppingDataNumber']),
  },
};
</script>

<style lang='scss'>
.mp-pc-shopping-car-page-wrap {
  width: 100%;
  background-color: #fff;
  > section {
    margin: 0 auto;
    width: 1200px;
    padding-top: 25px;
  }
}
</style>
