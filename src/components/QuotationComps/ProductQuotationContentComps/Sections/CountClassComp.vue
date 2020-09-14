<!--
 * @Describe: 产品主数量组件，可根据情况进行手输及选择
 * @FilePath: /src/components/QuotationComps/ProductQuotationContentComps/Sections/CountClassComp.vue
-->

<template>
  <section class="mp-duotation-content-comps-count-wrap" v-show="shouldShow">
    <section-comp-header :title="title" :remark="remark" />
    <div class="count-content">
      <drop-down-selector
        v-if="!isSelectedInp"
        :option="optionList"
        v-model="inpValue"
        :defaultProps="defaultProps"
        :disabled="disabled"
      />
      <base-num-input
        type="text"
        :disabled="disabled"
        ref="oInp"
        v-else
        v-model.lazy.trim="inpValue"
      />
    </div>
    <!-- {{ watchTarget }} -->
    <check-box-single
      v-show="showCheckBox && optionList.length > 0"
      :default="isSelectedInp"
      @change="handleCheckChange"
    />
  </section>
</template>

<script>
import CheckBoxSingle from '@/components/QuotationComps/SMComps/CheckBoxSingle.vue';
import BaseNumInput from '@/components/QuotationComps/SMComps/BaseNumInput.vue';
import DropDownSelector from '@/components/QuotationComps/SMComps/DropDownSelector.vue';
import SectionCompHeader from '@/components/QuotationComps/SMComps/SectionCompHeader.vue';
import { mapState } from 'vuex';
import { getRelevanceInTargetValue } from '@/store/Quotation/QuotationClassType';

