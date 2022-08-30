import Vue from 'vue'
import App from './App'
import util from "@/common/util.js"
import http from "@/common/http.js"
import uView from "uview-ui";
Vue.prototype.baseUrl = http.baseUrl;

Vue.prototype.staticUrl = '../../';

//是否第一次进入
Vue.prototype.isFirstEnter = true;
//挂在到Vue原型链上
Vue.prototype.util = util;
Vue.prototype.$http = http;

Vue.prototype.getToken = function() {
	let token = '';
	try {
		const value = uni.getStorageSync('token');
		if (value) {
			token = value;
		}
	} catch (e) {
		// error
	}
	return token;
}
Vue.prototype.getmemID = function() {
	let token = '';
	try {
		const value = uni.getStorageSync('memID');
		if (value) {
			token = value;
		}
	} catch (e) {
		// error
	}
	return token;
}
Vue.prototype.go = function(url) {
	uni.navigateTo({
		url: url
	});
}
Vue.prototype.goRedirect = function(url) {
	uni.redirectTo({
		url: url
	});
}
Vue.prototype.switchTab = (url) => {
	uni.switchTab({
		url: url
	})
}
//跳转外部连接
Vue.prototype.goExternalLink = function(url) {
	if (url.includes('https://') || url.includes('http://')) {
		location.href = url;
	} else {
		location.href = 'http://' + url;
	}
}
Vue.prototype.toast = function(msg) {
	uni.showToast({
		icon: 'none',
		title: msg
	});
}
Vue.prototype.confirm = function(tit, msg, success, cancel) {
	uni.showModal({
		title: tit || '提示',
		content: msg || '',
		success: (res)=> {
			if (res.confirm) {
				success();
			} else if (res.cancel) {
				cancel ? cancel() : '';
			}
		}
	});
}

Vue.prototype.showImgs = function(imgs) {
	
	uni.previewImage({
		urls: [imgs],
		longPressActions: {
			itemList: ['更换图片', '保存图片'],
			success: function(data) {
				console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				if(data.tapIndex == 0){
					
					
				} else if(data.tapIndex == 1){
					uni.saveImageToPhotosAlbum({
						filePath: res.tempFilePath,
						success: ()=> {
							uni.showToast({
								title: '保存成功',
								icon: "none"
							});
						}
					})
					
				}
			},
			fail: function(err) {
				console.log(err.errMsg);
			}
		}
	});
}

import h5Copy from 'static/js/junyi-h5-copy.js'

Vue.prototype.copy = function(code) {
	let content = code; // 复制内容，必须字符串，数字需要转换为字符串
	// #ifdef APP-PLUS || MP-WEIXIN
	uni.setClipboardData({
		data: content,
		success: function() {
			uni.showToast({
				title: '复制成功',
				icon: 'none'
			})
		},
	});
	// #endif
	// #ifdef H5
	const result = h5Copy(content)
	if (result === true) {
		uni.showToast({
			title: '复制成功',
			icon: 'none'
		})
	} else {
		uni.showToast({
			title: '复制失败',
			icon: 'none'
		})
	}
	// #endif
};

Vue.prototype.back = function() {
	//#ifdef H5
	window.history.back()
	//#endif
	//#ifdef APP-PLUS
	uni.navigateBack({
		delta: 1
	})
	//#endif
};

//加 
Vue.prototype.floatPlus = function(arg1, arg2) {
	var r1, r2, m;
	try {
		r1 = arg1.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2));
	return (arg1 * m + arg2 * m) / m;
}

//减  
Vue.prototype.floatSub = function(arg1, arg2) {
	var r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2));
	//动态控制精度长度    
	n = (r1 >= r2) ? r1 : r2;
	return (arg1 * m - arg2 * m) / m;
}

//乘    
Vue.prototype.floatMul = function(arg1, arg2) {
	var m = 0,
		s1 = arg1.toString(),
		s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length
	} catch (e) {}
	try {
		m += s2.split(".")[1].length
	} catch (e) {}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

//除   
Vue.prototype.floatDiv = function(arg1, arg2) {
	var t1 = 0,
		t2 = 0,
		r1, r2;
	try {
		t1 = arg1.toString().split(".")[1].length
	} catch (e) {}
	try {
		t2 = arg2.toString().split(".")[1].length
	} catch (e) {}

	r1 = Number(arg1.toString().replace(".", ""));

	r2 = Number(arg2.toString().replace(".", ""));
	return (r1 / r2) * Math.pow(10, t2 - t1);
}

Vue.config.productionTip = false
Vue.use(uView);
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
