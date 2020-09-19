<template>
  <div class="mp-pc-common-comp-all-page-footer-wrap">
    <ul class="content float">
      <li class="img-box"></li>
      <li class="text-box">
        <p>
          <span>Copyright ©2019 - 2022 郑州名片之家电子商务有限公司</span>
          <span>
            <a href="http://www.beian.miit.gov.cn/" target="_blank">豫ICP备16032622号-1</a>
          </span>
          <span>
            <a href="http://www.mpzj.cn/siteMap.html" target="_blank"> 网站地图</a>
          </span>
          <span>犀牛云提供企业云服务</span>
        </p>
        <p>
          <span>公司总机：400-6363-006</span>
          <span>售后电话：400-6363-500</span>
        </p>
        <p>
          <span>运营中心： 郑州花园路与国基路花园SOHO一栋10楼</span>
        </p>
      </li>
      <li class="img-code-box"></li>
    </ul>
  </div>
</template>

<script>
export default {

};
</script>

<style lang='scss'>
.mp-pc-common-comp-all-page-footer-wrap {
  width: 100%;
  height: 144px;
  background-color: #1D7AD9;
  .content {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    background-color: #1D7AD9;
    > li {
      height: 136px;
    }
    > .img-box {
      width: 155px;
      float: left;
      background: url(../../assets/images/logo-bottom.png) center center/154px 122px no-repeat;
    }
    >.text-box {
      float: left;
      padding-top: 32px;
      box-sizing: border-box;
      > p {
        height: 31px;
        > span {
            font-size: 12px;
            color: #fff;
            margin-right: 16px;
          > a {
            font-size: 12px;
            color: #fff;
            text-decoration: unset;
          }
        }
      }
    }
    >.img-code-box {
      float: right;
      width: 182px;
      background: url(https://0.rc.xiniu.com/g1/M00/20/75/CgAGTF1D4GyAOFkhAAMezvQFbb4851.png) no-repeat right center;
    }
  }
}
</style>
