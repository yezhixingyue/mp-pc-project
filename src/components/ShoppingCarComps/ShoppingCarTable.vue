<template>
  <section class="mp-pc-shopcar-page-table-comp-wrap">
    <el-table
      ref="multipleTable"
      :data="shoppingDataList"
      tooltip-effect="dark"
      :max-height="h"
      :height="h"
      stripe
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" class-name="check-row" width="60"></el-table-column>
      <el-table-column label="产品" width="150" show-overflow-tooltip>
        <template slot-scope="scope">{{getName(scope.row)}}</template>
      </el-table-column>
      <el-table-column label="尺寸" width="120">
        <template slot-scope="scope">{{getSize(scope.row)}}</template>
      </el-table-column>
      <el-table-column prop="address" label="数量" show-overflow-tooltip></el-table-column>
      <el-table-column label="工艺" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="原价" width="120"></el-table-column>
      <el-table-column prop="address" label="优惠券" show-overflow-tooltip></el-table-column>
      <el-table-column label="成交价" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="定金" width="120"></el-table-column>
      <el-table-column prop="address" label="文件内容" show-overflow-tooltip></el-table-column>
      <el-table-column label="收货人" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="收货人手机" width="120"></el-table-column>
      <el-table-column prop="address" label="配送方式" show-overflow-tooltip></el-table-column>
      <el-table-column prop="address" label="状态" show-overflow-tooltip></el-table-column>
      <el-table-column prop="address" label="操作" ></el-table-column>
    </el-table>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      multipleSelection: [],
      h: 0,
    };
  },
  computed: {
    ...mapState('shoppingCar', ['shoppingDataList']),
  },
  methods: {
    getHeight() {
      const oBody = document.getElementsByTagName('body')[0];
      return oBody.offsetHeight - 310;
    },
    setHeight() {
      const tempHeight = this.getHeight();
      this.h = tempHeight;
    },
    getName({ ProductParams }) {
      const { Attributes } = ProductParams;
      const { Name, SecondLevelName } = Attributes;
      return `${SecondLevelName}-${Name}`;
    },
    getSize({ ProductParams }) {
      const { PartList } = ProductParams;
      const _sizeArr = [];
      PartList.forEach(item => {
        const { SizePropertyList } = item.PartList[0];
        const _sizeList = [];
        const _unitList = [];
        SizePropertyList.forEach(it => {
          _sizeList.push(it.ShowValue);
          _unitList.push(it.ShowUnit);
        });
        const _obj = {};
        _unitList.forEach(it => {
          if (!_obj[it]) _obj[it] = 0;
          else _obj[it] += 1;
        });
        if (Object.keys(_obj).length === 1) {
          const len = _sizeArr.length;
          const _str = _sizeList.join('×') + _unitList[0];
          if (len > 0 && _sizeArr[len - 1] === _str) return;
          _sizeArr.push(_str);
          return;
        }
        const _arr = [];
        _sizeList.forEach((it, i) => {
          const _temp = it + _unitList[i];
          _arr.push(_temp);
        });
        const len = _sizeArr.length;
        const _str = _arr.join('×');
        if (len > 0 && _sizeArr[len - 1] === _str) return;
        _sizeArr.push(_str);
      });
      return _sizeArr.join('、');
      // console.log(ProductParams);
      // return '12';
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
  mounted() {
    this.$nextTick(() => this.setHeight());
    window.onresize = () => this.setHeight();
    this.$store.dispatch('shoppingCar/getQuotationList');
  },
  beforeDestroy() {
    window.onresize = null;
  },
};
</script>

<style lang="scss">
.mp-pc-shopcar-page-table-comp-wrap {
  > .el-table {
    .has-gutter > tr > th {
      &.check-row {
        padding-right: 20px;
        &::after{
          top: 13px;
          height: 15px;
          width: 30px;
          left: 32px;
          content: '全选';
          font-size: 13px;
          background-color: rgb(245, 245, 245);
          color: #39588a;
        }
      }
    }
    .el-table__body {
     tbody {
      tr {
        td {
          &.check-row {
            padding-right: 20px;
          }
        }
      }
     }
    }
  }
}
</style>
