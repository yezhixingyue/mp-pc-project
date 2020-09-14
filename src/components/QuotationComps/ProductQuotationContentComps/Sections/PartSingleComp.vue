<!--
 * @Describe: 部件 mp-duotation-content-comps-part-comp-wrap
 * @FilePath: /src/components/QuotationComps/ProductQuotationContentComps/Sections/PartSingleComp.vue
-->
<template>
  <MpCollapseComp
    class="mp-duotation-content-part-comp-wrap"
    v-show="!canHidePartComponent"
    :h="h"
  >
    <template #header>
      <header>
        <span class="title"
          >{{ data.PartName }}{{ indexLv2 > 0 ? indexLv2 + 1 : "" }}</span
        >
        <div class="del-btn">
          <span v-if="indexLv2 > 0 && canDel" @click.stop="handleDelClick"
            >删除{{ data.PartName }}{{ indexLv2 > 0 ? indexLv2 + 1 : "" }}</span
          >
          <i @click.stop="show = !show" :class="show ? '' : 'is-hide'">收起</i>
        </div>
      </header>
    </template>

    <div v-if="show" class="comp-content-wrap">
      <!-- 数量 -->
      <single-input-comp
        title="数量"
        :remark="data.Unit"
        :minNum="data.MinNumber"
        :maxNum="data.MaxNumber"
        :multiple="data.Multiple"
        v-model.lazy="PartAmount"
        :disabled="!data.PartAmount.Second"
      />

      <!-- 物料与物料品牌 -->
      <article class="material-brand-wrap">
        <count-class-comp
          title="物料"
          remark=""
          v-model="PartMaterial"
          :showCheckBox="false"
          v-if="data.MaterialList.length > 1"
          :option="data.MaterialList"
          :disabled="!data.Material.Second"
          :defaultProps="{ text: 'Name', value: 'MaterialID' }"
        />
        <!-- <count-class-comp
          title="物料品牌"
          remark=""
          v-model="PartMaterialBrand"
          :showCheckBox="false"
          :option="data.BrandList"
          v-if="data.BrandList.length > 1"
          :defaultProps="{ text: 'BrandName', value: 'BrandID' }"
        /> -->
      </article>

      <!-- 属性 -->
      <attributes-comp v-model="PartAttributeList" />

      <!-- 尺寸组 -->
      <size-group-comp
        :title="data.SizeGroup.GroupName"
        v-if="data.SizeGroup"
        :SizeGroup="data.SizeGroup"
        :SizeList="data.SizeList"
        :remark="sizeGroupRemark"
        v-model="PartSizeGroup"
        :disabled="!data.Size.Second"
        :SizePropertyList="data.SizePropertyList"
      />

      <!-- 印刷属性 -->
      <print-type-list-comps v-model="PartPrintTypeList" />

      <!-- 印刷属性组 -->
      <attributes-group-comp
        v-model="PartPrintPropertyGroupList"
        @addPropertyGroup="
          data => addPartPrintPropertyGroupList([indexLv1, indexLv2, data])
        "
        @delPropertyGroup="
          data => delPartPrintPropertyGroupList([indexLv1, indexLv2, data])
        "
      />

      <!-- 属性组 -->
      <attributes-group-comp
        v-model="PartPropertyGroupList"
        @addPropertyGroup="
          data => addPartPropertyGroupList([indexLv1, indexLv2, data])
        "
        @delPropertyGroup="
          data => delPartPropertyGroupList([indexLv1, indexLv2, data])
        "
      />

      <!-- 必选工艺 -->
      <craft-list-comp
        title="必选工艺"
        v-if="RequiredCraft"
        :selectedArr="data.PartCraftList2Req.First"
        @setCraftList="
          data => setPartProductParamsCraftList([indexLv1, indexLv2, data])
        "
        :data="RequiredCraft"
        :partData="data"
      />

      <!-- 可选工艺 -->
      <craft-list-comp
        title="可选工艺"
        v-if="notRequiredCraft"
        :selectedArr="data.PartCraftList2Req.First"
        @setCraftList="
          data => setPartProductParamsCraftList([indexLv1, indexLv2, data])
        "
        :data="notRequiredCraft"
        :partData="data"
        @setCraftstate="
          data => setCraftItemDisabled4Part([indexLv1, indexLv2, data])
        "
      />
    </div>

    <!-- <template #will-not-collapse></template> -->
  </MpCollapseComp>
