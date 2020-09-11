<!--
 * @Describe: 报价模块 每个子模块   标题组件
 * @FilePath: /src/components/QuotationComps/SMComps/SectionCompHeader.vue
-->

<script>
export default {
  functional: true,
  render(h, context) {
    const { props } = context;
    if (props.remark) {
      return (
        <header>
          <span>{props.title}</span>
          <span class="is-gray">({props.remark})</span>：
        </header>
      );
    } else {
      return (
        <header>
          <span>{props.title}</span>：
        </header>
      );
    }
  }
};
</script>
