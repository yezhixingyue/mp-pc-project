<!--
 * @Describe: 工艺列表组件 CraftListComp
 * @FilePath: /src/components/QuotationComps/ProductQuotationContentComps/Sections/CraftListComp.vue
 *
 * @desc2： 每个工艺设置后会有编辑图标可再次编辑、工艺类型较多：布尔类型、输入类型(可能有多处)、下拉选择类型(可能有多个)
 *
-->

<template>
  <section class="mp-duotation-content-comps-craft-list-wrap">
    <SectionCompHeader :title="title" />
    <ul class="content">
      <li v-for="it of list" :key="it.CraftID">
        <show-product-btn
          @click.native="handleBtnClick(it)"
          :title="getCraftNickName(it)"
          :disabled="it.disabled"
          :isActive="selectedCraftIDList.includes(it.CraftID)"
        />
        <template
          v-if="
            selectedCraftIDList.includes(it.CraftID) &&
              it.PropertyList.length > 0
          "
        >
          <i></i>
          <div @click="handleEditClick(it)">
            <!-- <img src="../../../../assets/images/editcraft.png" alt="编辑" /> -->
          </div>
        </template>
      </li>
    </ul>
    <el-dialog
      :visible.sync="showDia"
      :title="dialogTitle"
      custom-class="set-craft-dia"
      width="650px"
      :before-close="onDialogBeforeClose"
    >
      <attributes-comp
        v-for="(CraftData, i) in curCraftDataList"
        :key="`curCraftData-${i}`"
        :class="
          curCraftData && curCraftData.MultyApply ? 'van-hairline--bottom' : ''
        "
        :watch2Dia="watch2Dia"
        :value="CraftData"
        @change="([data, index, type]) => handleChange(i, [data, type], index)"
        :showDel="curCraftData && curCraftData.MultyApply"
        @handleDel="() => handleDel(i, curCraftDataList.length)"
      />
      <footer v-if="curCraftData && curCraftData.MultyApply">
        <span @click="addCraft()">
          +添加
        </span>
        <el-button type="primary" @click="showDia = false">确 定</el-button>
        <el-button @click="showDia = false">取 消</el-button>
      </footer>
    </el-dialog>
  </section>
</template>

<script>
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import SectionCompHeader from '@/components/QuotationComps/SMComps/SectionCompHeader.vue';
import ShowProductBtn from '@/components/QuotationComps/SMComps/ShowProductBtn.vue';
// import CountClassComp from "@/components/QuotationComps/ProductQuotationContentComps/Sections/CountClassComp.vue";
import AttributesComp from '@/components/QuotationComps/ProductQuotationContentComps/NewPcComps/AttributesComp.vue';
// import { Toast, Dialog } from 'vant';
import { mapState, mapGetters } from 'vuex';

