(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-myInfo"],{"0d8d":function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,"uni-page-body[data-v-4da91867]{\n\t/* background-color: #23272C; */}",""]),t.exports=e},"255d":function(t,e,n){"use strict";n.r(e);var a=n("2bf6"),i=n("c306");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("fc28"),n("a22e");var s,c=n("f0c5"),r=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,"4da91867",null,!1,a["a"],s);e["default"]=r.exports},"2bf6":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"content"},[a("v-uni-view",{staticClass:"line"}),a("v-uni-view",{staticClass:"iptBox flexBox"},[a("v-uni-view",{staticClass:"label"},[t._v("头像")]),a("v-uni-view",{staticClass:"rBox flexBox"},[a("v-uni-image",{staticClass:"headIcon",attrs:{src:t.showSrc,mode:"aspectFill"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.chooseImg()}}})],1)],1),a("v-uni-view",{staticClass:"iptBox flexBox",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.go("SetNickname?name="+t.userInfo.nick_name)}}},[a("v-uni-view",{staticClass:"label"},[t._v("昵称")]),a("v-uni-view",{staticClass:"rBox flexBox"},[a("v-uni-view",{},[t._v(t._s(t.userInfo.nick_name))]),a("v-uni-image",{staticClass:"arrowIcon",attrs:{src:n("ec51"),mode:""}})],1)],1),a("v-uni-view",{staticClass:"iptBox flexBox"},[a("v-uni-view",{staticClass:"label"},[t._v("手机号")]),a("v-uni-view",{staticClass:"rBox flexBox"},[a("v-uni-view",{},[t._v(t._s(t.userInfo.phone))])],1)],1),a("v-uni-view",{staticClass:"iptBox flexBox",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.go("SetLoginPsd")}}},[a("v-uni-view",{staticClass:"label"},[t._v("修改密码")]),a("v-uni-view",{staticClass:"rBox flexBox"},[a("v-uni-view",{}),a("v-uni-image",{staticClass:"arrowIcon",attrs:{src:n("ec51"),mode:""}})],1)],1),a("v-uni-view",{staticClass:"iptBox flexBox",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.go("myCollection")}}},[a("v-uni-view",{staticClass:"label"},[t._v("收款信息")]),a("v-uni-view",{staticClass:"rBox flexBox"},[a("v-uni-view",{}),a("v-uni-image",{staticClass:"arrowIcon",attrs:{src:n("ec51"),mode:""}})],1)],1),a("v-uni-view",{staticClass:"box"},[a("v-uni-view",{staticClass:"p1"},[t._v("文昌(NFT)")]),a("v-uni-view",{staticClass:" iptBox1  flexBox"},[a("v-uni-view",{staticClass:"label"},[t._v("我的地址")]),a("v-uni-view",{staticClass:"center"},[t._v(t._s(t.userInfo.wallet_address)),a("v-uni-image",{staticClass:"copy",attrs:{src:n("cae3"),mode:""},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.copy(t.userInfo.wallet_address)}}})],1)],1),a("v-uni-view",{staticClass:" iptBox1  flexBox"},[a("v-uni-view",{staticClass:"label"},[t._v("我的私钥")]),a("v-uni-view",{staticClass:"center"},[t._v(t._s(t.userInfo.wallet_private_key)),a("v-uni-image",{staticClass:"copy",attrs:{src:n("cae3"),mode:""},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.copy(t.userInfo.wallet_private_key)}}})],1)],1),a("v-uni-view",{staticClass:" iptBox1  flexBox"},[a("v-uni-view",{staticClass:"label"},[t._v("我的公钥")]),a("v-uni-view",{staticClass:"center"},[t._v(t._s(t.userInfo.wallet_public_key)),a("v-uni-image",{staticClass:"copy",attrs:{src:n("cae3"),mode:""},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.copy(t.userInfo.wallet_public_key)}}})],1)],1)],1)],1)},o=[]},3669:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{showSrc:"",userInfo:{}}},onShow:function(){this.getMemInfo()},onLoad:function(){},methods:{show:function(t){var e=this;uni.previewImage({urls:[t],longPressActions:{itemList:["更换图片","保存图片"],success:function(n){1===n.tapIndex?(console.log(n.tapIndex),uni.saveImageToPhotosAlbum({filePath:t,success:function(){uni.showToast({title:"保存成功",icon:"none"})}})):(console.log(n.tapIndex),e.chooseImg())},fail:function(t){console.log(t.errMsg)}}})},getMemInfo:function(){var t=this;this.$http.get("user/userInfo").then((function(e){1==e.code&&(t.userInfo=e.data,t.showSrc=e.data.head_image)}))},editInfo:function(){var t=this,e={nick_name:this.userInfo.nick_name,head_image:this.showSrc};this.$http.post("user/editUserInfo",e).then((function(e){1==e.code?(t.toast(e.msg),setTimeout((function(){uni.navigateBack({delta:2})}),1200)):t.toast(e.msg)}))},chooseImg:function(){var t=this;uni.chooseImage({count:1,sizeType:["original"],success:function(e){console.log(e);var n=e.tempFilePaths;uni.uploadFile({url:t.baseUrl+"upload/fileUpload",filePath:n[0],name:"image",header:{token:uni.getStorageSync("token")},success:function(e){var n=JSON.parse(e.data);1==n.code?(t.showSrc=n.data.path,t.editInfo()):t.toast("上传失败")}})}})}}};e.default=a},a22e:function(t,e,n){"use strict";var a=n("d9c3"),i=n.n(a);i.a},a34e:function(t,e,n){var a=n("0d8d");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("cd48c156",a,!0,{sourceMap:!1,shadowMode:!1})},bd14:function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 颜色变量 */\n/*  常用字体颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-textarea[data-v-4da91867]{background-color:#f8f8f8;width:%?650?%;height:%?130?%;display:block;position:relative;font-size:%?28?%;line-height:normal;white-space:pre-wrap;word-break:break-all;padding:%?20?%;color:#777;border-radius:%?10?%}.content .iptBox[data-v-4da91867]{margin:0 %?30?%;height:%?108?%;line-height:%?108?%;border-bottom:%?2?% solid #666262}.content .iptBox .center[data-v-4da91867]{color:#aaa;font-size:%?28?%}.content .iptBox .label[data-v-4da91867]{font-size:%?32?%;color:#000}.content .iptBox .rBox[data-v-4da91867]{justify-content:flex-end;flex:1;color:#aaa;font-size:%?28?%;text-align:right}.content .iptBox .rBox .ipt[data-v-4da91867]{font-size:%?28?%;font-weight:500;font-family:PingFangSC-Medium}.content .iptBox .rBox .headIcon[data-v-4da91867]{width:%?80?%;height:%?80?%;border-radius:50%}.content .iptBox .rBox .arrowIcon[data-v-4da91867]{width:%?44?%;height:%?44?%}.content .line[data-v-4da91867]{height:%?20?%}.content .box[data-v-4da91867]{border-bottom:%?2?% solid #666262}.content .box .p1[data-v-4da91867]{color:#000;height:%?80?%;line-height:%?80?%;margin-left:%?30?%}.content .iptBox1[data-v-4da91867]{height:auto;margin:0 %?30?%;padding:%?30?% 0;line-height:%?44?%}.content .iptBox1 .label[data-v-4da91867]{width:25%;font-size:%?32?%;color:#000}.content .iptBox1 .center[data-v-4da91867]{width:70%;min-height:%?44?%;color:#aaa;font-size:%?28?%;position:relative;word-wrap:break-word;word-break:break-word}.content .iptBox1 .copy[data-v-4da91867]{width:%?44?%;height:%?44?%;position:absolute;bottom:0;right:0}',""]),t.exports=e},c306:function(t,e,n){"use strict";n.r(e);var a=n("3669"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},cae3:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAAAiRJREFUWEftmD1vE0EQht/ZO3CHFBokeoTSUoQK6JAooNuxLZeQgiKpQgdUUEHFhyigobDs7LqkxpCOFFDmHyAhF1GKSBjrbtAiBzmnM769+IQNO+3szjzz7uze6AhLZrRkvAjAVZ9YUDgonFHg/2qJbre7qpRqi8gqkXftXwDcYOYDnzbyzjIZ3BhjAGifhJm1uwCu+0CfFPgjgKsAXgHYLgpORBdE5CWA0wC8oOcCTET3tNZPiwK7dcaYWwCsL/RJgXcAXCkDnAO9wcwvZhVdGLjdbq/UarW1JEncMf4ypdQZETlFRIdpmn7PS+Z8zPx+Gogx5hOANSLa1Fo/nwtwp9M5H0XRZwDnZgXM84vIo3q9/iDPVwmwtfaOiLwGMCKi/aLQIhIDOOvWT4OuCnhDRJ65G83Mlz2AyVrrCr09DXqhgMeQx6AB3Gfmx0dFLxzwEXSv19sWEfeR2WHmawsN7OCstVsi8iQA510oa22pSzcZKyj8p6cqKBxeiUx/hJZYtpZQSr0Tka3xV3AFgBtR17XWb2bNKYXm4Xm3BIAPAB5OwH1LkuRSs9n8upDAcRyvj0ajiw4uiqIfw+Fwt9VqFRpb/4rCk8PPLEWz/n8eeA/AXV9Vxuvr473HxkvfWEUV1iLifprMwywzc9lAhYD7/X48GAzeArjpnqAyyUQERLSXpmmr0Wi4kyplhYBLRa5oUwCuSNjfYYPCQeGMAqElqm6Jn1X+8DxdPqDIAAAAAElFTkSuQmCC"},d9c3:function(t,e,n){var a=n("bd14");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("3f92f7e2",a,!0,{sourceMap:!1,shadowMode:!1})},ec51:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAAAfFJREFUWEft179LI0EUB/Dvm0khXIrAYXWVdhYWltp6goVVskwOksYq4B9wzYEELG2vuOZIcUKW2UDOQmHR7lrLS6WNnYUSSGGxxH0yMooXrhB3FjIw2y3svv3w3Te/CJ5d5JkXAVz2HwsJh4RnEggtEVrCZUskSfKTmSMhxLcoir6Xna6pX6iHtda3AD6aQsy832w2D8pGFwLHcbwjhEgALFjooVLqa5noQmADS5Jkk5l/A6g+/TKiH1EU7RERlwEvDDaofr+/IaU8AVAz90KIX3me7yqlHlyjnYANajAYrOV5ngJYtMghgC9Kqcwl2hnYoOI4XhFCnAH4ZJHpeDyudzqde1dop2CD0lovEdE5My9b5J8sy3ba7fbEBdo52KJNwibpFYu8qFQq2/V6/a4ouhSwRS8SUcrMaxb5F8CWUuqmCLo0sEENh8PadDo9YeYNO+VdZlm21Wq1rt+LLhVsUGmafphMJsfMvPmctFJqNYDfm8Dr93q9Xq1arb60BIArKeXnRqMxfy2htfZn0Gmt/5nWiOhCSjmf05pZOACcA5j/hcOrpdmrzY/Weh3A6fP2koiORqPRbrfbnbqYbV7XKLxweLWB9+6I5N0h1LtjvusB9ZZ6hQfdWz7i8pkAdpnm/2qFhEPCMwmElggtMZPAI+8L0y21rB+pAAAAAElFTkSuQmCC"},fc28:function(t,e,n){"use strict";var a=n("a34e"),i=n.n(a);i.a}}]);