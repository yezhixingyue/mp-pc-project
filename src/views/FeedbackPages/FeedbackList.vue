<template>
  <section class="mp-mpzj-order-feedback-list-page-wrap">
    <section class="content">
      问题反馈列表页面, 数量： {{dataNumber}}
      <ListTable :dataList='dataList' />
    </section>
  </section>
</template>

<script>
import ListTable from '@/components/FeedbackComps/ListTable.vue';

export default {
  components: {
    ListTable,
  },
  data() {
    return {
      dataList: [],
      dataNumber: 0,
    };
  },
  async mounted() {
    console.log('FeedbackList Page mounted');
    const res = await this.api.getAfterSalesApplyList({ Page: 1, PageSize: 10 });
    console.log(res);
    if (res.data.Status === 1000) {
      this.dataList = res.data.Data;
      this.dataNumber = res.data.DataNumber;
    }
  },
};
</script>

<style lang='scss'>
.mp-mpzj-order-feedback-list-page-wrap {
  width: 100%;
  margin-top: 25px;
  background-color: #fff;
  min-height: calc(100vh - 115px - 22px);
  min-height: calc(100vh - 115px - 42px) \0;
  > .content {
    width: 1200px;
    margin: 0 auto;
  }
}
</style>
