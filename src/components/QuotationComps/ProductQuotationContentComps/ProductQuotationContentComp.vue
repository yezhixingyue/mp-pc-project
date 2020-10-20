<template>
  <article class="mp-quotation-product-quotation-content-wrap">
    <!-- <header v-if="data.DefaultProduct && data.DefaultProduct.length > 0">
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
    </header> -->
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

    <section class="coupon-calculate-price-wrap">
      <header>
        <div class="result" v-if="ProductQuotationResult && !priceGetErrMsg">
          <span>原价：<i>¥{{ProductQuotationResult.OriginalCost}}元</i></span>
          <span>优惠券：<i v-if="selectedCoupon && coupon" class="is-pink">{{'-¥' + coupon}}元</i></span>
          <span v-if="ProductQuotationResult.ExpressCost && ProductQuotationResult.ExpressCost > 0"
            >运费：<i>¥{{ProductQuotationResult.ExpressCost}}元</i></span>
          <span>成交价：
            <i class="is-pink is-bold is-font-20">¥{{Cost}}</i>
            <i class="is-pink">元</i>
            <em class="is-gray is-font-12">(不含运费)</em>
          </span>
        </div>
        <div class="result" v-if="priceGetErrMsg">
          <span class="is-pink">{{ priceGetErrMsg }}</span>
        </div>
        <el-button type="primary" @click.native="go2GetProductPrice">计算价格</el-button>
      </header>
      <footer>
        <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
          <template slot="title">
            <span class="gray no-cursor" v-if="selectedCoupon" @click.stop="null">已选择满
              {{selectedCoupon.MinPayAmount}}元减{{selectedCoupon.Amount}}元
              <i class="is-font-12 is-pink">{{ couponConditionText }}</i>
            </span>
            <el-button class="button-title-pink" @click="onBtnClick">
              使用优惠券<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
          </template>
          <section class="coupon-wrap">
            <header>
              <span>激活优惠券：</span>
              <el-input v-model.trim="computedCouponCode2Add" placeholder="请输入优惠券激活码"></el-input>
              <el-button type="primary" :disabled='!computedCouponCode2Add' @click="getCouponActivate">激活</el-button>
              <!-- <i class="span-title-blue">不使用优惠券</i> -->
            </header>
            <ul class="coupon-list mp-scroll-wrap" v-if="couponList.length > 0">
              <li class="float" v-for="item in couponList" :key="item.CouponCode"
                :class="{selected: selectedCoupon && item.CouponCode === selectedCoupon.CouponCode}" >
                <div class="header">
                  <span>
                    <i class="is-font-14">¥</i>
                    <i class="is-bold is-font-30">{{item.Amount}}</i>
                  </span>
                  <span class="is-font-12">
                    满<i class="is-font-14">{{item.MinPayAmount}}</i>元可用
                  </span>
                </div>
                <div class="content is-font-12">
                  <p>
                    <span>限产品：</span>
                    <span class="product">{{item.ProductString}}</span>
                  </p>
                  <p>
                    <span>有效期至：</span>
                    <span>{{item.ValidEndTime | format2MiddleLangTypeDate}}</span>
                  </p>
                </div>
                <div class="aside" @click="addCouponCode(item)">点击选择</div>
                <div class="icon-box"></div>
              </li>
            </ul>
          </section>
        </el-collapse-item>
      </el-collapse>
      </footer>
    </section>

    <AddShowChangeComp ref="AddShowChangeComp" />

    <!-- <button @click="handleMapPosition">12312312</button> -->

    <OrderSubmitComp @handleMapPosition='handleMapPosition' />
  </article>
</template>

