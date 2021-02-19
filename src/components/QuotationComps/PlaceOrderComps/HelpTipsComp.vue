<template>
  <section class="mp-place-order-help-tip-comp-wrap" v-if="tipsData && tipsData.Content">
    <div @click="onShowTipsClick" class="img-box">
      <img
        src="../../../assets/images/wen.png"
        alt="下单帮助"
        title="点击查看帮助提示"
      />
    </div>
    <el-dialog
      :visible="visible"
      top="6vh"
      :title="title"
      width="800px"
      v-dialogDrag
      :before-close="handleBeforeDiaClose"
      custom-class="mp-help-tips-dialog-wrap"
    >
      <section>
        <div class="rich-edit-content ql-editor ql-snow mp-scroll-wrap" v-html="richContent"></div>
        <footer>
          <el-button @click="handleBeforeDiaClose">关闭</el-button>
        </footer>
      </section>
    </el-dialog>
  </section>
</template>

<script>
import { imgUrl } from '@/assets/js/setup';

export default {
  props: ['tipsData', 'title'],
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    richContent() {
      if (this.tipsData && this.tipsData.Content) {
        const _content = this.tipsData.Content.replace('<img src="/', `<img src="${imgUrl}/`);
        return _content;
      }
      return '';
    },
  },
  methods: {
    onShowTipsClick() {
      this.visible = true;
    },
    handleBeforeDiaClose() {
      this.visible = false;
    },
  },
};
</script>

<style lang='scss'>
@import '@/assets/css/quill.snow.scss';
.mp-place-order-help-tip-comp-wrap {
  width: 15px;
  height: 15px;
  display: inline-block;
  position: relative;
  top: 2px;
  margin-left: 10px;
  margin-right: 10px;
  > div.img-box {
    width: 100%;
    height: 100%;
    cursor: pointer;
    position: relative;
    user-select: none;
    // &::before {
    //   position: absolute;
    //   left: 0;
    //   right: 0;
    //   top: 0;
    //   bottom: 0;
    //   content: "";
    //   background-color: rgba(0, 0, 0, 0.05);
    //   border-radius: 50%;
    //   opacity: 0;
    //   transition: all 0.2s ease-in-out;
    // }
    // &:hover::before {
    //   opacity: 1;
    // }
    // &:active::before {
    //   background-color: rgba(0, 0, 0, 0.15);
    // }
    // background: url(../../../assets/images/wen.png) no-repeat center center/100% 100%;
  }
}
.mp-help-tips-dialog-wrap {
  > .el-dialog__header {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 16px;
    margin: 0 10px;
    border-bottom: 1px solid #eee;
    > .el-dialog__title {
      color: #585858;
      font-size: 16px;
      font-weight: 400;
    }
    > button {
      top: 14px;
      right: 18px;
      font-size: 20px;
    }
  }
  > .el-dialog__body {
    font-weight:normal;
    padding-top: 4px;
    > section {
      > div {
        max-height: 620px;
        min-height: 300px;
        overflow: auto;
        &.rich-edit-content {
          padding-bottom: 15px;
          color: #000000;
          padding-right: 3px;
          font-size: 14px;
          /* font
  -------------------------*/
          .ql-font-SimSun {
            font-family: "SimSun";
          }
          .ql-font-SimHei {
            font-family: "SimHei";
          }
          .ql-font-Microsoft-YaHei {
            font-family: "Microsoft YaHei";
          }
          .ql-font-KaiTi {
            font-family: "KaiTi";
          }
          .ql-font-FangSong {
            font-family: "FangSong";
          }
          .ql-font-Arial {
            font-family: "Arial";
          }
          .ql-font-Times-New-Roman {
            font-family: "Times New Roman";
          }
          .ql-font-sans-serif {
            font-family: "sans-serif";
          }

          /* 部分标签样式初始化
  ----------------------*/
          strong {
            font-weight: bold;
          }

          em {
            font-style: italic;
          }

          u {
            text-decoration: underline;
          }

          s {
            text-decoration: line-through;
          }

          sub {
            vertical-align: sub;
            font-size: smaller;
          }

          sup {
            vertical-align: super;
            font-size: smaller;
          }

          h1 {
            font-size: 2em;
          }
          h2 {
            font-size: 1.5em;
          }
          h3 {
            font-size: 1.17em;
          }
          h4 {
            font-size: 1em;
          }
          h5 {
            font-size: 0.83em;
          }
          h6 {
            font-size: 0.67em;
          }

          img {
            max-width: 100%;
          }
        }
      }
      > footer {
        padding-top: 18px;
        text-align: center;
        > button {
          width: 120px;
          height: 35px;
          padding: 0;
          color: #428dfa;
          border-color: #428dfa;
          &:active {
            background-color: rgba(66, 141, 250, 0.4);
          }
        }
      }
    }
  }
}
</style>
