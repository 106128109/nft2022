<template>
	<view class="content">
		<image class="login-logo" src="../../static/img/login/login-logo.png" mode=""></image>

		<view class="formBox">
			<view class="tabBox flexBox">
				<view :class="showType == '1' ? 'tab act' : 'tab'" @tap="reload(1)">密码登录</view>
				<view class="line"></view>
				<view :class="showType == '2' ? 'tab act' : 'tab'" @tap="reload(2)">验证码登录</view>
			</view>

			<block v-if="showType == '1'">
				<view class="iptItem">
					<view class="iptBox flexBox">
						<input v-model="mobile" maxlength="11" type="number" placeholder="请输入手机号" class="ipt"
							placeholder-class="iptP" />
					</view>
				</view>
				<view class="iptItem iptItem1">
					<view class="iptBox flexBox" v-if="!flag">
						<input v-model='password' type="password" placeholder="请输入登录密码" class="ipt"
							placeholder-class="iptP" />
						<image @tap="flag=!flag" class="rightIcon" src="../../static/img/nosee.png" mode=""></image>
					</view>
					<view class="iptBox flexBox" v-if="flag">
						<input v-model='password' type="text" placeholder="请输入登录密码" class="ipt"
							placeholder-class="iptP" />
						<image @tap="flag=!flag" class="rightIcon" src="../../static/img/see.png" mode=""></image>
					</view>

				</view>
				<view class="findpsd flex">
					<view @tap="go('findPsd')" class="">忘记密码</view>
				</view>
				<view @tap="Passwordlogin" class="subBtn">立即登录</view>
				<view class="subBtn1" @tap="go('reg')">新用户注册</view>
			</block>

			<block v-if="showType == '2'">
				<view class="iptItem">
					<view class="iptBox flexBox">
						<input v-model="mobile1" maxlength="11" type="number" placeholder="请输入手机号" class="ipt"
							placeholder-class="iptP" />
					</view>
				</view>
				<view class="iptItem iptItem1">
					<view class="iptBox flexBox">
						<text class=""></text>
						<input v-model='code' type="number" placeholder="请输入验证码" class="ipt" placeholder-class="iptP" />
						<!-- #ifdef  H5 -->
						<view id="btn" class="codeBtn">{{btnMsg}}</view>
						<!-- #endif -->
						<!-- #ifdef APP-PLUS -->
						<view id="btn" class="codeBtn" @tap="getCode()">{{btnMsg}}</view>
						<!-- #endif -->
					</view>
				</view>
				<view class="findpsd flex"> </view>
				<view @tap="Codelogin" class="subBtn">立即登录</view>
				<view class="subBtn1" @tap="go('reg')">新用户注册</view>
			</block>
		</view>
		<div id="captcha"></div>
		<!-- #ifdef APP-PLUS -->
		<!-- <view class="psdBox flex_ct" @tap="weixinLogin">
			<image class="rememberIcon" src="../../static/img/login/weixin.png" mode=""></image>
			<view class="remeberBox">微信授权登录</view>
		</view> -->
		<!-- #endif -->

		<!-- #ifdef MP -->
		<view class="loginBox flex_ct" @tap="go('../index/index')"><text>取消登录</text></view>
		<!-- #endif -->
	</view>
</template>

<script>
		
