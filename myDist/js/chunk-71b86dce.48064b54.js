(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-71b86dce"],{5596:function(t,e,n){"use strict";n.r(e);var o=n("5530"),r=n("2f62"),s=(n("99af"),n("7db0"),n("4160"),n("caad"),n("a15b"),n("b64b"),n("159b"),n("96cf"),n("1da1")),i={data:function(){return{multipleSelection:[],h:0}},computed:Object(o.a)(Object(o.a)(Object(o.a)({},Object(r.e)("shoppingCar",["shoppingDataList","shoppingDataNumber"])),Object(r.e)("common",["ExpressList"])),{},{checkedAll:{get:function(){return this.multipleSelection.length===this.shoppingDataNumber&&this.multipleSelection.length>0},set:function(t){t?this.$refs.multipleTable.toggleAllSelection():this.$refs.multipleTable.clearSelection()}},isIndeterminate:function(){return this.multipleSelection.length<this.shoppingDataNumber&&this.multipleSelection.length>0}}),methods:{getHeight:function(){return document.getElementsByTagName("body")[0].offsetHeight-280},setHeight:function(){var t=this.getHeight();this.h=t},getName:function(t){var e=t.ProductParams.Attributes,n=e.Name,o=e.SecondLevelName;return"".concat(o,"-").concat(n)},getSize:function(t){var e=t.ProductParams.PartList,n=[];return e[0].PartList[0].Attributes.SizeName?e[0].PartList[0].Attributes.SizeName:(e.forEach((function(t){var e=t.PartList[0].SizePropertyList,o="",r=[],s=[];e.forEach((function(t){r.push(t.ShowValue),s.push(t.ShowUnit)}));var i={};if(s.forEach((function(t){i[t]?i[t]+=1:i[t]=0})),1===Object.keys(i).length)o=r.join("×")+s[0];else{var a=[];r.forEach((function(t,e){var n=t+s[e];a.push(n)})),o=a.join("×")}var l=n.length;l>0&&n[l-1]===o||n.push(o)})),n.join("、"))},getNumber:function(t){var e=t.Attributes,n=t.ProductAmount,o=t.KindCount,r=e.Unit,s="";return o>1&&(s="".concat(o,"款")),"".concat(n).concat(r).concat(s)},getCraftFromItem:function(t,e){t&&t.length>0&&t.forEach((function(t){var n="",o=t.Attributes,r=t.PropertyList,s=o.NickName;n+=s,r.length>1?n+="".concat(r.length,"处"):1===r.length&&r[0].length>0&&r[0].forEach((function(t){var e=t.ShowValue;e&&(n+=" ".concat(e))})),e.push(n)}))},getCraft:function(t){var e=this,n=t.CraftList,o=t.PartList,r=[],s=n.First;return this.getCraftFromItem(s,r),o.length>0&&o.forEach((function(t){t.PartList.forEach((function(t){var n=t.CraftList.First;e.getCraftFromItem(n,r)}))})),r.join("，")},getExpress:function(t){var e=t.First,n=t.Second;if(1===e&&1===n)return"名片之家";if(0===this.ExpressList.length)return"";var o="",r=this.ExpressList.find((function(t){return t.Type===e}));if(r){o=r.Name;var s=r.List.find((function(t){return t.ID===n}));s&&(o+=" ".concat(s.Name))}return o},handleSelectionChange:function(t){this.multipleSelection=t},getStatus:function(t){if(!t.FileErrorMessage)return t.FileHaveUpload?{text:"文件已上传",warn:!1,success:!1}:{text:"文件未上传",warn:!0,success:!1};var e=!1,n=!1;return["删除失败"].includes(t.FileErrorMessage)&&(e=!0,n=!1),["订单已提交"].includes(t.FileErrorMessage)&&(e=!1,n=!0),{text:t.FileErrorMessage,warn:e,success:n}},onDetailClick:function(t){this.$store.commit("shoppingCar/setCurShoppingCarDetailData",t),this.$router.push("/shoppingCar/detail")},handleSelectedSubmit:function(){var t=this;return Object(s.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==t.multipleSelection.length){e.next=3;break}return t.$message.error("请选择订单"),e.abrupt("return");case 3:return e.next=5,t.$store.dispatch("shoppingCar/getOrderPreCreateFromShoppingCar",t.multipleSelection);case 5:e.sent&&t.$router.push("/shoppingCar/submit");case 7:case"end":return e.stop()}}),e)})))()},handleSingleSubmit:function(t){var e=this;return Object(s.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.$store.dispatch("shoppingCar/getOrderPreCreateFromShoppingCar",[t]);case 2:n.sent&&e.$router.push("/shoppingCar/submit");case 4:case"end":return n.stop()}}),n)})))()},handleDel:function(t){var e=this;if(t||0!==this.multipleSelection.length){var n=t?"确定删除该订单吗":"确定删除选中订单吗";this.messageBox.warnCancelBox({title:n,successFunc:function(){var n=t?[t]:e.multipleSelection;e.$store.dispatch("shoppingCar/getQuotationRemove",n)}})}else this.$message.error("请选择订单")},handleClearList:function(){this.$store.commit("shoppingCar/clearShoppingDataList")}},mounted:function(){var t=this;this.$nextTick((function(){return t.setHeight()})),window.onresize=function(){return t.setHeight()},this.$store.dispatch("shoppingCar/getQuotationList"),this.$store.dispatch("common/getExpressList")},beforeDestroy:function(){window.onresize=null}},a=(n("6a3c"),n("2877")),l={components:{ShoppingCarTable:Object(a.a)(i,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"mp-pc-shopcar-page-table-comp-wrap"},[n("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.shoppingDataList,"tooltip-effect":"dark","max-height":t.h,height:t.h,stripe:"",border:""},on:{"selection-change":t.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection","class-name":"check-row",width:"54"}}),n("el-table-column",{attrs:{label:"产品",width:"130","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.getName(e.row)))]}}])}),n("el-table-column",{attrs:{label:"尺寸",width:"70","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.getSize(e.row)))]}}])}),n("el-table-column",{attrs:{label:"数量",width:"78","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.getNumber(e.row.ProductParams)))]}}])}),n("el-table-column",{attrs:{label:"工艺",width:"70","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.getCraft(e.row.ProductParams)))]}}])}),n("el-table-column",{attrs:{label:"原价",width:"65","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.Funds.OriginalPrice)+"元")]}}])}),n("el-table-column",{attrs:{label:"优惠券","show-overflow-tooltip":"",width:"65"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.Funds.CouponAmount>0?"-"+e.row.Funds.CouponAmount:0)+"元")]}}])}),n("el-table-column",{attrs:{label:"成交价",width:"65","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.Funds.FinalPrice)+"元")]}}])}),n("el-table-column",{attrs:{label:"定金",width:"65","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.Funds.Deposit)+"元")]}}])}),n("el-table-column",{attrs:{prop:"Content",label:"文件内容","show-overflow-tooltip":""}}),n("el-table-column",{attrs:{prop:"Address.Address.Consignee",label:"收货人",width:"60","show-overflow-tooltip":""}}),n("el-table-column",{attrs:{prop:"Address.Address.Mobile",label:"收货人手机",width:"90","show-overflow-tooltip":""}}),n("el-table-column",{attrs:{label:"配送方式","show-overflow-tooltip":"",width:"78"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.getExpress(e.row.Address.Express)))]}}])}),n("el-table-column",{attrs:{label:"状态","show-overflow-tooltip":"",width:"75"},scopedSlots:t._u([{key:"default",fn:function(e){return n("span",{class:{"is-pink":t.getStatus(e.row).warn,"is-success":t.getStatus(e.row).success}},[t._v(t._s(t.getStatus(e.row).text))])}}])}),n("el-table-column",{attrs:{label:"操作",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return n("div",{staticClass:"menu-list"},[n("span",{staticClass:"span-title-blue",on:{click:function(n){return t.handleSingleSubmit(e.row)}}},[t._v("下单")]),n("span",{staticClass:"span-title-blue detail",on:{click:function(n){return t.onDetailClick(e.row)}}},[t._v("详情")]),n("span",{staticClass:"span-title-pink",on:{click:function(n){return t.handleDel(e.row)}}},[t._v("删除")])])}}])})],1),n("footer",{staticClass:"float is-font-14"},[n("div",{staticClass:"left"},[n("el-checkbox",{attrs:{indeterminate:t.isIndeterminate},model:{value:t.checkedAll,callback:function(e){t.checkedAll=e},expression:"checkedAll"}},[t._v("全选")]),n("span",{staticClass:"gray"},[t._v("共检测出 "),n("i",{staticClass:"is-pink"},[t._v(t._s(t.shoppingDataNumber))]),t._v(" 个订单")])],1),n("div",{staticClass:"right"},[n("span",{staticClass:"span-title-blue",on:{click:t.handleClearList}},[t._v("清除已上传订单")]),n("span",{staticClass:"span-title-pink",on:{click:function(e){return t.handleDel(null)}}},[t._v("删除选中订单")]),n("el-button",{attrs:{type:"primary"},on:{click:t.handleSelectedSubmit}},[t._v("上传选中订单")])],1)])],1)}),[],!1,null,null,null).exports},computed:Object(o.a)({},Object(r.e)("shoppingCar",["shoppingDataNumber"]))},c=(n("d50f"),Object(a.a)(l,(function(){var t=this.$createElement,e=this._self._c||t;return e("article",{staticClass:"mp-pc-shopping-car-page-wrap"},[e("section",[e("ShoppingCarTable")],1)])}),[],!1,null,null,null));e.default=c.exports},"6a3c":function(t,e,n){"use strict";var o=n("a93a");n.n(o).a},"9e09":function(t,e,n){},a93a:function(t,e,n){},d50f:function(t,e,n){"use strict";var o=n("9e09");n.n(o).a}}]);