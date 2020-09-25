<template>
  <section>
    <el-table
      tooltip-effect="dark"
      :max-height="h"
      :height="h"
      stripe
      border
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }],
      h: 0,
    };
  },
  methods: {
    getHeight() {
      const oBody = document.getElementsByTagName('body')[0];
      return oBody.offsetHeight - 410;
    },
    setHeight() {
      const tempHeight = this.getHeight();
      this.h = tempHeight;
    },
  },
  mounted() {
    this.$nextTick(() => this.setHeight());
    window.onresize = () => this.setHeight();
  },
  beforeDestroy() {
    window.onresize = null;
  },
};
</script>

<style>

</style>
