<!--
 * @Describe: 多款联拼组件
 * @FilePath: /src/components/QuotationComps/ProductQuotationContentComps/Sections/MultyKindMakeup.vue
-->

<template>
  <section
    class="mp-duotation-content-comps-makeup-wrap"
    v-if="!(maxColCount === 1 && maxRowCount === 1)"
  >
    <section-comp-header title="联拼" remark="行、列" />
    <div class="makeup-content">
      <base-num-input v-model="rowNum" :disabled="maxColCount === 1" />
      <base-num-input v-model="colNum" :disabled="maxRowCount === 1" />
    </div>
    <div class="err-info is-red" v-show="errorInfo1 || errorInfo2">
      {{ errorInfo1 }} {{ errorInfo2 }}
    </div>
    <check-box-single
      v-if="AllowMultyKindMakeup"
      :default="obj2GetProductPrice.ProductParams.MultyKindMakeup"
      title="多款联拼"
      @change="handleChange"
    />
  </section>
</template>

<script>
import SectionCompHeader from "@/components/QuotationComps/SMComps/SectionCompHeader.vue";
import CheckBoxSingle from "@/components/QuotationComps/SMComps/CheckBoxSingle.vue";
import BaseNumInput from "@/components/QuotationComps/SMComps/BaseNumInput.vue";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    SectionCompHeader,
    CheckBoxSingle,
    BaseNumInput
  },
  props: {
    /**
     * 是否允许多款联拼
     */
    AllowMultyKindMakeup: {
      type: Boolean,
      default: false
    },
    /**
     * 最大联拼列数
     */
    maxColCount: {
      type: Number
    },
    /**
     * 最大联拼行数
     */
    maxRowCount: {
      type: Number
    }
  },
  data() {
    return {
      isAllowMakeup: true,
      colRules: [
        {
          strategy: `Maximum:${this.maxColCount}`,
          errorMsg: `最多联拼${this.maxColCount}列`
        },
        {
          strategy: `Minimum:1`,
          errorMsg: `最少联拼1列`
        },
        { strategy: "isNotEmpty", errorMsg: "请输入联拼列数" }
      ],
      rowRules: [
        {
          strategy: `Maximum:${this.maxRowCount}`,
          errorMsg: `最多联拼${this.maxRowCount}行`
        },
        {
          strategy: `Minimum:1`,
          errorMsg: `最少联拼1行`
        },
        { strategy: "isNotEmpty", errorMsg: "请输入联拼行数" }
      ],
      errorInfo1: "",
      errorInfo2: ""
    };
  },
  computed: {
    ...mapState("Quotation", ["obj2GetProductPrice"]),
    rowNum: {
      get() {
        return this.obj2GetProductPrice.ProductParams.MakeupRowNumber;
      },
      set(newVal) {
        const key = this.validateCheck(
          newVal,
          this.rowRules,
          this.setErrorMsg1
        );
        if (key) this.setErrorMsg1("");
        this.setProductParams(["MakeupRowNumber", newVal]);
      }
    },
    colNum: {
      get() {
        return this.obj2GetProductPrice.ProductParams.MakeupColumnNumber;
      },
      set(newVal) {
        const key = this.validateCheck(
          newVal,
          this.colRules,
          this.setErrorMsg2
        );
        if (key) this.setErrorMsg2("");
        this.setProductParams(["MakeupColumnNumber", newVal]);
      }
    }
  },
  methods: {
    ...mapMutations("Quotation", ["setProductParams"]),
    handleChange(e) {
      const key = e;
      this.setProductParams(["MultyKindMakeup", key]);
    },
    setErrorMsg1(msg) {
      this.errorInfo1 = msg;
    },
    setErrorMsg2(msg) {
      this.errorInfo2 = msg;
    }
  }
};
</script>

<style lang="scss">
.mp-duotation-content-comps-makeup-wrap {
  margin-top: 13px;
  position: relative;
  > .mp-duotation-sm-comps-checked-wrap.van-checkbox {
    position: absolute;
    top: 0;
    right: 0;
  }
  > .makeup-content {
    display: flex;
    justify-content: space-between;
    margin: 0 -10px;
    > .mp-duotation-sm-comps-num-input-wrap {
      // width: 44vw;
      padding: 0 10px;
      box-sizing: border-box;
    }
  }
  > .err-info {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
  }
}
</style>
