<template>
  <section class="mp-pc-place-order-upload-and-submit-comp-wrap">
    <header class="bg-gray"></header>
    <div class="comp-title float">
      <span class="left is-bold">印刷内容</span>
    </div>
    <div class="content">
      <ul>
        <li class="file-content-box">
          <span class="title">文件内容：</span>
          <el-input v-model="fileContent" placeholder="文件内容"></el-input>
        </li>
        <li class="upload-box">
          <UploadComp4BreakPoint ref='UploadComp4BreakPoint' :validateFunc='getProductPriceLocal'
            :msgTitle='title' @fillFileContent='fillFileContent'
            :successFunc="successFunc" @saveFile2Store='saveFile2Store' />
        </li>
      </ul>
      <div class="price-wrap">
        <div class="price-box">
          <div class="price-left">
            <p>原价：</p>
            <p>优惠券：</p>
            <p>运费：</p>
            <p class="final-price">成交价<i class="is-font-12 gray">（不含运费）</i>：</p>
          </div>
          <div class="price-right">
            <template v-if="ProductQuotationResult">
              <p>¥ {{ProductQuotationResult.OriginalCost}}</p>
              <p :class="coupon && coupon > 0 ? 'is-pink' : ''">
                <template v-show='coupon'>{{'¥ ' + (coupon ? coupon : 0)}}</template>
              </p>
              <p>¥ {{ProductQuotationResult.ExpressCost}}</p>
              <p class="final-price is-pink">¥ <i class="is-font-24 is-bold">{{Cost}}</i></p>
            </template>
          </div>
        </div>
      </div>
      <div class="submit-btn-wrap">
        <el-button class="button-title-pink" @click="onSave2TheCar">
          <i class="iconfont icon-jiarugouwuche" ></i>加入购物车</el-button>
        <el-button type="danger" @click="onSubmitOrder">直接下单</el-button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import UploadComp4BreakPoint from '@/components/common/UploadComp/UploadComp4BreakPoint.vue';

export default {
  components: {
    UploadComp4BreakPoint,
  },
  computed: {
    ...mapState('Quotation', ['selectedCoupon', 'ProductQuotationResult', 'addressInfo4PlaceOrder']),
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
  },
  data() {
    return {
      fileContent: '',
      title: '', // 用于弹窗标题显示   下单 | 添加购物车   后面自动添加失败2字
      type: '',
    };
  },
  methods: {
    successFunc({ compiledName }) {
      if (this.type === 'placeOrder') {
        const callBack = () => this.$router.push('/OrderPreCreate');
        this.$store.dispatch('Quotation/getOrderPreCreate', { compiledName, fileContent: this.fileContent, callBack });
      } else if (this.type === 'saveCar') {
        this.$store.dispatch('Quotation/getQuotationSave2Car', { compiledName, fileContent: this.fileContent });
      }
    },
    async onSubmitOrder() {
      this.title = '下单';
      this.type = 'placeOrder';
      await this.$refs.UploadComp4BreakPoint.saveFile2Store();
    },
    async onSave2TheCar(evt) {
      console.log(2131, 'onSave2TheCar');
      let { target } = evt;
      if (target.nodeName === 'SPAN') {
        target = evt.target.parentNode;
      }
      target.blur();
      this.title = '添加购物车';
      console.log(this.title);
      this.type = 'saveCar';
      await this.$refs.UploadComp4BreakPoint.handleElUpload();
    },
    fillFileContent(name) {
      this.fileContent = name;
    },
    async getProductPriceLocal() { // 校验函数  用来判断是否可以进行下单
      if (!this.addressInfo4PlaceOrder || !this.addressInfo4PlaceOrder.Address.Address.Consignee) return '请选择配送地址';
      console.log(this.title);
      const key = await this.$store.dispatch('Quotation/getProductPrice', this.title);
      return key;
    },
    saveFile2Store(file) {
      this.$store.commit('Quotation/setOrderFile4PreCreateData', file);
    },
  },
};
</script>

<style lang='scss'>
.mp-pc-place-order-upload-and-submit-comp-wrap {
  > .content {
    margin-top: 22px;
    > ul {
      border-bottom: 1px solid #eee;
      // padding-bottom: 8px;
      > li {
        margin-bottom: 30px;
        &.file-content-box {
          > .el-input {
            width: 700px;
            > input {
              height: 30px;
              font-size: 13px;
            }
          }
        }
        &.upload-box {
          text-align: right;
        }
      }
    }
    > .price-wrap {
      height: 215px;
      text-align: right;
      > .price-box {
        height: 100%;
        overflow: hidden;
        display: inline-block;
        > div {
          padding-top: 33px;
          > p {
            line-height: 33px;
            &.final-price {
              margin-top: 6px;
            }
          }
          &.price-left {
            float: left;
          }
          &.price-right {
            float: right;
            margin-left: 10px;
            > p {
              min-width: 80px;
            }
          }
        }
      }
    }
    > .submit-btn-wrap {
      text-align: right;
      padding-bottom: 30px;
      > button {
        width: 150px;
        height: 45px;
        padding: 0;
        line-height: 43px;
        > span > i {
          font-size: 19px;
          vertical-align: middle;
          margin-right: 14px;
          position: relative;
          top: -3px;
        }
        & + button {
          margin-left: 50px;
        }
      }
    }
  }
}
</style>