</template>

<script>
import MpCollapseComp from '@/components/QuotationComps/SMComps/MpCollapseComp.vue';
import SingleInputComp from '@/components/QuotationComps/ProductQuotationContentComps/Sections/SingleInputComp.vue';
import AttributesComp from '@/components/QuotationComps/ProductQuotationContentComps/Sections/AttributesComp.vue';
import SizeGroupComp from '@/components/QuotationComps/ProductQuotationContentComps/Sections/SizeGroupComp.vue';
import AttributesGroupComp from '@/components/QuotationComps/ProductQuotationContentComps/Sections/AttributesGroupComp.vue';
import CraftListComp from '@/components/QuotationComps/ProductQuotationContentComps/Sections/CraftListComp.vue';
import PrintTypeListComps from '@/components/QuotationComps/ProductQuotationContentComps/Sections/PrintTypeListComps.vue';
import CountClassComp from '@/components/QuotationComps/ProductQuotationContentComps/Sections/CountClassComp.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    MpCollapseComp,
    SingleInputComp,
    AttributesComp,
    SizeGroupComp,
    AttributesGroupComp,
    CraftListComp,
    PrintTypeListComps,
    CountClassComp,
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    // 代表当前部件数据在整个数据中的位置，第一级索引位
    indexLv1: {
      type: Number,
    },
    // 代表当前部件数据在整个数据中的位置，第二级索引位
    indexLv2: {
      type: Number,
    },
    /**
     * 是否可以删除部件 -- 按钮是否显示
     */
    canDel: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState('global', ['']),
    PartAmount: {
      get() {
        return this.data.PartAmount.First;
      },
      set(newVal) {
        // eslint-disable-next-line prettier/prettier
        this.setQuotationPartPlainInfo([this.indexLv1, this.indexLv2, 'PartAmount', `${newVal}`]);
      },
    },
    PartMaterial: {
      get() {
        return this.data.Material.First;
      },
      set(newVal) {
        // eslint-disable-next-line prettier/prettier
        this.setQuotationPartPlainInfo([this.indexLv1, this.indexLv2, 'Material', `${newVal}`]);
      },
    },
    PartMaterialBrand: {
      get() {
        return this.data.MaterialBrand.First;
      },
      set(newVal) {
        // eslint-disable-next-line prettier/prettier
        this.setQuotationPartPlainInfo([this.indexLv1, this.indexLv2, 'MaterialBrand', `${newVal}`]);
      },
    },
    PartAttributeList: {
      get() {
        return this.data.PropertyList;
      },
      set([data, index, type]) {
        // eslint-disable-next-line prettier/prettier
        this.setQuotationPartPropertyList([this.indexLv1, this.indexLv2, index, data, type]);
      },
    },
    sizeGroupRemark() {
      const _list = this.data.SizeGroup.PropertyList;
      const _arr = _list.map(it => it.PropertyName);
      const _unitID = _list[0].Unit;
      let _unit;
      if (_unitID === 13) _unit = 'mm';
      else _unit = this.$utils.getUnit(_unitID);
      const _str = `${_arr.join('*')}${_unit}`;
      return _str;
    },
    // 尺寸
    PartSizeGroup: {
      get() {
        return this.data.Size.First;
      },
      set([newVal, sizelist]) {
        // console.log("PartSizeGroup ------- 1", newVal, sizelist);
        // eslint-disable-next-line prettier/prettier
        this.setQuotationPartPlainInfo([this.indexLv1, this.indexLv2, 'Size', `${newVal}`]);
        // eslint-disable-next-line prettier/prettier
        this.setQuotationPartSizePropertyList([this.indexLv1, this.indexLv2, sizelist]);
        // console.log(this.data.SizePropertyList);
      },
    },
    PartPrintTypeList: {
      get() {
        return this.data.PrintTypeList;
      },
      set([data, index]) {
        // console.log(data, index);
        // eslint-disable-next-line prettier/prettier
        this.setQuotationPartPrintPropertyList([this.indexLv1, this.indexLv2, index, data]);
      },
    },
    PartPrintPropertyGroupList: {
      get() {
        return this.data.PrintPropertyGroupList;
      },
      set([[value, index3, type], index1, index2]) {
        console.log(index1, index2, index3, value);
        // eslint-disable-next-line prettier/prettier
        this.setPrintPropertyGroupList([this.indexLv1, this.indexLv2, index1, index2, index3, value, type]);
      },
    },
    PartPropertyGroupList: {
      get() {
        return this.data.PropertyGroupList;
      },
      set([[value, index3, type], index1, index2]) {
        // eslint-disable-next-line prettier/prettier
        this.setPropertyGroupList([this.indexLv1, this.indexLv2, index1, index2, index3, value, type]);
      },
    },
    RequiredCraft() {
      if (this.data.CraftList.length === 0) return null;
      const _data = this.data.CraftList.find(it => it.ChoiceType === 2);
      return _data;
    },
    notRequiredCraft() {
      if (this.data.CraftList.length === 0) return null;
      const _data = this.data.CraftList.find(it => it.ChoiceType === 1);
      return _data;
    },
    canHidePartComponent() {
      return (
        this.data.MinNumber
        && this.data.MinNumber === this.data.MaxNumber
        && this.data.MaterialList.length === 0
        && this.data.BrandList.length === 0
        && this.PartAttributeList.length === 0
        && !this.data.SizeGroup
        && this.PartPrintTypeList.length === 0
        && this.PartPrintPropertyGroupList.length === 0
        && this.PartPropertyGroupList.length === 0
        && !this.RequiredCraft
        && !this.notRequiredCraft
      );
    },
  },
  data() {
    return {
      show: true,
      h: 0,
    };
  },
  methods: {
    // eslint-disable-next-line prettier/prettier
    ...mapMutations('Quotation', ['setQuotationPartPlainInfo', 'setQuotationPartPropertyList', 'setQuotationPartSizePropertyList', 'setQuotationPartPrintPropertyList', 'setPrintPropertyGroupList', 'setPropertyGroupList', 'setPartProductParamsCraftList',
      // eslint-disable-next-line prettier/prettier
      'addPartPrintPropertyGroupList', 'addPartPropertyGroupList', 'delPartProductParamsPartList', 'delPartPrintPropertyGroupList', 'delPartPropertyGroupList', 'setCraftItemDisabled4Part',
    ]),
    handleDelClick() {
      this.delPartProductParamsPartList([this.indexLv1, this.indexLv2]);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/css/Common/var.scss";
.mp-duotation-content-part-comp-wrap {
  > header {
    padding: 0 12.5px;
    margin: 0 -12.5px;
    margin-top: 18px;
    font-size: 15px;
    font-weight: 700;
    color: $--color-dark;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $--border-color-3;
    height: 30px;
    line-height: 30px;
    > span.title {
      display: flex;
      align-items: center;
      &::before {
        display: inline-block;
        width: 3px;
        height: 20px;
        background-color: $--color-blue;
        margin-right: 10px;
        content: "";
      }
    }
    > div.del-btn {
      display: flex;
      > span {
        font-weight: 400;
        font-size: 13px;
        color: $--color-gray;
        display: flex;
        align-items: center;
        &::after {
          content: "";
          width: 15px;
          height: 15px;
          background: url("../../../../assets/images/quotationdel.png")
            no-repeat center/100% 100%;
          margin-left: 12px;
        }
      }
      > i {
        font-size: 13px;
        color: $--color-text-light;
        display: flex;
        font-weight: 400;
        align-items: center;
        margin-left: 30px;
        &::after {
          display: inline-block;
          width: 14px;
          height: 13px;
          background: url("../../../../assets/images/doubleArrow.png") no-repeat
            center;
          background-size: 13px 12px;
          margin-left: 10px;
          content: "";
          transition: 0.3s !important;
          position: relative;
          top: -1px;
        }
        &.is-hide::after {
          transform: rotate(180deg);
        }
      }
    }
  }

  > .comp-content-wrap {
    color: $--color-text-primary;
    > .material-brand-wrap {
      display: flex;
      justify-content: space-between;
      margin: 0 -10px;
      margin-top: 12.5px;
      > section {
        // width: 44vw;
        padding: 0 10px;
        flex: 1;
        min-width: 44vw;
      }
    }
    > section,
    > article {
      margin-top: 12.5px;
    }
    > section:last-of-type {
      padding-bottom: 18px;
    }
  }
}
</style>
