<template>
  <div class="mp-phone-upload-comp-break-point-type-wrap out-btn">
    <!-- <span class="is-pink" @click="clearFile">清除文件</span> -->
    <div class="self-comp" v-if="isUploadRightNow"
      :class="showLoading || showProgress ? 'hide' : ''"
     >
      <input
        type="file"
        :multiple='multiple'
        :accept="accept"
        @change="onChange"
        class="upload-inp"
        ref="uploadInp"
      />
      {{showTitle}}
    </div>
    <div v-else class="el-comp">
      <span>印品文件：</span>
      <el-upload
        class="upload-box"
        ref="upload"
        action=''
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :limit='1'
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">{{showTitle}}</el-button>
        <!-- <el-button  size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
    </div>
    <div
        class="loading-box"
        @click="e => {e.stopPropagation(); return false;}"
        v-if="showLoading || showProgress"
       >
        <div v-if="showLoading">
          <i class="el-icon-loading"></i>
          <p>文件正在上传中...</p>
        </div>
        <div v-if="showProgress" class="progress-box">
          <p>正在上传中... </p>
          <el-progress stroke-linecap="square"
           :text-inside="true" :stroke-width="13" :percentage="percentageNum">
          </el-progress>
        </div>
      </div>
  </div>
</template>

<script>

import UploadFileByBreakPoint from '@/assets/js/upload/UploadFileByBreakPoint';

const sha1 = require('js-sha1');

export default { // 上传图片按钮
  props: {
    /**
     * 按钮内显示的文字
     */
    title: {
      type: String,
      default: '选择文件',
    },
    /**
     * 上传选择文件成功后的处理函数
     */
    successFunc: {
      type: Function,
      default: () => {},
    },
    /**
     * 上传选择文件失败后的处理函数
     */
    failFunc: {
      type: Function,
      default: () => {},
    },
    /**
     * 是否开启多选
     */
    multiple: {
      type: Boolean,
      default: false,
    },
    /**
     * 规定上传文件类型
     */
    accept: {
      type: String,
      // default: 'image/png,image/jpeg,image/gif,image/jpg,image/bmp',
      default: '*',
      // default: '.png,.jpeg,.gif,.jpg,.bmp',
      // default: '',
    },
    /**
     * 是否在选中文件后立即开始上传
     */
    isUploadRightNow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      upLoadTitle: '',
      percentage: 0,
      showProgress: false,
      showLoading: false,
      fileName: '',
      files: null,
      fileList: [],
    };
  },
  computed: {
    showTitle() {
      // if (!this.upLoadTitle || !this.isUploadRightNow) return this.title;
      if (!this.upLoadTitle) return this.title;
      return this.upLoadTitle;
    },
    percentageNum() {
      return +(+this.percentage).toFixed(1);
    },
  },
  methods: {
    onChange(data) {
      if (!this.isUploadRightNow) {
        if (!this.multiple) {
          this.files = data.target.files;
        }
        return;
      }
      if (!this.multiple) { // 单个产品上传
        this.upLoadSingleFile(data.target.files[0]);
      } else if (this.multiple) { // 多产品上传
        // 暂未编写该功能
      }
    },
    upLoadSingleFile(file) {
      if (!file) return;
      this.upLoadTitle = '读取中...';
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onerror = () => {
        this.messageBox.failSingleError({ title: '文件解析错误！', msg: '请检查文件并重新上传' });
        this.upLoadTitle = '读取失败请重新选择';
        const oInput = document.querySelector('.mp-phone-upload-comp-break-point-type-wrap > input');
        oInput.value = '';
      };
      reader.onloadend = async () => {
        if (!(reader.result)) return;
        const ext = this.utils.extname(file.name);
        const _name = `${sha1(reader.result)}.${ext}`; // 文件名称, 文件唯一标识
        this.upLoadTitle = '解析完成,开始上传';
        console.log(_name, file);
        this.fileName = file.name;
        console.log(this.fileName);
        if (file.size > 20 * 1024 * 1024) { // 文件大于20M显示进度条  客户端设置20M
          this.showProgress = true;
        } else {
          this.showLoading = true;
        }
        // this.setReplenishFileUniqueName(`${sha1(reader.result)}.${ext}`);
        // this.setReplenishFile(file);
        const onUploadProgressFunc = progress => {
          // eslint-disable-next-line no-restricted-globals
          if (!isNaN(progress)) this.percentage = progress;
        };
        if (file && _name) {
          const key = await UploadFileByBreakPoint(file, _name, onUploadProgressFunc, 100);
          if (key) {
            // 上传成功
            this.successFunc({ compiledName: _name, initialName: this.fileName });
          } else {
            // 上传失败
            this.massageBox.failSingleError({ title: '文件上传失败', msg: '抱歉，文件上传失败，请重试!', failFunc: this.failFunc });
          }
          if (this.showProgress) this.showProgress = false;
          if (this.showLoading) this.showLoading = false;
          this.upLoadTitle = '';
          const oInput = document.querySelector('.mp-phone-upload-comp-break-point-type-wrap > div > input.upload-inp');
          oInput.value = '';
          this.percentage = 0;
        }
      };
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style lang='scss'>
.mp-phone-upload-comp-break-point-type-wrap {
  > div.self-comp {
    width: 100px;
    height: 35px;
    background-color: #428dfa;
    border: 1px solid #428dfa;
    outline: none;
    font-size: 12px;
    border-radius: 2px;
    // margin-right: 15px;
    // margin-top: 25px;
    user-select: none;
    display: inline-block;
    position: relative !important;
    color: #fff !important;
    text-align: center;
    line-height: 35px;
    box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.15);
    cursor: pointer;

    > input {
      opacity: 0;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      cursor: pointer;
    }
    &:hover {
      background-color: #009ef9;
      border-color: #009ef9;
    }
    &:active {
      background-color: #35dff9;
      border-color: #35dff9;
    }
    &.hide {
      &:hover {
        background-color: #428dfa;
        border-color: #428dfa;
      }
      &:active {
        background-color: #428dfa;
        border-color: #428dfa;
      }
    }
  }
  > span {
    cursor: pointer;
    margin-right: 35px;
    user-select: none;
    &:active {
      color: #f4a307 !important;
    }
  }
  > div.loading-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba($color: #000000, $alpha: 0.7);
    overflow: hidden;
    z-index: 8888;
    > div {
      color: #428dfa;
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 14px;
      transform: translate(-50%, -135%);
      > i {
        font-size: 32px;
        margin-bottom: 10px;
      }
      &.progress-box {
        width: 780px;
        > p {
          text-align: left;
          margin-bottom: 10px;
          font-size: 16px;
          color: #26bcf9;
        }
        .el-progress-bar__inner {
          .el-progress-bar__innerText {
            vertical-align: top;
          }
          width: 0;
        }
      }
    }
  }
  > div.el-comp {
    > span {
      line-height: 35px;
      float: left;
      vertical-align: top;
    }
    > .upload-box {
      float: right;
      width: 1050px;
      > .el-upload {
        > .el-button {
          width: 100px;
          height: 35px;
          padding: 0;
        }
        float: right;
      }
      > .el-upload-list {
        float: left;
        // width: 1000px;
        margin: 0;
        // display: inline-block;
        > li {
          margin-top: 5px;
          outline-width: 0;
        }
      }
      &::after {
        content: '';
        display: block;
        clear: both;
      }
      overflow: hidden;
      height: 35px;
    }
    &::after {
      content: '';
      display: block;
      clear: both;
    }
  }
}
</style>
