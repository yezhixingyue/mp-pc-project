<template>
  <article class="mp-pc-shopping-car-page-wrap">
    <section v-if="shoppingDataList.length > 0 || shoppingDataNumber > 0">
      <ShoppingCarTable />
    </section>
    <div class="show-empty-bg" v-else>
      <img src="../../assets/images/shopping-car-empty2.png" alt="">
      <p class="is-gray">当前购物车为空，快去下单吧...</p>
    </div>
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
    ...mapState('shoppingCar', ['shoppingDataNumber', 'shoppingDataList']),
  },
};
</script>

<style lang='scss'>
.mp-pc-shopping-car-page-wrap {
  width: 100%;
  background-color: #fff;
  min-height: calc(100vh - 135px - 22px);
  > section {
    margin: 0 auto;
    width: 1200px;
    padding-top: 25px;
  }
  > .show-empty-bg {
    width: 100%;
    background-color: rgb(245, 245, 245);
    min-height: calc(100vh - 255px - 22px);
    text-align: center;
    padding-top: 120px;
    > p {
      margin-top: 15px;
    }
    > img {
      height: 266px;
      width: 545px;
      user-select: none;
    }
  }
}
</style>
