let baseUrl
if (process.env.NODE_ENV === 'development') {
	//本地路径
	//baseUrl = '/dpc/';
	baseUrl = 'http://123.56.73.162:91/api/'
} else {
	//线上路径
	baseUrl = 'http://123.56.73.162:91/api/'
}
const post = (url, data, hideloding) => {

	let token = ''
	try {
		token = uni.getStorageSync("app_token")
	} catch (e) {}

	let httpDefaultOpts = {
		url: baseUrl + url,
		data: data,
		method: "POST",
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
			'token': token
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
		
			(res) => {
				console.log(res.code)
				if (res[1].data.code == 401) {
					uni.showToast({
						title: "请先登录",
						icon: "none",
					})
					setTimeout(() => {
						uni.navigateTo({
							url: "/pages/login/login"
						})
					}, 1000)
					return
				} else if (res[1].data.code == 402) {
					uni.showToast({
						title: "请先设置交易密码",
						icon: "none",
					})
					setTimeout(() => {
						uni.navigateTo({
							url: "/pages/my/SetPayPsd"
						})
					}, 1000)
				} else if (res[1].data.code == 403) {
					uni.showToast({
						title: "请先绑定手机号",
						icon: "none",
					})
					setTimeout(() => {
						uni.navigateTo({
							url: "/pages/login/bindPhone.vue"
						})
					}, 1000)
				} else {
					resolve(res[1].data)
				}
			}
		)
	})
	return promise
};
const get = (url, data, hideloding) => {
	let httpDefaultOpts = ''
	let token = ''
	try {
		token = uni.getStorageSync("app_token")
	} catch (e) {}
	httpDefaultOpts = {
		url: baseUrl + url,
		method: "GET",
		data: data,
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
			'token': token
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				console.log(res)
				if (res[1].data.code == 401) {
					uni.showToast({
						title: "请先登录",
						icon: "none",
					})
					setTimeout(() => {
						uni.navigateTo({
							url: "/pages/login/login"
						})
					}, 1000)
					
				} else if (res[1].data.code == 402) {
					uni.showToast({
						title: "请先设置支付密码",
						icon: "none",
					})
					setTimeout(() => {
						uni.navigateTo({
							url: "/pages/my/SetPayPsd"
						})
					}, 1000)
				} else if (res[1].data.code == 403) {
					uni.showToast({
						title: "请先绑定手机号",
						icon: "none",
					})
					setTimeout(() => {
						uni.navigateTo({
							url: "/pages/login/bindPhone"
						})
					}, 1000)
				} else {
					resolve(res[1].data)
				}
			}
		)
	})
	return promise
};
export default {
	post,
	get,baseUrl
}
