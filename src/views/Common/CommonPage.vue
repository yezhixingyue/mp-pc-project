<template>
  <article class="mp-pc-common-page-comp-view-wrap">
    <header>
      <CommonHeader />
    </header>
    <div class="common-page-view-content">
      <!-- <keep-alive> -->
        <router-view />
      <!-- </keep-alive> -->
      <div class="back-wrapper">
        <el-backtop target="#app" class="top" :visibility-height='-1'>
          <i class="iconfont icon-dianhua1"></i>
        </el-backtop>
        <el-backtop target="#app" :visibility-height='-1'>
          <i class="iconfont icon-xiangshang"></i>
        </el-backtop>
      </div>
    </div>
    <footer>
      <BlueInfoFooter cancollapse />
    </footer>
  </article>
</template>

<script>
import CommonHeader from '@/components/CommonPageComps/CommonHeader.vue';
import BlueInfoFooter from '@/components/common/BlueInfoFooter.vue';

export default {
  components: {
    CommonHeader,
    BlueInfoFooter,
  },
};
</script>

<style lang='scss'>
.mp-pc-common-page-comp-view-wrap {
  padding-top: 135px;
  background-color: rgb(245, 245, 245);
  box-sizing: border-box;
  > .common-page-view-content {
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    min-height: calc(100vh - 135px - 22px);
    > .back-wrapper {
      width: 1200px;
      margin: 0 auto;
      height: 1px;
      position: fixed;
      bottom: 50px;
      left: calc(50% - 600px);
      > .el-backtop {
        position: absolute;
        bottom: 0;
        right: -85px !important;
        bottom: 0px !important;
        width: 55px;
        height: 55px;
        background-color: #428dfa;
        border-radius: 5px;
        color: #fff;
        > i {
          font-size: 13px;
        }
        &.top {
          bottom: 65px !important;
          color: #428dfa;
          background-color: #fff;
          > i {
            font-size: 22px;
          }
        }
      }
    }
  }
}
</style>
