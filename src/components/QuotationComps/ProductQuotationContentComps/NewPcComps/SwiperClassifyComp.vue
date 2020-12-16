<template>
  <section class="mp-duration-content-swiper-classify-comp-wrap">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane
        v-for="item in classiftList"
        :key="item.ProductID"
        :label="item.ProductName"
        :name="item.ProductID">
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState('Quotation', ['curProductClass', 'curProductID']),
    ...mapGetters('Quotation', ['allProductClassify']),
    classiftList() {
      if (!this.curProductClass || !this.allProductClassify || this.allProductClassify.length === 0) return [];
      const { First, Second } = this.curProductClass;
      const level1 = this.allProductClassify.find(lv1 => lv1.ID === First);
      if (level1) {
        const level2 = level1.children.find(lv2 => lv2.ID === Second);
        if (level2) return level2.children;
      }
      return [];
    },
    activeName: {
      get() {
        return this.curProductID;
      },
      set(val) {
        console.log(val);
      },
    },
  },
};
</script>

<style lang='scss'>
.mp-duration-content-swiper-classify-comp-wrap {
  padding-bottom: 35px;
  .el-tabs__header {
    margin: 0;
    border-color: #e5e5e5;
    .el-tabs__nav-wrap {
      padding: 0 38px;
      > span {
        line-height: 35px;
        width: 35px;
        height: 35px;
        > i {
          height: 22px;
          width: 22px;
          position: absolute;
          top: 6px;
          left: 6px;
          background-color: #f5f5f5;
          border-radius: 50%;
          &::before {
            position: absolute;
            left: 5px;
            top: 5px;
          }
        }
      }
    }
    .el-tabs__nav {
      border: none;
    }
    .el-tabs__item {
      height: 35px;
      line-height: 35px;
      border: 1px solid transparent;
      border-bottom: none;
      color: #888;
      &.is-active {
        border-color: #e5e5e5;
        position: relative;
        color: #428dfa;
        &::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background-color: #fff;
        }
        &::before {
          content: '';
          position: absolute;
          left: -1px;
          right: -1px;
          top: -1.5px;
          height: 3px;
          background-color: #428dfa;
        }
      }
    }
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item:first-child {
    border: 1px solid transparent;
    border-bottom: none;
    &.is-active {
      border-color: #e5e5e5;
    }
  }
}
</style>
