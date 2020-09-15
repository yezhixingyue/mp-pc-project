/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/*
 * @Describe: 产品报价 -- 状态管理仓库
 * @FilePath: /src/store/Quotation/Quotation.js
 */

import api from '@/api/index';
import QuotationClassType from './QuotationClassType';
// eslint-disable-next-line no-unused-vars
// import utils from "@/assets/js/utils";

export default {
  namespaced: true, // 开启命名空间
  state: {
    /* 产品分类相关
    -------------------------------*/
    productClassify: [], // 产品两级类别原始数据
    productNames: [], // 全部产品名称原始数据
    isShowClassifyDia: false, // 报价产品类别弹窗展示状态
    /* 当前选中产品ID及名称及类别
    -------------------------------*/
    curProductID: '',
    curProductName: '',
    curProductClass: null,
    /* 当前选中产品详细信息
    -------------------------------*/
    curProductInfo2Quotation: null,
    /* 获取产品报价请求信息
    -------------------------------*/
    obj2GetProductPrice: {
      ProductParams: {},
    },
    /* 获取产品报价结果信息
    -------------------------------*/
    ProductQuotationResult: null,
    /* 获取产品报价时的产品信息
    -------------------------------*/
    ProductQuotationDetail: null,
    /* 修改信息以通知工艺组件进行禁用状态的工艺取消
    -------------------------------*/
    watchTarget2DelCraft: 0,
  },
  getters: {
    /* 全部产品分类结构树，用于报价目录展示
    -------------------------------*/
    allProductClassify(state) {
      if (
        state.productClassify.length === 0
        || state.productNames.length === 0
      ) {
        return [];
      }
      let level1List = state.productClassify // 挑选第一级分类
        .filter(item => item.Level === 1)
        .map(item => ({ ...item, children: [] }));
      // 设置第二级分类
      level1List.forEach(level1 => {
        const _list = state.productClassify
          .filter(item => item.ParentID === level1.ID)
          .map(item => ({ ...item, children: [] }));
        level1.children = _list;
      });
      // 添加第三级产品内容
      state.productNames.forEach(item => level1List.forEach(leve1 => {
        if (item.ProductClass.First === leve1.ID) {
          leve1.children.forEach(level2 => {
            if (item.ProductClass.Second === level2.ID) {
              level2.children.push(item);
            }
          });
        }
      }));
      // 筛选去除无下属产品的分类
      level1List.forEach(
        level1 => (level1.children = level1.children.filter(
          level2 => level2.children.length > 0,
        )),
      );
      level1List = level1List.filter(_leve1 =>
        // console.log(_leve1, _leve1.children, _leve1.children.length);
        _leve1.children.length > 0);
      return level1List;
    },
    /* 当前选中产品名称信息，用于报价页头文字展示
    -------------------------------*/
    curProductShowNameInfo(state, getters) {
      if (!state.curProductClass) return [];
      const { First, Second } = state.curProductClass;
      const level1Item = getters.allProductClassify.find(
        item => item.ID === First,
      );
      const level2Item = level1Item.children.find(item => item.ID === Second);
      return [level1Item.ClassName, level2Item.ClassName, state.curProductName];
    },
    /* 当前选中产品工艺关系列表
    -------------------------------*/
    curCraftRelationList(state, getters, rootVal) {
      const _CraftRelationList = rootVal.common.CraftRelationList;
      if (_CraftRelationList.length === 0) return [];
      const _ProductClass = state.obj2GetProductPrice.ProductParams.ProductClass;
      if (!_ProductClass) return [];
      const _list = _CraftRelationList.filter(item => {
        const { First, Second } = item.ProductClass;
        return First === _ProductClass.First && Second === _ProductClass.Second;
      });
      return _list;
    },
  },
  mutations: {
    /* 设置产品分类相关
    -------------------------------*/
    setProductClassify(state, list) {
      state.productClassify = list;
    },
    setProductNames(state, list) {
      state.productNames = list;
    },
    /* 设置报价产品类别弹窗展示状态
    -------------------------------*/
    setIsShowClassifyDia(state, bool) {
      state.isShowClassifyDia = bool;
    },
    /* 设置当前选中的产品ID及名称及类别
    -------------------------------*/
    setCurProductInfo(state, payload) {
      const { ProductID, ProductClass, ProductName } = payload; // payload为当前产品所有信息
      state.curProductID = ProductID;
      state.curProductClass = ProductClass;
      state.curProductName = ProductName;
    },
    /* 当前选中产品详细信息
    -------------------------------*/
    setCurProductInfo2Quotation(state, data) {
      if (!data && data !== null) return;
      let _tempObj;
      QuotationClassType.handlePropertyRelevanceList(data);
      QuotationClassType.handleCraftConditionList(data);
      if (data !== null) _tempObj = QuotationClassType.init(data);
      state.curProductInfo2Quotation = data;
      state.obj2GetProductPrice.ProductParams = _tempObj;
    },
    /* 清除选中产品详细信息
    -------------------------------*/
    clearCurProductInfo2Quotation(state) {
      state.curProductInfo2Quotation = null;
      state.obj2GetProductPrice.ProductParams = {};
    },
    /* 初始化数据
    ------------------------------- */
    initInfo2Quotation(state) {
      state.curProductInfo2Quotation = null;
      state.obj2GetProductPrice.ProductParams = {};
      state.curProductID = '';
      state.curProductClass = null;
      state.curProductName = '';
    },
    /* 设置获取产品报价请求信息
    -------------------------------*/
    setProductParams(state, [type, value]) {
      state.obj2GetProductPrice.ProductParams[type] = value;
    },
    /* 设置产品报价信息中产品属性列表中值的信息
    -------------------------------*/
    setProductParamsPropertyList(state, [index, value, type]) {
      if (!type) {
        // 说明为选项值
        state.obj2GetProductPrice.ProductParams.PropertyList[
          index
        ].CustomerInputValue = value;
      } else {
        state.obj2GetProductPrice.ProductParams.PropertyList[
          index
        ].CustomizedOptionValue = value;
      }
    },
    /* 设置产品报价中产品工艺信息 三种修改类型: add   del   maybeEdit
    -------------------------------*/
    setProductParamsCraftList(state, [type, item, cb, isSystemSelect = false]) {
      const _curCraftRelationList = this.getters[// 当前产品需要满足的工艺条件信息，只当增加工艺的时候需要使用， 删除时也需要
        'Quotation/curCraftRelationList'
      ];
      const _curCraftRules = [];
      // 获取到当前要添加工艺所符合的工艺关系列表
      _curCraftRelationList.forEach(it => {
        if (it.MasterCraft && it.MasterCraft.CraftID === item.CraftID) {
          _curCraftRules.push(it);
          return;
        }
        it.CraftList.forEach(it2 => {
          if (it2.CraftID === item.CraftID) {
            _curCraftRules.push(it);
          }
        });
      });
      let _key = '';
      let _ids;

      switch (type) {
        case 'add':
          state.obj2GetProductPrice.ProductParams.CraftList2Req.First.push(item);
          if (
            state.obj2GetProductPrice.ProductParams.CraftList.find(
              it => it.ChoiceType === 1,
            ).CraftList.find(it => it.CraftID === item.CraftID)
          ) {
            state.obj2GetProductPrice.ProductParams.CraftList.find(
              it => it.ChoiceType === 1,
            ).CraftList.find(
              it => it.CraftID === item.CraftID,
            ).isSystemSelect = isSystemSelect;
          }
          _key = 'add';
          break;
        case 'del':
          console.log(item, item.CraftName);
          // eslint-disable-next-line no-case-declarations
          const _delTarget = state.obj2GetProductPrice.ProductParams.CraftList2Req.First.find(
            _it => _it.CraftID === item.CraftID,
          );
          if (!_delTarget) return;
          state.obj2GetProductPrice.ProductParams.CraftList2Req.First = state.obj2GetProductPrice.ProductParams.CraftList2Req.First.filter(
            it => it.CraftID !== item.CraftID,
          );
          _key = 'del';
          break;
        case 'maybeEdit': // 可能为编辑模式
          _ids = state.obj2GetProductPrice.ProductParams.CraftList2Req.First.map(
            it => it.CraftID,
          );
          if (_ids.includes(item.CraftID)) {
            state.obj2GetProductPrice.ProductParams.CraftList2Req.First = state.obj2GetProductPrice.ProductParams.CraftList2Req.First.map(
              it => {
                if (it.CraftID !== item.CraftID) return it;
                return item;
              },
            );
          } else {
            state.obj2GetProductPrice.ProductParams.CraftList2Req.First.push(
              item,
            );
            // 下面只判断可选工艺 为其添加增加方式的状态，必选工艺未使用，不做处理 || 一个工艺不可能同时是可选和必选工艺
            if (
              state.obj2GetProductPrice.ProductParams.CraftList.find(
                it => it.ChoiceType === 1,
              ).CraftList.find(it => it.CraftID === item.CraftID)
            ) {
              state.obj2GetProductPrice.ProductParams.CraftList.find(
                it => it.ChoiceType === 1,
              ).CraftList.find(
                it => it.CraftID === item.CraftID,
              ).isSystemSelect = isSystemSelect;
            }
            _key = 'add';
          }

          state.obj2GetProductPrice.ProductParams.CraftList.forEach(
            _listItem => {
              _listItem.CraftList.forEach(_item => {
                if (_item.CraftID === item.CraftID) {
                  _item.historyData = item.historyData;
                }
              });
            },
          );

          break;
        default:
          break;
      }

      const IDs = state.obj2GetProductPrice.ProductParams.CraftList2Req.First.map(
        it => it.CraftID,
      );

      if (_curCraftRules.length > 0 && _key === 'add') {
        // 执行工艺关系设置
        _curCraftRules.forEach(rule => {
          if (rule.MasterCraft) {
            if (rule.MasterCraft.CraftID === item.CraftID) {
              // 此种情况 当前工艺依赖于rule.CraftList中的所有工艺项，如果其以在列表则不管，如果不在列表且不需要再进行选择或输入则直接勾选，否则看情况是否进行提示
              rule.CraftList.forEach(it => {
                if (!IDs.includes(it.CraftID)) {
                  cb({
                    list: [it],
                    type: 'add',
                  }); // 返回回去由组件继续进行判断添加处理(如果已在列表中则不用做额外处理)
                }
              });
            } else if (rule.MasterCraft.CraftID !== item.CraftID) {
              // 此种情况，当前工艺类型和上面一样同为单向和双向依赖，根据情况进行判断，如果为单向依赖则不做处理，如果为双向依赖则返回进行继续添加任务
              if (
                rule.RelationType === 3
                && !IDs.includes(rule.MasterCraft.CraftID)
              ) {
                cb({
                  list: [rule.MasterCraft],
                  type: 'add',
                });
              }
            }
          } else {
            // 此中目前必为互斥关系，为以后扩展情况发生，进行进一步条件判断
            // eslint-disable-next-line no-lonely-if
            if (rule.RelationType === 1) {
              // 互斥 --- 对列表中其它工艺依次进行删除
              rule.CraftList.forEach(craft => {
                if (
                  craft.CraftID !== item.CraftID
                  && IDs.includes(craft.CraftID)
                ) {
                  cb({
                    list: [craft],
                    type: 'del',
                  });
                }
              });
            }
          }
        });
      }

      if (_curCraftRules.length > 0 && _key === 'del') {
        // 此时需要把单向依赖(其为被依赖项时)和双向依赖的工艺一起去除
        _curCraftRules.forEach(rule => {
          if (rule.MasterCraft) {
            if (
              rule.MasterCraft.CraftID === item.CraftID
              && rule.RelationType === 3
            ) {
              rule.CraftList.forEach(it => {
                if (IDs.includes(it.CraftID)) {
                  cb({
                    list: [it],
                    type: 'del',
                  });
                }
              });
            } else if (rule.MasterCraft.CraftID !== item.CraftID) {
              if (IDs.includes(rule.MasterCraft.CraftID)) {
                cb({
                  list: [rule.MasterCraft],
                  type: 'del',
                });
              }
            }
          }
        });
      }
    },
    /* 修改产品报价部件信息 -- 修改部件平面信息
    -------------------------------*/
    setQuotationPartPlainInfo(state, [indexLv1, indexLv2, type, value]) {
      state.obj2GetProductPrice.ProductParams.PartList[indexLv1].PartList[
        indexLv2
      ][type].First = value;
    },
    /* 修改产品报价部件信息 -- 修改部件属性列表信息
    -------------------------------*/
    setQuotationPartPropertyList(
      state,
      [indexLv1, indexLv2, index, value, type],
    ) {
      if (!type) {
        state.obj2GetProductPrice.ProductParams.PartList[indexLv1].PartList[
          indexLv2
        ].PropertyList[index].CustomerInputValue = value;
      } else {
        state.obj2GetProductPrice.ProductParams.PartList[indexLv1].PartList[
          indexLv2
        ].PropertyList[index].CustomizedOptionValue = value;
      }
    },
    /* 修改产品报价部件信息 -- 修改部件印刷属性列表信息
    -------------------------------*/
    setQuotationPartPrintPropertyList(
      state,
      [indexLv1, indexLv2, value, index],
    ) {
      state.obj2GetProductPrice.ProductParams.PartList[indexLv1].PartList[
        indexLv2
      ].PrintTypeList[index].CustomerInputValue = value.OptionID;
    },
    /* 修改产品报价部件信息 -- 修改部件尺寸信息
    -------------------------------*/
    setQuotationPartSizePropertyList(state, [indexLv1, indexLv2, value]) {
      state.obj2GetProductPrice.ProductParams.PartList[indexLv1].PartList[
        indexLv2
      ].SizePropertyList = [...value];
    },
    /* 修改产品报价部件信息 -- 设置印刷属性组信息
    -------------------------------*/
    setPrintPropertyGroupList(
      state,
      [indexLv1, indexLv2, index1, index2, index3, value, type],
    ) {
      // console.log(state.obj2GetProductPrice.ProductParams.PartList[indexLv1].PartList[
      //   indexLv2
      // ].PrintPropertyGroupList[index1].PropertyList);
      if (!type) {
        state.obj2GetProductPrice.ProductParams.PartList[indexLv1].PartList[
          indexLv2
        ].PrintPropertyGroupList[index1].PropertyList[index2].Second[
          index3
        ].CustomerInputValue = value;
      } else {
        state.obj2GetProductPrice.ProductParams.PartList[indexLv1].PartList[
          indexLv2
        ].PrintPropertyGroupList[index1].PropertyList[index2].Second[
          index3
        ].CustomizedOptionValue = value;
      }
    },
    /* 修改产品报价部件信息 -- 设置普通属性组信息
    -------------------------------*/
    setPropertyGroupList(
      state,
      [indexLv1, indexLv2, index1, index2, index3, value, type],
    ) {
      if (!type) {
        state.obj2GetProductPrice.ProductParams.PartList[indexLv1].PartList[
          indexLv2
        ].PropertyGroupList[index1].PropertyList[index2].Second[
          index3
        ].CustomerInputValue = value;
      } else {
        state.obj2GetProductPrice.ProductParams.PartList[indexLv1].PartList[
          indexLv2
        ].PropertyGroupList[index1].PropertyList[index2].Second[
          index3
        ].CustomizedOptionValue = value;
      }
    },
    /* 设置产品报价部件信息 -- 设置产品工艺信息 三种修改类型: add   del   maybeEdit
    -------------------------------*/
    setPartProductParamsCraftList(
      state,
      [indexLv1, indexLv2, [type, item, cb, isSystemSelect = false]],
    ) {
      const _curCraftRelationList = this.getters[// 当前产品需要满足的工艺条件信息，只当增加工艺的时候需要使用， 删除时也需要
        'Quotation/curCraftRelationList'
      ];
      const _curCraftRules = [];
      // 获取到当前要添加工艺所符合的工艺关系列表
      _curCraftRelationList.forEach(it => {
        if (it.MasterCraft && it.MasterCraft.CraftID === item.CraftID) {
          _curCraftRules.push(it);
          return;
        }
        it.CraftList.forEach(it2 => {
          if (it2.CraftID === item.CraftID) {
            _curCraftRules.push(it);
          }
        });
      });
      let _key = '';
      let _ids;
      switch (type) {
        case 'add':
          state.obj2GetProductPrice.ProductParams.PartList[indexLv1].PartList[indexLv2].PartCraftList2Req.First.push(item);
          if (
            state.obj2GetProductPrice.ProductParams.PartList[indexLv1].PartList[
              indexLv2
            ].CraftList.find(it => it.ChoiceType === 1).CraftList.find(
              it => it.CraftID === item.CraftID,
            )
          ) {
            state.obj2GetProductPrice.ProductParams.PartList[indexLv1].PartList[
              indexLv2
            ].CraftList.find(it => it.ChoiceType === 1).CraftList.find(
              it => it.CraftID === item.CraftID,
            ).isSystemSelect = isSystemSelect;
          }
          _key = 'add';
          break;
        case 'del':
          state.obj2GetProductPrice.ProductParams.PartList[indexLv1].PartList[
            indexLv2
          ].PartCraftList2Req.First = state.obj2GetProductPrice.ProductParams.PartList[
            indexLv1
          ].PartList[indexLv2].PartCraftList2Req.First.filter(
            it => it.CraftID !== item.CraftID,
          );
          _key = 'del';
          break;
        case 'maybeEdit': // 可能为编辑模式
          _ids = state.obj2GetProductPrice.ProductParams.PartList[
            indexLv1
          ].PartList[indexLv2].PartCraftList2Req.First.map(it => it.CraftID);
          if (_ids.includes(item.CraftID)) {
            state.obj2GetProductPrice.ProductParams.PartList[indexLv1].PartList[
              indexLv2
            ].PartCraftList2Req.First = state.obj2GetProductPrice.ProductParams.PartList[
              indexLv1
            ].PartList[indexLv2].PartCraftList2Req.First.map(it => {
              if (it.CraftID !== item.CraftID) return it;
              return item;
            });
          } else {
            _key = 'add';
            state.obj2GetProductPrice.ProductParams.PartList[indexLv1].PartList[
              indexLv2
            ].PartCraftList2Req.First.push(item);
            console.log(
              state.obj2GetProductPrice.ProductParams.PartList[indexLv1]
                .PartList[indexLv2],
            );
            const _list2SetSystemSelec = state.obj2GetProductPrice.ProductParams.PartList[
              indexLv1
            ].PartList[indexLv2].CraftList.find(it => it.ChoiceType === 1);
            if (
              _list2SetSystemSelec
              && _list2SetSystemSelec.CraftList.find(
                it => it.CraftID === item.CraftID,
              )
            ) {
              state.obj2GetProductPrice.ProductParams.PartList[
                indexLv1
              ].PartList[indexLv2].CraftList.find(
                it => it.ChoiceType === 1,
              ).CraftList.find(
                it => it.CraftID === item.CraftID,
              ).isSystemSelect = isSystemSelect;
            }
          }
          state.obj2GetProductPrice.ProductParams.PartList[indexLv1].PartList[
            indexLv2
          ].CraftList.forEach(_listItem => {
            _listItem.CraftList.forEach(_item => {
              if (_item.CraftID === item.CraftID) {
                _item.historyData = item.historyData;
              }
            });
          });
          break;
        default:
          break;
      }

      const IDs = state.obj2GetProductPrice.ProductParams.PartList[
        indexLv1
      ].PartList[indexLv2].PartCraftList2Req.First.map(it => it.CraftID);

      if (_curCraftRules.length > 0 && _key === 'add') {
        // 执行工艺关系设置
        _curCraftRules.forEach(rule => {
          if (rule.MasterCraft) {
            if (rule.MasterCraft.CraftID === item.CraftID) {
              // 此种情况 当前工艺依赖于rule.CraftList中的所有工艺项，如果其以在列表则不管，如果不在列表且不需要再进行选择或输入则直接勾选，否则看情况是否进行提示
              rule.CraftList.forEach(it => {
                if (!IDs.includes(it.CraftID)) {
                  cb({
                    list: [it],
                    type: 'add',
                  }); // 返回回去由组件继续进行判断添加处理(如果已在列表中则不用做额外处理)
                }
              });
            } else if (rule.MasterCraft.CraftID !== item.CraftID) {
              // 此种情况，当前工艺类型和上面一样同为单向和双向依赖，根据情况进行判断，如果为单向依赖则不做处理，如果为双向依赖则返回进行继续添加任务
              if (
                rule.RelationType === 3
                && !IDs.includes(rule.MasterCraft.CraftID)
              ) {
                cb({
                  list: [rule.MasterCraft],
                  type: 'add',
                });
              }
            }
          } else {
            // 此中目前必为互斥关系，为以后扩展情况发生，进行进一步条件判断
            // eslint-disable-next-line no-lonely-if
            if (rule.RelationType === 1) {
              // 互斥 --- 对列表中其它工艺依次进行删除
              rule.CraftList.forEach(craft => {
                if (
                  craft.CraftID !== item.CraftID
                  && IDs.includes(craft.CraftID)
                ) {
                  cb({
                    list: [craft],
                    type: 'del',
                  });
                }
              });
            }
          }
        });
      }

      if (_curCraftRules.length > 0 && _key === 'del') {
        // 此时需要把单向依赖(其为被依赖项时)和双向依赖的工艺一起去除
        _curCraftRules.forEach(rule => {
          if (rule.MasterCraft) {
            if (
              rule.MasterCraft.CraftID === item.CraftID
              && rule.RelationType === 3
            ) {
              // 此种情况 当前工艺依赖于rule.CraftList中的所有工艺项，如果其以在列表则不管，如果不在列表且不需要再进行选择或输入则直接勾选，否则看情况是否进行提示
              rule.CraftList.forEach(it => {
                if (IDs.includes(it.CraftID)) {
                  cb({
                    list: [it],
                    type: 'del',
                  });
                }
              });
            } else if (rule.MasterCraft.CraftID !== item.CraftID) {
              // 此种情况，当前工艺类型和上面一样同为单向和双向依赖，根据情况进行判断，如果为单向依赖则不做处理，如果为双向依赖则删除
              if (IDs.includes(rule.MasterCraft.CraftID)) {
                cb({
                  list: [rule.MasterCraft],
                  type: 'del',
                });
              }
            }
          }
        });
      }
    },
    /* 设置产品报价产品信息 -- 新增部件
    -------------------------------*/
    addPartProductParamsPartList(state, [indexLv1, item]) {
      const _item = JSON.parse(JSON.stringify(item));
      state.obj2GetProductPrice.ProductParams.PartList[indexLv1].PartList.push(
        _item,
      );
    },
    /* 设置产品报价产品信息 -- 删除部件
    -------------------------------*/
    delPartProductParamsPartList(state, [indexLv1, indexLv2]) {
      state.obj2GetProductPrice.ProductParams.PartList[
        indexLv1
      ].PartList.splice(indexLv2, 1);
    },
    /* 设置产品报价部件信息 -- 新增印刷属性组
    -------------------------------*/
    addPartPrintPropertyGroupList(
      state,
      [indexLv1, indexLv2, [index1, itemData]],
    ) {
      const _itemData = JSON.parse(JSON.stringify(itemData));
      state.obj2GetProductPrice.ProductParams.PartList[indexLv1].PartList[
        indexLv2
      ].PrintPropertyGroupList[index1].PropertyList.push(_itemData);
    },
    /* 设置产品报价部件信息 -- 删除印刷属性组
    -------------------------------*/
    delPartPrintPropertyGroupList(
      state,
      [indexLv1, indexLv2, [index1, index2]],
    ) {
      state.obj2GetProductPrice.ProductParams.PartList[indexLv1].PartList[
        indexLv2
      ].PrintPropertyGroupList[index1].PropertyList.splice(index2, 1);
    },
    /* 设置产品报价部件信息 -- 新增属性组
    -------------------------------*/
    addPartPropertyGroupList(state, [indexLv1, indexLv2, [index1, itemData]]) {
      const _itemData = JSON.parse(JSON.stringify(itemData));
      state.obj2GetProductPrice.ProductParams.PartList[indexLv1].PartList[
        indexLv2
      ].PropertyGroupList[index1].PropertyList.push(_itemData);
    },
    /* 设置产品报价部件信息 -- 删除属性组
    -------------------------------*/
    delPartPropertyGroupList(state, [indexLv1, indexLv2, [index1, index2]]) {
      state.obj2GetProductPrice.ProductParams.PartList[indexLv1].PartList[
        indexLv2
      ].PropertyGroupList[index1].PropertyList.splice(index2, 1);
    },
    /* 设置获取产品报价结果信息
    -------------------------------*/
    setProductQuotationResult(state, data) {
      state.ProductQuotationResult = data;
    },
    /* 设置获取产品报价结果信息
    -------------------------------*/
    setProductQuotationDetail(state, data) {
      state.ProductQuotationDetail = data;
    },
    /* 设置某个工艺状态为disabled
    -------------------------------*/
    setCraftItemDisabled(state, [CraftID, type, bool]) {
      if (type === 'isMain') {
        const _list = state.obj2GetProductPrice.ProductParams.CraftList.find(
          it => it.ChoiceType === 1,
        ).CraftList;
        const _t = _list.find(it => it.CraftID === CraftID);
        _t.disabled = bool;
      }
    },
    /* 设置部件某个工艺状态为disabled
    -------------------------------*/
    setCraftItemDisabled4Part(state, [indexLv1, indexLv2, [CraftID, bool]]) {
      const _list = state.obj2GetProductPrice.ProductParams.PartList[
        indexLv1
      ].PartList[indexLv2].CraftList.find(it => it.ChoiceType === 1).CraftList;
      const _t = _list.find(it => it.CraftID === CraftID);
      _t.disabled = bool;
      // }
    },
    /* 修改信息以通知工艺组件进行禁用状态的工艺取消
    -------------------------------*/
    setWatchTarget2DelCraft(state) {
      state.watchTarget2DelCraft += 1;
    },
    /* 设置默认产品
    -------------------------------*/
    setDefaultProductInfo(state, item) {
      // state.obj2GetProductPrice.ProductParams =
      QuotationClassType.backfillDefaultProduct(state.obj2GetProductPrice.ProductParams, item);
    },
  },
  actions: {
    /* 产品分类相关 getProductClassify getProductLists
    -------------------------------*/
    async getProductClassify({ getters, commit }) {
      if (getters.allProductClassify.length > 0) return;
      const res = await Promise.all([
        api.getProductClassify(),
        api.getProductLists(),
      ]);
      if (res && res.length === 2) {
        const [classifyDate, namesDate] = res;
        if (classifyDate.data.Status === 1000) {
          commit('setProductClassify', classifyDate.data.Data);
        }
        if (namesDate.data.Status === 1000) {
          commit('setProductNames', namesDate.data.Data);
        }
      }
    },
    /* 获取产品详情
    -------------------------------*/
    async getProductDetail({ state, commit }) {
      commit('clearCurProductInfo2Quotation');
      const res = await api.getProductDetail(state.curProductID);
      if (res.data.Status !== 1000) return;
      commit('setCurProductInfo2Quotation', res.data.Data);
    },
    /* 获取产品报价信息
    -------------------------------*/
    async getProductPrice({ state, commit, dispatch }) {
      const productData = state.obj2GetProductPrice.ProductParams;
      if (QuotationClassType.check(productData) === false) return;
      const _data = {};
      commit('setWatchTarget2DelCraft');
      await dispatch('delay', 10);
      _data.ProductParams = QuotationClassType.filter(
        QuotationClassType.transform(productData),
      );
      const { CustomerID } = this.state.account.accountObj;
      _data.Customer = { CustomerID };
      commit('setProductQuotationResult', null);
      commit('setProductQuotationDetail', null);
      const res = await api.getProductPrice(_data);
      if (res.data.Status === 7025 || res.data.Status === 8037) return;
      // eslint-disable-next-line consistent-return
      if (res.data.Status !== 1000) return res.data.Message;
      if (!res.data.Data) {
        // eslint-disable-next-line consistent-return
        return '暂无报价，请联系客服获取报价信息!';
      } // 可能为null 当需要客服咨询报价
      commit('setProductQuotationResult', res.data.Data);
      commit('setProductQuotationDetail', productData);
      // eslint-disable-next-line consistent-return
      return true;
    },
    delay(storeObj, duration) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, duration);
      });
    },
  },
};
