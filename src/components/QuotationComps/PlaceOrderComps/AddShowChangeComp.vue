<template>
  <section class="mp-pc-place-order-address-show-and-change-wrap">
    <header class="bg-gray"></header>
    <div class="comp-title float">
      <span class="left is-bold">收货信息</span>
      <span class="right span-title-blue" @click="handleChangeAdd">更改收货地址</span>
    </div>
    <div class="content">
      <ul>
        <li>
          <div class="platform-code-box">
            <span class="title">平台单号：</span>
            <el-input v-model.trim="outPlaceCode" placeholder="平台单号"></el-input>
          </div>
          <div  class="express-box">
            <span class="title">配送：</span>
            <el-radio-group v-model="Express.First" @change='onRadioChange'>
              <el-radio :label="1">名片之家</el-radio>
              <el-radio :label="3">
                <el-select v-model="secondExValFor3" @visible-change='onVisibleChangeFor3'>
                  <el-option
                    v-for="item in secondExpressList"
                    :key="item.ID"
                    :label="item.Name"
                    :value="item.ID">
                  </el-option>
                </el-select>
              </el-radio>
              <el-radio :label="2">
                <el-select v-model="thirdExValFor2" @visible-change='onVisibleChangeFor2'>
                  <el-option
                    v-for="item in thirdExpressList"
                    :key="item.ID"
                    :label="item.Name"
                    :value="item.ID">
                  </el-option>
                </el-select>
              </el-radio>
            </el-radio-group>
          </div>
        </li>
        <li class="consignee-wrap" v-if="defaultAddInfo">
          <div class="consignee-box">
            <span class="title">收货人：</span>
            <span class="consignee">{{defaultAddInfo.Consignee}}</span>
            <span>{{defaultAddInfo.Mobile}}</span>
          </div>
          <div class="address">
            <span class="title">收货地址：</span>
            <span>{{defaultAddInfo.address}}</span>
          </div>
        </li>
      </ul>
    </div>
     <el-dialog :visible.sync="outerVisible" top='7vh' width="1000px" custom-class="set-craft-dia">
       <header slot="title">
        <i class="iconfont icon-shezhi is-primary-blue"></i>
        <span>更改配送地址</span>
      </header>

      <ul class="change-add-dia-content">
        <li>
          <section>
            <header>
              <div>
                <span class="title">收货人：</span>
                <el-input v-model="newAdd.Consignee" placeholder="收货人姓名"></el-input>
              </div>
              <div>
                <span class="title">手机号：</span>
                <el-input v-model="newAdd.Mobile" placeholder="手机号"></el-input>
              </div>
            </header>
            <div class="content">
              <div class="add-1">
                <span class="title">收货地址：</span>
                <el-select v-model="newAdd.ExpressArea.RegionalID" @change='handleRegionalChange'>
                  <el-option
                    v-for="item in RegionalList"
                    :key="item.ID"
                    :label="item.Name"
                    :value="item.ID">
                  </el-option>
                </el-select>
                <el-select v-model="newAdd.ExpressArea.CityID"
                 :disabled="CityList.length === 0" @change='handleCityChange'>
                  <el-option
                    v-for="item in CityList"
                    :key="item.ID"
                    :label="item.Name"
                    :value="item.ID">
                  </el-option>
                </el-select>
                <el-select v-model="newAdd.ExpressArea.CountyID" :disabled="CountyList.length === 0">
                  <el-option
                    v-for="item in CountyList"
                    :key="item.ID"
                    :label="item.Name"
                    :value="item.ID">
                  </el-option>
                </el-select>
              </div>
              <div class="add-2">
                <el-input v-model="newAdd.AddressDetail" placeholder="详细地址 (不包含省市区)"></el-input>
                <el-button type="primary" :disabled='!newAdd.AddressDetail || !newAdd.ExpressArea.CountyID'
                 >地图定位</el-button>
              </div>
            </div>
          </section>
        </li>
      </ul>

      <el-dialog
        width="1000px"
        custom-class="set-craft-dia"
        :visible.sync="innerVisible"
        append-to-body>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      PlatformCode: '',
      radio: 1,
      secondExVal: 11, // kuaidi
      thirdExVal: 31, // wuliu
      Express: {
        First: 1,
        Second: 1,
      },
      outerVisible: false, // 修改地址
      innerVisible: false, // 地图定位
      newAdd: {
        Consignee: '',
        Mobile: '',
        ExpressArea: {
          RegionalName: '',
          RegionalID: '',
          CityName: '',
          CityID: '',
          CountyName: '',
          CountyID: '',
        },
        AddressDetail: '',
        HavePosition: false,
        IsDefault: false,
        Latitude: '',
        Longitude: '',
        CustomerID: '',
        AddressID: '',
      },
      RegionalList: [],
      CityList: [],
      CountyList: [],
    };
  },
  computed: {
    ...mapState('common', ['ExpressList', 'customerInfo']),
    secondExpressList() {
      if (this.ExpressList.length === 0) return [];
      return this.ExpressList.find(it => it.Type === 3).List;
    },
    thirdExpressList() {
      if (this.ExpressList.length === 0) return [];
      return this.ExpressList.find(it => it.Type === 2).List;
    },
    defaultAddInfo() {
      if (!this.customerInfo) return '';
      const _t = this.customerInfo.Address.find(it => it.IsDefault);
      if (!_t) return '';

      const { ExpressArea, AddressDetail } = _t;
      const { RegionalName, CountyName, CityName } = ExpressArea;
      const address = `${RegionalName}${CityName}${CountyName}${AddressDetail}`;
      const _temp = { ..._t, address };
      return _temp;
    },
    secondExValFor3: {
      get() {
        return this.secondExVal;
      },
      set(newVal) {
        this.secondExVal = newVal;
        this.Express.Second = newVal;
        this.setInfo4ReqObj();
      },
    },
    thirdExValFor2: {
      get() {
        return this.thirdExVal;
      },
      set(newVal) {
        this.thirdExVal = newVal;
        this.Express.Second = newVal;
        this.setInfo4ReqObj();
      },
    },
    outPlaceCode: {
      get() {
        return this.PlatformCode;
      },
      set(newVal) {
        this.PlatformCode = newVal;
        this.setInfo4ReqObj();
      },
    },

  },
  methods: {
    onVisibleChangeFor2(bool) {
      if (!bool) return;
      if (this.Express.First === 2 && this.Express.Second === this.thirdExVal) return;
      this.Express.First = 2;
      this.Express.Second = this.thirdExVal;
      this.setInfo4ReqObj();
    },
    onVisibleChangeFor3(bool) {
      if (!bool) return;
      if (this.Express.First === 3 && this.Express.Second === this.secondExVal) return;
      this.Express.First = 3;
      this.Express.Second = this.secondExVal;
      this.setInfo4ReqObj();
    },
    onRadioChange(num) {
      switch (num) {
        case 1: // mpzj
          this.Express.Second = 1;
          break;
        case 2: // wuliu
          this.Express.Second = this.secondExVal;
          break;
        case 3: // kuaidi
          this.Express.Second = this.thirdExVal;
          break;
        default:
          break;
      }
      this.setInfo4ReqObj();
    },
    setInfo4ReqObj() {
      const _temp = {};
      _temp.Address = {};
      _temp.Address.Express = this.Express;
      const { AddressID } = this.defaultAddInfo;
      _temp.Address.AddressID = AddressID;
      _temp.Address.Address = this.defaultAddInfo;
      const OutPlate = { First: 1, Second: this.PlatformCode };
      _temp.OutPlate = OutPlate;
      this.$store.commit('Quotation/setAddressInfo4PlaceOrder', JSON.parse(JSON.stringify(_temp)));
    },
    async handleChangeAdd() {
      this.outerVisible = true;
      if (this.RegionalList.length > 0) return;
      const res = await this.api.getAddressIDList(-1);
      if (res.data.Status === 1000) {
        this.RegionalList = res.data.Data;
      }
      // this.$store.dispatch('common/getAddressIDList', -1);
    },
    async handleRegionalChange(e) {
      this.newAdd.ExpressArea.CityID = '';
      this.newAdd.ExpressArea.CityName = '';
      this.newAdd.ExpressArea.CountyID = '';
      this.newAdd.ExpressArea.CountyName = '';
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
      this.newAdd.ExpressArea.CountyID = '';
      this.newAdd.ExpressArea.CountyName = '';
      this.CountyList = [];

      if (this.CountyList.length === 0 || this.CountyList[0].ParentID !== e) {
        const res = await this.api.getAddressIDList(e);
        if (res.data.Status === 1000) {
          this.CountyList = res.data.Data;
        }
      }
    },
  },
  watch: {
    defaultAddInfo() {
      this.setInfo4ReqObj();
    },
  },
  mounted() {
    this.$store.dispatch('common/getExpressList');
    this.$store.dispatch('common/getCustomerDetail');
  },
};
</script>

