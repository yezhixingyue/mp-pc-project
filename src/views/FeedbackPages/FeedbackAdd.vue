<template>
  <section class="mp-mpzj-order-feedback-add-page-wrap">
    <section class="content">
      <header>
        <span class="blue-v-line is-bold is-black">提交问题反馈</span>
        <span class="is-font-12"> （ 如果该订单有售后问题需要反馈，请填写该页面信息并提交 ）</span>
      </header>
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="订单号：">
            <!-- <el-input v-model="ruleForm.OrderID" disabled></el-input> -->
            <p class="text">{{ruleForm.Order.OrderID}}</p>
          </el-form-item>
          <el-form-item label="订单备注：">
            <!-- <el-input v-model="content" disabled></el-input> -->
            <p class="text gray">{{ruleForm.Order.Content}}</p>
          </el-form-item>
          <el-form-item label="售后原因：" prop="QuestionList" class="mp-select">
            <SingleSelector
              v-model="ruleForm.QuestionList"
              :optionList='RejectReasonList'
              multiple
              placeholder="请选择售后原因"
              :defaultProps="{ label: 'Title', value: 'ID', }"
            />
          </el-form-item>
          <el-form-item label="问题描述：" prop="Remark">
            <el-input type="textarea" v-model="ruleForm.Remark"
             maxlength="600" show-word-limit placeholder="请输入具体问题描述"></el-input>
          </el-form-item>
          <el-form-item label="诉求意向：" prop="AppealType" class="mp-select">
            <SingleSelector
              v-model="ruleForm.AppealType"
              :optionList='AppealList'
              placeholder="请选择诉求意向"
            />
          </el-form-item>
          <el-form-item label="上传凭证：">
            <el-upload
              action="http://192.168.1.92:8055/Api/Upload/Image?type=3"
              list-type="picture-card"
              :file-list="fileList"
              ref="upload"
              drag
              accept='.png,.jpeg,.jpg,.bmp'
              :multiple='true'
              :limit='4'
              :on-preview="handlePictureCardPreview"
              >
              <!-- :on-success='handllePictureUploaded'
              :on-remove="handleRemove" -->
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" top="8vh">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <p class="is-font-12 gray upload-Remark">产品有问题的，请把有问题的成品一二十份呈扇形摊开拍照，并把有问题的部分单独拍照；最多上传4张照片</p>
          </el-form-item>
          <el-form-item label="联系方式：" prop="Mobile">
            <el-input v-model="ruleForm.Mobile" maxlength="11" show-word-limit placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="QQ号码：" prop="QQ">
            <el-input v-model="ruleForm.QQ" maxlength="11" show-word-limit placeholder="请输入QQ号码"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="btn-box">
              <div>
                <p class="is-bold">请注意：</p>
                <div class="is-font-12">
                  <p>1、数量问题请在配送人员送货时现场确认，已使用的产品无法处理数量问题的售后；</p>
                  <p>2、请在下单日起算一个月内申请售后，超出一个月的无法处理售后问题。</p>
                </div>
              </div>
              <el-button type="primary" @click="submitForm('ruleForm')">立即提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </section>
</template>

<script>
import SingleSelector from '@/components/common/Selector/SingleSelector.vue';
import { mapState } from 'vuex';

