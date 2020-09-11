<template>
  <article class="mp-print-type-comps-list-wrap">
    <type-btn-selector
      v-for="(PrintType, i) of PrintTypeList"
      :key="PrintType.PropertyID"
      :title="PrintType.PropertyName"
      :data="PrintType"
      :index="i"
      @change="handleItemChange"
      :RelevanceInformation="PrintType.RelevanceInformation"
    />
  </article>
</template>

<script>
import TypeBtnSelector from "@/components/QuotationComps/SMComps/TypeBtnSelector.vue";

export default {
  props: {
    // PrintTypeList: {
    //   type: Array,
    //   default: () => []
    // }
    value: {
      type: Array,
      default: () => []
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  components: {
    TypeBtnSelector
  },
  computed: {
    PrintTypeList: {
      get() {
        return this.value;
      }
    }
  },
  methods: {
    handleItemChange([i, item]) {
      // console.log(i, item);
      this.$emit("change", [i, item]);
    }
  }
};
</script>

<style lang="scss">
.mp-print-type-comps-list-wrap {
  > section {
    margin-top: 10px;
  }
}
</style>
