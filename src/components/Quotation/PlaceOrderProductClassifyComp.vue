<template>
  <section class="mp-pc-place-order-product-classify-comp-wrap">
    <ul class="header float">
      <li
        v-for="(it,i) in allProductClassify"
        :key="it.ID"
        @mouseenter="onMouseEnter(i)"
        @mouseleave="onMouseLeave"
        :class="{ active: i === index && isOpen, selected: curProduct && it.ID === curProduct.ProductClass.First }"
      >
        <span>{{it.ClassName}}</span>
      </li>
    </ul>
    <div
      class="content"
      :class="isOpen ? 'active' : ''"
      @mouseenter="onMouseEnter(null)"
      @mouseleave="onMouseLeave"
    >
      <ul v-if="curMenus">
        <li v-for="item in curMenus.children" :key="item.ID" class="float">
          <span class="title float">{{item.ClassName}} <i class="iconfont icon-iconfontyoujiantou"></i> </span>
          <div class="products">
            <el-link
             v-for="sub in item.children"
             :key="sub.ProductID"
             :underline="false"
             @click="selectProduct(sub)"
             :class="curProduct && curProduct.ProductID === sub.ProductID ? 'active' : ''"
             >{{sub.ProductName}}</el-link>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      isOpen: false,
      timer: null,
      index: null,
      curProduct: null,
    };
  },
  computed: {
    ...mapGetters('Quotation', ['allProductClassify']),
    curMenus() {
      if (!this.index && this.index !== 0) return null;
      if (this.allProductClassify.length === 0) return null;
      const _obj = this.allProductClassify[this.index];
      if (_obj) return _obj;
      return null;
    },
  },
  methods: {
    onMouseEnter(i) {
      if (!this.isOpen) this.isOpen = true;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      if (i || i === 0) this.index = i;
    },
    onMouseLeave() {
      this.timer = setTimeout(() => {
        if (this.isOpen) this.isOpen = false;
      }, 50);
      //   if (this.isOpen) this.isOpen = false;
    },
    selectProduct(sub) {
      clearTimeout(this.timer);
      this.timer = null;
      this.isOpen = false;
      if (this.curProduct && this.curProduct.ProductID === sub.ProductID) return;
      this.curProduct = sub;
      this.$store.commit('Quotation/setCurProductInfo', sub);
      this.$store.dispatch('Quotation/getProductDetail');
    },
  },
  mounted() {
    this.$store.dispatch('Quotation/getProductClassify');
  },
};
</script>

<style lang='scss'>
.mp-pc-place-order-product-classify-comp-wrap {
  background-color: #fff;
  width: 100%;
  position: relative;
  > .header {
    height: 70px;
    width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
    > li {
      float: left;
      height: 70px;
      line-height: 70px;
      text-align: center;
      width: 80px;
      font-size: 14px;
      position: relative;
      color: #333;
      & + li {
        padding-left: 20px;
      }
      &.active {
        color: #428dfa;
        font-size: 16px;
        &::after {
          height: 3px;
          content: "";
          width: 80px;
          position: absolute;
          background-color: #428dfa;
          right: 0;
          bottom: 0;
        }
      }
      &.selected {
        color: #428dfa;
        // font-weight: 600;
        font-size: 16px;
      }
      &:hover {
        color: #428dfa;
      }
    }
    border-bottom: 1px dashed #eee;
  }
  > .content {
    width: 100%;
    margin: 0 auto;
    min-height: 300px;
    position: absolute;
    background-color: #fff;
    display: none;
    &.active {
      display: block;
    }
    > ul {
      width: 1200px;
      margin: 0 auto;
      padding: 14px 0;
      > li {
        display: flex;
        > .products {
        //   float: left;
          margin-left: 35px;
          white-space: normal;
          > .el-link {
            color: #888;
            margin: 10px 0;
            margin-right: 25px;
            &.active {
              color: #428dfa;
              font-weight: 600;
            }
            &:last-of-type {
              margin-right: 0;
            }
            .el-link--inner {
              font-size: 14px;
              &:hover {
                color: #428dfa;
              }
            }
          }
        }
        > .title {
          color: #444;
          font-weight: 600;
          font-size: 14px;
          min-width: 4em;
        //   float: left;
          margin: 10px 0;
          height: 100%;
          flex: none;
          > i {
            font-size: 5px;
            margin-left: 2px;
            transform: scale(0.5);
          }
        }
        line-height: 22px;
      }
    }
  }
}
</style>
