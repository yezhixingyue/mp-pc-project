<template>
  <section class="mp-pc-order-detail-page-package-list-comp-wrap">
    <header class="section-title">包裹列表</header>
    <div class="content">
      <el-table :data="packageListData" border style="width: 100%" :span-method="objectSpanMethod">
        <el-table-column prop="ID" label="运单号" width="180"></el-table-column>
        <el-table-column label="数量" width="180">
          <span class="gray" slot-scope="scope">{{scope.row.ProductAmount + Unit}}</span>
        </el-table-column>
        <el-table-column label="配送" width="180">
          <span class="gray" slot-scope="scope">{{ scope.row && Express}}</span>
        </el-table-column>
        <el-table-column label="配送进度" width="180">
          <template slot-scope="scope">{{ scope.row.Status | formatStatus4PackageList}}</template>
        </el-table-column>
        <el-table-column label="配送代收" width="180">
          <template slot-scope="scope">{{+(scope.row.UnPaidAmount && scope.row.UnPaidAmount.toFixed(2))}}元</template>
        </el-table-column>
        <el-table-column label="" width="239" class-name='total-col'>
          <template slot-scope="scope">
            <span>配送共代收：<i class="is-font-16 is-pink">{{ scope.row && totalUnPaidAmount}}元</i></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    OrderID: {
      type: Number,
      default: 0,
    },
    Unit: {
      type: String,
      default: '',
    },
    Express: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      packageListData: null,
    };
  },
  computed: {
    totalUnPaidAmount() {
      if (!this.packageListData || this.packageListData.length === 0) return 0;
      let _amount = 0;
      this.packageListData.forEach(it => {
        if (it.UnPaidAmount) _amount += it.UnPaidAmount;
      });
      return +(_amount.toFixed(2));
    },
  },
  methods: {
    // eslint-disable-next-line consistent-return
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 5) {
        if (rowIndex === 0) {
          return {
            rowspan: this.packageListData.length,
            colspan: 1,
          };
        }
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
    },
  },
  async mounted() {
    if (!this.OrderID) return;
    // this.$emit('setPackDataCompleted', false);
    const res = await this.api.getOrderPackageList(this.OrderID);
    this.$emit('setPackDataCompleted', true);
    if (res.data.Status === 1000) {
      const _list = [...res.data.Data];
      this.packageListData = _list;
    }
  },
};
</script>

<style lang='scss'>
.mp-pc-order-detail-page-package-list-comp-wrap {
  > .content {
    padding: 30px 40px 45px 20px;
    .el-table {
      .el-table__body-wrapper .el-table__body tbody tr td {
        padding: 10px 0;
        border-top: 1px solid #eee;
        > .cell {
          font-size: 13px;
        }
        &.total-col {
          border-left: 1px solid #eee;
          background-color: #fff !important;
        }
      }
      .has-gutter > tr > th.is-leaf {
        border: none;
        > .cell {
          color: #585858;
        }
      }
    }
  }
}
</style>
