<template>
  <article class="mp-quotation-product-quotation-content-wrap">
    <header v-if="data.DefaultProduct && data.DefaultProduct.length > 0">
      <span class="is-gray">常用规格：</span>
      <!-- <ul class="is-blue">
        <li v-for="item in data.DefaultProduct" :key="item.DefaultID">
          <button
            :class="curDefaultID === item.DefaultID ? 'active' : ''"
            @click="handleSpecClick(item)"
          >
            {{ item.DefaultName }}
          </button>
        </li>
      </ul> -->
    </header>
    <div class="content">
      <section class="content-title" v-if="curProductShowNameInfo && curProductShowNameInfo.length === 3">
        <span class="blue-v-line">{{curProductShowNameInfo[0]}}</span>
        <span>{{curProductShowNameInfo[1]}}</span>
        <span>-</span>
        <span>{{curProductShowNameInfo[2]}}</span>

      </section>

      <section class="count-model-box">
          <!-- 数量 -->
        <ProductCountComp
          :option="countOption"
          :remark="obj2GetProductPrice.ProductParams.Unit"
          v-model.trim="ProductAmount"
        />
        <ProductCountComp
          v-if="obj2GetProductPrice.ProductParams.AllowMultyKind"
          remark="款"
          title="款数"
          v-model.trim="KindCount"
        />
      </section>

      <!-- 属性 -->
      <attributes-comp v-model="AttributeList" />

      <!-- 联拼行列数及是否允许多款联拼 -->
      <multy-kind-makeup
        :AllowMultyKindMakeup="
          obj2GetProductPrice.ProductParams.AllowMultyKindMakeup
        "
        :maxColCount="obj2GetProductPrice.ProductParams.MaxMakeupColumnNumber"
        :maxRowCount="obj2GetProductPrice.ProductParams.MaxMakeupRowNumber"
      />

      <!-- :list="obj2GetProductPrice.ProductParams.PropertyList"
      @change="changeAttributes" -->
      <!-- 必选工艺 -->
      <craft-list-comp
        title="必选工艺"
        v-if="RequiredCraft"
        :selectedArr="obj2GetProductPrice.ProductParams.CraftList2Req.First"
        @setCraftList="setProductParamsCraftList"
        :data="RequiredCraft"
      />
      <!-- 可选工艺 -->
      <craft-list-comp
        title="可选工艺"
        v-if="notRequiredCraft"
        :selectedArr="obj2GetProductPrice.ProductParams.CraftList2Req.First"
        @setCraftList="setProductParamsCraftList"
        :data="notRequiredCraft"
      />
      <!-- 部件列表组件 -->
      <PartComps :PartList="obj2GetProductPrice.ProductParams.PartList" />
    </div>

    <footer class="btn-wrap">
      <!-- <mp-button @click.native="go2GetProductPrice" title="报价" /> -->
    </footer>
  </article>
</template>

<script>
import {
  mapState, mapGetters, mapMutations, mapActions,
} from 'vuex';
import MultyKindMakeup from '@/components/QuotationComps/ProductQuotationContentComps/NewPcComps/MultyKindMakeup.vue';
import AttributesComp from '@/components/QuotationComps/ProductQuotationContentComps/NewPcComps/AttributesComp.vue';
import CraftListComp from '@/components/QuotationComps/ProductQuotationContentComps/NewPcComps/CraftListComp.vue';
import PartComps from '@/components/QuotationComps/ProductQuotationContentComps/Sections/PartComps.vue';
// import MpButton from '@/components/My/Btn2.vue';
import ProductCountComp from './NewPcComps/ProductCountComp.vue';