export default {
  components: {
    SingleSelector,
  },
  data() {
    return {
      RejectReasonList: [],
      fileList: [
        // eslint-disable-next-line max-len
        // { url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        // eslint-disable-next-line max-len
        // { url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
      ],
      ruleForm: {
        ID: 0,
        Order: {
          OrderID: '', // 订单号
          Content: '', // 订单备注
        },
        QuestionList: [], // 售后原因
        Remark: '', // 问题描述
        AppealType: '', // 诉求意向
        Mobile: '', // 联系方式 - 手机号码
        QQ: '', // QQ号码
        PicList: [], // 上传图片列表
      },
      rules: {
        QuestionList: [
          { required: true, message: '请选择售后原因', trigger: 'change' },
        ],
        Remark: [
          { required: true, message: '请输入具体问题描述', trigger: 'blur' },
          {
            min: 3, max: 600, message: '长度在 3 到 600 个字符', trigger: 'blur',
          },
        ],
        AppealType: [
          { required: true, message: '请选择诉求意向', trigger: 'change' },
        ],
        Mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' },
        ],
        QQ: [
          { required: true, message: '请输入QQ号码', trigger: 'blur' },
          { pattern: /(^[1-9]\d*$)/, message: 'QQ号码必须为数字值，且不能以0开头' },
          {
            min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur',
          },
        ],
      },
      dialogImageUrl: '',
      dialogVisible: false,
    };
  },
  computed: {
    ...mapState('common', ['customerInfo', 'AppealList']),
    ...mapState('summary', ['editFeedbackData']),
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const _list = this.$refs.upload.uploadFiles.map(it => {
            if (it.response && it.response.Status === 1000) return it.response.Data.Url; // 此处需额外处理编辑时的已有图片类型
            return '';
          }).filter(it => it);
          this.ruleForm.PicList = _list;
          this.ruleForm.QuestionList = this.ruleForm.QuestionList.map(ID => ({ ID }));
          const res = await this.api.getAfterSalesApply(this.ruleForm);
          if (res.data.Status === 1000) {
            this.messageBox.successSingle({
              title: '提交成功',
              successFunc: () => {
                this.$router.replace('/feedbackList');
              },
            });
          }
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      if (this.customerInfo) {
        this.ruleForm.Mobile = this.customerInfo.Mobile;
        this.ruleForm.QQ = this.customerInfo.QQ;
      }
    },
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    //   console.log('handleRemove', this.fileList);
    // },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // handllePictureUploaded(response, file, fileList) {
    //   console.log('handllePictureUploaded', response, file, fileList);
    // },
  },
  async mounted() {
    const OrderID = this.$route.params.id;
    const Content = this.$route.params.desc;
    const { type } = this.$route.params;
    if (!OrderID || !Content || !type) return;
    if (type === 'edit') {
      if (this.editFeedbackData) { // 仓库提前保存好的编辑数据
        this.ruleForm = {
          ...this.ruleForm,
          ...this.editFeedbackData,
        };
        if (this.editFeedbackData.QuestionList.length > 0) {
          this.editFeedbackData.QuestionList = this.editFeedbackData.QuestionList.map(it => it.ID);
        }
        this.fileList = this.editFeedbackData.PicList; // 可能需转换处理
        // this.$store.commit('summary/setEditFeedbackData', null);
      } else {
        this.$router.replace('/feedbackList');
        return;
      }
    } else if (type === 'add' && this.customerInfo) {
      this.ruleForm.Mobile = this.customerInfo.Mobile;
      this.ruleForm.QQ = this.customerInfo.QQ;
    }
    this.ruleForm.Order.OrderID = OrderID;
    this.ruleForm.Order.Content = Content;
    const res = await this.api.getQuestionList();
    if (res.data.Status === 1000) this.RejectReasonList = res.data.Data;
  },
};
</script>

<style lang='scss'>
.mp-mpzj-order-feedback-add-page-wrap {
  width: 100%;
  margin-top: 25px;
  background-color: #fff;
  min-height: calc(100vh - 115px - 22px);
  min-height: calc(100vh - 115px - 42px) \0;
  > .content {
    width: 1200px;
    margin: 0 auto;
    > header {
      padding-top: 25px;
      padding-bottom: 40px;
      padding-left: 10px;
    }
    > div {
      width: 1000px;
      margin-left: 80px;
      .el-textarea__inner {
        min-height: 88px !important;
      }
      .mp-select {
        .el-form-item__content {
          height: 40px;
          > .mp-pc-common-comps-select-comp-wrap {
            width: 200px;
            > header {
              display: none;
            }
            > .el-select {
              width: 200px;
              .el-input__inner {
                width: 200px;
                height: 40px;
              }
              .el-input__suffix .el-input__icon::before {
                top: 11px;
              }
            }
          }
        }
      }
      .btn-box {
        padding-bottom: 150px;
        > div {
          padding-bottom: 86px;
          padding-top: 20px;
          p {
            line-height: 24px;
          }
        }
        > button {
          width: 120px;
          & + button {
            margin-left: 20px;
          }
        }
      }
      .text {
        padding-left: 13px;
        // color: #888;
        font-size: 13px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        // font-weight: 700;
      }
      .el-upload-list__item-thumbnail {
        object-fit: cover;
      }
      .upload-Remark {
        // line-height: 34px;
        // padding-bottom: 10px;
      }
      .el-upload-dragger {
        width: 100%;
        height: 100%;
        border: none;
      }
      .el-form-item__label {
        font-weight: 700;
      }
    }
  }
}
</style>
