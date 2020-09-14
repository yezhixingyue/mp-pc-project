<!--
 * @Describe:
 * @FilePath: /src/components/QuotationComps/ProductQuotationContentComps/NewPcComps/AttributesComp.vue
-->

<template>
  <section
    class="mp-duotation-content-comps-attribute-wrap"
    v-if="value.length > 0"
  >
    <article class="attribute-list" :class="1 ? 'singular' : ''">
      <SingleAttributeComp
        v-for="(item, i) in value"
        :key="item.PropertyID"
        :title="item.PropertyName"
        :RelevanceInformation="item.RelevanceInformation"
        :watch2Dia="watch2Dia"
        :remark="
          item.ValueType === 2
            ? ''
            : item.UserDefinedUnit
            ? item.UserDefinedUnit
            : utils.getUnit(item.Unit)
        "
        :value="item.CustomerInputValue"
        :CustomizedOptionValue="item.CustomizedOptionValue"
        @changeFunc="data => changeFunc(data, i)"
        :AllowUserDefinedOption="item.AllowUserDefinedOption"
        :option="item.OptionList"
        :defaultProps="{ text: 'Value', value: 'OptionID' }"
        :ValueType="item.ValueType"
        :disabled="item.AllowCustomized === false"
      />
      <!-- <div class="del-box" v-if="showDel">
        <span @click="handleAttributeDel" class="to-del">
          <img src="../../../../assets/images/quotationdel.png" alt="del" />
        </span>
      </div> -->
    </article>
    <div class="del-box" v-if="showDel">
      <span @click="handleAttributeDel" class="to-del">
        <!-- <img src="../../../../assets/images/quotationdel.png" alt="del" /> -->
      </span>
    </div>
    <!-- <section v-if="showDel" class="to-del">
      <span @click="handleAttributeDel">
        <img src="../../../../assets/images/quotationdel.png" alt="del" />
      </span>
    </section> -->
  </section>
</template>

<script>
import { mapState } from 'vuex';
// import CountClassComp from '@/components/QuotationComps/ProductQuotationContentComps/Sections/CountClassComp.vue';
import SingleAttributeComp from './SingleAttributeComp.vue';

export default {
  components: {
    // CountClassComp,
    SingleAttributeComp,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    /**
     * 由每个属性数据组成的数组
     */
    value: {
      type: Array,
      default: () => [],
    },
    showDel: {
      type: Boolean,
      default: false,
    },
    /**
     * 工艺使用，其为工艺弹窗开闭状态
     */
    watch2Dia: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState('global', ['UnitTypeList']),
  },
  methods: {
    handleChange([data, type], index) {
      console.log('handleChangehandleChangehandleChange*-----');
      this.$emit('change', [data, index, type]);
    },
    handleAttributeDel() {
      this.$emit('handleDel');
    },
    changeFunc(data, i) {
      // alert("changeFunc");
      this.handleChange(data, i);
    },
    // handleCheckChange(e) {
    //   console.log(e);
    // }
  },
};
</script>

<style lang="scss">
// @import "@/assets/css/Common/var.scss";
.mp-duotation-content-comps-attribute-wrap {
  > article {
    > section {
      // display: inline-block;
      // & + section {
      //   margin-left: 80px;
      // }
      height: 30px;
      line-height: 30px;
      margin-bottom: 22px;
    }
  }
}
</style>
