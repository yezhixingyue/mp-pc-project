/*! For license information please see chunk-62ac4ff8.f03fd1a3.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-62ac4ff8"],{"3c35":function(e,t){(function(t){e.exports=t}).call(this,{})},59245:function(e,t,r){"use strict";var n=(r("99af"),r("b0c0"),r("b680"),r("d3b7"),r("ac1f"),r("1276"),r("96cf"),r("1da1")),i=(r("fb6a"),r("365c")),a=10485760;function s(e,t,r){var n=(e/t*100).toFixed(2);return n>=r&&(n=+r),n}function o(e,t){var r=t.initPercentage,n=t.lastedPercentage,i=t.onUploadProgressFunc,a=+r+ +(e.loaded/e.total*(n-r)).toFixed(2),s=(+"".concat(a.toFixed(2),"0")).toFixed(2);s&&i(s)}function u(e,t,r){return c.apply(this,arguments)}function c(){return(c=Object(n.a)(regeneratorRuntime.mark((function e(t,r,n){var c,l,h,p,f,d,_,g,S,b;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(c=n.data,l=n.uniqueName,h=n.onUploadProgressFunc,p=n.finalPercentage,!(t<=0)){e.next=3;break}return e.abrupt("return");case 3:if(d=s(f=r,c.size),h(d),1!==t){e.next=12;break}return _=c.slice(f,c.size),g=p,e.next=11,i.a.UploadFileBreakpointResume(_,l,f,c.size,c.size,(function(e){return o(e,{initPercentage:d,lastedPercentage:g,onUploadProgressFunc:h})}));case 11:return e.abrupt("return");case 12:return S=c.slice(f,f+a),b=(b=s(f+a,c.size))>p?+p:b,e.next=17,i.a.UploadFileBreakpointResume(S,l,f,f+a,c.size,(function(e){return o(e,{initPercentage:d,lastedPercentage:b,onUploadProgressFunc:h})}));case 17:return e.next=19,u(t-1,f+a,{data:c,uniqueName:l,onUploadProgressFunc:h});case 19:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function l(e,t){return h.apply(this,arguments)}function h(){return(h=Object(n.a)(regeneratorRuntime.mark((function e(t,r){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,i.a.getUploadedProgress(r).catch((function(){return!1}));case 3:if(1e3===(n=e.sent).data.Status){e.next=6;break}return e.abrupt("return",!1);case 6:if(!(n.data.Data<t.size)){e.next=8;break}return e.abrupt("return",!1);case 8:return e.abrupt("return",!0);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function p(){return(p=Object(n.a)(regeneratorRuntime.mark((function e(t,r,n){var o,c,h,p,f,d=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=d.length>3&&void 0!==d[3]?d[3]:98,e.next=4,i.a.getUploadedProgress(r).catch((function(){return!1}));case 4:if(1e3===(c=e.sent).data.Status){e.next=7;break}return e.abrupt("return",!1);case 7:if(!(+c.data.Data<+t.size)){e.next=18;break}return n(s(c.data.Data,t.size,o)),h=Math.ceil((t.size-c.data.Data)/a),p=+c.data.Data,f=!0,e.next=14,u(h,p,{data:t,uniqueName:r,onUploadProgressFunc:n,finalPercentage:o}).catch((function(){f=!1}));case 14:if(f){e.next=16;break}return e.abrupt("return",!1);case 16:if(!l(t,r)){e.next=18;break}return e.abrupt("return",!0);case 18:return n(+o),e.abrupt("return",!0);case 20:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var f=function(e,t,r){return p.apply(this,arguments)},d=r("192e"),_=r("6199"),g={props:{title:{type:String,default:"选择文件"},successFunc:{type:Function,default:function(){}},failFunc:{type:Function,default:function(){}},multiple:{type:Boolean,default:!1},accept:{type:String,default:"*"},isUploadRightNow:{type:Boolean,default:!1},validateFunc:{},msgTitle:{type:String,default:"验证失败"},onlyShow:{type:Boolean,default:!1}},data:function(){return{upLoadTitle:"",percentage:0,showProgress:!1,showLoading:!1,fileName:"",files:null,fileList:[]}},computed:{showTitle:function(){return this.upLoadTitle?this.upLoadTitle:this.title},percentageNum:function(){return+(+this.percentage).toFixed(1)}},methods:{onChange:function(e){this.isUploadRightNow?this.multiple?this.multiple:this.upLoadSingleFile(e.target.files[0]):this.multiple||(this.files=e.target.files)},upLoadSingleFile:function(e){var t=this;if(e){this.upLoadTitle="读取文件中...";var r=new FileReader;r.readAsArrayBuffer(e),r.onerror=function(){t.messageBox.failSingleError({title:"文件解析错误！",msg:"请检查文件并重新上传"}),t.upLoadTitle="读取失败请重新选择";var e=document.querySelector(".mp-phone-upload-comp-break-point-type-wrap > input");e&&(e.value="")},r.onloadend=Object(n.a)(regeneratorRuntime.mark((function n(){var i,a,s,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(r.result){n.next=2;break}return n.abrupt("return");case 2:if(i=t.utils.extname(e.name),a="".concat(_(r.result),".").concat(i),t.upLoadTitle="解析完成,开始上传",t.fileName=e.name,e.size>20971520?t.showProgress=!0:t.showLoading=!0,s=function(e){isNaN(e)||(t.percentage=e)},!e||!a){n.next=20;break}return n.next=11,f(e,a,s,100);case 11:n.sent?t.successFunc({compiledName:a,initialName:t.fileName}):d.a.failSingleError({title:"文件上传失败",msg:"抱歉，文件上传失败，请重试!",failFunc:t.failFunc}),t.showProgress&&(t.showProgress=!1),t.showLoading&&(t.showLoading=!1),t.upLoadTitle="",(o=document.querySelector(".mp-phone-upload-comp-break-point-type-wrap > div > input.upload-inp"))&&(o.value=""),t.percentage=0;case 20:case"end":return n.stop()}}),n)})))}},submitUpload:function(){this.$refs.upload.submit()},handleRemove:function(e,t){this.fileList=t},handlePreview:function(e){},handleElChange:function(e,t){this.fileList=t,this.$emit("fillFileContent",e.name.split(".")[0])},delay:function(e,t){return new Promise((function(e){setTimeout((function(){e()}),t)}))},exceed:function(e,t){var r=e[0];this.fileList[0].raw=r,this.fileList[0].name=r.name,this.$emit("fillFileContent",r.name.split(".")[0])},handleElUpload:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.delay(0);case 2:if(0!==e.fileList.length){t.next=5;break}return d.a.failSingleError({title:"".concat(e.msgTitle,"失败"),msg:"请选择订单文件!",failFunc:e.failFunc}),t.abrupt("return");case 5:return t.next=7,e.validateFunc();case 7:if("string"!=typeof(r=t.sent)){t.next=11;break}return d.a.failSingleError({title:"".concat(e.msgTitle,"失败"),msg:r}),t.abrupt("return");case 11:!0===r&&(n=e.fileList[0].raw,e.upLoadSingleFile(n));case 12:case"end":return t.stop()}}),t)})))()},saveFile2Store:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.delay(0);case 2:if(0!==e.fileList.length){t.next=5;break}return d.a.failSingleError({title:"".concat(e.msgTitle,"失败"),msg:"请选择订单文件!",failFunc:e.failFunc}),t.abrupt("return");case 5:return t.next=7,e.validateFunc();case 7:if("string"!=typeof(r=t.sent)){t.next=11;break}return d.a.failSingleError({title:"".concat(e.msgTitle,"失败"),msg:r}),t.abrupt("return");case 11:!0===r&&(n=e.fileList[0].raw,e.$emit("saveFile2Store",n),e.successFunc({compiledName:"",initialName:e.fileName}));case 12:case"end":return t.stop()}}),t)})))()},onInputClick:function(e){if(this.onlyShow)return e.stopPropagation(),!1}}},S=(r("5b61"),r("2877")),b=Object(S.a)(g,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"mp-phone-upload-comp-break-point-type-wrap out-btn",on:{click:function(t){return t.stopPropagation(),e.onInputClick(t)}}},[e.isUploadRightNow?r("div",{staticClass:"self-comp",class:{hide:e.showLoading||e.showProgress,disabled:e.onlyShow},on:{click:function(t){return t.stopPropagation(),e.onInputClick(t)}}},[r("input",{ref:"uploadInp",staticClass:"upload-inp",attrs:{type:"file",multiple:e.multiple,accept:e.accept,disabled:e.onlyShow},on:{change:e.onChange,click:function(t){return t.stopPropagation(),e.onInputClick(t)}}}),e._v(" "+e._s(e.showTitle)+" ")]):r("div",{staticClass:"el-comp"},[r("span",[e._v("印品文件：")]),r("el-upload",{ref:"upload",staticClass:"upload-box",class:e.fileList.length>0?"":"empty",attrs:{action:"","on-preview":e.handlePreview,"on-remove":e.handleRemove,"file-list":e.fileList,limit:1,"on-exceed":e.exceed,"on-change":e.handleElChange,"auto-upload":!1}},[r("el-button",{attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[e._v(e._s(e.showTitle))])],1)],1),e.showLoading||e.showProgress?r("div",{staticClass:"loading-box",on:{click:function(e){return e.stopPropagation(),!1}}},[e.showLoading?r("div",[r("i",{staticClass:"el-icon-loading"}),r("p",[e._v("文件正在上传中...")])]):e._e(),e.showProgress?r("div",{staticClass:"progress-box"},[r("p",[e._v("正在上传中... ")]),r("el-progress",{attrs:{"stroke-linecap":"square","text-inside":!0,"stroke-width":13,percentage:e.percentageNum}})],1):e._e()]):e._e()])}),[],!1,null,null,null);t.a=b.exports},"5b61":function(e,t,r){"use strict";var n=r("eef9");r.n(n).a},6199:function(module,exports,__webpack_require__){(function(process,global){var __WEBPACK_AMD_DEFINE_RESULT__;(function(){"use strict";var root="object"==typeof window?window:{},NODE_JS=!root.JS_SHA1_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;NODE_JS&&(root=global);var COMMON_JS=!root.JS_SHA1_NO_COMMON_JS&&"object"==typeof module&&module.exports,AMD=__webpack_require__("3c35"),HEX_CHARS="0123456789abcdef".split(""),EXTRA=[-2147483648,8388608,32768,128],SHIFT=[24,16,8,0],OUTPUT_TYPES=["hex","array","digest","arrayBuffer"],blocks=[],createOutputMethod=function(e){return function(t){return new Sha1(!0).update(t)[e]()}},createMethod=function(){var e=createOutputMethod("hex");NODE_JS&&(e=nodeWrap(e)),e.create=function(){return new Sha1},e.update=function(t){return e.create().update(t)};for(var t=0;t<OUTPUT_TYPES.length;++t){var r=OUTPUT_TYPES[t];e[r]=createOutputMethod(r)}return e},nodeWrap=function(method){var crypto=eval("require('crypto')"),Buffer=eval("require('buffer').Buffer"),nodeMethod=function(e){if("string"==typeof e)return crypto.createHash("sha1").update(e,"utf8").digest("hex");if(e.constructor===ArrayBuffer)e=new Uint8Array(e);else if(void 0===e.length)return method(e);return crypto.createHash("sha1").update(new Buffer(e)).digest("hex")};return nodeMethod};function Sha1(e){e?(blocks[0]=blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0,this.blocks=blocks):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],this.h0=1732584193,this.h1=4023233417,this.h2=2562383102,this.h3=271733878,this.h4=3285377520,this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0}Sha1.prototype.update=function(e){if(!this.finalized){var t="string"!=typeof e;t&&e.constructor===root.ArrayBuffer&&(e=new Uint8Array(e));for(var r,n,i=0,a=e.length||0,s=this.blocks;i<a;){if(this.hashed&&(this.hashed=!1,s[0]=this.block,s[16]=s[1]=s[2]=s[3]=s[4]=s[5]=s[6]=s[7]=s[8]=s[9]=s[10]=s[11]=s[12]=s[13]=s[14]=s[15]=0),t)for(n=this.start;i<a&&n<64;++i)s[n>>2]|=e[i]<<SHIFT[3&n++];else for(n=this.start;i<a&&n<64;++i)(r=e.charCodeAt(i))<128?s[n>>2]|=r<<SHIFT[3&n++]:r<2048?(s[n>>2]|=(192|r>>6)<<SHIFT[3&n++],s[n>>2]|=(128|63&r)<<SHIFT[3&n++]):r<55296||r>=57344?(s[n>>2]|=(224|r>>12)<<SHIFT[3&n++],s[n>>2]|=(128|r>>6&63)<<SHIFT[3&n++],s[n>>2]|=(128|63&r)<<SHIFT[3&n++]):(r=65536+((1023&r)<<10|1023&e.charCodeAt(++i)),s[n>>2]|=(240|r>>18)<<SHIFT[3&n++],s[n>>2]|=(128|r>>12&63)<<SHIFT[3&n++],s[n>>2]|=(128|r>>6&63)<<SHIFT[3&n++],s[n>>2]|=(128|63&r)<<SHIFT[3&n++]);this.lastByteIndex=n,this.bytes+=n-this.start,n>=64?(this.block=s[16],this.start=n-64,this.hash(),this.hashed=!0):this.start=n}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},Sha1.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var e=this.blocks,t=this.lastByteIndex;e[16]=this.block,e[t>>2]|=EXTRA[3&t],this.block=e[16],t>=56&&(this.hashed||this.hash(),e[0]=this.block,e[16]=e[1]=e[2]=e[3]=e[4]=e[5]=e[6]=e[7]=e[8]=e[9]=e[10]=e[11]=e[12]=e[13]=e[14]=e[15]=0),e[14]=this.hBytes<<3|this.bytes>>>29,e[15]=this.bytes<<3,this.hash()}},Sha1.prototype.hash=function(){var e,t,r=this.h0,n=this.h1,i=this.h2,a=this.h3,s=this.h4,o=this.blocks;for(e=16;e<80;++e)t=o[e-3]^o[e-8]^o[e-14]^o[e-16],o[e]=t<<1|t>>>31;for(e=0;e<20;e+=5)r=(t=(n=(t=(i=(t=(a=(t=(s=(t=r<<5|r>>>27)+(n&i|~n&a)+s+1518500249+o[e]<<0)<<5|s>>>27)+(r&(n=n<<30|n>>>2)|~r&i)+a+1518500249+o[e+1]<<0)<<5|a>>>27)+(s&(r=r<<30|r>>>2)|~s&n)+i+1518500249+o[e+2]<<0)<<5|i>>>27)+(a&(s=s<<30|s>>>2)|~a&r)+n+1518500249+o[e+3]<<0)<<5|n>>>27)+(i&(a=a<<30|a>>>2)|~i&s)+r+1518500249+o[e+4]<<0,i=i<<30|i>>>2;for(;e<40;e+=5)r=(t=(n=(t=(i=(t=(a=(t=(s=(t=r<<5|r>>>27)+(n^i^a)+s+1859775393+o[e]<<0)<<5|s>>>27)+(r^(n=n<<30|n>>>2)^i)+a+1859775393+o[e+1]<<0)<<5|a>>>27)+(s^(r=r<<30|r>>>2)^n)+i+1859775393+o[e+2]<<0)<<5|i>>>27)+(a^(s=s<<30|s>>>2)^r)+n+1859775393+o[e+3]<<0)<<5|n>>>27)+(i^(a=a<<30|a>>>2)^s)+r+1859775393+o[e+4]<<0,i=i<<30|i>>>2;for(;e<60;e+=5)r=(t=(n=(t=(i=(t=(a=(t=(s=(t=r<<5|r>>>27)+(n&i|n&a|i&a)+s-1894007588+o[e]<<0)<<5|s>>>27)+(r&(n=n<<30|n>>>2)|r&i|n&i)+a-1894007588+o[e+1]<<0)<<5|a>>>27)+(s&(r=r<<30|r>>>2)|s&n|r&n)+i-1894007588+o[e+2]<<0)<<5|i>>>27)+(a&(s=s<<30|s>>>2)|a&r|s&r)+n-1894007588+o[e+3]<<0)<<5|n>>>27)+(i&(a=a<<30|a>>>2)|i&s|a&s)+r-1894007588+o[e+4]<<0,i=i<<30|i>>>2;for(;e<80;e+=5)r=(t=(n=(t=(i=(t=(a=(t=(s=(t=r<<5|r>>>27)+(n^i^a)+s-899497514+o[e]<<0)<<5|s>>>27)+(r^(n=n<<30|n>>>2)^i)+a-899497514+o[e+1]<<0)<<5|a>>>27)+(s^(r=r<<30|r>>>2)^n)+i-899497514+o[e+2]<<0)<<5|i>>>27)+(a^(s=s<<30|s>>>2)^r)+n-899497514+o[e+3]<<0)<<5|n>>>27)+(i^(a=a<<30|a>>>2)^s)+r-899497514+o[e+4]<<0,i=i<<30|i>>>2;this.h0=this.h0+r<<0,this.h1=this.h1+n<<0,this.h2=this.h2+i<<0,this.h3=this.h3+a<<0,this.h4=this.h4+s<<0},Sha1.prototype.hex=function(){this.finalize();var e=this.h0,t=this.h1,r=this.h2,n=this.h3,i=this.h4;return HEX_CHARS[e>>28&15]+HEX_CHARS[e>>24&15]+HEX_CHARS[e>>20&15]+HEX_CHARS[e>>16&15]+HEX_CHARS[e>>12&15]+HEX_CHARS[e>>8&15]+HEX_CHARS[e>>4&15]+HEX_CHARS[15&e]+HEX_CHARS[t>>28&15]+HEX_CHARS[t>>24&15]+HEX_CHARS[t>>20&15]+HEX_CHARS[t>>16&15]+HEX_CHARS[t>>12&15]+HEX_CHARS[t>>8&15]+HEX_CHARS[t>>4&15]+HEX_CHARS[15&t]+HEX_CHARS[r>>28&15]+HEX_CHARS[r>>24&15]+HEX_CHARS[r>>20&15]+HEX_CHARS[r>>16&15]+HEX_CHARS[r>>12&15]+HEX_CHARS[r>>8&15]+HEX_CHARS[r>>4&15]+HEX_CHARS[15&r]+HEX_CHARS[n>>28&15]+HEX_CHARS[n>>24&15]+HEX_CHARS[n>>20&15]+HEX_CHARS[n>>16&15]+HEX_CHARS[n>>12&15]+HEX_CHARS[n>>8&15]+HEX_CHARS[n>>4&15]+HEX_CHARS[15&n]+HEX_CHARS[i>>28&15]+HEX_CHARS[i>>24&15]+HEX_CHARS[i>>20&15]+HEX_CHARS[i>>16&15]+HEX_CHARS[i>>12&15]+HEX_CHARS[i>>8&15]+HEX_CHARS[i>>4&15]+HEX_CHARS[15&i]},Sha1.prototype.toString=Sha1.prototype.hex,Sha1.prototype.digest=function(){this.finalize();var e=this.h0,t=this.h1,r=this.h2,n=this.h3,i=this.h4;return[e>>24&255,e>>16&255,e>>8&255,255&e,t>>24&255,t>>16&255,t>>8&255,255&t,r>>24&255,r>>16&255,r>>8&255,255&r,n>>24&255,n>>16&255,n>>8&255,255&n,i>>24&255,i>>16&255,i>>8&255,255&i]},Sha1.prototype.array=Sha1.prototype.digest,Sha1.prototype.arrayBuffer=function(){this.finalize();var e=new ArrayBuffer(20),t=new DataView(e);return t.setUint32(0,this.h0),t.setUint32(4,this.h1),t.setUint32(8,this.h2),t.setUint32(12,this.h3),t.setUint32(16,this.h4),e};var exports=createMethod();COMMON_JS?module.exports=exports:(root.sha1=exports,AMD&&(__WEBPACK_AMD_DEFINE_RESULT__=function(){return exports}.call(exports,__webpack_require__,exports,module),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)))})()}).call(this,__webpack_require__("4362"),__webpack_require__("c8ba"))},eef9:function(e,t,r){}}]);