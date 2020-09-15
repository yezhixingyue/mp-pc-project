<template>
  <article class="mp-duotation-content-part-comps-wrap">
    <part-single-comp
      v-for="(item, i) of PartData.PartList"
      :key="item.PartID + i"
      :indexLv1="index"
      :indexLv2="i"
      :data="item"
      :canDel="PartData.AllowChangePartNumber"
    />

    <footer
      v-if="
        PartData.PartList[0] &&
          PartData.PartList[0].MaxUsePart &&
          PartData.PartList[0].MaxUsePart > PartData.PartList.length &&
          PartData.AllowChangePartNumber
      "
      class="van-hairline--top"
    >
      <div>
        <!-- <van-icon name="plus" /> -->
      </div>
      <span @click="handleAddPart"
        >添加{{ PartData.PartList[0].PartName }}</span
      >
    </footer>
  </article>
</template>

<script>
import { mapMutations } from 'vuex';
import PartSingleComp from '@/components/QuotationComps/ProductQuotationContentComps/Sections/PartSingleComp.vue';

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
      this.addPartProductParamsPartList([this.index, this.localPartData]);
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
// @import "@/assets/css/Common/var.scss";
.mp-duotation-content-part-comps-wrap {
  > footer {
    height: 30px;
    // color: $--color-gray;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    // margin-top: 18px;
    padding-top: 10px;
    > div {
      width: 20px;
      height: 20px;
      background-color: #428dfa;
      border-radius: 5px;
      margin-right: 7px;
      // color: $--color-white;
      display: flex;
      font-size: 12px;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
