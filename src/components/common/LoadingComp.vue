<template>
  <div class="mp-common-loading-wrap">
      <LoadingMiniSpinner class="loading-box" />
  </div>
</template>

<script>
import LoadingMiniSpinner from '@/components/common/LoadingMiniSpinner.vue';

export default {
  components: {
    LoadingMiniSpinner,
  },
};
</script>

<style lang='scss'>
.mp-common-loading-wrap {
    height: 100%;
    width: 100%;
    .loading-box {
      width: 100%;
      height: 300px;
      .el-loading-spinner{
        margin: 0 auto;
        height: 100%;
        width: 100%;
        flex-direction: column;
        justify-content: center;
        position:unset;
        > .circular {
          margin-bottom: 10px;
        }
      }
    }
}
</style>
