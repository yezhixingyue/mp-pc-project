<!--
 * @Describe: 部件
 * @FilePath: /src/components/QuotationComps/ProductQuotationContentComps/Sections/PartComps copy.vue
-->
<template>
  <section class="mp-duotation-content-comps-part-comp-wrap">
    <!-- <van-collapse v-model="activeNames1">
      <van-collapse-item :name="it" v-for="it in 2" :key="it">
        <template #title>
          <header>
            <span class="title">标题1</span>
            <span class="del-btn" @click.stop="handleDelClick">
              删除封面2
            </span>
          </header>
        </template>
        <part-single-comp class="part-content" />
        <footer>
          <div>
            <van-icon name="plus" />
          </div>
          <span>添加封面</span>
        </footer>
      </van-collapse-item>
      <div>test</div>
    </van-collapse>
    <van-collapse v-model="activeNames2">
      <van-collapse-item :name="it" v-for="it in 2" :key="it">
        <template #title>
          <header>
            <span class="title">标题1</span>
            <span class="del-btn" @click.stop="handleDelClick">
              删除封面2
            </span>
          </header>
        </template>
        <part-single-comp class="part-content" />
        <footer>
          <div>
            <van-icon name="plus" />
          </div>
          <span>添加封面</span>
        </footer>
      </van-collapse-item>
    </van-collapse> -->
    <MpCollapseComp>
      <template #header>
        <header>
          <span class="title">标题1</span>
          <span class="del-btn" @click.stop="handleDelClick">
            删除封面2
          </span>
        </header>
      </template>
      <part-single-comp class="part-content" />
      <template #will-not-collapse>
        <footer>
          <div>
            <van-icon name="plus" />
          </div>
          <span>添加封面</span>
        </footer>
      </template>
    </MpCollapseComp>
  </section>
</template>

<script>
import PartSingleComp from '@/components/QuotationComps/ProductQuotationContentComps/Sections/PartSingleComp.vue';
import MpCollapseComp from '@/components/QuotationComps/SMComps/MpCollapseComp.vue';
// import Vue from "vue";
// import { Collapse, CollapseItem } from "vant";

// Vue.use(Collapse);
// Vue.use(CollapseItem);

export default {
  components: {
    PartSingleComp,
    MpCollapseComp,
  },
  data() {
    return {
      // activeNames1: ["1", "2", "3", "4", "5"],
      // activeNames2: ["1", "2", "3", "4", "5"]
    };
  },
  methods: {
    handleDelClick(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="scss">
// @import "@/assets/css/Common/var.scss";
.mp-duotation-content-comps-part-comp-wrap {
  > .van-collapse {
    > .van-collapse-item {
      margin: 0 -12.5px;
      margin-top: 18px;
      // background-color: $--border-color-3;
      box-sizing: border-box;
      > .van-cell {
        // background-color: $--border-color-3;
        height: 30px;
        line-height: 30px;
        padding: 0;
        padding: 0 12.5px;
        > .van-cell__title {
          text-align: left;
          > header {
            font-size: 15px;
            font-weight: 700;
            // color: $--color-dark;
            display: flex;
            align-items: center;
            justify-content: space-between;
            > span.title {
              display: flex;
              align-items: center;
              &::before {
                display: inline-block;
                width: 3px;
                height: 20px;
                // background-color: $--color-blue;
                margin-right: 10px;
                content: "";
              }
            }
            > span.del-btn {
              margin-right: 30px;
              font-weight: 400;
              font-size: 13px;
              // color: $--color-gray;
              display: flex;
              align-items: center;
              &::after {
                content: "";
                width: 15px;
                height: 15px;
                // background: url("../../../../assets/images/quotationdel.png")
                //   no-repeat center/100% 100%;
                margin-left: 12px;
              }
            }
          }
        }
        > i {
          font-size: 13px;
          // color: $--color-text-light;
          display: flex;
          align-items: center;
          &::before {
            content: "收起";
            transform: rotate(0deg);
            font-size: 13px;
            position: relative;
            top: 1px;
          }
          &::after {
            display: inline-block;
            width: 14px;
            height: 13px;
            background: url("../../../../assets/images/doubleArrow.png")
              no-repeat center;
            background-size: 14px 13px;
            margin-left: 10px;
            content: "";
            transition: 0.3s !important;
            transform: rotate(180deg);
            position: relative;
            top: 2px;
          }
        }
        &.van-collapse-item__title--expanded > i::after {
          transform: rotate(0deg);
        }
      }
      > .van-collapse-item__wrapper {
        > .van-collapse-item__content {
          // > .part-content {

          // }
          > footer {
            height: 50px;
            // color: $--color-gray;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            > div {
              width: 20px;
              height: 20px;
              background-color: #428dfa;
              border-radius: 5px;
              margin-right: 7px;
              // color: $--color-white;
              display: flex;
              font-size: 12px;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
    }
  }
}
</style>
