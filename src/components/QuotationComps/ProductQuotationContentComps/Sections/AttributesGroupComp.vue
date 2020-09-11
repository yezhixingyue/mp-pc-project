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
        <span class="title">{{ PropertyGroup.GroupName }}</span>
      </header>
      <ul class="content">
        <li
          class="set-border van-hairline--bottom dashed-style"
          v-for="(Property, index2) in PropertyGroup.PropertyList"
          :key="index2"
        >
          <attributes-comp
            :value="Property.Second"
            @change="data => handlePropertyChange(data, index1, index2)"
          />
          <div class="to-del" v-if="PropertyGroup.AllowCustomized">
            <span
              @click="
                handleAttributeDel(
                  index1,
                  index2,
                  PropertyGroup.PropertyList.length,
                  PropertyGroup.GroupName
                )
              "
            >
              <img src="../../../../assets/images/quotationdel.png" alt="del" />
            </span>
          </div>
        </li>
      </ul>
      <footer v-if="PropertyGroup.AllowCustomized">
        <span @click="addPropertyGroup(index1, PropertyGroup)">
          +添加{{ PropertyGroup.GroupName }}
        </span>
      </footer>
    </section>
  </article>
</template>

<script>
import AttributesComp from "@/components/QuotationComps/ProductQuotationContentComps/Sections/AttributesComp.vue";
import { Toast } from "vant";

export default {
  components: {
    AttributesComp
  },
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    PropertyGroupList: {
      get() {
        return this.value;
      }
    }
  },
  data() {
    return {
      propertyGroupTemplateList: []
    };
  },
  methods: {
    handlePropertyChange([value, index3, type], index1, index2) {
      this.$emit("change", [[value, index3, type], index1, index2]);
    },
    addPropertyGroup(index1) {
      const _item = this.propertyGroupTemplateList[index1];
      this.$emit("addPropertyGroup", [index1, _item]);
    },
    handleAttributeDel(index1, index2, len, groupName) {
      if (len < 2) Toast(`至少需要一个${groupName}信息!`);
      else this.$emit("delPropertyGroup", [index1, index2]);
    }
  },
  mounted() {
    const _list = this.value.map(it =>
      JSON.parse(JSON.stringify(it.PropertyList[0]))
    );
    this.propertyGroupTemplateList = _list;
  }
};
</script>

<style lang="scss">
@import "@/assets/css/Common/var.scss";
.mp-duotation-content-comps-attribute-group-wrap > section {
  > header {
    height: 16px;
    line-height: 16px;
    color: $--color-dark;
    padding-top: 10px;
    font-size: 15px;
    &::before {
      content: "";
      width: 6px;
      height: 6px;
      display: inline-block;
      background-color: $--color-origin;
      border-radius: 50%;
      vertical-align: 15%;
      margin-right: 6px;
    }
  }
  > ul.content {
    > li {
      margin-top: 4px;
      // border-bottom: 1px dashed $--border-color-2;
      > .to-del {
        height: 25px;
        text-align: right;
        padding-top: 7.5px;
        > span {
          height: 25px;
          width: 25px;
          display: inline-block;
          background-color: $--border-color;
          border-radius: 50%;
          position: relative;
          > img {
            height: 15px;
            width: 15px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
      padding-bottom: 7.5px;
    }
  }
  > footer {
    height: 35px;
    text-align: center;
    color: $--color-blue;
    line-height: 35px;
    font-size: 15px;
  }
}
</style>
