<!--
 * @Describe: 属性值组件
 * @FilePath: /src/components/QuotationComps/ProductQuotationContentComps/Sections/AttributesGroupComp.vue
-->

<template>
  <article
    class="mp-duotation-content-comps-attribute-group-wrap"
    v-if="PropertyGroupList.length > 0"
  >
    <section
      v-for="(PropertyGroup, index1) in PropertyGroupList"
      :key="PropertyGroup.GroupID"
    >
      <header>
        <span class="title is-bold is-black">{{ PropertyGroup.GroupName }}：</span>
      </header>
      <ul class="content">
        <li
          class="set-border van-hairline--bottom dashed-style"
          v-for="(Property, index2) in PropertyGroup.PropertyList"
          :key="index2"
        >
          <attributes-comp
            :value="Property.Second"
            :showGroupMenu='PropertyGroup.AllowCustomized'
            @change="data => handlePropertyChange(data, index1, index2)"
            :showGroupAdd='index2 === PropertyGroup.PropertyList.length - 1'
            @handleGroupAdd='addPropertyGroup(index1, PropertyGroup)'
            @handleGroupDel='handleAttributeDel(index1, index2, PropertyGroup.PropertyList.length)'
          />
        </li>
      </ul>
    </section>
  </article>
</template>

<script>
import AttributesComp from '@/components/QuotationComps/ProductQuotationContentComps/NewPcComps/AttributesComp.vue';
// import { Toast } from 'vant';

export default {
  components: {
    AttributesComp,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    PropertyGroupList: {
      get() {
        return this.value;
      },
    },
  },
  data() {
    return {
      propertyGroupTemplateList: [],
    };
  },
  methods: {
    handlePropertyChange([value, index3, type], index1, index2) {
      this.$emit('change', [[value, index3, type], index1, index2]);
    },
    addPropertyGroup(index1) {
      const _item = this.propertyGroupTemplateList[index1];
      this.$emit('addPropertyGroup', [index1, _item]);
    },
    handleAttributeDel(index1, index2, len) {
      if (len >= 2) this.$emit('delPropertyGroup', [index1, index2]);
    },
  },
  mounted() {
    const _list = this.value.map(it => JSON.parse(JSON.stringify(it.PropertyList[0])));
    this.propertyGroupTemplateList = _list;
  },
};
</script>

<style lang="scss">
.mp-duotation-content-comps-attribute-group-wrap > section {
  > header {
    margin-top: 30px;
    margin-bottom: 22px;
  }
  > ul {
    > li {
      > section {
        display: inline-block;
        > article {
          > section {
            display: inline-block;
            margin-right: 50px;
          }
        }
      }
      .icon-shanchu {
        cursor: pointer;
        > i {
          margin-left: 8px;
        }
        & + span {
          margin-left: 30px;
        }
      }
    }
  }
}
</style>
