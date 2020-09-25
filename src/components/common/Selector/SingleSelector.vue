<template>
  <section class="mp-pc-common-comps-select-comp-wrap float">
    <header class="is-bold">交易类型：</header>
    <el-select v-model="selectValue" placeholder="请选择">
      <el-option
        v-for="item in optionList"
        :key="item[defaultProps.value]"
        :label="item[defaultProps.label]"
        :value="item[defaultProps.value]">
      </el-option>
    </el-select>
  </section>
</template>

<script>
export default {
  props: {
    optionList: {
      type: Array,
      default: () => [],
    },
    value: {},
    defaultProps: {
      type: Object,
      default: () => ({
        label: 'label',
        value: 'value',
      }),
    },
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  computed: {
    selectValue: {
      get() {
        return this.value;
      },
      set(newVal) {
        this.$emit('change', newVal);
      },
    },
  },
};
</script>

<style lang='scss'>
.mp-pc-common-comps-select-comp-wrap {
  width: 196px;
  display: inline-block;
  > header {
    float: left;
    line-height: 30px;
  }
  > div {
    float: right;
    width: 120px;
    height: 30px;
    > div.el-input {
      > input {
        width: 120px;
        line-height: 30px;
        height: 30px;
        padding: 0 22px 0 13px;
      }
    }
  }
}
</style>
