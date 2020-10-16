(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-455ab03c"],{"1f77":function(t,s,e){"use strict";e.r(s);var o=(e("ac1f"),e("5319"),e("96cf"),e("1da1")),i=e("5530"),c=e("2f62"),n={computed:Object(i.a)(Object(i.a)({},Object(c.e)("common",["customerAccountList","customerInfo"])),{},{placeholder:function(){return this.dialogVisible&&this.isEdit?"不修改密码则不用填写":""},Mobile:{get:function(){return this.subAccountForm.Mobile},set:function(t){this.subAccountForm.Mobile=t.replace(/[^\d]/g,"")}}}),data:function(){var t=this;return{dialogVisible:!1,dialogTitle:"",isEdit:!1,subAccountForm:{Mobile:"",NickName:"",Password:"",rePassword:"",IsBranch:!0,AccountID:""},rules:{NickName:[{required:!0,message:"请输入姓名",trigger:"blur"},{min:1,max:5,message:"长度最大为 5 个字符",trigger:"blur"}],Password:[{validator:function(s,e,o){e||t.subAccountForm.rePassword||!t.isEdit||o(),t.validateCheck(e,t.defineRules.Password,o)&&(""!==t.subAccountForm.rePassword&&t.$refs.subAccountForm.validateField("rePassword"),o())},trigger:"blur"}],rePassword:[{validator:function(s,e,o){e||t.subAccountForm.Password||!t.isEdit||o(),t.validateCheck(e,t.defineRules.Password,o)&&(t.subAccountForm.rePassword!==t.subAccountForm.Password?o(new Error("两次密码输入不一致")):o())},trigger:"blur"}],Mobile:[{validator:function(s,e,o){t.validateCheck(e,t.defineRules.Mobile,o)&&o()},trigger:"blur"}]},defineRules:{Mobile:[{strategy:"isNotEmpty",errorMsg:"请输入手机号!"},{strategy:"shouldLength:11",errorMsg:"请输入11位手机号码"},{strategy:"isPhone",errorMsg:"手机号码格式不正确"}],Password:[{strategy:"isNotEmpty",errorMsg:"请输入密码!"},{strategy:"minLength:6",errorMsg:"密码最小长度为6位"},{strategy:"maxLength:16",errorMsg:"密码最大长度为16位"}]}}},methods:{handleEdit:function(t){this.isEdit=!0,this.dialogTitle="编辑子账号";var s=t.AccountID,e=t.IsBranch,o=t.NickName,i=t.Mobile;this.initSubAccountForm(s,e,o,i),this.dialogVisible=!this.dialogVisible},handleDel:function(t){var s=this;if(t){var e=t.AccountID,i=t.NickName;e&&this.messageBox.warnCancelBox({title:"确定删除该账号吗?",msg:"删除子账号： [ ".concat(i," ]"),successFunc:function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.api.getCustomerRemoveAccount(e);case 2:1e3===t.sent.data.Status&&s.messageBox.successSingle({title:"删除成功",successFunc:function(){s.$store.dispatch("common/getCustomerAccountList",!0)}});case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()})}},initSubAccountForm:function(t,s,e,o){this.subAccountForm.AccountID=t,this.subAccountForm.IsBranch=s,this.subAccountForm.NickName=e,this.subAccountForm.Mobile=o,this.subAccountForm.Password="",this.subAccountForm.rePassword=""},handleAddNewAccount:function(){this.customerInfo.Account.IsBranch?this.messageBox.failSingle({msg:"无操作权限"}):(this.isEdit=!1,this.dialogTitle="添加子账号",this.initSubAccountForm("",!0,"",""),this.dialogVisible=!this.dialogVisible)},submitForm:function(t){var s=this;this.$refs[t].validate(function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(e){var o,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e){t.next=8;break}return delete(o=Object(i.a)({},s.subAccountForm)).rePassword,o.AccountID||delete o.AccountID,t.next=6,s.api.getCustomerEditSubAccount(o);case 6:1e3===t.sent.data.Status&&(c=s.isEdit?"编辑成功":"添加成功",s.messageBox.successSingle({title:c,successFunc:function(){s.dialogVisible=!1,s.$store.dispatch("common/getCustomerAccountList",!0)}}));case 8:case"end":return t.stop()}}),t)})));return function(s){return t.apply(this,arguments)}}())},handleFormCancel:function(){this.dialogVisible=!1,this.initSubAccountForm("",!0,"",""),this.$refs.subAccountForm.resetFields()}},mounted:function(){this.$store.dispatch("common/getCustomerAccountList")}},r=(e("d7c1"),e("2877")),a=Object(r.a)(n,(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("section",{staticClass:"mp-pc-my-setting-page-sub-account-page-wrap"},[e("header",[e("span",{staticClass:"blue-v-line is-bold is-black"},[t._v("子账号管理")]),e("span",{staticClass:"is-font-12"},[t._v("（ 共检测出"),e("i",{staticClass:"is-pink is-font-16"},[t._v(" "+t._s(t.customerAccountList.length)+" ")]),t._v("条记录 ）")])]),t.customerInfo?e("ul",{staticClass:"content"},[t._l(t.customerAccountList,(function(s){return e("li",{key:s.AccountID,staticClass:"account-item",class:s.IsBranch?"":"active"},[e("div",{staticClass:"account-item-header"},[e("i",{staticClass:"iconfont icon-yonghu1"}),e("span",[t._v(t._s(s.NickName))])]),e("div",{staticClass:"account-item-content"},[e("p",[e("i",{staticClass:"iconfont icon-dianhua"}),e("span",[t._v(t._s(t._f("formatMobile")(s.Mobile)))])]),e("p",{staticClass:"add-date"},[t._v("添加时间："+t._s(t._f("format2MiddleLangTypeDate")(s.CreateTime)))])]),e("div",{staticClass:"account-item-footer"},[t.customerInfo.Account.IsBranch?t._e():e("span",{staticClass:"span-title-blue",on:{click:function(e){return t.handleEdit(s)}}},[t._v("编辑")]),t.customerInfo.Account.IsBranch?t._e():e("span",{staticClass:"span-title-pink",on:{click:function(e){return t.handleDel(s)}}},[t._v("删除")])]),e("div",{staticClass:"account-item-sign"},[t._v("主账号")])])})),t.customerInfo.Account.IsBranch?t._e():e("li",{staticClass:"add-new-account-box",on:{click:t.handleAddNewAccount}},[e("i",{staticClass:"el-icon-plus"}),e("span",[t._v("新增子账号")])])],2):t._e(),e("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],attrs:{visible:t.dialogVisible,width:"700px","custom-class":"set-craft-dia","before-close":t.handleFormCancel},on:{"update:visible":function(s){t.dialogVisible=s}}},[e("header",{attrs:{slot:"title"},slot:"title"},[e("i",{staticClass:"iconfont icon-zengjia is-primary-blue"}),e("span",[t._v(t._s(t.dialogTitle))])]),e("el-form",{ref:"subAccountForm",staticClass:"account-ruleForm",attrs:{model:t.subAccountForm,rules:t.rules,"label-width":"100px"}},[e("el-form-item",{attrs:{label:"登录手机号：",prop:"Mobile"}},[e("el-input",{model:{value:t.Mobile,callback:function(s){t.Mobile="string"==typeof s?s.trim():s},expression:"Mobile"}})],1),e("el-form-item",{attrs:{label:"姓名：",prop:"NickName"}},[e("el-input",{model:{value:t.subAccountForm.NickName,callback:function(s){t.$set(t.subAccountForm,"NickName","string"==typeof s?s.trim():s)},expression:"subAccountForm.NickName"}})],1),e("el-form-item",{attrs:{label:"密码：",prop:"Password"}},[e("el-input",{attrs:{type:"password",placeholder:t.placeholder},model:{value:t.subAccountForm.Password,callback:function(s){t.$set(t.subAccountForm,"Password","string"==typeof s?s.trim():s)},expression:"subAccountForm.Password"}})],1),e("el-form-item",{attrs:{label:"确认密码：",prop:"rePassword"}},[e("el-input",{attrs:{type:"password",placeholder:t.placeholder},model:{value:t.subAccountForm.rePassword,callback:function(s){t.$set(t.subAccountForm,"rePassword","string"==typeof s?s.trim():s)},expression:"subAccountForm.rePassword"}})],1)],1),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{type:"primary"},on:{click:function(s){return t.submitForm("subAccountForm")}}},[t._v("确 定")]),e("el-button",{on:{click:t.handleFormCancel}},[t._v("取 消")])],1)],1)],1)}),[],!1,null,null,null);s.default=a.exports},b5b8:function(t,s,e){},d7c1:function(t,s,e){"use strict";var o=e("b5b8");e.n(o).a}}]);