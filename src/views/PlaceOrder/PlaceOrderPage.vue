<template>
  <section>
    <header>
      <PlaceOrderProductClassifyComp />
    </header>
    <div class="content">
      <ProductQuotationContentComp :data='curProductInfo2Quotation' />
    </div>
  </section>
</template>

<script>
import PlaceOrderProductClassifyComp from '@/components/Quotation/PlaceOrderProductClassifyComp.vue';
// eslint-disable-next-line max-len
import ProductQuotationContentComp from '@/components/QuotationComps/ProductQuotationContentComps/ProductQuotationContentComp.vue';
import { mapState } from 'vuex';

export default {
  components: {
    PlaceOrderProductClassifyComp,
    ProductQuotationContentComp,
  },
  computed: {
    ...mapState('Quotation', ['curProductInfo2Quotation']),
  },
};
</script>

<style>

</style>
