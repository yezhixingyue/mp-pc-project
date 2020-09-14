<template>
  <li>
    <base-num-input
      v-model="inpVal"
      :placeholder="`请输入${sizeData.PropertyName}`"
    />
    <!-- <span v-if="index !== maxLen">*</span> -->
  </li>
</template>

<script>
import BaseNumInput from '@/components/QuotationComps/SMComps/BaseNumInput.vue';
import { Toast } from 'vant';

export default {
  props: {
    sizeData: {
      type: Object,
      default: () => ({}),
    },
    maxLen: {
      type: Number,
      default: Infinity,
    },
    index: {
      type: Number,
    },
    value: {},
    sizeInputValueList: {},
  },
  components: {
    BaseNumInput,
  },
  data() {
    return {
      newVal: '',
    };
  },
  computed: {
    inpVal: {
      get() {
        if (!this.newVal) {
          if (
            this.sizeInputValueList.length === 0
            || !this.sizeInputValueList[this.index]
          ) {
            return '';
          }
          return this.sizeInputValueList[this.index].CustomerInputValue;
        }
        return this.newVal;
      },
      set(newVal) {
        if (newVal.includes('.')) Toast('尺寸必须为整数');
        const _str = parseInt(newVal);
        const _obj = {
          PropertyID: this.sizeData.PropertyID,
          CustomerInputValue: _str,
        };
        this.newVal = _str;
        console.log(this.newVal);
        this.$emit('change', [_obj, this.index]);
        // console.log(newVal, _obj);
      },
    },
  },
};
</script>

<style></style>
