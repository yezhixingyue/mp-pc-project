(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-b7a9217e"],{"3eea":function(t,r,a){"use strict";var s={props:{info4OrderSummary:{type:Object,default:function(){return{}}}}},e=(a("bff6"),a("2877")),i=Object(e.a)(s,(function(){var t=this,r=t.$createElement,a=t._self._c||r;return a("section",{staticClass:"mp-pc-order-detail-page-header-wrap"},[a("header",{staticClass:"section-title"},[t._v("订单概括")]),a("ul",{staticClass:"content"},[a("li",{staticClass:"status-box",class:{moving:80==+t.info4OrderSummary.Status,unPay:10==+t.info4OrderSummary.Status,normal:[20,30,40,55,60,70].includes(+t.info4OrderSummary.Status),cancel:[254,255,35].includes(+t.info4OrderSummary.Status),success:200==+t.info4OrderSummary.Status}},[a("span",[t._v(t._s(t._f("formatStatus")(t.info4OrderSummary.Status)))])]),a("li",{staticClass:"address-box"},[a("p",[a("span",[t._v("订单编号："+t._s(t.info4OrderSummary.OrderID))]),t.info4OrderSummary.OutPlate?a("span",{staticClass:"ml-50"},[t._v("平台单号："+t._s(t.info4OrderSummary.OutPlate))]):t._e()]),a("p",{staticClass:"mid"},[a("span",[a("i",{staticClass:"title"},[t._v("收件人：")]),t._v(t._s(t.info4OrderSummary.Consignee))]),a("span",{staticClass:"ml-28"},[t._v(t._s(t.info4OrderSummary.Mobile))]),a("span",{staticClass:"ml-40 gray"},[t._v("/ 配送方式："+t._s(t.info4OrderSummary.Express))])]),a("p",[a("el-tooltip",{attrs:{"popper-class":"table-item",enterable:!1,content:t.info4OrderSummary.Address,placement:"top"}},[a("span",[t._v("收件地址："+t._s(t.info4OrderSummary.Address))])])],1)]),a("li",{staticClass:"file-box gray is-font-12"},[a("p",{staticClass:"file-content"},[a("span",[t._v("文件内容：")]),a("el-tooltip",{attrs:{"popper-class":"table-item",enterable:!1,content:t.info4OrderSummary.Content,placement:"top-start"}},[a("span",[t._v(t._s(t.info4OrderSummary.Content))])])],1),a("p",[a("span",[t._v("下单时间：")]),a("span",[t._v(t._s(t._f("format2MiddleLangTypeDate")(t.info4OrderSummary.CreateTime)))])])])])])}),[],!1,null,null,null);r.a=i.exports},"4e76":function(t,r,a){"use strict";var s=(a("99af"),a("4160"),a("a15b"),a("b0c0"),a("159b"),a("96cf"),a("1da1")),e={props:{title:{type:String,default:"产品详情"},orderDetail:{type:Object,default:function(){return{}}}},computed:{productUnit:function(){return this.orderDetail?"orderDetail"===this.pageName?this.orderDetail.Unit:this.orderDetail.ProductParams&&this.orderDetail.ProductParams.Attributes?this.orderDetail.ProductParams.Attributes.Unit:"":""},productName:function(){if(!this.orderDetail)return"";if("orderDetail"===this.pageName){var t=this.orderDetail,r=t.FirstLevelName,a=t.SecondLevelName,s=t.ProductName;return"".concat(r,"-").concat(a,"-").concat(s)}if(!this.orderDetail.ProductParams||!this.orderDetail.ProductParams.Attributes)return"";var e=this.orderDetail.ProductParams.Attributes,i=e.FirstLevelName,n=e.SecondLevelName,o=e.Name;return"".concat(i,"-").concat(n,"-").concat(o)},ProductNum:function(){if(!this.orderDetail)return"";if("orderDetail"===this.pageName){var t=this.orderDetail,r=t.ProductAmount,a=t.Unit;return"".concat(r).concat(a)}if(!this.orderDetail.ProductParams)return"";var s=this.orderDetail.ProductParams,e=s.ProductAmount,i=s.Attributes;return"".concat(e).concat(i.Unit)},productKindCount:function(){return this.orderDetail?"orderDetail"===this.pageName?this.orderDetail.KindCount:this.orderDetail.ProductParams?this.orderDetail.ProductParams.KindCount:"":""},productMakeup:function(){if(!this.orderDetail)return"";if("orderDetail"===this.pageName){var t=this.orderDetail,r=t.MakeupRowNumber,a=t.MakeupColumnNumber;return 1===r&&1===a?"":"".concat(r,"行").concat(a,"列")}if(!this.orderDetail.ProductParams)return"";var s=this.orderDetail.ProductParams,e=s.MakeupRowNumber,i=s.MakeupColumnNumber;return 1===e&&1===i?"":"".concat(e,"行").concat(i,"列")},productMultyKindMakeup:function(){return this.orderDetail?"orderDetail"===this.pageName?this.orderDetail.MultyKindMakeup?"多款联拼":"":this.orderDetail.ProductParams.MultyKindMakeup?"多款联拼":"":""},productPropertyList:function(){return this.orderDetail?"orderDetail"===this.pageName?this.curOrderData?this.curOrderData.ProductParams.PropertyList:[]:this.orderDetail.ProductParams?this.orderDetail.ProductParams.PropertyList:"":""},productCraftList:function(){if(!this.orderDetail)return"";var t=this.orderDetail.ProductParams?this.orderDetail.ProductParams.CraftList:[];this.curOrderData&&(t=this.curOrderData.ProductParams.CraftList),t=t&&t.First?t.First:[];var r=[];return t.forEach((function(t){var a={};a.craftName=t.Attributes.NickName;var s=[];t.PropertyList.length>1?s.push("".concat(t.PropertyList.length,"处")):t.PropertyList.forEach((function(t){t.forEach((function(t){var r=t.ShowValue+t.ShowUnit;s.push(r)}))})),a.Property=s.join(" "),r.push(a)})),r},PartList:function(){return this.orderDetail?"orderDetail"===this.pageName?this.curOrderData?this.curOrderData.ProductParams.PartList:[]:this.orderDetail.ProductParams?this.orderDetail.ProductParams.PartList:[]:[]}},data:function(){return{pageName:"",curOrderData:null}},methods:{getCraftList:function(t){var r=t;r=r&&r.First?r.First:[];var a=[];return r.forEach((function(t){var r={};r.craftName=t.Attributes.NickName;var s=[];t.PropertyList.length>1?s.push("".concat(t.PropertyList.length,"处")):t.PropertyList.forEach((function(t){t.forEach((function(t){var r=t.ShowValue+t.ShowUnit;s.push(r)}))})),r.Property=s.join(" "),a.push(r)})),a}},mounted:function(){var t=this;return Object(s.a)(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(t.pageName=t.$route.name,"unpayOrderDetail"===t.pageName&&(t.pageName="orderDetail"),"orderDetail"===t.pageName){r.next=4;break}return r.abrupt("return");case 4:return r.next=6,t.api.getOrderDetail(t.orderDetail.OrderID);case 6:1e3===(a=r.sent).data.Status&&(t.curOrderData=a.data.Data);case 8:case"end":return r.stop()}}),r)})))()}},i=(a("5730"),a("2877")),n=Object(i.a)(e,(function(){var t=this,r=t.$createElement,a=t._self._c||r;return a("section",{staticClass:"mp-pc-order-detail-common-comp-wrap"},[a("header",{staticClass:"section-title"},[t._v(t._s(t.title))]),a("div",{staticClass:"main",class:1===t.PartList.length?"is-merge":""},[a("div",{staticClass:"left"},[a("p",{staticClass:"product-name"},[a("span",{staticClass:"gray"},[t._v("产品：")]),a("span",{staticClass:"is-bold"},[t._v(t._s(t.productName))])]),a("p",[a("span",{staticClass:"width-122 gray"},[t._v("数量："+t._s(t.ProductNum))]),a("span",[a("i",{staticClass:"gray"},[t._v("款数：")]),t._v(t._s(t.productKindCount)+"款")])]),t.productMakeup?a("p",[a("span",{staticClass:"width-122 gray"},[t._v("联拼："+t._s(t.productMakeup))]),a("span",[t._v(t._s(t.productMultyKindMakeup))])]):t._e(),t._l(t.productPropertyList,(function(r){return a("p",{key:r.PropertyID},[a("span",{staticClass:"gray"},[t._v(t._s(r.PropertyName)+"：")]),a("span",{staticClass:"is-font-12"},[t._v(t._s(r.ShowValue)+t._s(r.ShowUnit))])])})),t.productCraftList.length>0?a("div",{staticClass:"craft-wrap float"},[a("div",{staticClass:"gray"},[t._v("工艺：")]),a("ul",t._l(t.productCraftList,(function(r){return a("li",{key:r.CraftID,staticClass:"is-font-12"},[a("span",{staticClass:"craft-title"},[t._v(t._s(r.craftName))]),r.Property?a("span",{staticClass:"gray"},[t._v("（ "+t._s(r.Property)+" ）")]):t._e()])})),0)]):t._e(),1===t.PartList.length?a("ul",t._l(t.PartList,(function(r){return a("li",{key:r.PartID},[a("i",{staticClass:"line"}),a("p",{staticClass:"is-bold",class:t.PartList.length>1?"":"is-opacity0"},[a("i",{staticClass:"is-origin"},[t._v("//")]),t._v(" "+t._s(r.Attributes.Name))]),t._l(r.PartList,(function(s,e){return a("div",{key:s.PartID+e},[a("p",[s.PartAmount.First>1?a("span",{staticClass:"width-122 gray"},[t._v("数量："+t._s(s.PartAmount.First)+t._s(r.Attributes.Unit)+"/"+t._s(t.productUnit)+" ")]):t._e(),s.Attributes.Material?a("span",[a("i",{staticClass:"gray"},[t._v("物料：")]),t._v(t._s(s.Attributes.Material.Name))]):t._e()]),s.Attributes.SizeName?a("p",[a("span",[a("i",{staticClass:"gray"},[t._v("尺寸：")]),t._v(t._s(s.Attributes.SizeName))])]):t._e(),t._l(s.PropertyList,(function(r){return a("p",{key:r.PropertyID},[a("span",{staticClass:"gray"},[t._v(t._s(r.PropertyName)+"：")]),a("span",{staticClass:"is-font-12"},[t._v(t._s(r.ShowValue)+t._s(r.ShowUnit))])])})),t._l(s.PropertyGroupList,(function(r){return a("div",{key:r.GroupID,staticClass:"property-group-wrap"},[a("p",{staticClass:"is-bold is-font-13"},[t._v(t._s(r.GroupName)+"：")]),a("div",t._l(r.PropertyList,(function(s,e){return a("p",{key:r.GroupID+e,staticClass:"property-list"},t._l(s.Second,(function(r){return a("span",{key:r.PropertyID},[a("i",{staticClass:"gray"},[t._v(t._s(r.PropertyName))]),r.ShowValue?a("i",{staticClass:"is-font-12"},[t._v("："+t._s(r.ShowValue)+t._s(r.ShowUnit))]):t._e()])})),0)})),0)])})),t.getCraftList(s.CraftList).length>0?a("div",{staticClass:"craft-wrap float"},[a("div",{staticClass:"gray"},[t._v("工艺：")]),a("ul",t._l(t.getCraftList(s.CraftList),(function(r){return a("li",{key:r.CraftID,staticClass:"is-font-12"},[a("span",{staticClass:"craft-title"},[t._v(t._s(r.craftName))]),r.Property?a("span",{staticClass:"gray"},[t._v("（ "+t._s(r.Property)+" ）")]):t._e()])})),0)]):t._e()],2)}))],2)})),0):t._e()],2),t.PartList.length>1?a("div",{staticClass:"content"},[a("ul",t._l(t.PartList,(function(r){return a("li",{key:r.PartID},[a("p",{staticClass:"is-bold",class:t.PartList.length>1?"":"is-opacity0"},[a("i",{staticClass:"is-origin"},[t._v("//")]),t._v(" "+t._s(r.Attributes.Name))]),t._l(r.PartList,(function(s,e){return a("div",{key:s.PartID+e},[a("p",[s.PartAmount.First>1?a("span",{staticClass:"width-122 gray"},[t._v("数量："+t._s(s.PartAmount.First)+t._s(r.Attributes.Unit)+"/"+t._s(t.productUnit)+" ")]):t._e(),s.Attributes.Material?a("span",[a("i",{staticClass:"gray"},[t._v("物料：")]),t._v(t._s(s.Attributes.Material.Name))]):t._e()]),s.Attributes.SizeName?a("p",[a("span",[a("i",{staticClass:"gray"},[t._v("尺寸：")]),t._v(t._s(s.Attributes.SizeName))])]):t._e(),t._l(s.PropertyList,(function(r){return a("p",{key:r.PropertyID},[a("span",{staticClass:"gray"},[t._v(t._s(r.PropertyName)+"：")]),a("span",{staticClass:"is-font-12"},[t._v(t._s(r.ShowValue)+t._s(r.ShowUnit))])])})),t._l(s.PropertyGroupList,(function(r){return a("div",{key:r.GroupID},[a("p",{staticClass:"is-bold is-font-13"},[t._v(t._s(r.GroupName)+"：")]),t._l(r.PropertyList,(function(s,e){return a("p",{key:r.GroupID+e,staticClass:"property-list"},t._l(s.Second,(function(r){return a("span",{key:r.PropertyID},[a("i",{staticClass:"gray"},[t._v(t._s(r.PropertyName))]),r.ShowValue?a("i",{staticClass:"is-font-12"},[t._v("："+t._s(r.ShowValue)+t._s(r.ShowUnit))]):t._e()])})),0)}))],2)})),t.getCraftList(s.CraftList).length>0?a("div",{staticClass:"craft-wrap float"},[a("div",{staticClass:"gray"},[t._v("工艺：")]),a("ul",t._l(t.getCraftList(s.CraftList),(function(r){return a("li",{key:r.CraftID,staticClass:"is-font-12"},[a("span",{staticClass:"craft-title"},[t._v(t._s(r.craftName))]),r.Property?a("span",{staticClass:"gray"},[t._v("（ "+t._s(r.Property)+" ）")]):t._e()])})),0)]):t._e()],2)}))],2)})),0)]):t._e(),a("div",{staticClass:"right"},[t._t("default")],2)])])}),[],!1,null,null,null);r.a=n.exports},5730:function(t,r,a){"use strict";var s=a("a163");a.n(s).a},a163:function(t,r,a){},bff6:function(t,r,a){"use strict";var s=a("bffd");a.n(s).a},bffd:function(t,r,a){}}]);