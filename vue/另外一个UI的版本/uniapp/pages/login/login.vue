<template>
	<view class="page">
		<view class="content">
			<!-- <image class="bjImg" src="../../static/img/login/bj.png" mode=""></image> -->
			<view class="titleBox flexBox">
				<view class="">
					<view class="title">欢迎来到</view>
					<view class="title">星核! </view>
				</view>
			</view>
			<view class="formBox">
				<view class="tabBox flexBox">
					<view :class="showType == '1' ? 'tab act' : 'tab'" @tap="reload(1)">密码登录</view>
					<view class="line"></view>
					<view :class="showType == '2' ? 'tab act' : 'tab'" @tap="reload(2)">验证码登录</view>
				</view>
		
				<block v-if="showType == '1'">
					<view class="iptItem">
						<view class="label">手机号</view>
						<view class="iptBox flexBox">
							<text class="left">+86</text>
							<input v-model="mobile" maxlength="11" type="number" placeholder="请输入手机号" class="ipt"
								placeholder-class="iptP" />
						</view>
					</view>
					<view class="iptItem iptItem1">
						<view class="label">密码</view>
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
					<view class="move-ver">
						<move-verify @result='verifyResult' ref="verifyElement"></move-verify>
					</view>
					<view @tap="Passwordlogin" class="subBtn">立即登录</view>
					<view class="subBtn1" @tap="go('reg')">新用户注册</view>
				</block>
		
				<block v-if="showType == '2'">
					<view class="iptItem">
						<view class="label">手机号</view>
						<view class="iptBox flexBox">
							<text class="left">+86</text>
							<input v-model="mobile1" maxlength="11" type="number" placeholder="请输入手机号" class="ipt"
								placeholder-class="iptP" />
						</view>
					</view>
					<view class="iptItem iptItem1">
						<view class="label">验证码</view>
						<view class="iptBox flexBox">
							<text class=""></text>
							<input v-model='code' type="number" placeholder="请输入验证码" class="ipt" placeholder-class="iptP" />
							<view class="codeBtn" @tap="getCode">{{btnMsg}}</view>
						</view>
					</view>
					<view class="findpsd flex"> </view>
					<view @tap="Codelogin" class="subBtn">立即登录</view>
					<view class="subBtn1" @tap="go('reg')">新用户注册</view>
				</block>
			</view>
			
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
	</view>
</template>

<script>
	import moveVerify from "@/components/helang-moveVerify/helang-moveVerify.vue"
	export default {
		 components: {
			"move-verify":moveVerify
		},
		data() {
			return {
				showType: 1,
				btnMsg: '获取验证码',
				mobile: '',
				password: '',
				mobile1: '',
				code: '',
				flag: false,
				tim: '',
				resultData: false
			}
		},
		onLoad() {},
		methods: {
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
					fail:(e) =>{
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
				this.$http.post('login/sendCode', {
					phone: this.mobile1,
					type: '3'
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
				if (!this.resultData) {
					this.toast('请完成滑动验证');
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
						this.verifyReset()
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
			getMemInfo(){
				this.$http.get('user/userInfo').then(res => {
					if (res.code == 1) {
						uni.setStorageSync('phone', res.data.phone);
						uni.setStorageSync('wx_auth', res.data.wx_small_auth);
					}
				})
			},
			verifyResult(res){
				this.resultData = res.flag;
				// this.toast('请完成滑动验证')
			},
			verifyReset(){
				this.$refs.verifyElement.reset();
				/* 删除当前页面的数据 */
				this.resultData = false;
			}
		}
	}
</script>
<style>
	page {
		background-color: #23272C;
	}
</style>
<style lang="scss" scoped>
	.page{
		height: 100vh;
		background-image: url(@/static/img/login/bg.png);
		background-size: 100%  auto;
		background-repeat: no-repeat;
	}
	.move-ver {
		margin-top: 30rpx;
	}
	.content {
		
		/* padding: 0 0 200rpx; */
		/* margin-bottom: 200rpx; */
		position: relative;
		.bjImg{
			width: 100%;
			height: 520rpx;
			position: absolute;
			top: 0rpx;
			left: 0;
			z-index: -1;
		}

		.titleBox {
			width: 100%;
			height: 420rpx;
			.title {
				font-size: 50rpx;
				font-weight: 500;
				color: #FFDD9D;
				margin-left: 40rpx;
			}
		}

		.formBox {
			width: 670rpx;
			margin: 0 auto;
			background-color: #23272C;
			padding: 40rpx;
			border-radius: 60rpx 60rpx 0 0;

			.tabBox {
				height: 100rpx;
				line-height: 100rpx;
				margin-bottom: 50rpx;
				background-color: #23272C;

				.tab {
					text-align: center;
					font-size: 30rpx;
					color: #AAAAAA;
				}

				.line {
					width: 2rpx;
					height: 36rpx;
					margin: 0 30rpx;
					background-color: #EEEEEE;
				}

				.act {
					color: #00D18B;
					font-weight: 500;
				}
			}

			.iptItem {
				margin-bottom: 40rpx;

				.label {
					color: #FFFFFF;
					font-size: 26rpx;
					font-weight: 500;
					margin-bottom: 20rpx;
				}

				.iptBox {
					padding: 0 30rpx;
					background: #383B3F;
					height: 112rpx;
					border-radius: 56rpx;
					font-size: 32rpx;

					.left {
						color: #aaaaaa;
						margin-right: 40rpx;
					}

					.ipt {
						flex: 1;
						height: 100%;
						font-size: 32rpx;
						font-weight: 500;
						color: #AAAAAA;
					}

					.codeBtn {
						width: 220rpx;
						height: 68rpx;
						line-height: 68rpx;
						text-align: center;
						border-radius: 34rpx;
						font-size: 30rpx;
						font-weight: 500;
						color: #F0BA55;
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
			bottom: 550rpx;

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
			width: 600rpx;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			border-radius: 50rpx;
			color: #fff;
			font-size: 32rpx;
			font-weight: 500;
			margin: 50upx auto 0;
			background: linear-gradient(90deg, #00D18B 0%, #00D18B 100%);
			box-shadow: 0rpx 8rpx 40rpx 0rpx rgba(159, 255, 109, 0.4);
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
