<template>
  <article class="mp-pc-service-after-sales-page-wrap">
    <section>
      <header>
        <div class="header-content">
          <LineDateSelectorComp
          :changePropsFunc='setCondition4ServiceAfterSaleList'
          :requestFunc='getServiceAfterSaleList'
          :isFull="false"
          :typeList="[['DateType', ''], ['Date', 'First'], ['Date', 'Second']]"
          :dateValue='condition4ServiceAfterSaleList.DateType'
          :UserDefinedTimeIsActive='UserDefinedTimeIsActive'
          label="售后时间"
          :dateList="dateList"
          dateType="date"
        />
        </div>
      </header>
      <div class="content-wrap" v-if="ServiceAfterSaleList.length > 0 || ServiceAfterSaleListNumber > 0">
        <div class="content">
          <div class="table-wrap">
            <el-table stripe border
              :data="ServiceAfterSaleList" style="width: 100%" class="ft-14-table">
              <el-table-column prop="ID" label="售后单号" width="125" show-overflow-tooltip></el-table-column>
              <el-table-column prop="Order.OrderID" label="订单号" width="140" show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="产品名称" width="200" show-overflow-tooltip>
                <span slot-scope="scope">{{ scope.row.Order.SecondLevelName +'-'+ scope.row.Order.ProductName }}</span>
              </el-table-column>
              <el-table-column label="订单金额" show-overflow-tooltip width="129">
                <template slot-scope="scope">{{ scope.row.Order.Funds.FinalPrice }}元</template>
              </el-table-column>
              <el-table-column label="售后类型" width="100" show-overflow-tooltip>
                <template slot-scope="scope"
                >{{scope.row.Solution.Type===2?'减款':scope.row.Solution.Type===7?'补印':''}}</template>
              </el-table-column>
              <el-table-column label="减款金额" width="135" show-overflow-tooltip>
                <template slot-scope="scope" v-if="scope.row.Solution.Type===2"
                >{{scope.row.Solution.RefundAmount}}元</template>
              </el-table-column>
              <el-table-column prop="RePrintOrderID" label="补印单号" width="130" show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="处理时间" show-overflow-tooltip width="240">
                <span class="gray" slot-scope="scope">{{ scope.row.CreateTime | format2MiddleLangTypeDate }}</span>
              </el-table-column>
            </el-table>
          </div>
          <div class="content-footer">
            <Count
              :watchPage='condition4ServiceAfterSaleList.Page'
              :handlePageChange='handlePageChange'
              :count='ServiceAfterSaleListNumber'
              :DownLoadConfigObj='DownLoadConfigObj'
              :pageSize='20'
              class="float"
            />
          </div>
          <transition name="el-fade-in-linear">
            <div class="content-footer floating" v-show="isFootFixed">
              <div>
                <Count
                  :watchPage='condition4ServiceAfterSaleList.Page'
                  :handlePageChange='handlePageChange'
                  :count='ServiceAfterSaleListNumber'
                  :DownLoadConfigObj='DownLoadConfigObj'
                  :pageSize='20'
                  class="float"
                />
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div class="show-empty-bg" v-else>
        <img src="../../assets/images/order-empty.png" alt="">
        <p class="is-gray">当前暂无售后单信息</p>
      </div>
    </section>
  </article>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { debounce } from '@/assets/js/utils/throttle';
import Count from '@/components/common/Count.vue';
import LineDateSelectorComp from '@/components/common/Selector/LineDateSelectorComp.vue';

