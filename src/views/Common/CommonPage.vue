<template>
  <article class="mp-pc-common-page-comp-view-wrap">
    <header>
      <CommonHeader />
    </header>
    <div class="common-page-view-content">
      <router-view />
    </div>
    <footer>
      <BlueInfoFooter />
    </footer>
  </article>
</template>

<script>
import CommonHeader from '@/components/CommonPageComps/CommonHeader.vue';
import BlueInfoFooter from '@/components/common/BlueInfoFooter.vue';

export default {
  components: {
    CommonHeader,
    BlueInfoFooter,
  },
};
</script>

<style lang='scss'>
.mp-pc-common-page-comp-view-wrap {
  padding-top: 135px;
  // background-color: rgb(245, 245, 245);
  box-sizing: border-box;
  > .common-page-view-content {
    width: 100%;
    margin: 0 auto;
    min-height: calc(100vh - 135px - 144px);
  }
}
</style>