<script>
import {
  mapState, mapGetters, mapMutations, mapActions,
} from 'vuex';
import MultyKindMakeup from '@/components/QuotationComps/ProductQuotationContentComps/NewPcComps/MultyKindMakeup.vue';
import AttributesComp from '@/components/QuotationComps/ProductQuotationContentComps/NewPcComps/AttributesComp.vue';
import CraftListComp from '@/components/QuotationComps/ProductQuotationContentComps/NewPcComps/CraftListComp.vue';
import PartComps from '@/components/QuotationComps/ProductQuotationContentComps/NewPcComps/PartComps.vue';
import ProductCountComp from './NewPcComps/ProductCountComp.vue';
import AddShowChangeComp from '../PlaceOrderComps/AddShowChangeComp.vue';
import OrderSubmitComp from '../PlaceOrderComps/OrderSubmitComp.vue';

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
    AddShowChangeComp,
    OrderSubmitComp,
  },
  computed: {
    // eslint-disable-next-line max-len
    ...mapState('Quotation', ['obj2GetProductPrice', 'ProductQuotationResult', 'curProductClass', 'curProductID', 'selectedCoupon']),
    ...mapGetters('Quotation', ['curProductShowNameInfo']),
    ...mapState('common', ['customerInfo']),
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
    computedCouponCode2Add: {
      get() {
        return this.couponCode2Add;
      },
      set(newVal) {
        this.couponCode2Add = newVal.replace(/[^\w]/g, '');
      },
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
    coupon() {
      if (!this.ProductQuotationResult) return '';
      if (!this.selectedCoupon) return '';
      if (this.ProductQuotationResult.CurrentCost >= this.selectedCoupon.MinPayAmount) {
        return this.selectedCoupon.Amount;
      }
      return '';
    },
    Cost() {
      if (!this.ProductQuotationResult) return '';
      if (!this.selectedCoupon) return this.ProductQuotationResult.CurrentCost;
      if (this.ProductQuotationResult.CurrentCost >= this.selectedCoupon.MinPayAmount) {
        const num = this.ProductQuotationResult.CurrentCost - this.selectedCoupon.Amount;
        return num > 0 ? num : 0;
      }
      return this.ProductQuotationResult.CurrentCost;
    },
    couponConditionText() {
      if (!this.ProductQuotationResult) return '(点击 计算价格 查看是否可使用)';
      if (!this.coupon) return '(尚未满足使用条件)';
      return '';
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
      activeNames: [],
      couponList: [],
      // selectedCoupon: null,
      priceGetErrMsg: '',
      couponCode2Add: '',
    };
  },
  methods: {
    // eslint-disable-next-line max-len
    ...mapMutations('Quotation', ['setProductParams', 'setProductParamsPropertyList', 'setProductParamsCraftList']),
    ...mapActions('Quotation', ['getProductPrice']),
    ...mapActions('common', ['getCraftRelationList']),
    handleMapPosition(cb) {
      console.log(cb, 'cb func ----');
      this.$refs.AddShowChangeComp.handleSetPositionOnMap(cb);
    },
    async go2GetProductPrice() {
      this.getProductPriceLocal();
    },
    async getProductPriceLocal() {
      this.priceGetErrMsg = '';
      const msg = await this.getProductPrice('报价');
      if (msg === true) {
        // this.$router.push('/offerResult');
      } else if (typeof msg === 'string') {
        // this.$message.singleError('报价失败', msg, null);
        this.priceGetErrMsg = msg;
        // this.messageBox.failSingleError({ title: '报价失败', msg });
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
    async handleChange(list, bool) {
      if (list.length === 0) return; // 关闭
      if (!bool && this.couponList.length > 0) return;
      const _obj = { UseStatus: 0 };
      _obj.Product = {
        ClassID: this.curProductClass.First,
        TypeID: this.curProductClass.Second,
        ProductID: this.curProductID,
      };
      const res = await this.api.getCouponList(_obj);
      if (res.data.Status !== 1000) return;
      this.couponList = res.data.Data;
    },
    onBtnClick(evt) {
      let { target } = evt;
      if (target.nodeName === 'SPAN') {
        target = evt.target.parentNode;
      }
      target.blur();
    },
    async getCouponActivate() {
      if (!this.couponCode2Add) return;
      if (this.couponCode2Add.length !== 10) {
        this.messageBox.warnSingleError({
          title: '激活失败',
          msg: '请输入10位优惠券码',
        });
        return;
      }
      await this.$store.dispatch('common/getCustomerDetail');
      if (!this.customerInfo) return;
      const { CustomerID } = this.customerInfo;
      const ProductID = this.curProductID;
      const CouponCode = this.couponCode2Add;
      const _obj = { CustomerID, ProductID, CouponCode };
      const res = await this.api.getCouponActivate(_obj);
      if (res.data.Status !== 1000) return;
      this.couponCode2Add = '';
      this.messageBox.successSingle({
        title: '激活成功',
        // successFunc: () => this.handleChange([1], true),
        successFunc: () => {
          this.couponList.push(res.data.Data);
        },
      });
    },
    addCouponCode(item) {
      if (!this.selectedCoupon || this.selectedCoupon.CouponCode !== item.CouponCode) {
        // this.selectedCoupon = item;
        this.$store.commit('Quotation/setSelectedCoupon', item);
      } else {
        // this.selectedCoupon = null;
        this.$store.commit('Quotation/setSelectedCoupon', null);
      }
    },
  },
  mounted() {
    if (this.countOption.length > 0 && !this.ProductAmount) {
      const _count = this.countOption[0].value;
      this.setProductParams(['ProductAmount', `${_count}`]);
    }
    this.getCraftRelationList();
  },
  watch: {
    countOption(newVal) {
      if (newVal.length > 0) {
        this.setProductParams(['ProductAmount', `${newVal[0].value}`]);
      }
    },
    obj2GetProductPrice: {
      handler() {
        this.$store.commit('Quotation/setProductQuotationResult', null);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
.mp-quotation-product-quotation-content-wrap {
  width: 1200px;
  margin: 25px auto 30px;
  padding: 30px;
  padding-bottom: 15px;
  box-sizing: border-box;
  background-color:#fff;
  font-size: 14px;
  color: #585858;

  > .content {
    > .content-title {
      color: #333;
      font-weight: 700;
      margin-bottom: 35px;
      // padding-left: 20px;
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
      right: 10px;
    }
    .remark {
      font-size: 12px;
    }
    .el-radio-group {
      margin-left: 5px;
    }
    // ------------------------------- ⬆
  }
  > .coupon-calculate-price-wrap {
    > header {
      text-align: right;
      margin-top: 38px;
      margin-bottom: 22px;
      > .result {
        display: inline-block;
        margin-right: 3px;
        > span {
          margin-right: 18px;
        }
      }
      > button {
        width: 120px;
      }
    }
    > footer {
      > .el-collapse {
        border: none;
        > .el-collapse-item {
          > div {
            &::after {
              content: '';
              display: block;
              clear: both;
            }
            > .el-collapse-item__header {
              text-align: right;
              justify-content: flex-end;
              border: none;
              float: right;
              cursor: unset;
              > span {
                display: inline;
                color: #888;
                cursor: unset;
              }
              > button {
                display: inline-block;
                border-radius: 5px;
                height: 30px;
                width: 120px;
                line-height: 28px;
                padding: 0;
                margin-left: 22px;
                > span > i {
                  transition: 0.2s;
                }
              }
              > i {
                display: none;
              }
              &.is-active > button > span > i{
                transform: rotate(180deg);
              }
            }
          }
          .el-collapse-item__wrap {
            border: none;
            padding-top: 35px;
            > .el-collapse-item__content {
              padding: 0;
              > .coupon-wrap {
                > header {
                  margin-bottom: 50px;
                  text-align: center;
                  // .span-title-blue {
                  //   display: inline-block;
                  //   &::before {
                  //     content: '';
                  //     display: inline-block;
                  //     height: 23px;
                  //     width: 1px;
                  //     background-color: #428dfa;
                  //     margin: 0 15px 0px 35px;
                  //     vertical-align: middle;
                  //   }
                  // }
                  > .el-input {
                    width: 300px;
                    > input {
                      height: 30px;
                      // line-height: 26px;
                    }
                  }
                  > span {
                    color: #888;
                    margin-right: 6px;
                  }
                  > button {
                    height: 30px;
                    width: 70px;
                    line-height: 28px;
                    padding: 0;
                    margin-left: 20px;
                  }
                }
                > .coupon-list {
                  padding: 0 8px;
                  // display: flex;
                  max-height: 322px;
                  overflow-y: auto;
                  > li {
                    width: 240px;
                    height: 135px;
                    box-shadow: 0px 5px 7px 1px rgba(238, 238, 238, 0.7);
                    border-radius: 5px;
                    overflow: hidden;
                    position: relative;
                    display: inline-block;
                    margin: 0 18px 20px;
                    > .header {
                      width: 100%;
                      height: 60px;
                      background-color: #9399ff;
                      padding: 5px 20px 0;
                      // padding-bottom: 10px;
                      box-sizing: border-box;
                      color: #fff;
                      float: left;
                      span.is-font-12 {
                        vertical-align: 28%;
                        margin-left: 23px;
                      }
                    }
                    > .content {
                      padding: 10px 20px 0;
                      overflow: hidden;
                      > p {
                        > span {
                          color: #888;
                          &.product {
                            color: #585858;
                          }
                        }
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        line-height: 27px;
                      }
                    }
                    > .aside {
                      position: absolute;
                      top: 0;
                      right: 0;
                      bottom: 0;
                      width: 40px;
                      writing-mode: vertical-rl;
                      padding: 28px 8px 12px 0;
                      box-sizing: border-box;
                      font-size: 14px;
                      color: #fff;
                      background-color: rgba($color: #428dfa, $alpha: 0.6);
                      text-align: justify;
                      text-justify:distribute-all-lines;
                      text-align-last:justify;
                      cursor: pointer;
                      display: none;
                      user-select: none;
                      z-index: 9;
                      transition: 0.2s;
                      &:hover {
                        background-color: rgba($color: #428dfa, $alpha: 0.72);
                      }
                      &:active {
                         background-color: rgba($color: #428dfa, $alpha: 0.88);
                      }
                    }
                    > .icon-box {
                      width: 40px;
                      height: 42px;
                      position: absolute;
                      right: 0;
                      bottom: 0;
                      display: none;
                      background: url('../../../assets/images/coupon-selected.png') no-repeat right bottom / 100% 100%;
                    }
                    &:hover > .aside {
                      display: block;
                    }
                    &.selected{
                      > .icon-box {
                        display: block;
                      }
                      // &:hover > .aside {
                      //   display: none;
                      // }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  > section {
    > .bg-gray {
      width: 1200px;
      height: 15px;
      margin: 15px -30px 0;
      // background-color: rgb(245, 245, 245);
    }
    > .comp-title {
      height: 40px;
      width: 1200px;
      margin: 0 -30px;
      border-bottom: 1px dashed #eee;
      line-height: 39px;
      box-sizing: border-box;
      padding: 0 22px;
      padding-right: 30px;
      > .left {
        float: left;
      }
      > .right {
        float: right;
      }
      position: relative;
      &::before {
        height: 100%;
        width: 2px;
        background-color: #428dfa;
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }
  }
}
</style>