export default {
  components: {
    SectionCompHeader,
    ShowProductBtn,
    // [Dialog.Component.name]: Dialog.Component,
    AttributesComp,
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      default: '必选工艺',
    },
    selectedArr: {
      type: Array,
      default: () => [],
    },
    // 部件数据
    partData: {},
  },
  computed: {
    ...mapState('global', ['CraftRelationList']),
    ...mapGetters('Quotation', ['curCraftRelationList']),
    ...mapState('Quotation', ['obj2GetProductPrice', 'watchTarget2DelCraft']),
    list() {
      if (!this.data.CraftList) return [];
      return this.data.CraftList;
    },
    selectedCraftIDList() {
      return this.selectedArr.map(it => it.CraftID);
    },
    curCraftDataList: {
      get() {
        return this.curCraftData ? this.curCraftData.PropertyList : [];
      },
    },
    curCraftRelationListValue() {
      return this.curCraftRelationList;
    },
    _selectIds() {
      return this.selectedArr.map(_it => _it.CraftID);
    },
    watchValue4CraftCondition() {
      if (this.data.ChoiceType === 2) return null;
      const _t = this.data.CraftList.filter(
        it => it.CraftCondition && it.PropertyList.length === 0,
      );
      if (_t.length === 0) return null;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.craftList2CraftCondition = _t;
      if (
        _t[0].CraftCondition[0].type
        && _t[0].CraftCondition[0].type === 'isMain'
      ) {
        return [
          {
            ProductAmount: this.obj2GetProductPrice.ProductParams.ProductAmount,
          },
        ];
      }
      const _obj = {};
      _t.forEach(_it => { // 获取到每一个工艺信息
        _obj[_it.CraftID] = [];

        _it.CraftCondition.forEach(singleCraftCondition => { // 获取到每一个工艺上的每一个限制条件信息 （对其进行循环）
          singleCraftCondition.Constraint.ItemList.forEach(_item => { // 每个限制条件信息中每一条条件  获取其属性的值，对其进行watch
            if (_item.PropertyType === 2) { // 部件数量
              if (_obj[_it.CraftID].some(it => it.PropertyType === 2)) return;
              const _o = {};
              _o.PropertyID = _item.PropertyID;
              _o.PropertyType = 2;
              _o.Value = this.partData.PartAmount.First;
              _obj[_it.CraftID].push(_o);
              return;
            }
            if (_item.PropertyType === 33) { // 物料
              if (_obj[_it.CraftID].some(it => it.PropertyType === 33)) return;
              const _o = {};
              _o.PropertyID = _item.PropertyID;
              _o.PropertyType = 33;
              _o.Value = this.partData.Material.First;
              _obj[_it.CraftID].push(_o);
              return;
            }
            if (_item.PropertyType === 66) { // 属性组
              if (_obj[_it.CraftID].some(it => it.GroupID === _item.GroupID)) return;
              const _target = this.partData.PropertyGroupList.find(Group => Group.GroupID === _item.GroupID);
              if (!_target) return;
              const _o = {};
              _o.GroupID = _item.GroupID;
              _o.PropertyType = 66;
              _o.Value = _target.PropertyList.length;
              _obj[_it.CraftID].push(_o);
              return;
            }
            if (_item.PropertyType === 63) { // 属性类
              if (_obj[_it.CraftID].some(it => it.PropertyID === _item.PropertyID)) return;
              let _target = this.partData.SizePropertyList.find(
                _size => _size.PropertyID === _item.PropertyID,
              ); // 判断尺寸组属性
              if (_target) {
                const _o = {};
                _o.PropertyID = _item.PropertyID;
                _o.Value = _target.CustomerInputValue;
                _o.PropertyType = 63;
                _obj[_it.CraftID].push(_o);
                return;
              }
              // eslint-disable-next-line no-shadow
              _target = this.partData.PropertyList.find(_it => _it.PropertyID === _item.PropertyID); // 判断属性
              if (_target) {
                const _o = {};
                _o.PropertyID = _item.PropertyID;
                _o.Value = _target.CustomerInputValue;
                _o.PropertyType = 63;
                _obj[_it.CraftID].push(_o);
              }
            }
          });
        });
      });
      return _obj;
    },
  },
  data() {
    return {
      showDia: false,
      curCraftData: null,
      dialogTitle: '',
      addTemplateDate: null,
      craftList2CraftCondition: [],
      oldWatchValue4CraftCondition: null,
      showAnimation: true,
      watch2Dia: false,
      // data.MultyApply 是否可以添加多个
    };
  },
  methods: {
    handleBtnClick(data) {
      const _arr = this.selectedArr.map(it => it.CraftID);
      if (_arr.includes(data.CraftID)) {
        this.$emit('setCraftList', ['del', data, this.handleCallBack]);
      } else {
        let _data = JSON.parse(JSON.stringify(data));
        const _PropertyList = _data.PropertyList.map(it => {
          if (it.ValueType === 2 && it.OptionList.length > 0) {
            return {
              ...it,
              CustomerInputValue: it.OptionList[0].OptionID,
            };
          }
          return it;
        });
        _data = { ..._data, PropertyList: [[..._PropertyList]] };
        if (data.PropertyList.length > 0) {
          this.curCraftData = _data;
          if (_data.historyData) {
            this.curCraftData.PropertyList = _data.historyData;
          }
          this.addTemplateDate = JSON.parse(
            JSON.stringify(this.curCraftData.PropertyList[0]),
          );
          this.dialogTitle = `${data.CraftNickName}参数设置`;
          this.showDia = true;
          this.watch2Dia = false;
        } else if (data.PropertyList.length === 0) {
          // 变蓝操作
          this.$emit('setCraftList', ['add', _data, this.handleCallBack]);
        }
      }
    },
    handleEditClick(item) {
      const _target = this.selectedArr.find(it => it.CraftID === item.CraftID);
      const _data = JSON.parse(JSON.stringify(_target));
      this.curCraftData = JSON.parse(JSON.stringify(_data));
      this.dialogTitle = `${item.CraftNickName}参数设置`;
      this.showDia = true;
      this.watch2Dia = false;
      this.addTemplateDate = JSON.parse(
        JSON.stringify(this.curCraftData.PropertyList[0]),
      );
      this.addTemplateDate.forEach(it => {
        it.CustomerInputValue = null;
        it.CustomizedOptionValue = null;
      });
      setTimeout(() => {
        // 由于复选框切换会导致选项值清空，从而使输入类型的工艺属性值不能回填，特在选项值清空后异步重新进行赋值
        this.curCraftData.PropertyList.forEach((it, i1) => it.forEach((it2, i2) => {
          if (
            it2.CustomerInputValue
              !== _data.PropertyList[i1][i2].CustomerInputValue
          ) {
            it2.CustomerInputValue = _data.PropertyList[i1][i2].CustomerInputValue;
          }
          if (
            it2.CustomizedOptionValue
              !== _data.PropertyList[i1][i2].CustomizedOptionValue
          ) {
            it2.CustomizedOptionValue = _data.PropertyList[i1][i2].CustomizedOptionValue;
          }
        }));
      }, 10);
    },
    async onDialogBeforeClose(action, done) {
      console.log(action, done);
      if (action !== 'confirm') {
        action();
        // done();
        return;
      }
      // 判断值 如果通过则emit 如果不通过则done(false);
      let key = true;
      this.curCraftData.PropertyList.forEach((item) => {
        item.forEach(it => {
          if (!it.CustomerInputValue && it.CustomerInputValue !== 0) {
            // Toast(`${it.PropertyName}参数未设置!`);
            key = false;
          } else if (it.ValueType === 1) {
            const MaxValue = !it.MaxValue && it.MaxValue !== 0
              ? Infinity
              : +it.MaxValue === -1
                ? Infinity
                : it.MaxValue;
            const MinValue = !it.MinValue && it.MinValue !== 0
              ? -Infinity
              : +it.MinValue === -1
                ? -Infinity
                : it.MinValue;

            if (
              it.CustomerInputValue < MinValue
              || it.CustomerInputValue > MaxValue
            ) {
              // Toast(
              //   `${it.PropertyName}参数值应该在${
              //     MinValue === -Infinity ? '负无穷' : MinValue
              //   }与${MaxValue === Infinity ? '正无穷' : MaxValue}之间!`,
              // );
              key = false;
            }
          }
        });
      });
      // if (!key) return done(false);
      if (!key) return;
      this.watch2Dia = true;
      await this.utils.delay(10);
      this.curCraftData.historyData = JSON.parse(JSON.stringify(this.curCraftData.PropertyList));
      this.$emit('setCraftList', [
        'maybeEdit',
        this.curCraftData,
        this.handleCallBack,
      ]);
      this.addTemplateDate = null;
      this.curCraftData = null;
      done();
    },
    handleChange(i, [data, type], index) {
      if (!type) {
        this.curCraftData.PropertyList[i][index].CustomerInputValue = data;
      } else {
        this.curCraftData.PropertyList[i][index].CustomizedOptionValue = data;
      }
    },
    addCraft() {
      const _temp = JSON.parse(JSON.stringify(this.addTemplateDate));
      this.curCraftData.PropertyList.push(_temp);
      const oWrap = document.querySelector(
        '.mp-duotation-content-comps-craft-list-wrap .van-dialog__content',
      );
      this.$utils.animateScroll(oWrap.scrollTop, oWrap.scrollHeight, num => {
        oWrap.scrollTop = num;
      });
    },
    handleDel(i, len) {
      if (len > 1) {
        try {
          this.curCraftData.PropertyList.splice(i, 1);
          // Toast('删除成功!');
        } catch (error) {
          // Toast(error);
        }
      } else {
        // Toast('必须保留一组工艺参数');
      }
    },
    getCraftNickName(it) {
      if (it.PropertyList.length === 0) return it.CraftNickName;
      const _it = this.selectedArr.find(item => item.CraftID === it.CraftID);
      if (!_it) return it.CraftNickName;
      if (_it.PropertyList.length > 1) return `${_it.CraftNickName} ${_it.PropertyList.length}处`;
      let str = '';
      _it.PropertyList[0].forEach(item => {
        let _str;
        if (item.ValueType === 1) {
          const _unit = item.UserDefinedUnit
            ? item.UserDefinedUnit
            : this.$utils.getUnit(item.Unit);
          _str = item.CustomerInputValue + _unit;
        } else if (item.ValueType === 2) {
          if (item.CustomizedOptionValue) _str = item.CustomizedOptionValue;
          else {
            const _t = item.OptionList.find(
              option => option.OptionID === item.CustomerInputValue,
            );
            _str = _t.Value;
          }
        }
        str += ` ${_str}`;
      });
      return `${_it.CraftNickName} ${str}`;
    },
    handleCallBack({ list, type }) {
      const _arr = this.selectedArr.map(it => it.CraftID);
      if (type === 'add') {
        list.forEach(it => {
          if (_arr.includes(it.CraftID)) return;
          const _item = this.list.find(_it => _it.CraftID === it.CraftID);
          if (_item && _item.PropertyList.length === 0) {
            this.$emit('setCraftList', ['add', _item, this.handleCallBack]);
          } else if (_item && _item.PropertyList.length > 0) {
            // Toast(`${_item.CraftNickName}是关联工艺，请一起配置选择`);
          }
        });
      } else if (type === 'del') {
        list.forEach(it => {
          if (!_arr.includes(it.CraftID)) return;
          this.$emit('setCraftList', ['del', it, this.handleCallBack]);
        });
      }
    },
    // 下面两个函数 用于 初始化必选工艺勾选时 这些工艺间的关系逻辑判断 筛除有互斥关系的工艺 保留其中一种
    clearCraft(_ruleList, _selectedArr) {
      let _Arr = JSON.parse(JSON.stringify(_selectedArr));
      for (let i = 0; i < _selectedArr.length; i += 1) {
        const _Craft2Req = _selectedArr[i];
        for (let i2 = 0; i2 < _ruleList.length; i2 += 1) {
          const rules = _ruleList[i2];
          const _ids = rules.CraftList.map(_c => _c.CraftID);
          if (_ids.includes(_Craft2Req.CraftID)) {
            for (let _i3 = 0; _i3 < rules.CraftList.length; _i3 += 1) {
              const _ruleCraft = rules.CraftList[_i3];
              const _selectIds = _Arr.map(_it => _it.CraftID);
              if (
                _ruleCraft.CraftID !== _Craft2Req.CraftID
                && _selectIds.includes(_ruleCraft.CraftID)
                && _selectIds.includes(_Craft2Req.CraftID)
              ) {
                this.$emit('setCraftList', [
                  'del',
                  _ruleCraft,
                  this.handleCallBack,
                ]);
                _Arr = _Arr.filter(it => it.CraftID !== _ruleCraft.CraftID);
              }
            }
          }
        }
      }
    },
    clearCraftList(_ruleList, selectedArr) {
      const _selectedArr = JSON.parse(JSON.stringify(selectedArr));
      this.clearCraft(_ruleList, _selectedArr);
    },
    judgeIsOrNoMeetConditions(Operator, Value, ProductAmount) {
      if (!ProductAmount && ProductAmount !== 0) return false;
      // 判断值是否符合条件
      let key = false;
      switch (Operator) {
        case 1:
          // 等于
          if (+ProductAmount === +Value) key = true;
          break;
        case 2:
          // 不等于
          if (+ProductAmount !== +Value) key = true;
          break;
        case 3:
          // 大于
          if (+ProductAmount > +Value) key = true;
          break;
        case 4:
          // 大于等于
          if (+ProductAmount >= +Value) key = true;
          break;
        case 5:
          // 小于
          if (+ProductAmount < +Value) key = true;
          break;
        case 6:
          // 小于等于
          if (+ProductAmount <= +Value) key = true;
          break;

        default:
          key = false;
          break;
      }
      // console.log(Operator, Value, ProductAmount, key);
      return key;
    },
    handleMeetConditionsResult(key, craft, FilterType, type = 'isMain') {
      const _arr = this.selectedArr.map(it => it.CraftID);
      if (!key) {
        if (FilterType === 1) {
          if (type === 'isMain') {
            this.$store.commit('Quotation/setCraftItemDisabled', [craft.CraftID, type, false]);
          } else {
            this.$emit('setCraftstate', [craft.CraftID, false]);
          }
        } else if (FilterType === 2) {
          if (!_arr.includes(craft.CraftID)) return;
          const item = this.selectedArr.find(_it => _it.CraftID === craft.CraftID);
          if (!item.isSystemSelect) return;
          // 在这里 如果前面提取条件时取的是交集的话 会有影响 需判断是否有另外一个条件已满足 此时不删除 这里和后端保持一致 只取第一个满足条件项 -- 作废 此处需处理
          console.log(craft);
          const _list = craft.CraftCondition.filter(it => it.UseStatus === 2); // 必选列表
          if (_list.length === 1) {
            this.$emit('setCraftList', ['del', craft, this.handleCallBack]);
          } else {
            // _list.some(it => {
            //   it.
            // })
          }
        }
        return;
      }
      if (FilterType === 1) {
        // 禁选
        if (!_arr.includes(craft.CraftID)) return;
        if (type === 'isMain') {
          this.$store.commit('Quotation/setCraftItemDisabled', [craft.CraftID, type, true]);
        } else {
          this.$emit('setCraftstate', [craft.CraftID, true]);
        }
      } else if (FilterType === 2) {
        // 必选
        if (_arr.includes(craft.CraftID)) return;
        this.$emit('setCraftList', ['add', craft, this.handleCallBack, true]);
      }
    },
  },
  watch: {
    curCraftRelationListValue: {
      // 监听该值变化 然后对默认勾选的工艺排除出有互斥关系的工艺
      handler(newVal) {
        this.$nextTick(() => {
          if (newVal.length === 0) return;
          if (!this.selectedArr || this.selectedArr.length === 0) return;
          if (this.curCraftRelationList.length === 0) return;
          const _ruleList = this.curCraftRelationList.filter(
            curCraftRelation => curCraftRelation.RelationType === 1,
          );
          if (_ruleList.length === 0) return;
          if (this.title === '可选工艺') return;
          this.clearCraftList(_ruleList, this.selectedArr);
        });
      },
      immediate: true,
    },
    watchValue4CraftCondition: {
      handler(newVal) {
        this.$nextTick(() => {
          if (!newVal && newVal !== 0) return;
          if (this.craftList2CraftCondition.length === 0 || (Object.prototype.toString.call(newVal) === '[object Array]' && newVal.length === 0)) return;
          if (newVal[0] && newVal[0].ProductAmount) {
            const { ProductAmount } = newVal[0];
            console.log(newVal[0].ProductAmount, 'newVal[0].ProductAmount');
            this.craftList2CraftCondition.forEach(craft => {
              craft.CraftCondition.forEach(item => {
                const { UseStatus, Constraint } = item;
                const { FilterType, ItemList } = Constraint;
                if (FilterType === 2) {
                  // 满足任一
                  let key = false;

                  for (let index = 0; index < ItemList.length; index += 1) {
                    const element = ItemList[index];
                    const { Operator, Value } = element;
                    // 判断是否满足条件
                    if (
                      this.judgeIsOrNoMeetConditions(
                        Operator,
                        Value,
                        ProductAmount,
                      )
                    ) {
                      key = true;
                      break;
                    }
                  }
                  // 处理是否满足条件后的结果
                  this.handleMeetConditionsResult(key, craft, UseStatus);
                } else if (FilterType === 1) {
                  // 满足所有
                  let key = true;
                  for (let index = 0; index < ItemList.length; index += 1) {
                    const element = ItemList[index];
                    const { Operator, Value } = element;
                    // 判断是否满足条件
                    if (
                      !this.judgeIsOrNoMeetConditions(
                        Operator,
                        Value,
                        ProductAmount,
                      )
                    ) {
                      key = false;
                      break;
                    }
                  }
                  // 处理是否满足条件后的结果
                  this.handleMeetConditionsResult(key, craft, UseStatus);
                }
              });
            });
          }
          let _filterList = []; // 筛选 清除未变动部分工艺
          if (!this.oldWatchValue4CraftCondition) {
            _filterList = Object.keys(newVal);
          } else {
            _filterList = Object.keys(newVal).filter(filterKey => JSON.stringify(newVal[filterKey]) !== JSON.stringify(this.oldWatchValue4CraftCondition[filterKey]));
          }
          _filterList.forEach(key => {
            if (newVal[key].length === 0) return; // { PropertyID: value }
            const _targetCraft = this.data.CraftList.find(_it => _it.CraftID === key); // 找到受影响的工艺
            if (!_targetCraft || !_targetCraft.CraftCondition || _targetCraft.CraftCondition.length === 0) return; // 如果该工艺没有设置条件则不予处理
            let _valueFilterList = []; // 筛选 清除未变动部分属性
            if (!this.oldWatchValue4CraftCondition) {
              _valueFilterList = newVal[key];
            } else {
              _valueFilterList = newVal[key].filter((filterItem, i) => JSON.stringify(filterItem) !== JSON.stringify(this.oldWatchValue4CraftCondition[key][i]));
            }
            _valueFilterList.forEach(_newValItem => {
              _targetCraft.CraftCondition.forEach(item => {
                const { UseStatus, Constraint } = item;
                const { FilterType, ItemList } = Constraint;
                if (FilterType === 2) {
                  // 满足任一
                  // eslint-disable-next-line no-shadow
                  let key = false;
                  for (let index = 0; index < ItemList.length; index += 1) {
                    const element = ItemList[index];
                    const { Operator, Value } = element;
                    if (_newValItem.PropertyType === 33 && element.PropertyType !== 33) return;
                    if (_newValItem.PropertyType === 2 && element.PropertyType !== 2) return;
                    if (_newValItem.PropertyType === 63 && element.PropertyType !== 63) return;
                    if (_newValItem.PropertyType === 63 && element.PropertyType === 63 && element.PropertyID !== _newValItem.PropertyID) return;
                    if (_newValItem.PropertyType === 66 && element.PropertyType !== 66) return;
                    if (_newValItem.PropertyType === 66 && element.PropertyType === 66 && element.GroupID !== _newValItem.GroupID) return;
                    // 判断是否满足条件
                    if (
                      this.judgeIsOrNoMeetConditions(
                        Operator,
                        Value,
                        _newValItem.Value,
                      )
                    ) {
                      key = true;
                      break;
                    }
                  }
                  // 处理是否满足条件后的结果
                  this.handleMeetConditionsResult(key, _targetCraft, UseStatus, 'part');
                } else if (FilterType === 1) {
                  // 满足所有
                  // eslint-disable-next-line no-shadow
                  let key = true;
                  for (let index = 0; index < ItemList.length; index += 1) {
                    const element = ItemList[index];
                    const { Operator, Value } = element;
                    // 判断是否满足条件
                    if (_newValItem.PropertyType === 33 && element.PropertyType !== 33) return;
                    if (_newValItem.PropertyType === 2 && element.PropertyType !== 2) return;
                    if (_newValItem.PropertyType === 63 && element.PropertyType !== 63) return;
                    if (_newValItem.PropertyType === 63 && element.PropertyType === 63 && element.PropertyID !== _newValItem.PropertyID) return;
                    if (_newValItem.PropertyType === 66 && element.PropertyType !== 66) return;
                    if (_newValItem.PropertyType === 66 && element.PropertyType === 66 && element.GroupID !== _newValItem.GroupID) return;
                    if (
                      !this.judgeIsOrNoMeetConditions(
                        Operator,
                        Value,
                        _newValItem.Value,
                      )
                    ) {
                      key = false;
                      break;
                    }
                  }
                  // 处理是否满足条件后的结果
                  this.handleMeetConditionsResult(key, _targetCraft, UseStatus, 'part');
                }
              });
            });
          });

          this.oldWatchValue4CraftCondition = newVal;
        });
      },
      deep: true,
      immediate: true,
    },
    watchTarget2DelCraft: {
      // 监听该值变化 然后对默认勾选的工艺排除出有互斥关系的工艺
      handler(newVal) {
        this.$nextTick(() => {
          if (newVal === 0) return;
          const _arr = this.selectedArr.map(it => it.CraftID);
          this.list.forEach(craft => {
            if (craft.disabled && _arr.includes(craft.CraftID)) {
              this.$emit('setCraftList', ['del', craft, this.handleCallBack]);
            }
          });
        });
      },
    },
  },
};
</script>

