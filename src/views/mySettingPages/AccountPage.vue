<template>
  <section class="mp-pc-my-setting-account-page-wrap">
    <div class="basic-info">
      <span class="blue-v-line is-bold is-black">基本信息</span>
      <div>
        <InputComp :disabled='AuthenInfo4Submit.disabled'
          v-model="AuthenInfo4Submit.CustomerName"  title='企业简称' required />
        <InputComp :disabled='AuthenInfo4Submit.disabled'
          v-model="AuthenInfo4Submit.AuthenInfo.CompanyName"  title='企业全称' placeholder='须与营业执照上的名称一致' />
      </div>
      <div class="second">
        <InputComp :disabled='AuthenInfo4Submit.disabled'
          v-model="AuthenInfo4Submit.AuthenInfo.TaxID"  title='纳税人识别号' placeholder='营业执照上的纳税人识别号' />
        <InputComp :disabled='AuthenInfo4Submit.disabled' v-model="AuthenInfo4Submit.QQ"  title='QQ' />
      </div>
      <div class="address-wrap">
        <div class="add-1">
          <p class="title"><i class="is-pink">*</i> 经营地址：</p>
          <el-select :disabled='!AuthenInfo4Submit.disabled'
            v-model="AuthenInfo4Submit.AuthenInfo.SellArea.RegionalID" @change='handleRegionalChange'>
            <el-option
              v-for="item in RegionalList"
              :key="item.ID"
              :label="item.Name"
              :value="item.ID">
            </el-option>
          </el-select>
          <el-select v-model="AuthenInfo4Submit.AuthenInfo.SellArea.CityID"
          :disabled="CityList.length === 0 || !AuthenInfo4Submit.disabled" @change='handleCityChange'>
            <el-option
              v-for="item in CityList"
              :key="item.ID"
              :label="item.Name"
              :value="item.ID">
            </el-option>
          </el-select>
          <el-select v-model="AuthenInfo4Submit.AuthenInfo.SellArea.CountyID"
            :disabled="CountyList.length === 0 || !AuthenInfo4Submit.disabled" @change='handleCountyChange'>
            <el-option
              v-for="item in CountyList"
              :key="item.ID"
              :label="item.Name"
              :value="item.ID">
            </el-option>
          </el-select>
        </div>
        <div class="add-2">
          <el-input :disabled='!AuthenInfo4Submit.disabled'
            v-model.trim="AuthenInfo4Submit.AuthenInfo.DetailAddress" placeholder="在此输入详细地址"></el-input>
        </div>
      </div>
    </div>
    <div class="img-info">
      <p class="blue-v-line is-bold is-black">营业执照照片</p>
      <div class="img-box">
        <div class="pic is-font-18">
          双击添加照片
          <div class="remark">
            <p class="remoark-text1">照片支持 .png, .jpg,.bmp 格式；</p>
            <p>宽度和长度比率为5:7</p>
          </div>
          <input type="file" @change="onChange" accept='.png,.jpeg,.jpg,.bmp'>
        </div>
        <div class="text gray">
          <p class="is-bold">操作说明：</p>
          <p class="is-font-12">双击可更换照片；鼠标滚轮滚动可放大/ 缩小图片；拖拽可移动图片。</p>
        </div>
      </div>
    </div>
    <footer>
      <el-button type="primary" :disabled='!AuthenInfo4Submit.disabled'>保存</el-button>
    </footer>
  </section>
</template>

<script>
import InputComp from '@/components/common/InputComp.vue';
import { mapState } from 'vuex';

