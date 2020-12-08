<template>
  <article class="mp-duotation-content-part-comps-wrap">
    <part-single-comp
      v-for="(item, i) of PartData.PartList"
      :key="item.singlePartID"
      :indexLv1="index"
      :indexLv2="i"
      :data="item"
      :canDel="PartData.AllowChangePartNumber && PartData.PartList.length > 1"
      @handleAddPart="handleAddPart"
      :showAddBtn='PartData.PartList[0] && PartData.PartList[0].MaxUsePart &&
        PartData.PartList[0].MaxUsePart > PartData.PartList.length && PartData.AllowChangePartNumber'
    />
  </article>
</template>

<script>
import { mapMutations } from 'vuex';
import PartSingleComp from '@/components/QuotationComps/ProductQuotationContentComps/NewPcComps/PartSingleComp.vue';

export default {
  props: {
    PartData: {
      type: Object,
      default: () => ({}),
    },
    // 代表当前部件数据在整个数据中的位置，从而可定位到
    index: {
      type: Number,
    },
  },
  components: {
    PartSingleComp,
  },
  methods: {
    ...mapMutations('Quotation', ['addPartProductParamsPartList']),
    handleAddPart() {
      const _temp = {
        ...this.localPartData,
        singlePartID: this.PartData.PartID + (`${Math.random()}`).replace('.', ''),
      };
      this.addPartProductParamsPartList([this.index, _temp]);
    },
  },
  data() {
    return {
      localPartData: null,
    };
  },
  mounted() {
    this.localPartData = JSON.parse(JSON.stringify(this.PartData.PartList[0]));
  },
};
</script>

<style lang="scss">
.mp-duotation-content-part-comps-wrap {
}
</style>
