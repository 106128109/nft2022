<template>
	<view class="content">
		<view class="tBox">
			<view class="msg"> 手机号注册 </view>
			<!-- <view class="sMsg">重置之前的密码,设置新密码备份</view> -->
		</view>
		<view class="iptItem">
			<view class="iptBox flexBox">
				<input v-model="phone" maxlength="11" type="number" placeholder="请输入手机号" class="ipt"
					placeholder-class="iptP" />
			</view>
		</view>
		<view class="iptItem">
			<view class="iptBox flexBox">
				<input v-model='code' type="number" placeholder="请输入验证码" class="ipt" placeholder-class="iptP" />

				<!-- #ifdef  H5 -->
				<view id="btn" class="codeBtn">{{btnMsg}}</view>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<view class="codeBtn" @tap="getCode">{{btnMsg}}</view>
				<!-- #endif -->
			</view>
		</view>
		<view class="iptItem ">
			<view class="iptBox flexBox" v-if="!flag">
				<input v-model='password' type="password" placeholder="请输入登录密码" class="ipt" placeholder-class="iptP" />
				<image @tap="flag=!flag" class="rightIcon" src="../../static/img/nosee.png" mode=""></image>
			</view>
			<view class="iptBox flexBox" v-if="flag">
				<input v-model='password' type="text" placeholder="请输入登录密码" class="ipt" placeholder-class="iptP" />
				<image @tap="flag=!flag" class="rightIcon" src="../../static/img/see.png" mode=""></image>
			</view>
		</view>
		<view class="iptItem">
			<view class="iptBox flexBox" v-if="!flag1">
				<input v-model='password_re' type="password" placeholder="请再次输入登录密码" class="ipt"
					placeholder-class="iptP" />
				<image @tap="flag1=!flag1" class="rightIcon" src="../../static/img/nosee.png" mode=""></image>
			</view>
			<view class="iptBox flexBox" v-if="flag1">
				<input v-model="password_re" type="text" placeholder="请再次输入登录密码" class="ipt" placeholder-class="iptP" />
				<image @tap="flag1=!flag1" class="rightIcon" src="../../static/img/see.png" mode=""></image>
			</view>
		</view>
		<view class="iptItem">
			<view class="iptBox flexBox">
				<input v-model="uuid" type="text" :disabled="disabled" placeholder="请输入邀请码（选填）" class="ipt"
					placeholder-class="iptP" />
			</view>
		</view>
		<view class="psdBox flexBox">

			<image @tap="isRed = !isRed" v-if="!isRed" class="rememberIcon" src="../../static/img/my/uncheckIcon.png"
				mode=""></image>
			<image @tap="isRed = !isRed" v-if="isRed" class="rememberIcon" src="../../static/img/my/checkIcon.png"
				mode=""></image>
			<view class="remeberBox">
				<view @tap="isRed = !isRed">我已阅读并同意</view>
				<view class="red" @tap="go('privacyPolicy?type=1')">《用户协议》</view>
				<view class="red" @tap="go('privacyPolicy?type=2')">《隐私政策》</view>
			</view>
		</view>

		<view @tap="sub" class="subBtn">立即注册</view>
		<!-- <view class="subBtn1 flexBox">
			<image src="../../static/img/login/weixin1.png" mode=""></image>
			<view class="" @tap="go('bindPhone')">微信号注册</view>
		</view> -->

		<view class="loginBox flex_ct" @tap="go('login')">已有账号? <text>直接登录</text></view>

	</view>
</template>