export default {
  components: {
    CheckBoxSingle,
    BaseNumInput,
    DropDownSelector,
    SectionCompHeader,
  },
  model: {
    prop: 'value',
    event: 'changeFunc',
  },
  props: {
    /**
     * 复选框默认状态属性,及 默认要展示哪个组件
     */
    // defaultSelect: {
    //   type: Boolean,
    //   default: false
    // },
    /**
     * 该组件负责处理的值
     */
    value: {
      required: true,
    },
    /**
     * 标题
     */
    title: {
      type: String,
      default: '数量',
    },
    /**
     * 备注信息
     */
    remark: {
      type: String,
      default: '张',
    },
    /**
     * 是否展示复选框
     */
    showCheckBox: {
      type: Boolean,
      default: true,
    },
    /**
     * 下拉列表 数值选项
     */
    option: {},
    defaultProps: {
      type: Object,
      default: () => ({
        text: 'text',
        value: 'value',
      }),
    },
    /**
     * 值类型  输入类型还是选择类型
     */
    ValueType: {},
    /**
     * 属性关联信息
     */
    RelevanceInformation: {},
    disabled: {},
    CustomizedOptionValue: {
      default: '',
    },
    /**
     * 工艺使用，其为工艺弹窗开闭状态
     */
    watch2Dia: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isSelectedInp: false,
      isCustomizedOptionValue: false,
    };
  },
  computed: {
    ...mapState('Quotation', ['obj2GetProductPrice']),
    inpValue: {
      get() {
        if (this.isCustomizedOptionValue) return this.CustomizedOptionValue;
        return this.value;
      },
      set(newVal) {
        console.log('inpValue - newVal');
        if (!this.ValueType && this.ValueType !== 0) {
          this.$emit('changeFunc', newVal);
          return;
        }
        this.$emit('changeFunc', [
          newVal,
          this.isSelectedInp && this.ValueType === 2,
        ]); // 后面为true时，说明为选项类型且当前模式为输入模式，此时设置值应为CustomizedOptionValue
      },
    },
    watchTarget() {
      if (!this.RelevanceInformation) return null;
      return getRelevanceInTargetValue(
        this.obj2GetProductPrice.ProductParams,
        this.RelevanceInformation,
      );
    },
    shouldShow() {
      if (!this.RelevanceInformation) return true;
      return (
        !(
          this.RelevanceInformation.length === 1
          && this.RelevanceInformation[0].Type === 1
          && this.RelevanceInformation[0].Compare === 1
          && this.ValueType === 1
        )
        || (this.ValueType === 2 && this.optionList.length === 1)
      );
    },
    optionList() {
      if (this.ValueType === 2 && this.RelevanceInformation) {
        const _list = [];
        this.RelevanceInformation.forEach((Relevance, i) => {
          // 属性关联结果数组  --- 取交集
          const _val = this.watchTarget[i];
          if (Relevance.MasterProperty.OptionList.includes(_val)) {
            _list.push(Relevance.RelevanceProperty.OptionList);
          }
        });
        if (_list.length > 0) {
          const _l = _list.reduce((Summary, key) => key.filter(it => Summary.includes(it)), _list[0]);
          const _resList = this.option.filter(it => _l.includes(it.OptionID));
          if (_resList.length > 0) {
            if (!_l.includes(this.inpValue)) {
              this.$emit('changeFunc', [_resList[0].OptionID, false]);
            }
          } else {
            this.$emit('changeFunc', ['', false]);
          }
          return _resList;
        }
        return this.option;
      }
      return this.option;
    },
  },
  watch: {
    watchTarget(newVal) {
      if (!this.shouldShow) {
        // 属性关联类型为 其值和主属性值应该保持相同  所以此时可以隐藏该属性 在主属性修改时自动对其进行修改
        this.$emit('changeFunc', [newVal[0], false]);
      }
    },
    option(newVal) {
      if (!newVal) return;
      this.initIsSelectedInp();
    },
    watch2Dia(bool) {
      console.log(bool, this.isSelectedInp);
      if (!this.isSelectedInp) {
        this.$emit('changeFunc', [
          '',
          !this.isSelectedInp && this.ValueType === 2,
        ]);
      }
    },
  },
  methods: {
    initIsSelectedInp() {
      if (this.option.length > 0 && !this.CustomizedOptionValue) {
        this.isSelectedInp = false;
      } else if (this.ValueType === 2) {
        this.isSelectedInp = true;
        this.isCustomizedOptionValue = true;
      } else {
        this.isSelectedInp = true;
        this.isCustomizedOptionValue = false;
      }
    },
    handleCheckChange(e) {
      this.isSelectedInp = e;
      // this.$emit(
      //   "changeFunc",
      //   this.option.length > 0 ? this.option[0].OptionID : ""
      // );
      this.isCustomizedOptionValue = false;
      console.log(e, this.isCustomizedOptionValue);
      if (e && isNaN(this.value) && this.ValueType && this.ValueType === 2) {
        console.log(this.value);
        // const _t = this.option.find(it => it.OptionID === this.value);
        this.$nextTick(() => {
          // console.log(_t, this.$refs.oInp.value);
          // if (this.CustomizedOptionValue && this.CustomizedOptionValue !== 0) {
          //   this.$refs.oInp.value = this.CustomizedOptionValue;
          // } else {
          //   this.$refs.oInp.value = "";
          // }
          // this.$refs.oInp.value = "";
          this.isCustomizedOptionValue = true;
        });
      }
      // console.log(e); // true为自定义
      // this.$emit("handleCheckChange", e);
      if (!this.ValueType && this.ValueType !== 2) return;
      // if (!e) this.$emit("changeFunc", ["", !e && this.ValueType === 2]);
    },
  },
  created() {
    if (!this.option) return;
    this.initIsSelectedInp();
  },
  // beforeDestroy() {
  //   console.log("beforeDestroy", this.isSelectedInp);
  // }
};
</script>

<style lang="scss">
@import "@/assets/css/Common/var.scss";
.mp-duotation-content-comps-count-wrap {
  position: relative;
  > header {
    height: 24px !important;
    line-height: 24px !important;
  }
  > .count-content {
    width: 100%;
  }
  > .mp-duotation-sm-comps-checked-wrap.van-checkbox {
    position: absolute;
    top: 3px;
    right: 0;
  }
}
</style>
