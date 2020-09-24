<template>
  <section class="mp-pc-common-page-header-common-wrap float">
    <header>
      <div>
        <img src="../../assets/images/logo-color.png" alt />
        <span>会员中心</span>
      </div>
      <ul>
        <li>
          <a href="http://www.mpzj.cn/">首页</a>
        </li>
        <li>
          <a href="http://www.mpzj.cn/about_complex.aspx">关于我们</a>
        </li>
      </ul>
    </header>
    <footer>
      <div class="common-header-menus-wrap float">
        <ul class="menu-list float">
          <router-link tag="li" to="/placeOrder">
            <i class="iconfont icon-xiadan"></i>
            <span>下单</span>
          </router-link>
          <router-link tag="li" to="/shoppingCar">
            <i class="iconfont icon-gouwuche"></i>
            <span>购物车</span>
          </router-link>
          <router-link tag="li" to="/nonPayment">
            <i class="iconfont icon-weifukuan"></i>
            <span>未付款</span>
          </router-link>
          <router-link tag="li" to="/order">
            <i class="iconfont icon-dingdan"></i>
            <span>订单</span>
          </router-link>
          <router-link tag="li" to="/serviceAfterSales">
            <i class="iconfont icon-shouhoudan"></i>
            <span>售后单</span>
          </router-link>
          <router-link tag="li" to="/bill">
            <i class="iconfont icon-zhangdan"></i>
            <span>账单</span>
          </router-link>
        </ul>
        <div class="customer-box">
          <span>
            豫纹图文
            <i class="title">/ 余额：</i>
            <i class="price">￥150</i>
          </span>
          <el-button round>在线充值</el-button>
          <el-popover placement="bottom-end" width="200" trigger="click">
            <div class="content">sadsadsadsadasd</div>
            <span class="customer-btn" slot="reference">
              150....2355
              <i class="iconfont icon-xiala"></i>
            </span>
          </el-popover>
        </div>
      </div>
    </footer>
  </section>
</template>

<script>
export default {};
</script>

<style lang='scss'>
.mp-pc-common-page-header-common-wrap {
  user-select: none;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  width: 100%;
  z-index: 1000;
  > header {
    width: 1200px;
    height: 80px;
    margin: 0 auto;
    > div {
      float: left;
      > img {
        width: 143px;
        height: 34px;
        margin-top: 23px;
        margin-right: 25px;
        vertical-align: -66%;
      }
      > span {
        color: #585858;
        font-size: 18px;
      }
    }
    > ul {
      float: right;
      padding-right: 75px;
      > li {
        float: left;
        height: 80px;
        width: 120px;
        > a {
          height: 100%;
          width: 100%;
          color: #333;
          text-decoration: unset;
          font-size: 16px;
          text-align: center;
          display: block;
          line-height: 78px;
          transition: 0.3s;
        //   &::after {
        //     height: 2px;
        //     width: 0%;
        //     transition: 0.25s;
        //     background-color: rgb(66, 141, 250);
        //     position: absolute;
        //     content: "";
        //     left: 50%;
        //     bottom: 16px;
        //     transform: translateX(-50%);
        //   }
          &:hover {
            position: relative;
            color: rgb(66, 141, 250);
            // &::after {
            //   width: 100%;
            // }
          }
        }
      }
    }
  }
  > footer {
    width: 100%;
    height: 55px;
    overflow: hidden;
    background-color: #428dfa;
    > .common-header-menus-wrap {
      width: 1200px;
      margin: 0 auto;
      > .menu-list {
        float: left;
        > li {
          float: left;
          height: 100%;
          line-height: 55px;
          width: 105px;
          color: #fff;
          font-size: 14px;
          text-align: center;
          cursor: pointer;
          > i {
            font-size: 19px;
            margin-right: 8px;
            vertical-align: bottom;
          }
          &.router-link-active {
            > span {
              font-weight: 600;
            }
            background-color: #2260ff;
          }
          &:hover {
            background-color: rgba($color: #2260ff, $alpha: 0.35);
          }
        }
      }
      > div.customer-box {
        float: right;
        color: #fff;
        line-height: 55px;
        > span {
          font-size: 12px;
          > i {
            font-size: 14px;
            &.price {
              font-weight: 600;
              font-size: 16px;
            }
          }
        }
        > button {
          height: 35px;
          margin: 0 25px 1px;
          padding: 9px 16px;
          background-color: #428dfa;
          color: #fff;
          width: 90px;
          &:hover {
            box-shadow: 0 0 3px #fff;
            text-shadow: 0 0 1px #fff;
          }
        }
        .customer-btn {
          font-size: 14px;
          > i {
            font-size: 15px;
            margin-left: 8px;
          }
        }
      }
    }
  }
}
</style>