<style lang="scss">
// @import "@/assets/css/Common/var.scss";
.mp-duotation-content-comps-craft-list-wrap {
  margin-top: 14px;
  overflow: hidden;
  // font-size: 13px !important;
  > header {
    height: 22px;
    line-height: 22px;
  }
  > .content {
    display: flex;
    flex-wrap: wrap;
    margin-top: -20px;
    margin-right: -28px;
    padding: 2px 0;
    > li {
      margin-right: 28px;
      margin-top: 20px;
      display: flex;
      align-items: center;
      max-width: calc(100% - 30px);
      > .mp-show-product-btn-wrap {
        min-width: 0;
        padding: 0 10px;
        font-size: 13px;
      }
      > i {
        height: 23px;
        width: 1px;
        // background-color: $--border-color;
        display: inline-block;
        margin: 0 8px;
      }
      > div {
        width: 25px;
        height: 25px;
        // background-color: $--border-color;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: none;
        > img {
          height: 13px;
          width: 13px;
        }
      }
    }
  }
  > .set-craft-dia {
    min-width: 0;
    max-width: 100%;
    max-height: 500px;
    // min-height: 280px;
    border-radius: 2px;
    overflow: unset;
    transition: 300ms cubic-bezier(0.23, 0.8, 0.48, 0.8) !important;

    > .van-dialog__header {
      box-sizing: border-box;
      padding: 0 12.5px;
      height: 40px;
      line-height: 40px;
      text-align: left;
      font-size: 15px;
      // color: $--color-dark;
      display: flex;
      align-items: center;
      position: relative;
      &::before {
        content: "";
        display: inline-block;
        width: 3px;
        height: 20px;
        // background-color: $--color-blue;
        margin-right: 10px;
      }
      &::after {
        position: absolute;
        box-sizing: border-box;
        content: " ";
        pointer-events: none;
        top: -50%;
        right: -50%;
        bottom: -50%;
        left: -50%;
        border: 0px solid #ebedf0;
        border-bottom-width: 1px;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
      }
    }
    > .van-dialog__content {
      padding: 12.5px;
      box-sizing: border-box;
      max-height: 45vh;
      min-height: 150px;
      overflow-y: auto;
      section > header {
        height: 28px;
        line-height: 28px;
        font-size: 13px;
      }
      .flex-wrap {
        display: flex;
        justify-content: space-between;
        > section {
          width: 44vw;
        }
      }
      .to-del {
        height: 25px;
        text-align: right;
        padding: 7.5px 0;
        > span {
          height: 25px;
          width: 25px;
          display: inline-block;
          // background-color: $--border-color;
          border-radius: 50%;
          position: relative;
          > img {
            height: 15px;
            width: 15px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
      > footer {
        height: 35px;
        text-align: center;
        // color: $--color-blue;
        line-height: 35px;
        font-size: 15px;
      }
      > .van-hairline--bottom {
        &::after {
          border-style: dashed;
        }
      }
    }
    > .van-dialog__footer {
      padding-bottom: 25px;
      justify-content: center;
      margin-top: 30px;
      &::after {
        display: none;
      }
      > .van-button {
        height: 32.5px;
        width: 100px;
        flex: none;
        margin: 0 16.25px;
        line-height: 32.5px;
        border-radius: 16.25px;
        // border: 1px solid $--color-blue;
        font-size: 15px;
        &.van-dialog__cancel {
          // color: $--color-blue;
        }
        &.van-dialog__confirm {
          color: #fff;
          // background-color: $--color-blue;
          &::after {
            display: none;
          }
        }
      }
    }
  }
}
</style>
