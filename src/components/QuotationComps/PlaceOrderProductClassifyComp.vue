<template>
  <section class="mp-pc-place-order-product-classify-comp-wrap">
    <header>
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
    </header>
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
             @click="selectProduct(sub)"
             :class="curProduct && curProduct.ProductID === sub.ProductID ? 'active' : ''"
             >
              <el-checkbox :value='sub.isCollected' @change="onCheckChange(sub)" v-show="curMenus.canCollect">
              </el-checkbox>{{sub.ProductName}}</el-link>
             <!-- :underline="false" -->
          </div>
        </li>
      </ul>
      <div class="shortcut">
        <p v-if="curMenus && !curMenus.canCollect">
          <el-button type="primary" @click="setCanCollect">设置快捷方式</el-button>
        </p>
        <p v-else class="r">
          <el-button type="primary" class="submit linear-bg-color" @click="onSubmit">保存</el-button>
          <el-button @click="onCancel">取消</el-button>
        </p>
      </div>
    </div>
    <ul class="shortcut-list float">
      <li v-for="item in hasCollectList" :key="item.ID" @click="onShortcutClick(item)">
        <el-link :underline="false"
         :class="curProduct && curProduct.ProductID === item.ID ? 'active' : ''">{{item.Name}}</el-link>
      </li>
    </ul>
    <div class="mark" v-show="isOpen"></div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      isOpen: false,
      timer: null,
      index: null,
      curProduct: null,
      hasCollectList: [],
      tempCollectList: [],
      // canCollect: false,
      canCollectList: [],
    };
  },
  computed: {
    ...mapState('Quotation', ['customerShortCutList', 'productNames']),
    ...mapGetters('Quotation', ['allProductClassify']),
    hasCollectIDList() {
      const _list = this.hasCollectList.map(it => it.ProductID || it.ID);
      return _list;
    },
    curMenus() {
      if (!this.index && this.index !== 0) return null;
      if (this.allProductClassify.length === 0) return null;
      const _obj = this.allProductClassify[this.index];
      if (_obj) {
        _obj.children.forEach(lv2 => {
          lv2.children.forEach(lv3 => {
            const item = lv3;
            item.isCollected = false;
            if (this.hasCollectIDList.includes(item.ProductID)) item.isCollected = true;
          });
        });
        _obj.canCollect = false;
        if (this.canCollectList.includes(this.index)) _obj.canCollect = true;
        return _obj;
      }
      return null;
    },
    hasCollectList4Req() {
      if (this.hasCollectList.length === 0 || !this.curMenus) return null;
      const ClassID = this.curMenus.ID;
      // eslint-disable-next-line max-len
      const _tempList = this.hasCollectList.filter(it => it.ClassID === ClassID || (it.ProductClass && it.ProductClass.First === ClassID));
      const _list = _tempList.map(it => {
        if (it.ClassID) return it;
        return {
          ClassID: it.ProductClass.First,
          ID: it.ProductID,
          Name: it.ProductName,
        };
      });
      return {
        ClassID,
        List: _list,
      };
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
      if (this.curMenus.canCollect) {
        if (this.hasCollectIDList.includes(sub.ProductID)) {
          this.hasCollectList = this.hasCollectList.filter(it => it.ProductID !== sub.ProductID)
            .filter(it => it.ID !== sub.ProductID);
        } else {
          this.hasCollectList.push(sub);
        }
        return;
      }
      clearTimeout(this.timer);
      this.timer = null;
      this.isOpen = false;
      if (this.curProduct && this.curProduct.ProductID === sub.ProductID) return;
      this.curProduct = sub;
      this.$store.commit('Quotation/setCurProductInfo', sub);
      this.$store.dispatch('Quotation/getProductDetail');
    },
    onCheckChange(item) {
      if (this.curMenus.canCollect) {
        if (this.hasCollectIDList.includes(item.ProductID)) {
          this.hasCollectList = this.hasCollectList.filter(it => it.ProductID !== item.ProductID)
            .filter(it => it.ID !== item.ProductID);
        } else {
          this.hasCollectList.push(item);
        }
      }
    },
    setCanCollect() {
      this.canCollectList.push(this.index);
      this.tempCollectList = [...this.hasCollectList];
    },
    onCancel() {
      this.canCollectList = this.canCollectList.filter(it => it !== this.index);
      this.hasCollectList = [...this.tempCollectList];
    },
    async onSubmit() {
      if (this.hasCollectList4Req) {
        const res = await this.$store.dispatch('Quotation/getCustomerShortCutSave', this.hasCollectList4Req);
        if (res) this.canCollectList = this.canCollectList.filter(it => it !== this.index);
      }
    },
    onShortcutClick(item) {
      if (this.curProduct && this.curProduct.ProductID === item.ID) return;
      const _t = this.productNames.find(it => it.ProductID === item.ID);
      this.curProduct = _t;
      this.$store.commit('Quotation/setCurProductInfo', _t);
      this.$store.dispatch('Quotation/getProductDetail');
    },
  },
  watch: {
    customerShortCutList(newVal) {
      this.hasCollectList = [...newVal];
      this.tempCollectList = [...this.hasCollectList];
    },
  },
  mounted() {
    this.$store.dispatch('Quotation/getProductClassify');
    this.$store.dispatch('Quotation/getCustomerShortCutList');
  },
};
</script>

<style lang='scss'>
.mp-pc-place-order-product-classify-comp-wrap {
  background-color: #fff;
  width: 100%;
  position: relative;
  > header {
    z-index: 999;
    position: relative;
    background-color: #fff;
    > .header {
      height: 70px;
      width: 1200px;
      margin: 0 auto;
      box-sizing: border-box;
      // z-index: 999;
      > li {
        float: left;
        height: 70px;
        line-height: 70px;
        text-align: center;
        width: 80px;
        font-size: 14px;
        position: relative;
        color: #333;
        padding-right: 20px;
        &:last-of-type{
          padding-right: 0px;
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
            left: 0;
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
  }
  > .content {
    width: 100%;
    margin: 0 auto;
    min-height: 160px;
    position: absolute;
    background-color: #fff;
    display: none;
    z-index: 999;
    &.active {
      display: block;
    }
    > ul {
      width: 1200px;
      margin: 0 auto;
      padding: 14px 0;
      height: 100%;
      max-height: 385px;
      overflow-y: auto;
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
              > .el-checkbox {
                margin-right: 6px;
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
    > div {
      width: 1200px;
      margin: 0 auto;
      margin-top: 25px;
      text-align: center;
      margin-bottom: 18px;
      display: block;
      > p {
        > button {
          width: 130px;
          &.submit {
            margin-right: 30px;
            transition: 0.1s;
          }
        }
        &.r {
          text-align: right;
          padding-right: 80px;
        }
      }
    }
  }
  > .mark {
    position: fixed;
    bottom: 0;
    top: 0;
    right: 0;
    left: 0;
    background-color: rgba(0,0,0, 0.6);
    z-index: 888;
  }
  > .shortcut-list {
    width: 1200px;
    margin: 0 auto;
    line-height: 30px;
    padding: 7px 0;
    > li {
      float: left;
      margin-right: 30px;
      font-size: 14px;
      cursor: pointer;
      > a {
        color: #888;
        &.active {
          color: #428dfa;
        }
      }
    }
  }
}
</style>
