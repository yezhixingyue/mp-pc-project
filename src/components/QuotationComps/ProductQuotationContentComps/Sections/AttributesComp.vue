<!--
 * @Describe: 
 * @FilePath: /src/components/QuotationComps/ProductQuotationContentComps/Sections/AttributesComp.vue
-->

<template>
  <section
    class="mp-duotation-content-comps-attribute-wrap"
    v-if="value.length > 0"
  >
    <article class="attribute-list" :class="1 ? 'singular' : ''">
      <CountClassComp
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
            : $utils.getUnit(item.Unit)
        "
        :value="item.CustomerInputValue"
        :CustomizedOptionValue="item.CustomizedOptionValue"
        @changeFunc="data => changeFunc(data, i)"
        :defaultSelect="item.ValueType !== 2"
        :showCheckBox="item.AllowUserDefinedOption"
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
        <img src="../../../../assets/images/quotationdel.png" alt="del" />
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
import { mapState } from "vuex";
import CountClassComp from "@/components/QuotationComps/ProductQuotationContentComps/Sections/CountClassComp.vue";

export default {
  components: {
    CountClassComp
  },
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    /**
     * 由每个属性数据组成的数组
     */
    value: {
      type: Array,
      default: () => []
    },
    showDel: {
      type: Boolean,
      default: false
    },
    /**
     * 工艺使用，其为工艺弹窗开闭状态
     */
    watch2Dia: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState("global", ["UnitTypeList"])
  },
  methods: {
    handleChange([data, type], index) {
      console.log("handleChangehandleChangehandleChange*-----");
      this.$emit("change", [data, index, type]);
    },
    handleAttributeDel() {
      this.$emit("handleDel");
    },
    changeFunc(data, i) {
      // alert("changeFunc");
      this.handleChange(data, i);
    }
    // handleCheckChange(e) {
    //   console.log(e);
    // }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/Common/var.scss";
.mp-duotation-content-comps-attribute-wrap {
  > article {
    flex: 1;
    > section > header {
      height: 28px;
      line-height: 28px;
    }
    &.singular {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      margin: 0 -10px;
      > section {
        min-width: 44vw;
        flex: 1;
        padding: 0 10px;
        box-sizing: border-box;
        > .mp-duotation-sm-comps-checked-wrap {
          right: 10px;
        }
        margin-bottom: 8px;
      }
    }

    // > .del-box {
    //   height: 100%;
    //   margin-bottom: 8px;
    //   > span.to-del {
    //     height: 25px;
    //     width: 25px;
    //     flex: none;
    //     display: inline-block;
    //     background-color: $--border-color;
    //     border-radius: 50%;
    //     position: relative;
    //     padding: 0 !important;
    //     margin: 4px;
    //     margin-bottom: 0px;
    //     > img {
    //       height: 15px;
    //       width: 15px;
    //       position: absolute;
    //       top: 50%;
    //       left: 50%;
    //       transform: translate(-50%, -50%);
    //     }
    //   }
    // }
  }
  > .del-box {
    height: 100%;
    flex: none;
    margin-bottom: 8px;
    margin-left: 5px;
    > span.to-del {
      height: 25px;
      width: 25px;
      flex: none;
      display: inline-block;
      background-color: $--border-color;
      border-radius: 50%;
      position: relative;
      padding: 0 !important;
      margin: 4px;
      margin-bottom: 0px;
      > img {
        height: 15px;
        width: 15px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  display: flex;
  padding-bottom: 12.5px;
  align-items: flex-end;
  & + & {
    margin-top: 12.5px;
  }
}
</style>
