<template>
  <section class="mp-mpzj-order-feedback-add-page-wrap">
    <div class="content">问题反馈添加页面</div>
  </section>
</template>

<script>
export default {
  mounted() {
    const OrderID = this.$route.params.id;
    if (!OrderID) return;
    console.log(OrderID);
  },
};
</script>

<style lang='scss'>
.mp-mpzj-order-feedback-add-page-wrap {
  width: 100%;
  margin: 0 auto;
  margin-top: 25px;
  background-color: #fff;
  // height: 100%;
}
</style>
