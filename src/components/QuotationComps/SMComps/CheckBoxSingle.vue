<!--
 * @Describe: 单选框按钮
 * @FilePath: /src/components/QuotationComps/SMComps/CheckBoxSingle.vue
-->
<template>
  <van-checkbox
    v-model="checked"
    shape="square"
    @change="handleChange"
    class="mp-duotation-sm-comps-checked-wrap"
  >
    {{ title }}
    <template #icon="props">
      <img
        class="img-icon"
        v-show="props.checked"
        :src="props.checked ? imgSrc : ''"
      />
    </template>
  </van-checkbox>
</template>

<script>
import Vue from "vue";
import { Checkbox } from "vant";
const imgSrc = require("@/assets/images/selected.png");

Vue.use(Checkbox);

export default {
  props: {
    title: {
      type: String,
      default: "自定义"
    },
    /**
     * 初始默认状态
     */
    default: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      imgSrc,
      checked: false
    };
  },
  methods: {
    handleChange(e) {
      this.$emit("change", e);
    }
  },
  mounted() {
    this.checked = this.default;
  },
  computed: {
    watchValue() {
      return this.default;
    }
  },
  watch: {
    watchValue(newVal) {
      this.checked = newVal;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/Common/var.scss";
.mp-duotation-sm-comps-checked-wrap.van-checkbox {
  height: 15px;
  > .van-checkbox__icon {
    height: 15px;
    width: 15px;
    box-sizing: border-box;
    border: 1px solid $--border-color-2;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    > .img-icon {
      width: 11px;
      height: 7px;
    }
    &.van-checkbox__icon--checked {
      background-color: $--color-blue;
      border-color: $--color-blue;
    }
  }

  > span {
    color: $--color-text-primary;
    font-size: 13px;
  }
}
</style>
