<template>
  <section class="mp-pc-order-detail-page-header-wrap">
    <header class="section-title">订单概括</header>
    <ul class="content">
      <li class="status-box" :class="{
        moving: +info4OrderSummary.Status === 80,
        unPay: +info4OrderSummary.Status === 10,
        normal: [20, 30, 40, 55, 60, 70].includes(+info4OrderSummary.Status),
        cancel: [254, 255, 35].includes(+info4OrderSummary.Status),
        success: +info4OrderSummary.Status === 200,
      }">
        <span>{{info4OrderSummary.Status | formatStatus}}</span>
      </li>
      <li class="address-box">
        <p>
          <span>订单编号：{{info4OrderSummary.OrderID}}</span>
          <span class="ml-50" v-if="info4OrderSummary.OutPlate">平台单号：{{info4OrderSummary.OutPlate}}</span>
        </p>
        <p class="mid">
          <span><i class="title">收件人：</i>{{info4OrderSummary.Consignee}}</span>
          <span class="ml-28">{{info4OrderSummary.Mobile}}</span>
          <span class="ml-40 gray">/ 配送方式：{{info4OrderSummary.Express}}</span>
        </p>
        <p>
          <el-tooltip popper-class="table-item" :enterable='false'
            :content="info4OrderSummary.Address" placement="top">
            <span>收件地址：{{info4OrderSummary.Address}}</span>
          </el-tooltip>
        </p>
      </li>
      <li class="file-box gray is-font-12">
        <p class="file-content">
          <span>文件内容：</span>
          <el-tooltip popper-class="table-item" :enterable='false'
            :content="info4OrderSummary.Content" placement="top-start">
            <span>{{info4OrderSummary.Content}}</span>
          </el-tooltip>
        </p>
        <p>
          <span>下单时间：</span>
          <span>{{info4OrderSummary.CreateTime | format2MiddleLangTypeDate}}</span>
        </p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    info4OrderSummary: {
      type: Object,
      default: () => ({}),
    },
  },

};
</script>

<style lang='scss'>
.mp-pc-order-detail-page-header-wrap {
  background: url('../../../assets/images/detail-saw.png') bottom left/ 1200px 5px repeat-x ;
  > ul.content {
    height: 147px;
    padding-top: 13px;
    > li {
      display: inline-block;
      vertical-align: top;
      &.status-box {
        width: 209px;
        height: 35px;
        border-right: solid 1px #eeeeee;
        padding-top: 95px;
        text-align: center;
        color: #f4a307;
        font-size: 14px;
        font-weight: 700;
        &.moving {
          background: url(../../../assets/images/moving.png) no-repeat 20px 13px/113px 66px;
        }
        &.normal {
          background: url(../../../assets/images/normal-status.png) no-repeat 20px 13px/113px 66px;
        }
        &.cancel {
          background: url(../../../assets/images/cancel-status.png) no-repeat 20px 13px/115px 70px;
          color: #cbcbcb;
        }
        &.success {
          background: url(../../../assets/images/success-status.png) no-repeat 21px 15px/112px 61px;
          color: #80c269;
        }
        &.unPay {
          background: url(../../../assets/images/unpay-status.png) no-repeat 20px 13px/115px 71px;
          color: #ff3769;
        }
      }
      &.address-box {
        width: 520px;
        border-right: solid 1px #eeeeee;
        padding-top: 14px;
        height: 116px;
        > p {
          padding: 0 25px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          > span {
            &.ml-50 {
              margin-left: 50px;
            }
            &.ml-28 {
              margin-left: 28px;
            }
            &.ml-40 {
              margin-left: 40px;
            }
            .title {
              width: 5em;
              text-align: right;
              display: inline-block;
            }
          }
          &.mid {
            margin-top: 32px;
            margin-bottom: 20px;
          }
        }
      }
      &.file-box {
        width: 465px;
        padding-top: 44px;
        height: 86px;
        > p {
          padding: 0 25px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &.file-content {
            margin-bottom: 24px;
          }
        }
      }
    }
  }
}
</style>
