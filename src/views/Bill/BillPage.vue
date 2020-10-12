<template>
  <section class="mp-pc-bill-page-wrap">
    <header>
      <div class="header-content">
        <SingleSelector v-model="Type" :optionList='TransactionTypeList' />
        <LineDateSelectorComp
          :changePropsFunc='setCondition4FundBillList'
          :requestFunc='getFundBillList'
          :isFull="false"
          :typeList="[['DateType', ''], ['Date', 'First'], ['Date', 'Second']]"
          :dateValue='condition4FundBillList.DateType'
          :UserDefinedTimeIsActive='UserDefinedTimeIsActive'
          label="交易时间"
          :dateList="dateList"
          dateType="date"
        />
      </div>
    </header>
    <div class="content-wrap" v-if="FundBillList.length > 0 || FundBillListNumber > 0">
      <!-- FundBillListNumber -->
      <div class="content">
        <FundBillTable :dataList='FundBillList' />
        <Count
          :watchPage='condition4FundBillList.Page'
          :handlePageChange='handlePageChange'
          :count='FundBillListNumber'
          :pageSize='20'
          class="float"
         />
      </div>
    </div>
    <div class="empty" v-else>
      <img src="../../assets/images/order-empty.png" alt="">
      <p>当前您暂无任何账单，快去下单吧...</p>
    </div>
  </section>
</template>

<script>
import FundBillTable from '@/components/BillComps//FundBillTable.vue';
import SingleSelector from '@/components/common/Selector/SingleSelector.vue';
import Count from '@/components/common/Count.vue';
import LineDateSelectorComp from '@/components/common/Selector/LineDateSelectorComp.vue';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  components: {
    Count,
    FundBillTable,
    SingleSelector,
    LineDateSelectorComp,
  },
  computed: {
    ...mapState('common', ['TransactionTypeList']),
    ...mapState('summary', ['condition4FundBillList', 'FundBillList', 'FundBillListNumber']),
    UserDefinedTimeIsActive() {
      return this.condition4FundBillList.DateType === ''
          && !!this.condition4FundBillList.Date.First
          && !!this.condition4FundBillList.Date.Second;
    },
    Type: {
      get() {
        return this.condition4FundBillList.Type;
      },
      set(newVal) {
        // console.log(newVal);
        this.$store.commit('summary/setCondition4FundBillList', [['Type', ''], newVal]);
        this.$store.dispatch('summary/getFundBillList');
      },
    },
  },
  data() {
    return {
      billValue: '',
      // eslint-disable-next-line max-len
      dateList: [{ label: '全部', value: 'all' }, { label: '今天', value: 'today' }, { label: '昨天', value: 'yesterday' }, { label: '前天', value: 'beforeyesterday' }, { label: '本月', value: 'curMonth' }, { label: '上月', value: 'lastMonth' }],
    };
  },
  methods: {
    ...mapMutations('summary', ['setCondition4FundBillList']),
    ...mapActions('summary', ['getFundBillList']),
    handlePageChange(page) {
      this.$store.dispatch('summary/getFundBillList', page);
    },
  },
  mounted() {
    this.$store.dispatch('summary/getFundBillList');
  },
};
</script>

<style lang='scss'>
.mp-pc-bill-page-wrap {
  > header {
    width: 100%;
    background-color: #fff;
    > .header-content {
      margin: 0 auto;
      width: 1200px;
      padding: 30px 0;
      > section {
        display: inline-block;
        vertical-align: 50%;
        margin-right: 80px;
      }
      > div {
        display: inline-block;
      }
    }
  }
  > .content-wrap {
    margin-top: 22px;
    width: 100%;
    background-color: #fff;
    min-height: calc(100vh - 135px - 100px - 61px);
    > .content {
      width: 1200px;
      margin: 0 auto;
      padding-top: 25px;
      > div {
        margin-top: 19px;
      }
    }
  }
  > .empty {
    text-align: center;
    > img {
      margin: 72px 0 15px;
      height: 266px;
      width: 545px;
      user-select: none;
    }
    > p {
      color: #888;
    }
  }
}
</style>
