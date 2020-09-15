<template>
  <section class="mp-pc-material-comp-wrap">
    <span class="title gray">{{title}}：</span>
    <el-select v-model="lv1Val">
      <el-option
        v-for="(item, i) in optionList1"
        :key="item + i"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <el-select v-model="inpValue">
      <el-option
        v-for="item in optionList2"
        :key="item.MaterialID"
        :label="item.Name"
        :value="item.MaterialID">
      </el-option>
    </el-select>
  </section>
</template>

<script>
/* eslint-disable prefer-destructuring */
export default {
  model: {
    prop: 'value',
    event: 'changeFunc',
  },
  props: {
    option: { // 选择项列表
      type: Array,
      default: () => [],
    },
    value: { // v-model绑定值
      required: true,
    },
    title: {
      type: String,
      default: '标题',
    },
    disabled: {},
  },
  data() {
    return {
      option1: '',
    };
  },
  computed: {
    inpValue: {
      get() {
        return this.value;
      },
      set(newVal) {
        this.$emit('changeFunc', newVal);
      },
    },
    optionObj() {
      const _list = this.option.map(it => ({ Name: it.Name, MaterialID: it.MaterialID }))
        .map(it => {
          const _arr = it.Name.trim().split(/\s+/);
          const _t = _arr[0];
          _arr.shift();
          const _s = _arr.join(' ');
          return { ...it, Name: [_t, _s] };
        });
      const _obj = {};
      _list.forEach(item => {
        if (!item.Name || item.Name.length !== 2) return;
        const _k = item.Name[0];
        const _v = { ...item, Name: item.Name[1] };
        if (!_obj[_k]) _obj[_k] = [];
        _obj[_k].push(_v);
      });
      return _obj;
    },
    optionList1() {
      const _list = Object.keys(this.optionObj);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if (!this.lv1Val) this.lv1Val = _list[0];
      return _list;
    },
    optionList2() {
      if (!this.lv1Val) return [];
      return this.optionObj[this.lv1Val];
    },
    lv1Val: {
      get() {
        return this.option1;
      },
      set(newVal) {
        if (newVal === this.option1) return;
        this.option1 = newVal;
        const _v = this.optionObj[newVal][0].MaterialID;
        this.$emit('changeFunc', _v);
      },
    },
  },
};
</script>

<style lang='scss'>
.mp-pc-material-comp-wrap {
  > .el-select + .el-select {
    margin-left: 8px;
  }
}
</style>
