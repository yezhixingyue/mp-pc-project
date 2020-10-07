<template>
  <article class="mp-pc-order-list-page-wrap">
    <section class="header">
      <ul class="header-content">
        <li>
          <SingleSelector v-model="OrderStatus" :optionList='OrderStatusList' />
          <product-selector
          :changePropsFunc='setCondition4OrderList'
          :requestFunc='getOrderList'
          :ClassID='condition4OrderList.ProductClass.First'
          :TypeID='condition4OrderList.ProductClass.Second'
          :ProductID='condition4OrderList.ProductID'
          :typeList="[['ProductClass', 'First'],['ProductClass', 'Second'],['ProductID', '']]"
         />
        </li>
        <li class="second">
          <LineDateSelectorComp
            :changePropsFunc='setCondition4OrderList'
            :requestFunc='getOrderList'
            :isFull="false"
            :typeList="[['DateType', ''], ['Date', 'First'], ['Date', 'Second']]"
            :dateValue='condition4OrderList.DateType'
            :UserDefinedTimeIsActive='UserDefinedTimeIsActive'
            label="下单时间"
            :dateList="dateList"
            dateType="date"
          />
          <search-input-comp
            title="关键词"
            placeholder="请输入搜索关键词"
            :typeList="[['KeyWords', '']]"
            :requestFunc="getOrderList"
            :changePropsFunc="setCondition4OrderList"
            :word="condition4OrderList.KeyWords"
            @reset="clearCondition4OrderList"
            :searchWatchKey="OrderList"
          />
        </li>
      </ul>
    </section>
    <section class="content-wrap">
      <section class="content">
        <Table4OrderList :orderData='computedOrderlist' />
        <footer>
          <Count
            :watchPage='condition4OrderList.Page'
            :handlePageChange='handlePageChange'
            :count='OrderListNumber'
            :pageSize='20'
            class="float"
            />
        </footer>
      </section>
    </section>
  </article>
</template>

<script>
import SingleSelector from '@/components/common/Selector/SingleSelector.vue';
import ProductSelector from '@/components/common/Selector/ProductSelectorIndex.vue';
import LineDateSelectorComp from '@/components/common/Selector/LineDateSelectorComp.vue';
import Count from '@/components/common/Count.vue';
import SearchInputComp from '@/components/common/Selector/SearchInputComp.vue';
import Table4OrderList from '@/components/OrderListComps/Table4OrderList.vue';
import {
  mapState, mapGetters, mapMutations, mapActions,
} from 'vuex';

export default {
  components: {
    SingleSelector,
    ProductSelector,
    LineDateSelectorComp,
    SearchInputComp,
    Count,
    Table4OrderList,
  },
  data() {
    return {
      // eslint-disable-next-line max-len
      dateList: [{ label: '全部', value: 'all' }, { label: '今日', value: 'today' }, { label: '昨日', value: 'yesterday' }, { label: '本月', value: 'curMonth' }, { label: '上月', value: 'lastMonth' }],
    };
  },
  computed: {
    ...mapState('common', ['OrderStatusList']),
    ...mapState('order', ['condition4OrderList', 'OrderList', 'OrderListNumber']),
    ...mapGetters('order', ['computedOrderlist']),
    OrderStatus: {
      get() {
        return this.condition4OrderList.Status;
      },
      set(newVal) {
        // console.log(newVal);
        this.$store.commit('order/setCondition4OrderList', [['Status', ''], newVal]);
        this.$store.dispatch('order/getOrderList');
      },
    },
    UserDefinedTimeIsActive() {
      return this.condition4OrderList.DateType === ''
          && !!this.condition4OrderList.Date.First
          && !!this.condition4OrderList.Date.Second;
    },
  },
  methods: {
    ...mapMutations('order', ['setCondition4OrderList', 'clearCondition4OrderList']),
    ...mapActions('order', ['getOrderList']),
    handlePageChange(page) {
      this.$store.dispatch('order/getOrderList', page);
    },
  },
};
</script>

<style lang='scss'>
.mp-pc-order-list-page-wrap {
  width: 100%;
  > section {
    width: 100%;
    background-color: #fff;
    // height: 120px;
    margin-bottom: 25px;
    &.header {
      // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
    }
    // box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.07);
    > .header-content {
      margin: 0 auto;
      width: 1200px;
      padding: 25px 0 22px;
      > li {
        > section {
          vertical-align: top;
        }
        > .mp-pc-order-product-select-wrap {
          vertical-align: top;
          padding-top: 1px;
          padding-left: 12px;
        }
        &.second {
          padding-top: 30px;
          .mp-line-date-selector-wrap > .box {
            width: 600px;
          }
          .mp-common-comps-search-box {
            vertical-align: 108%;
            margin-left: 64px;
            // margin-right: -10px;
          }
        }
      }
    }
    &.content-wrap {
      margin-bottom: 45px;
      box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.07);
      min-height: calc(100vh - 135px - 170px - 48px);
      > .content {
        margin: 0 auto;
        width: 1200px;
        padding-top: 25px;
        > footer {
          height: 82px;
          padding-top: 30px;
        }
      }
    }
  }
}
</style>
