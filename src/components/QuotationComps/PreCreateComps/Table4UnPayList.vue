<template>
  <RetractableDisplayComp
    class="mp-pc-pre-create-order-list-wrap"
    :isScrollStyle="false"
    :widthObj="widthObj"
    :onWidthChange="onWidthChange"
    :titleList="titleList"
  >
    <template v-if="PreCreateData">
      <ItemListComp
        v-for="(value) in PreCreateData.PackageList"
        :key="value.ID"
        :data="value"
        :widthObj="widthObj"
      />
    </template>
    <div class="no-data-show is-gray" v-else>暂无数据</div>
  </RetractableDisplayComp>
</template>

<script>
import RetractableDisplayComp from '@/components/common/RetractableDisplayComp/Index.vue';
import { mapState } from 'vuex';
import ItemListComp from './ItemListComp.vue';

export default {
  components: {
    ItemListComp,
    RetractableDisplayComp,
  },
  data() {
    return {
      widthObj: {
        w1: 270,
        w2: 105,
        w3: 105,
        w4: 105,
        w5: 105,
        w6: 105,
        w7: 402,
      },
      titleList: [
        '产品',
        '数量',
        '原价',
        '优惠券',
        '成交价',
        '订金',
        '文件内容',
      ],
      curSelectedList: [],
      unPayTableData: [],
    };
  },
  computed: {
    ...mapState('Quotation', ['PreCreateData']),
  },
  methods: {
    onWidthChange(newW, w) {
      this.widthObj[w] = newW;
    },
  },
};
</script>

<style lang='scss'>
.mp-pc-pre-create-order-list-wrap {
  height: 100%;
  padding-top: 8px;
  box-sizing: border-box;
  > header {
    height: 40px;
    border: 1px solid #eee;
    // border-bottom: 1px solid #eee;
    background-color: rgb(248, 248, 248);
    box-sizing: border-box;
    > div {
      line-height: 38px;
      height: 100%;
      background-color: rgb(248, 248, 248);
      // &:first-of-type {
      //   text-align: left;
      //   padding-left: 118px;
      //   box-sizing: border-box;
      // }
    }
  }
  .no-data-show {
    text-align: center;
    font-size: 13px;
    margin-top: 6vh;
  }
  > main {
    height: calc(100% - 36px);
  }
}
</style>
