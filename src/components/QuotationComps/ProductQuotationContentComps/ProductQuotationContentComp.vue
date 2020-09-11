<template>
  <article class="mp-quotation-product-quotation-content-wrap">
    <header v-if="data.DefaultProduct && data.DefaultProduct.length > 0">
      <span class="is-gray">常用规格：</span>
      <ul class="is-blue">
        <li v-for="item in data.DefaultProduct" :key="item.DefaultID">
          <button
            :class="curDefaultID === item.DefaultID ? 'active' : ''"
            @click="handleSpecClick(item)"
          >
            {{ item.DefaultName }}
          </button>
        </li>
      </ul>
    </header>
    <div class="content">
      <!-- 数量 -->
      <count-class-comp
        :option="countOption"
        v-model="ProductAmount"
        :remark="obj2GetProductPrice.ProductParams.Unit"
      />
      <!-- 款数 -->
      <single-input-comp
        v-if="obj2GetProductPrice.ProductParams.AllowMultyKind"
        v-model.trim="KindCount"
      />
      <!-- 联拼行列数及是否允许多款联拼 -->
      <multy-kind-makeup
        :AllowMultyKindMakeup="
          obj2GetProductPrice.ProductParams.AllowMultyKindMakeup
        "
        :maxColCount="obj2GetProductPrice.ProductParams.MaxMakeupColumnNumber"
        :maxRowCount="obj2GetProductPrice.ProductParams.MaxMakeupRowNumber"
      />
      <!-- 属性 -->
      <attributes-comp v-model="AttributeList" />

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
      <mp-button @click.native="go2GetProductPrice" title="报价" />
    </footer>
  </article>
</template>

<script>
import CountClassComp from '@/components/QuotationComps/ProductQuotationContentComps/Sections/CountClassComp.vue';
import SingleInputComp from '@/components/QuotationComps/ProductQuotationContentComps/Sections/SingleInputComp.vue';
import MultyKindMakeup from '@/components/QuotationComps/ProductQuotationContentComps/Sections/MultyKindMakeup.vue';
import AttributesComp from '@/components/QuotationComps/ProductQuotationContentComps/Sections/AttributesComp.vue';
import CraftListComp from '@/components/QuotationComps/ProductQuotationContentComps/Sections/CraftListComp.vue';
import PartComps from '@/components/QuotationComps/ProductQuotationContentComps/Sections/PartComps.vue';
// import MpButton from '@/components/My/Btn2.vue';
import { mapState, mapMutations, mapActions } from 'vuex';
// import { Toast } from "vant";
// import mixin2HideBottomMenu from '@/assets/js/mixins/mixin2HideBottomMenu.js';

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
    CountClassComp,
    SingleInputComp,
    MultyKindMakeup,
    AttributesComp,
    CraftListComp,
    PartComps,
    // MpButton,
  },
  // mixins: [mixin2HideBottomMenu],
  computed: {
    ...mapState('Quotation', ['obj2GetProductPrice']),
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
    ...mapActions('global', ['getCraftRelationList']),
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
@import "@/assets/css/Common/var.scss";
.mp-quotation-product-quotation-content-wrap {
  color: $--color-text-primary;
  font-size: 13px !important;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  > div.content > section > header {
    height: 24px;
    line-height: 24px;
  }
  > .btn-wrap {
    // padding: 45px 12.5px 24.5px 12.5px;
    padding: 45px 12.5px 67.5px 12.5px;
    > .btn2-wrap {
      > .btn2 > span.van-button__text {
        font-size: 15px;
      }
    }
  }
  > div.content {
    > .mp-duotation-content-comps-attribute-wrap {
      margin-top: 12.5px;
    }
    > .mp-duotation-content-comps-count-wrap {
      margin-bottom: 12.5px;
    }
    background-color: $--color-white;
    margin-top: 10px;
    padding: 12.5px;
    // padding-bottom: 28px;
  }
  input {
    color: $--color-blue !important;
  }

  > header {
    display: flex;
    margin-top: 10px;
    font-size: 12px;
    padding: 0 12.5px;
    > span {
      flex: none;
      line-height: 18px;
    }
    > ul {
      display: flex;
      flex-wrap: wrap;
      > li {
        margin: 0 5px;
        line-height: 16px;
        > button {
          border: none;
          outline: none;
          background-color: rgb(245, 245, 245);
          &:active,
          &.active {
            color: $--color-origin;
          }
        }
      }
    }
  }
}
</style>