import md5 from '@/common/md5.min.js';
	export default {
		data() {
			return {
				showType: 2,
				btnMsg: '获取验证码',
				mobile: '',
				password: '',
				mobile1: '',
				code: '',
				flag: false,
				tim: ''
			}
		},
		onLoad() {},
		mounted() {
			// #ifdef  H5
			let that = this;
			var script = document.createElement('script');
			script.src = "https://static.geetest.com/v4/gt4.js";
			document.body.appendChild(script);
			script.onload = script.onreadystatechange = function() {
				initGeetest4({
					captchaId: '81d8a54c8db56db9b02c2ab011ac6a60',
					// captchaId: '647f5ed2ed8acb4be36784e01556bb71',
					product: 'bind'
				}, function(captcha) {
					console.log(captcha)
					//captcha.appendTo("#captcha"); // 调用appendTo将验证码插入到页的某一个元素中，这个元素用户可以自定义
					document.getElementById('btn').addEventListener('click', function() {
						//if (check()) { // 检查是否可以进行提交
						if (that.tim != '') {
							return;
						}
						if (!that.mobile1) {
							that.toast('请输入正确的手机号码');
							return;
						}
						captcha.showCaptcha();
						// }
					});
					captcha.onSuccess(function() { // web端的回调
						var result = captcha.getValidate();
						console.log(result)
						that.$http.post("login/check_login_request", {
							// captcha_id: result.captcha_id,
							captcha_output: result.captcha_output,
							gen_time: result.gen_time,
							lot_number: result.lot_number,
							pass_token: result.pass_token,
						}).then(res => {
							console.log(res);
							if (res.login == "success") {
								that.getCode()
							}else {
								that.toast("验证失败！");
							}
						})
					});

				});
			};
			// #endif
		},
		// onShow() {
		// 	this.md()
		// },
		methods: {
			md(){
				var phone ='18287103239';
				var type = '3';
				var key = 'Mibai699SETdDEkdhKEHkdhkDhekb12DIdhk';
				var sign = md5(phone+type+key);
				console.log('md5',sign);
			},
			weixinLogin() {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						this.$http.post('login/wxAuth', {
							wx_open_id: res.authResult.openid,
							wx_union_id: res.authResult.unionid
						}).then(res => {
							if (res.code == 1) {
								this.toast(res.msg);
								uni.setStorageSync('app_token', res.data.app_token);
								this.getMemInfo();
								setTimeout(() => {
									uni.reLaunch({
										url: '../index/index'
									});
								}, 1000);
							} else {
								this.toast(res.msg);
							}
						})
					},
					fail: (e) => {
						console.log(e);
					}
				});
			},
			reload(n) {
				if (this.showType != n) {
					this.showType = n;
					this.mobile = '';
					this.password = '';
					this.mobile1 = '';
					this.code = '';
				}
			},
			getCode() {
				if (this.tim != '') {
					return;
				}
				if (!this.mobile1) {
					this.toast('请输入正确的手机号码');
					return;
				}
				var key = 'Mibai699SETdDEkdhKEHkdhkDhekb12DIdhk';
				var type = '3';
				var sign = md5(this.mobile1+type+key);
			
				this.$http.post('login/sendCode', {
					phone: this.mobile1,
					type: '3',
					sign: sign
				}).then(res => {
					if (res.code == 1) {
						this.toast(res.msg)
						this.tim = 60;
						let t = setInterval(() => {
							if (this.tim > 0) {
								this.btnMsg = this.tim + 's后重新获取';
								this.tim--;
							} else {
								this.btnMsg = '获取验证码';
								this.tim = '';
								clearInterval(t);
							}
						}, 1000)

					} else {
						this.toast(res.msg)
					}
				})
			},
			Passwordlogin() { //密码登录
				if (!this.mobile) {
					this.toast('请输入正确的手机号码');
					return;
				}
				if (!this.password) {
					this.toast('请输入登录密码');
					return;
				}
				this.$http.post('login/login/', {
					phone: this.mobile,
					password: this.password
				}).then(res => {
					if (res.code == 1) {
						this.toast(res.msg);
						uni.setStorageSync('app_token', res.data.app_token);
						this.getMemInfo();
						setTimeout(() => {
							uni.reLaunch({
								url: '../index/index'
							});
						}, 1000);

					} else {
						this.toast(res.msg);
					}
				})
			},
			Codelogin() {
				if (!this.mobile1) {
					this.toast('请输入正确的手机号码');
					return;
				}
				if (!this.code) {
					this.toast('请输入验证码');
					return;
				}
				this.$http.post('login/codeLogin', {
					phone: this.mobile1,
					code: this.code
				}).then(res => {
					if (res.code == 1) {
						this.toast(res.msg);
						uni.setStorageSync('app_token', res.data.app_token);
						this.getMemInfo();
						setTimeout(() => {
							uni.reLaunch({
								url: '../index/index'
							});
						}, 1000);
					} else {
						this.toast(res.msg);
					}
				})
			},
			getMemInfo() {
				this.$http.get('user/userInfo').then(res => {
					if (res.code == 1) {
						uni.setStorageSync('phone', res.data.phone);
						uni.setStorageSync('wx_auth', res.data.wx_small_auth);
					}
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		/* padding: 0 0 200rpx; */
		/* margin-bottom: 200rpx; */
		overflow: hidden;
		position: relative;

		.login-logo {
			display: block;
			width: 240rpx;
			height: 156rpx;
			margin: 140rpx auto 40rpx;
			// margin-top: 60rpx;
			overflow: hidden;
		}

		.titleBox {
			margin-top: 40rpx;
			width: 100%;
			font-size: 46rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #999999;
			text-align: center;
		}

		.formBox {
			width: 670rpx;
			// background-color: #23272C;
			padding: 0 30rpx;
			// margin-top: -46rpx;
			// border-radius: 60rpx 60rpx 0 0;

			.tabBox {
				margin-top: 20rpx;
				height: 100rpx;
				line-height: 100rpx;
				// margin-bottom: 50rpx;
				// background-color: #23272C;

				.tab {
					text-align: center;
					font-size: 28rpx;
					color: #000;
				}

				.line {
					width: 2rpx;
					height: 36rpx;
					margin: 0 30rpx;
					background-color: #666666;
				}

				.act {
					color: #000;
					font-weight: 600;
				}
			}

			.iptItem {

				.iptBox {
					padding: 0 30rpx;
					height: 112rpx;
					font-size: 32rpx;
					border-bottom: 1rpx solid #CCCCCC;

					.left {
						color: #aaaaaa;
						margin-right: 40rpx;
					}

					.ipt {
						flex: 1;
						height: 100%;
						font-size: 32rpx;
						font-weight: 500;
						color: #000;
					}

					.codeBtn {
						width: 220rpx;
						height: 68rpx;
						line-height: 68rpx;
						text-align: center;
						border-radius: 34rpx;
						font-size: 30rpx;
						font-weight: 500;
						color: #FFF1AC;
					}

					.rightIcon {
						width: 48rpx;
						height: 48rpx;
						padding: 10rpx;
					}
				}
			}

			.iptItem1 {
				margin-bottom: 0rpx;
			}

			.findpsd {
				height: 60rpx;
				line-height: 60rpx;
				justify-content: flex-end;
				color: #777777;
				font-size: 28rpx;
			}
		}

		.psdBox {
			width: 100%;
			position: absolute;
			left: 0;
			bottom: 50rpx;

			.rememberIcon {
				width: 44rpx;
				height: 44rpx;
				padding: 20rpx;
			}

			.remeberBox {
				color: #777777;
				font-size: 24rpx;
				font-weight: 400;
			}
		}

		.subBtn {
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			border-radius: 50rpx;
			color: #000000;
			font-size: 32rpx;
			font-weight: 500;
			margin-top: 30rpx;
			background: #FFF1AC;
			box-shadow: 0rpx 8rpx 40rpx 0rpx rgba(174, 53, 35, 0.4);
		}

		.subBtn1 {
			width: 600rpx;
			text-align: center;
			color: #777777;
			font-size: 32rpx;
			font-weight: 500;
			margin: 40rpx auto 0;
		}

		.loginBox {
			position: absolute;
			left: 0;
			bottom: 50rpx;
			width: 100%;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 24rpx;
			color: #aaaaaa;

			text {
				color: #AE3523;
			}
		}
	}
</style>