export default {
  // 修改账户信息后要重新获取账户信息数据和账号数据 (2个接口  需在获取前设置旧数据为null) 其它情况, 如充值后也需要重新获取账号信息
  components: {
    InputComp,
  },
  computed: {
    ...mapState('common', ['customerInfo']),
  },
  data() {
    return {
      nickName: '',
      RegionalList: [],
      CityList: [],
      CountyList: [],
      AuthenInfo4Submit: {
        AuthenInfo: {
          CompanyName: '',
          TaxID: '',
          SellArea: {
            RegionalID: '',
            RegionalName: '',
            CityID: '',
            CityName: '',
            CountyID: '',
            CountyName: '',
          },
          DetailAddress: '',
          LicensePath: '',
        },
        CustomerName: '',
        QQ: '',
        AllowEdit: true,
      },
    };
  },
  methods: {
    async handleRegionalChange(e) {
      const _t = this.RegionalList.find(it => it.ID === e);
      this.AuthenInfo4Submit.AuthenInfo.SellArea.RegionalName = _t.Name;
      this.AuthenInfo4Submit.AuthenInfo.SellArea.CityID = '';
      this.AuthenInfo4Submit.AuthenInfo.SellArea.CityName = '';
      this.AuthenInfo4Submit.AuthenInfo.SellArea.CountyID = '';
      this.AuthenInfo4Submit.AuthenInfo.SellArea.CountyName = '';
      this.CityList = [];
      this.CountyList = [];

      if (this.CityList.length === 0 || this.CityList[0].ParentID !== e) {
        const res = await this.api.getAddressIDList(e);
        if (res.data.Status === 1000) {
          this.CityList = res.data.Data;
        }
      }
    },
    async handleCityChange(e) {
      const _t = this.CityList.find(it => it.ID === e);
      this.AuthenInfo4Submit.AuthenInfo.SellArea.CityName = _t.Name;
      this.AuthenInfo4Submit.AuthenInfo.SellArea.CountyID = '';
      this.AuthenInfo4Submit.AuthenInfo.SellArea.CountyName = '';
      this.CountyList = [];

      if (this.CountyList.length === 0 || this.CountyList[0].ParentID !== e) {
        const res = await this.api.getAddressIDList(e);
        if (res.data.Status === 1000) {
          this.CountyList = res.data.Data;
        }
      }
    },
    handleCountyChange(e) {
      const _t = this.CountyList.find(it => it.ID === e);
      this.AuthenInfo4Submit.AuthenInfo.SellArea.CountyName = _t.Name;
    },
    onChange(e) {
      const file = e.target.files[0];
      console.log(file);
      if (!file) {
        return;
      }
      if (
        file.type !== 'image/jpeg'
        && file.type !== 'image/png'
        && file.type !== 'image/bmp'
      ) {
        this.messageBox.warnSingleError({
          title: '图片格式错误',
          msg: '请上传 jpg/png/bmp 格式图片',
        });
        return;
      }
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file); // 根据图片路径读取图片
      fileReader.onload = (ie) => {
        const base64 = ie.currentTarget.result;
        const img = new Image();
        img.src = base64;
        img.onload = async () => {
          const imgInfo = {
            width: img.naturalWidth,
            height: img.naturalHeight,
          };
          if ((imgInfo.width < 900 || imgInfo.height < 1280) && (imgInfo.width < 1280 || imgInfo.height < 900)) {
            this.messageBox.warnSingleError({
              title: '图片尺寸太小',
              msg: '请上传大于900×1280像素的图片',
            });
            return;
          }
          const res = await this.api.uploadImage(file);
          if (res.data.Status === 1000) {
            this.AuthenInfo4Submit.AuthenInfo.LicensePath = res.data.Data.Url;
          }
        };
      };
    },
  },
  watch: {
    customerInfo: {
      async handler(newVal) {
        if (!newVal) return;
        // eslint-disable-next-line object-curly-newline
        const { QQ, CustomerName, AuthenInfo, AllowEdit } = newVal;
        if (!AuthenInfo) return;
        // eslint-disable-next-line object-curly-newline
        const { CompanyName, DetailAddress, LicensePath, TaxID, SellArea } = AuthenInfo;
        this.AuthenInfo4Submit.CustomerName = CustomerName;
        this.AuthenInfo4Submit.QQ = QQ;
        this.AuthenInfo4Submit.AllowEdit = AllowEdit;
        this.AuthenInfo4Submit.AuthenInfo.TaxID = TaxID;
        this.AuthenInfo4Submit.AuthenInfo.CompanyName = CompanyName;
        this.AuthenInfo4Submit.AuthenInfo.DetailAddress = DetailAddress;
        this.AuthenInfo4Submit.AuthenInfo.LicensePath = LicensePath;
        this.AuthenInfo4Submit.AuthenInfo.SellArea = { ...SellArea };
        if (SellArea) {
          const { RegionalID, CityID } = SellArea;
          const res = await Promise.all([
            this.api.getAddressIDList(-1),
            this.api.getAddressIDList(RegionalID),
            this.api.getAddressIDList(CityID),
          ]);
          const _list = res.map(it => {
            if (it.data.Status === 1000) {
              return it.data.Data;
            }
            return [];
          });
          this.RegionalList = [..._list[0]];
          this.CityList = [..._list[1]];
          this.CountyList = [..._list[2]];
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang='scss'>
.mp-pc-my-setting-account-page-wrap {
  > .basic-info {
    padding-top: 10px;
    > div {
      margin-top: 20px;
      // &.second {
      //   margin-top: 30px;
      // }
      > div + div {
        margin-left: 60px;
      }
      &.address-wrap {
        margin-top: 30px;
        > div {
          margin: 0;
          &.add-1 {
            margin-bottom: 15px;
            > p {
              line-height: 44px;
              color: #888;
            }
            > div {
              width: 120px;
              height: 30px;
              margin-right: 20px;
              > .el-input {
                height: 30px;
                > input {
                  height: 30px;
                }
              }
            }
          }
          &.add-2 {
            > .el-input {
              height: 30px;
              width: 700px;
              > input {
                height: 30px;
                &::placeholder {
                  color: #cbcbcb;
                }
              }
            }
          }
        }
      }
    }
  }
  > .img-info {
    margin-top: 40px;
    > .img-box {
      margin-top: 32px;
      > div {
        display: inline-block;
        &.pic {
          width: 300px;
          height: 225px;
          background: url(../../assets/images/license-bg-pic.png) no-repeat center/100% 100%;
          text-align: center;
          padding-top: 175px;
          user-select: none;
          position: relative;
          color: #aaa;
          > .remark {
            width: 300px;
            height: 60px;
            position: absolute;
            left: 0;
            bottom: 0;
            font-size: 14px;
            background-color: rgba($color: #428dfa, $alpha: 0.5);
            color: #fff;
            > p.remoark-text1 {
              margin: 12px 0;
            }
          }
        }
        &.text {
          line-height: 20px;
          padding-left: 15px;
          padding-bottom: 5px;
          vertical-align: bottom;
        }
      }
    }
  }
  > footer {
    margin-top: 50px;
    margin-bottom: 45px;
    padding-left: 325px;
    > button {
      width: 120px;
    }
  }
}
</style>
