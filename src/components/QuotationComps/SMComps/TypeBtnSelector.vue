<!--
 * @Describe: 胶囊选择样式按钮组
 * @FilePath: /src/components/QuotationComps/SMComps/TypeBtnSelector.vue
-->
<template>
  <section
    class="mp-duotation-content-comps-type-btn-selector-wrap"
    v-show="optionList.length > 1"
  >
    <template v-if="data.OptionList.length < 5">
      <header>
        {{ title }}
      </header>
      <div class="content" :class="disabled ? 'is-disabled' : ''">
        <span
          v-for="it in optionList"
          :key="it.OptionID"
          @click="onClick(it)"
          :class="data.CustomerInputValue === it.OptionID ? 'active' : ''"
        >
          {{ it[defaultProps.label] }}
          <svg v-if="data.CustomerInputValue === it.OptionID">
            <circle fill="#fff" r="3px" cx="3" cy="3"></circle>
          </svg>
        </span>
      </div>
    </template>
    <CountClassComp
      v-else
      :title="title"
      :value="data.CustomerInputValue"
      @changeFunc="handleChangeFunc"
      remark=""
      :showCheckBox="false"
      :option="data.OptionList"
      :defaultProps="{ text: 'Value', value: 'OptionID' }"
      :ValueType="2"
      :RelevanceInformation="RelevanceInformation"
      :disabled="disabled"
    />
  </section>
</template>

<script>
import CountClassComp from '@/components/QuotationComps/ProductQuotationContentComps/Sections/CountClassComp.vue';
import { getRelevanceInTargetValue } from '@/store/module/Quotation/QuotationClassType.js';
import { mapState } from 'vuex';

export default {
  props: {
    title: {
      type: String,
      default: '印面',
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    defaultProps: {
      type: Object,
      default: () => ({
        label: 'Value',
        value: 'OptionID',
      }),
    },
    index: {},
    /**
     * 属性关联信息
     */
    RelevanceInformation: {},
  },
  components: {
    CountClassComp,
  },
  computed: {
    ...mapState('Quotation', ['obj2GetProductPrice']),
    watchTarget() {
      if (!this.RelevanceInformation) return null;
      return getRelevanceInTargetValue(
        this.obj2GetProductPrice.ProductParams,
        this.RelevanceInformation,
      );
    },
    optionList() {
      if (this.data.ValueType === 2 && this.RelevanceInformation) {
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
          const _resList = this.data.OptionList.filter(it => _l.includes(it.OptionID));
          if (_resList.length > 0) {
            if (!_l.includes(this.inpValue)) {
              this.$emit('change', [this.index, _resList[0]]);
            }
          } else {
            this.$emit('changeFunc', ['', false]);
          }
          return _resList;
        }
        return this.data.OptionList;
      }
      return this.data.OptionList;
    },
    disabled() {
      console.log(this.data.AllowCustomized);
      return this.data.AllowCustomized === false;
    },
  },
  watch: {
    watchTarget(newVal) {
      if (!this.shouldShow) {
        // 属性关联类型为 其值和主属性值应该保持相同  所以此时可以隐藏该属性 在主属性修改时自动对其进行修改
        this.$emit('changeFunc', [newVal[0], false]);
      }
    },
  },
  methods: {
    onClick(item) {
      this.$emit('change', [this.index, item]);
    },
    handleChangeFunc([OptionID]) {
      const _t = this.data.OptionList.find(it => it.OptionID === OptionID);
      if (_t) this.$emit('change', [this.index, _t]);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/css/Common/var.scss";
.mp-duotation-content-comps-type-btn-selector-wrap {
  > header {
    height: 24x;
    line-height: 24px;
  }
  > .content {
    display: flex;
    margin-bottom: 18px;
    > span {
      padding: 0 20px;
      border: 1px solid $--border-color-2;
      height: 28px;
      line-height: 30px;
      max-width: 25%;
      min-width: 35px;
      text-align: center;
      border-left-width: 0;
      &:first-of-type {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border-left-width: 1px;
      }
      &:last-of-type {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
      &.active {
        background-color: $--color-blue;
        color: $--color-white;
        border-color: $--color-blue;
        position: relative;
        box-shadow: -1px 0 0px 0px $--color-blue;
        > svg {
          position: absolute;
          // background-color: #428dfa;
          width: 7px;
          height: 7px;
          top: calc(50% - 4px);
          right: 6px;
          // > circle {
          //   stroke: #fff;
          // }
        }
        // &::after {
        //   content: "";
        //   height: 6px;
        //   width: 9px;
        //   position: absolute;
        //   bottom: 3px;
        //   right: 3px;
        //   background: url("../../../assets/images/selected.png") no-repeat
        //     center/ 100% 100%;
        // }
      }
    }
    &.is-disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
}
</style>
