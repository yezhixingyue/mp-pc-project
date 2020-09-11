<!--
 * @Describe: 报价部分 下拉选框
 * @FilePath: /src/components/QuotationComps/SMComps/DropDownSelector.vue
-->
<template>
  <!-- <van-dropdown-menu class="mp-duotation-sm-comps-drop-down-wrap">
    <van-dropdown-item v-model="valueComp" :options="option" />
  </van-dropdown-menu> -->
  <div>
    <div class="title" @click="show = !show">{{ value }}</div>
    <MpCollapseComp>
      <ul class="list-content" v-if="show">
        <li v-for="(item, i) of option" :key="item.text + i">
          {{ item.text }}
        </li>
      </ul>
    </MpCollapseComp>
  </div>
</template>

<script>
import Vue from "vue";
import { DropdownMenu, DropdownItem } from "vant";
import MpCollapseComp from "@/components/QuotationComps/SMComps/MpCollapseComp.vue";

Vue.use(DropdownMenu);
Vue.use(DropdownItem);
export default {
  model: {
    prop: "inpValue",
    event: "handleInput"
  },
  props: {
    inpValue: {}
  },
  components: {
    MpCollapseComp
  },
  data() {
    return {
      value: 10,
      option: [
        { text: 10, value: 10 },
        { text: 20, value: 20 },
        { text: 30, value: 30 }
      ],
      show: false
    };
  },
  computed: {
    valueComp: {
      get() {
        return this.inpValue;
      },
      set(newVal) {
        this.$emit("handleInput", newVal); // newVal为option中对应value值
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/Common/var.scss";
.mp-duotation-sm-comps-drop-down-wrap {
  width: 100%;
  height: 30px;
  border-radius: 5px;
  border: 1px solid $--border-color-2;
  box-sizing: border-box;
  > .van-dropdown-menu__item {
    > span {
      width: 100%;
      .van-ellipsis {
        font-size: 14px;
        color: $--color-text-primary;
        &::after {
          right: 10px;
          transition: 0.2s;
          width: 14px;
          height: 8px;
        }
      }
      &::after {
        display: none;
      }
      &.van-dropdown-menu__title--active {
        .van-ellipsis {
          &::after {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
  &::after {
    display: none;
  }
  > .van-dropdown-item.van-dropdown-item--down {
    width: 100%;
  }
}
</style>