<script>
	import md5 from '@/common/md5.min.js';
	export default {
		data() {
			return {
				phone: '',
				code: '',
				password: '',
				password_re: '',
				uuid: '',
				btnMsg: '获取验证码',
				tim: '',
				goods_id: null,
				flag: false,
				flag1: false,
				disabled: false,
				isRed: false
			}
		},
		onShow() {},
		onLoad(e) {
			if (e.invite) {
				this.uuid = e.invite;
				this.disabled = true;
			}
			if (e.goods_id) {
				this.goods_id = e.goods_id;
			}
		},
		mounted() {
			// #ifdef  H5
			let that = this;
			var script = document.createElement('script');
			script.src = "https://static.geetest.com/v4/gt4.js";
			document.body.appendChild(script);
			script.onload = script.onreadystatechange = function() {
				initGeetest4({
					captchaId: '81d8a54c8db56db9b02c2ab011ac6a60',
					product: 'bind'
				}, function(captcha) {
					console.log(captcha)
					//captcha.appendTo("#captcha"); // 调用appendTo将验证码插入到页的某一个元素中，这个元素用户可以自定义
					document.getElementById('btn').addEventListener('click', function() {
						//if (check()) { // 检查是否可以进行提交
						if (that.tim != '') {
							return;
						}
						if (!that.phone) {
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
		methods: {
			sub() {
				if (!this.phone) {
					this.toast('请输入正确的手机号码');
					return;
				}
				if (!this.code) {
					this.toast('请输入验证码');
					return;
				}
				if (!this.password) {
					this.toast('请输入登录密码');
					return;
				}
				if (!this.password_re) {
					this.toast('请再次输入登录密码');
					return;
				}
				if (this.password_re != this.password) {
					this.toast('两次密码输入不一致');
					return;
				}
				if (!this.isRed) {
					this.toast('请阅读并同意协议');
					return;
				}
				// if (!this.uuid) {
				// 	this.toast('请输入邀请码');
				// 	return;
				// }
				const data = {
					phone: this.phone,
					code: this.code,
					password: this.password,
					password_re: this.password_re,
					uuid: this.uuid
				};
				if (this.goods_id) {
					data.goods_id = this.goods_id;
				}
				this.$http.post('login/register', data).then(res => {
					if (res.code == 1) {
						this.toast(res.msg)
						setTimeout(() => {
							uni.reLaunch({
								url: 'login'
							})
						}, 1000)
					} else {
						this.toast(res.msg)
					}
				})
			},
			getCode() {

				
				if (this.tim != '') {
					return;
				}
				if (!this.phone) {
					this.toast('请输入正确的手机号码');
					return;
				}
				var key = 'Mibai699SETdDEkdhKEHkdhkDhekb12DIdhk';
				var type = '1';
				var sign = md5(this.phone+type+key);
				this.$http.post('login/sendCode', {
					phone: this.phone,
					type: '1',
					sign:sign
				}).then(res => {
					if (res.code == 1) {
						this.toast(res.msg);
						this.tim = 120;
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
			}
		}
	}
</script>
<style lang="scss" scoped>
	.content {
		position: relative;
		padding: 0 30rpx;

		.tBox {
			padding: 30rpx 0;

			.msg {
				font-size: 46rpx;
				font-weight: 500;
				color: #000;
			}

			.sMsg {
				font-size: 24rpx;
				// margin-bottom: 100rpx;
				color: #AAAAAA;
			}
		}

		.loginBox {
			margin-top: 30rpx;
			width: 100%;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 24rpx;
			color: #aaaaaa;

			text {
				color: #F0BA55;
			}
		}

		.iptItem {

			.label {
				color: #FFFFFF;
				font-size: 26rpx;
				font-weight: 500;
				margin-bottom: 10rpx;
			}

			.iptBox {
				padding: 0 30rpx;
				// background: #383B3F;
				height: 112rpx;
				// border-radius: 50rpx;
				font-size: 30rpx;
				border-bottom: 1rpx solid #999999;

				.left {
					color: #AAAAAA;
					margin-right: 40rpx;
				}

				.ipt {
					flex: 1;
					height: 100%;
					font-size: 30rpx;
					font-weight: 500;
					color: #000;
				}

				.iptP {
					color: #AAAAAA;
					font-size: 30rpx;
					font-weight: 500;
				}

				.rightIcon {
					width: 48rpx;
					height: 48rpx;
					padding: 10rpx;
				}

				.codeBtn {
					width: 220rpx;
					height: 68rpx;
					line-height: 68rpx;
					text-align: center;
					border-radius: 34rpx;
					font-size: 30rpx;
					font-weight: 500;
					color: #F0BA3A;
				}
			}
		}

		.psdBox {
			margin-top: 20rpx;
			width: 100%;
			height: 60rpx;
			line-height: 60rpx;

			.rememberIcon {
				width: 32rpx;
				height: 32rpx;
				padding: 10rpx;
			}

			.remeberBox {
				display: flex;
				color: #AAAAAA;
				font-size: 24rpx;
				font-weight: 400;

				.red {
					color: #F0BA55;
				}
			}

		}

		.subBtn,
		.subBtn1 {
			margin-top: 30rpx;
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			border-radius: 50rpx;
			color: #000000;
			font-size: 32rpx;
			font-weight: 500;
			background: #FFF1AC;
			box-shadow: 0rpx 8rpx 40rpx 0rpx rgba(174, 53, 35, 0.4);
		}

		.subBtn1 {
			color: #777777;
			background: #FFFFFF;
			border: none;
			box-shadow: none;
			margin: 0 auto;
			justify-content: center;

			image {
				width: 40rpx;
				height: 32rpx;
				margin-right: 20rpx;
			}
		}
	}
</style>
