<!--
 * @Describe: 报价模块 -- 款数
 * @FilePath: /src/components/QuotationComps/ProductQuotationContentComps/Sections/SingleInputComp.vue
-->

<template>
  <section
    class="mp-duotation-content-comps-single-input-comp-wrap"
    v-show="!(minNum && minNum === maxNum)"
  >
    <section-comp-header :title="title" :remark="remark" />
    <div class="kind-content">
      <BaseNumInput v-model="inpValue" :disabled="disabled" />
    </div>
  </section>
</template>

<script>
import SectionCompHeader from "@/components/QuotationComps/SMComps/SectionCompHeader.vue";
import BaseNumInput from "@/components/QuotationComps/SMComps/BaseNumInput.vue";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    SectionCompHeader,
    BaseNumInput
  },
  model: {
    prop: "value",
    event: "changeFunc"
  },
  props: {
    /**
     * 标题
     */
    title: {
      type: String,
      default: "款数"
    },
    /**
     * 备注信息
     */
    remark: {
      type: String,
      default: "款"
    },
    /**
     * 该组件负责处理的值
     */
    value: {
      required: true
    },
    minNum: {},
    maxNum: {},
    /**
     * 是否为禁止输入状态
     */
    disabled: {}
  },
  computed: {
    ...mapState("Quotation", ["obj2GetProductPrice"]),
    inpValue: {
      get() {
        return this.value;
        // return this.obj2GetProductPrice.ProductParams.KindCount;
      },
      set(newValue) {
        // this.changeFunc(newValue);
        // this.setProductParams(["KindCount", newValue]);
        this.$emit("changeFunc", newValue);
      }
    }
  },
  methods: {
    ...mapMutations("Quotation", ["setProductParams"])
  },
  mounted() {
    if (this.minNum && this.minNum === this.maxNum) {
      this.$emit("changeFunc", this.minNum);
    }
  }
};
</script>

<style class="scss">
section.mp-duotation-content-comps-single-input-comp-wrap > header {
  height: 24px;
  line-height: 24px;
}
</style>
