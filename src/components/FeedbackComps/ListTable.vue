<template>
  <el-table stripe border :data="dataList" style="width: 100%" class="ft-14-table">
      <!--  :max-height="h" :height="h" -->
      <el-table-column prop="Order.OrderID" label="订单号" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column label="产品名称" prop="Order.ProductName" width="150" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="产品类型" width="120" prop="Order.SecondLevelName" show-overflow-tooltip>
        <!-- <span slot-scope="scope" :class="{'is-pink': scope.row.Type === 21, 'is-success': scope.row.Type === 11}"
         >{{ scope.row.Type | formatTransactionType }}</span> -->
      </el-table-column>
      <el-table-column prop="Remark" label="售后原因" width="260" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="诉求意向" width="120" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.AppealType | formatAppealType }}</template>
      </el-table-column>
      <el-table-column label="申请时间" show-overflow-tooltip width="150">
        <template slot-scope="scope">{{ scope.row.CreateTime | format2MiddleLangTypeDate }}</template>
      </el-table-column>
      <el-table-column prop="Content" label="进度" show-overflow-tooltip width="119">
        <span :class="getStatusClass(scope.row.Status)" slot-scope="scope"
        >{{ scope.row.Status | formatFeedbackProgress }}</span>
      </el-table-column>
      <el-table-column label="操作" width="160" show-overflow-tooltip>
        <div class="is-font-12 btn-wrap">
          <!-- <span class="span-title-blue">查看详情</span> -->
          <span class="span-title-blue"
            v-if="1">编辑</span>
          <span class="is-cancel" :style="{paddingLeft:'6px', paddingRight:'6px'}" v-else>编辑</span>
          <span class="span-title-pink"
            v-if="1">取消</span>
          <span class="is-cancel" :style="{paddingLeft:'6px', paddingRight:'6px'}" v-else>取消</span>
        </div>
      </el-table-column>
    </el-table>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getStatusClass(status) {
      let str = '';
      switch (status) {
        case 2:
          str = 'is-success';
          break;
        case 255:
          str = 'is-gray';
          break;
        default:
          break;
      }
      return str;
    },
  },
};
</script>

<style>

</style>
