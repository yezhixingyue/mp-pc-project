<template>
  <section class="mp-mpzj-order-feedback-list-page-wrap">
    <header>
      <ul>
        <li>
          <SingleSelector
            v-model="condition.QuestionID"
            :optionList='QuestionList'
            title="售后原因"
            :defaultProps="{ label: 'Title', value: 'ID', }"
          />
          <SingleSelector
            v-model="condition.Status"
            :optionList='StatusList'
            title="售后进度"
          />
        </li>
        <li class="bottom">
          <LineDateSelectorComp
            :changePropsFunc='setCondition'
            :requestFunc='getListData'
            :isFull="false"
            :typeList="[['DateType', ''], ['Date', 'First'], ['Date', 'Second']]"
            :dateValue='condition.DateType'
            :UserDefinedTimeIsActive='UserDefinedTimeIsActive'
            label="申请时间"
            :dateList="dateList"
            dateType="date"
          />
          <search-input-comp
            title="订单号"
            placeholder="请输入订单号"
            :typeList="[['KeyWords', '']]"
            :requestFunc="getListData"
            :changePropsFunc="setCondition"
            :word="condition.KeyWords"
            @reset="clearCondition"
            :searchWatchKey="dataList"
          />
        </li>
      </ul>
      <p></p>
    </header>
    <section class="content">
      <ListTable :dataList='dataList' @handleCancel='handleCancel' />
      <footer>
        <Count
          :watchPage='condition.Page'
          :handlePageChange='handlePageChange'
          :count='dataNumber'
          :pageSize='12'
          class="float"
         />
      </footer>
    </section>
  </section>
</template>

<script>
import ListTable from '@/components/FeedbackComps/ListTable.vue';
import SingleSelector from '@/components/common/Selector/SingleSelector.vue';
import LineDateSelectorComp from '@/components/common/Selector/LineDateSelectorComp.vue';
import SearchInputComp from '@/components/common/Selector/SearchInputComp.vue';
import { mapState } from 'vuex';
import ClassType from '@/store/CommonClassType';
import Count from '@/components/common/Count.vue';

export default {
  components: {
    Count,
    ListTable,
    SingleSelector,
    SearchInputComp,
    LineDateSelectorComp,
  },
  data() {
    return {
      dataList: [],
      dataNumber: 0,
      condition: {
        Page: 1,
        PageSize: 12,
        QuestionID: '',
        Status: '',
        Date: {
          First: '',
          Second: '',
        },
        DateType: 'today',
        KeyWords: '',
      },
      // eslint-disable-next-line max-len
      dateList: [{ label: '全部', value: 'all' }, { label: '今日', value: 'today' }, { label: '昨日', value: 'yesterday' }, { label: '前日', value: 'beforeyesterday' }, { label: '本月', value: 'curMonth' }, { label: '上月', value: 'lastMonth' }],
    };
  },
  computed: {
    ...mapState('common', ['FeedbackProgress']),
    ...mapState('summary', ['RejectReasonList']),
    QuestionList() {
      return [{ ID: '', Title: '不限' }, ...this.RejectReasonList];
    },
    StatusList() {
      return [{ value: '', label: '不限' }, ...this.FeedbackProgress];
    },
    UserDefinedTimeIsActive() {
      return this.condition.DateType === ''
          && !!this.condition.Date.First
          && !!this.condition.Date.Second;
    },
    watchConditionPartChange() {
      return `${this.condition.Status}${this.condition.QuestionID}`;
    },
  },
  methods: {
    handleCancel(id) {
      if (!id) return;
      const t = this.dataList.find(it => it.ID === id);
      if (t) t.Status = 255;
    },
    async getListData(page = 1) {
      this.condition.Page = page;
      ClassType.setDate(this.condition);
      const _obj = ClassType.filter(this.condition, true);
      if (_obj.Date) {
        _obj.ApplyTime = _obj.Date;
        delete _obj.Date;
      }
      let key = true;
      this.dataList = [];
      const res = await this.api.getAfterSalesApplyList(_obj).catch(() => { key = false; });
      if (key && res.data.Status === 1000) {
        this.dataList = res.data.Data;
        this.dataNumber = res.data.DataNumber;
      }
    },
    setCondition([[key1, key2], value]) {
      if (key2) this.condition[key1][key2] = value;
      else this.condition[key1] = value;
    },
    clearCondition() {
      this.condition = {
        Page: 1,
        PageSize: 12,
        QuestionID: '',
        Status: '',
        Date: {
          First: '',
          Second: '',
        },
        DateType: 'today',
        KeyWords: '',
      };
    },
    handlePageChange(page) {
      this.getListData(page);
    },
  },
  watch: {
    watchConditionPartChange() {
      this.getListData();
    },
  },
  mounted() {
    this.getListData();
    this.$store.dispatch('summary/getRejectReasonList');
  },
};
</script>

<style lang='scss'>
.mp-mpzj-order-feedback-list-page-wrap {
  width: 100%;
  // margin-top: 25px;
  background-color: #fff;
  min-height: calc(100vh - 115px - 22px);
  min-height: calc(100vh - 115px - 42px) \0;
  > header {
    > ul {
      width: 1200px;
      margin: 0 auto;
      border-top: 1px dashed #eee;
      padding: 25px 0 0;
      > li {
        > .mp-pc-common-comps-select-comp-wrap {
          margin-right: 50px;
        }
        &.bottom {
          padding-top: 24px;
          > .mp-line-date-selector-wrap {
            width: 775px;
            overflow: hidden;
            white-space: nowrap;
          }
          > section {
            vertical-align: 28px;
          }
        }
      }
    }
    > p {
      height: 20px;
      width: 100%;
      background-color: rgb(245, 245, 245);
    }
  }
  > .content {
    width: 1200px;
    margin: 0 auto;
    padding-top: 25px;
    > footer {
      padding: 20px 0;
    }
  }
}
</style>