export default {
  props: {
    /**
     * 当前产品主体数据
     */
    data: {
      type: Object,
      required: true,
    },
  },
  components: {
    ProductCountComp,
    MultyKindMakeup,
    AttributesComp,
    CraftListComp,
    PartComps,
    // MpButton,
  },
  computed: {
    ...mapState('Quotation', ['obj2GetProductPrice']),
    ...mapGetters('Quotation', ['curProductShowNameInfo']),
    // 数量下拉列表数据
    countOption() {
      if (
        !this.obj2GetProductPrice.ProductParams.RecommendNumberList
        || this.obj2GetProductPrice.ProductParams.RecommendNumberList.length === 0
      ) return [];
      // { text: 40, value: 40 }
      return this.obj2GetProductPrice.ProductParams.RecommendNumberList.map(
        item => ({
          text: item,
          value: item,
        }),
      );
    },
    // 产品数量
    ProductAmount: {
      get() {
        return this.obj2GetProductPrice.ProductParams.ProductAmount;
      },
      set(newVal) {
        this.setProductParams(['ProductAmount', `${newVal}`]);
      },
    },
    // 产品款数
    KindCount: {
      get() {
        return this.obj2GetProductPrice.ProductParams.KindCount;
      },
      set(newVal) {
        let _str = newVal;
        if (newVal.length > 9) _str = '';
        this.setProductParams(['KindCount', `${_str}`]);
      },
    },
    RequiredCraft() {
      if (this.obj2GetProductPrice.ProductParams.CraftList.length === 0) return null;
      const _data = this.obj2GetProductPrice.ProductParams.CraftList.find(
        it => it.ChoiceType === 2,
      );
      return _data;
    },
    notRequiredCraft() {
      if (this.obj2GetProductPrice.ProductParams.CraftList.length === 0) return null;
      const _data = this.obj2GetProductPrice.ProductParams.CraftList.find(
        it => it.ChoiceType === 1,
      );
      return _data;
    },
    // 产品属性
    AttributeList: {
      get() {
        return this.obj2GetProductPrice.ProductParams.PropertyList;
      },
      set([data, index, type]) {
        // console.log("setProductParamsPropertyList", data);
        this.setProductParamsPropertyList([index, data, type]);
      },
    },
  },
  data() {
    return {
      curDefaultID: '',
      // docmHeight: document.documentElement.clientHeight, //默认屏幕高度
      // showHeight: document.documentElement.clientHeight //实时屏幕高度
      // hideshow: true //显示或者隐藏
    };
  },
  methods: {
    ...mapMutations('Quotation', ['setProductParams', 'setProductParamsPropertyList', 'setProductParamsCraftList']),
    ...mapActions('Quotation', ['getProductPrice']),
    ...mapActions('common', ['getCraftRelationList']),
    async go2GetProductPrice() {
      // this.$message.singleSuccess(
      //   "充值失败、请重试！",
      //   "132",
      //   this.getProductPriceLocal
      // );
      this.getProductPriceLocal();
    },
    async getProductPriceLocal() {
      const msg = await this.getProductPrice();
      if (msg === true) {
        // this.$message.singleSuccess("报价成功", "", () =>
        //   this.$router.push("/offerResult")
        // );
        // Toast("报价成功");
        this.$router.push('/offerResult');
      } else if (typeof msg === 'string') {
        this.$message.singleError('报价失败', msg, null);
      }
    },
    handleSpecClick(item) {
      const { DefaultID } = item;
      if (this.curDefaultID === DefaultID) return;
      this.curDefaultID = DefaultID;
      this.$store.commit('Quotation/setDefaultProductInfo', item);
      // console.log(1223332131);
      // this.$forceUpdate();
    },
  },
  mounted() {
    if (this.countOption.length > 0 && !this.ProductAmount) {
      const _count = this.countOption[0].value;
      this.setProductParams(['ProductAmount', `${_count}`]);
    }
    this.getCraftRelationList();
    // window.onresize = () => {
    //   // alert("onresize, default mounted");
    //   this.showHeight = document.body.clientHeight;
    // };
  },
  watch: {
    countOption(newVal) {
      if (newVal.length > 0) {
        this.setProductParams(['ProductAmount', `${newVal[0].value}`]);
      }
    },
    // showHeight() {
    //   if (this.docmHeight > this.showHeight + 100) {
    //     // this.hideshow = false;
    //     this.$store.commit("global/setState2BottomMenu", false);
    //   } else {
    //     // this.hideshow = true;
    //     this.$store.commit("global/setState2BottomMenu", true);
    //   }
    // }
  },
  // beforeDestroy() {
  //   window.onresize = null;
  // }
};
</script>

<style lang="scss">
.mp-quotation-product-quotation-content-wrap {
  width: 1200px;
  margin: 25px auto 30px;
  padding: 30px;
  box-sizing: border-box;
  background-color:#fff;
  font-size: 14px;
  color: #585858;

  > .content {
    > .content-title {
      color: #333;
      font-weight: 700;
      margin-bottom: 35px;
      > .blue-v-line {
        margin-right: 6px;
      }
    }
    > .count-model-box {
      > div {
        display: inline-block;
        margin-bottom: 22px;
        & + div {
          margin-left: 80px;
        }
      }
    }
    // ------------------------------- ⬇ 公共样式
    .title {
      min-width: 6em;
      text-align: right;
      display: inline-block;
    }
    .gray {
      color: #888;
    }
    .el-input {
      width: unset;
    }
    input {
      width: 140px;
      height: 30px;
      line-height: 28px;
      margin-left: 5px;
      margin-right: 10px;
      padding: 0 20px 0 10px;
    }
    .el-input__suffix {
      .el-input__icon {
        line-height: 30px;
      }
    }
    .el-radio__input.is-checked + .el-radio__label,
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #585858;
    }
    .el-radio__input.is-checked .el-radio__inner {
      background: #fff;
      &::after {
        background-color: #428DFA;
        width: 8px;
        height: 8px;
      }
    }
    .remark {
      font-size: 12px;
    }
    .el-radio-group {
      margin-left: 5px;
    }
    // ------------------------------- ⬆
  }
}
</style>
