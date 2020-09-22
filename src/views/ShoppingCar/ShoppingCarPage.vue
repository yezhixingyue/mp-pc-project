<template>
  <section class="mp-pc-shopping-car-page-wrap">
    <ShoppingCarTable />
  </section>
</template>

<script>
import ShoppingCarTable from '@/components/ShoppingCarComps/ShoppingCarTable.vue';

export default {
  components: {
    ShoppingCarTable,
  },

};
</script>

<style lang='scss'>
.mp-pc-shopping-car-page-wrap {
  margin: 0 auto;
  width: 1200px;
  padding-top: 25px;
}
</style>
