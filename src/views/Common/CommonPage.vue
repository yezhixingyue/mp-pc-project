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
        <div class="contact-us-wrap" @click="handleDrawerOpen">
          <i class="iconfont icon-dianhua1"></i>
        </div>
        <el-backtop target="#app" :visibility-height='50'>
          <i class="iconfont icon-xiangshang"></i>
        </el-backtop>
      </div>
      <el-drawer
        :visible.sync="drawer"
        :with-header="false"
        size='350px'
        :before-close="handleClose">
        <section>
          <header>
            <span class="iconfont icon-dianhua"></span>
            <span class="is-gray">软件技术支持：</span>
          </header>
          <div class="content">
            <p>0371-55672961</p>
            <p>199-0397-0210</p>
            <p>199-3993-8782</p>
          </div>
        </section>
        <section class="qq-wrap">
          <header>
            <span class="iconfont icon-QQ1"></span>
            <span class="is-gray">客服QQ：</span>
          </header>
          <ul class="content">
            <li class="f">
              <p>
                <img src="../../assets/images/qq.png" alt="">
                <span>800051518（ 电商 ）</span>
              </p>
              <p>
                <img src="../../assets/images/qq.png" alt="">
                <span>800065607（ 郑州 ）</span>
              </p>
            </li>
            <li>
              <p>
                <img src="../../assets/images/qq.png" alt="">
                <span>800131899</span>
              </p>
              <p>西安、石家庄、山东</p>
            </li>
            <li>
              <p>
                <img src="../../assets/images/qq.png" alt="">
                <span>800131899</span>
              </p>
              <p>南阳、运城、长治、晋城、洛阳、三门峡</p>
            </li>
            <li>
              <p>
                <img src="../../assets/images/qq.png" alt="">
                <span>800131899</span>
              </p>
              <p>安阳、运城、长治、晋城、洛阳、邢台、聊城</p>
            </li>
            <li>
              <p>
                <img src="../../assets/images/qq.png" alt="">
                <span>800131899</span>
              </p>
              <p>开封、周口、长治、晋城、洛阳、亳州</p>
            </li>
            <li>
              <p>
                <img src="../../assets/images/qq.png" alt="">
                <span>800131899</span>
              </p>
              <p>焦作、运城、长治、晋城、洛阳、三门峡、临汾</p>
            </li>
          </ul>
        </section>
      </el-drawer>
    </div>
    <footer>
      <BlueInfoFooter  />
      <!-- <BlueInfoFooter cancollapse /> -->
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
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    handleClose(done) {
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
      done();
    },
    handleDrawerOpen() {
      this.drawer = true;
    },
  },
};
</script>

<style lang='scss'>
.mp-pc-common-page-comp-view-wrap {
  padding-top: 135px;
  background-color: rgb(245, 245, 245);
  box-sizing: border-box;
  min-width: 1200px;
  overflow-x: auto;
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
        right: -85px !important;
        bottom: 0px !important;
        width: 50px;
        height: 50px;
        background-color: #428dfa;
        border-radius: 5px;
        color: #fff;
        > i {
          font-size: 10px;
          transform: scale(0.9);
        }
        &:hover {
          background-color: mix(#fff, #428dfa, 20%);
        }
        &:active {
          background-color: #1d5ab6;
        }
      }
      > .contact-us-wrap {
        position: absolute;
        right: -85px !important;
        bottom: 65px;
        color: #428dfa;
        background-color: #fff;
        width: 48px;
        height: 48px;
        border-radius: 5px;
        text-align: center;
        border: 1px solid #fff;
        transition: 0.2s;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.15);
        // box-sizing: border-box;
        > i {
          font-size: 20px;
          position: absolute;
          left: 15px;
          top: 15px;
        }
        cursor: pointer;
        &:hover {
          // background-color: #eee;
          // border-color: #428dfa;
          border: 1px solid #428dfa;
          background-color: #428dfa;
          color: #fff;
        }
        &:active {
          // background-color: #eee;
          border: 1px solid #1d5ab6;
          // color: #428dfa;
          background-color: #1d5ab6;
        }
      }
    }
    @media screen and (max-width:1350px){
      > .back-wrapper {
        width: calc(100vw - 150px);
      }
    }
    @media screen and (max-width:1200px){
      > .back-wrapper {
        // width: calc(100vw);
        left: unset;
        right: 120px;
      }
    }
    > .el-drawer__wrapper {
      .el-drawer {
        width: 350px;
        outline: none;
        > .el-drawer__body {
          outline: none;
          padding-top: 30px;
          overflow-y: auto;
          > section {
            padding-left: 25px;
            padding-right: 23px;
            > header {
              user-select: none;
              padding-bottom: 23px;
              > span.iconfont {
                font-size: 15px;
                width: 28px;
                height: 28px;
                border: 1px solid #428dfa;
                border-radius: 50%;
                text-align: center;
                line-height: 28px;
                color: #428dfa;
                display: inline-block;
                margin-right: 15px;
              }
            }
            > div.content {
              > p {
                font-size: 16px;
                line-height: 20px;
                padding: 7px 0;
              }
            }
            &.qq-wrap {
              padding-top: 50px;
              > header {
                padding-bottom: 12px;
              }
              > ul.content {
                > li {
                  > p {
                    line-height: 38px;
                    // padding-top: 6px;
                    > img {
                      vertical-align: -5%;
                      margin-right: 8px;
                    }
                  }
                  padding-top: 14px;
                  border-bottom: 1px solid #eee;
                  &.f {
                    padding-top: 0px;
                  }
                }
              }
            }
          }
          &::-webkit-scrollbar {
            width: 6px;
            height: 8px;
          }
          &::-webkit-scrollbar-thumb {
            background-color: #e6e6e6;
            border-radius: 3px;
            &:hover {
              background-color: #cbcbcb;
            }
          }
        }
      }
    }
  }
  @keyframes identifier {
    // 0% {
    //   border: 1px solid ;
    // },
  }
}
</style>