<style lang='scss'>
.mp-pc-place-order-address-show-and-change-wrap {
  > .content {
    > ul {
      margin-top: 23px;
      margin-bottom: 28px;
      > li {
        > div {
          display: inline-block;
          &.platform-code-box {
            > .el-input {
              width: 240px;
              > input {
                height: 30px;
                line-height: 28px;
              }
            }
            margin-right: 52px;
          }
          &.express-box {
            .el-input {
              width: 110px;
              .el-input__inner {
                height: 30px;
              }
            }
            .el-radio__label {
              color: #585858;
            }
          }
        }
        &.consignee-wrap {
          margin-top: 22px;
          > .consignee-box {
            width: 317px;
            margin-right: 52px;
            > .consignee {
              margin-right: 30px;
            }
          }
        }
      }
    }
  }
  .title {
    color: #888;
    min-width: 5em;
    text-align: right;
    display: inline-block;
    margin-right: 7px;
  }
  .set-craft-dia {
    height: 800px;
    box-sizing: border-box;
    .el-dialog__body {
      padding-left: 22px;
      padding-right: 22px;
      > .change-add-dia-content {
        > li {
          > section {
            > header {
              > div {
                margin-right: 16px;
                display: inline-block;
                > .el-input {
                  width: 120px;
                  > input {
                    height: 30px;
                    &::placeholder {
                      color: #cbcbcb;
                    }
                  }
                }
              }
              margin-bottom: 25px;
            }
            > .content {
              > .add-1 {
                > .el-select {
                  > .el-input {
                    width: 100px;
                    > input {
                      height: 30px;
                      &::placeholder {
                        color: #cbcbcb;
                      }
                    }
                  }
                  margin-right: 16px;
                }
                margin-bottom: 10px;
              }
              > .add-2 {
                > .el-input {
                  width: 700px;
                  margin-left: 77px;
                  margin-right: 36px;
                  > input {
                    height: 30px;
                    &::placeholder {
                      color: #cbcbcb;
                    }
                  }
                }
                > button {
                  width: 120px;
                  height: 35px;
                  padding: 0;
                  vertical-align: bottom;
                }
              }
            }
            .title {
              color: #585858;
            }
          }
        }
      }
    }
  }
}
</style>