export default {
  components: {
    Count,
    LineDateSelectorComp,
  },
  computed: {
    ...mapState('summary', ['condition4ServiceAfterSaleList', 'ServiceAfterSaleList', 'ServiceAfterSaleListNumber']),
    UserDefinedTimeIsActive() {
      return this.condition4ServiceAfterSaleList.DateType === ''
          && !!this.condition4ServiceAfterSaleList.Date.First
          && !!this.condition4ServiceAfterSaleList.Date.Second;
    },
    DownLoadConfigObj() {
      return {
        condition: this.condition4ServiceAfterSaleList,
        count: this.ServiceAfterSaleListNumber,
        fileDefaultName: '名片之家售后单',
        fileDate: this.condition4ServiceAfterSaleList.Date,
        downFunc: data => this.api.getServiceListData2Excel(data),
      };
    },
  },
  data() {
    return {
      h: 0,
      isFootFixed: false,
      // eslint-disable-next-line max-len
      dateList: [{ label: '全部', value: 'all' }, { label: '今日', value: 'today' }, { label: '昨日', value: 'yesterday' }, { label: '本月', value: 'curMonth' }, { label: '上月', value: 'lastMonth' }],
    };
  },
  methods: {
    ...mapMutations('summary', ['setCondition4ServiceAfterSaleList']),
    ...mapActions('summary', ['getServiceAfterSaleList']),
    getHeight() {
      const oBody = document.getElementsByTagName('body')[0];
      return oBody.offsetHeight - 410;
    },
    setHeight() {
      const tempHeight = this.getHeight();
      this.h = tempHeight;
    },
    handlePageChange(page) {
      this.$store.dispatch('summary/getServiceAfterSaleList', page);
    },
    handleScroll(oEl) {
      if (!oEl) return;
      const { scrollTop, scrollHeight, offsetHeight } = oEl;
      const difference = scrollHeight - offsetHeight;
      if (difference - 154 - scrollTop > 0) this.isFootFixed = true;
      else this.isFootFixed = false;
      console.log(difference - 147 - scrollTop, this.isFootFixed);
    },
  },
  watch: {
    ServiceAfterSaleList() {
      this.$nextTick(() => {
        this.handleScroll(this.oApp);
      });
    },
  },
  mounted() {
    // this.$nextTick(() => this.setHeight());
    // window.addEventListener('resize', this.setHeight);
    this.$store.dispatch('summary/getServiceAfterSaleList');
    this.oApp = document.getElementById('app');
    const _func = debounce(this.handleScroll, 30);
    if (this.oApp) {
      // this.oApp.addEventListener('scroll', () => _func(this.oApp));
      this.oApp.onscroll = () => _func(this.oApp);
    }
    this.$nextTick(() => {
      this.handleScroll(this.oApp);
    });
  },
  beforeDestroy() {
    // window.removeEventListener('resize', this.setHeight);
    this.oApp.onscroll = null;
  },
};
</script>

<style lang='scss'>
.mp-pc-service-after-sales-page-wrap {
  width: 100%;
  // background-color: #fff;
  margin-bottom: 17px;
  // min-height: calc(100vh - 135px - 45px);
  > section {
    width: 100%;
    > header {
      width: 100%;
      background-color: #fff;
      > div {
        margin: 0 auto;
        width: 1200px;
        padding: 35px 0 0px 0;
        border-top: 1px dashed #eee;
      }
      margin-bottom: 22px;
    }
    > .content-wrap {
      width: 100%;
      background-color: #fff;
      min-height: calc(100vh - 135px - 45px - 116px);
      > .content {
        margin: 0 auto;
        width: 1200px;
        padding-top: 25px;
        > .table-wrap {
          min-height: calc(100vh - 374px);
        }
        > .content-footer {
          margin-top: 19px;
          height: 55px;
          &.floating {
            position: fixed;
            bottom: 0;
            left: 0;
            background-color: #fff;
            z-index: 10;
            padding-top: 10px;
            right: 0px;
            height: 55px;
            box-shadow: 0px 0px 14px 7px rgba(136, 136, 136, 0.3);
            > div {
              width: 1200px;
              margin: 0 auto;
              position: relative;
              left: -8px;
            }
          }
        }
      }
    }
    > .show-empty-bg {
      background-color: rgb(245, 245, 245);
      text-align: center;
      padding-top: 70px;
      > p {
        margin-top: 15px;
      }
      > img {
        height: 266px;
        width: 545px;
        user-select: none;
      }
    }
  }
}
</style>
