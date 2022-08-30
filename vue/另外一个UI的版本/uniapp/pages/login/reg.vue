<template>
	<view class="content">
		<view class="tBox">
			<view class="msg"> 手机号注册 </view>
			<!-- <view class="sMsg">重置之前的密码,设置新密码备份</view> -->
		</view>
		<view class="iptItem">
			<view class="label">手机号</view>
			<view class="iptBox flexBox">
				<text class="left">+86</text>
				<input v-model="phone" maxlength="11" type="number" placeholder="请输入手机号" class="ipt"
					placeholder-class="iptP" />
			</view>
		</view>
		<view class="iptItem">
			<view class="label">验证码</view>
			<view class="iptBox flexBox">
				<input v-model='code' type="number" placeholder="请输入验证码" class="ipt" placeholder-class="iptP" />
				<view class="codeBtn" @tap="getCode">{{btnMsg}}</view>
			</view>
		</view>
		<view class="iptItem ">
			<view class="label">登录密码</view>
			<view class="iptBox flexBox" v-if="!flag">
				<input v-model='password' type="password" placeholder="请输入登录密码(6~26位)" class="ipt" placeholder-class="iptP" />
				<image @tap="flag=!flag" class="rightIcon" src="../../static/img/nosee.png" mode=""></image>
			</view>
			<view class="iptBox flexBox" v-if="flag">
				<input v-model='password' type="text" placeholder="请输入登录密码(6~16位)" class="ipt" placeholder-class="iptP" />
				<image @tap="flag=!flag" class="rightIcon" src="../../static/img/see.png" mode=""></image>
			</view>
		</view>
		<view class="iptItem">
			<view class="label">确认密码</view>
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
		<view class="iptItem ">
			<view class="label">交易密码</view>
			<view class="iptBox flexBox" v-if="!flag2">
				<input v-model='pay_password' type="password" placeholder="请输入交易密码" class="ipt" placeholder-class="iptP" />
				<image @tap="flag2=!flag2" class="rightIcon" src="../../static/img/nosee.png" mode=""></image>
			</view>
			<view class="iptBox flexBox" v-if="flag2">
				<input v-model='pay_password' type="text" placeholder="请输入交易密码" class="ipt" placeholder-class="iptP" />
				<image @tap="flag2=!flag2" class="rightIcon" src="../../static/img/see.png" mode=""></image>
			</view>
		</view>
		<view class="iptItem">
			<view class="label">邀请码（选填）</view>
			<view class="iptBox flexBox">
				<input v-model="uuid" type="text" :disabled="disabled" placeholder="请输入邀请码" class="ipt"
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
		<view class="move-ver">
			<move-verify @result='verifyResult' ref="verifyElement"></move-verify>
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
	import moveVerify from "@/components/helang-moveVerify/helang-moveVerify.vue"
	export default {
		 components: {
			"move-verify":moveVerify
		},
		data() {
			return {
				phone: '',
				code: '',
				password: '',
				password_re: '',
				pay_password:  '',
				uuid: '',
				btnMsg: '获取验证码',
				tim: '',
				flag: false,
				flag1: false,
				flag2: false,
				disabled: false,
				isRed: false,
				resultData: false
			}
		},
		onShow() {},
		onLoad(e) {
			if (e.invite) {
				this.uuid = e.invite;
				this.disabled = true;
			}
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
				if ( this.password.length > 6 ||this.password.length < 6) {
					this.toast('请输入6~16位登录密码');
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
				if (!this.pay_password) {
					this.toast('请输入交易密码');
					return;
				}
				if (!this.isRed) {
					this.toast('请阅读并同意协议');
					return;
				}
				if (!this.resultData) {
					this.toast('请完成滑动验证');
					return;
				}
				const data = {
					phone: this.phone,
					code: this.code,
					password: this.password,
					password_re: this.password_re,
					pay_password: this.pay_password,
					uuid: this.uuid
				};
				this.$http.post('login/register', data).then(res => {
					if (res.code == 1) {
						this.toast(res.msg)
						setTimeout(() => {
							uni.reLaunch({
								url: 'login'
							})
						}, 1000)
					} else {
						this.verifyReset()
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
				this.$http.post('login/sendCode', {
					phone: this.phone,
					type: '1'
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
	.content {
		position: relative;
		padding: 0 40rpx 200rpx;
		.move-ver {
			margin-top: 30rpx;
		}
		.tBox {
			padding: 30rpx 0;

			.msg {
				font-size: 50rpx;
				margin-bottom: 20rpx;
				font-weight: 500;
				color: #FFFFFF;
			}

			.sMsg {
				font-size: 24rpx;
				// margin-bottom: 100rpx;
				color: #AAAAAA;
			}
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
				color: #00D18B;
			}
		}

		.iptItem {
			margin-bottom: 20rpx;

			.label {
				color: #FFFFFF;
				font-size: 26rpx;
				font-weight: 500;
				margin-bottom: 10rpx;
			}

			.iptBox {
				padding: 0 30rpx;
				background: #383B3F;
				height: 100rpx;
				border-radius: 50rpx;
				font-size: 30rpx;

				.left {
					color: #AAAAAA;
					margin-right: 40rpx;
				}

				.ipt {
					flex: 1;
					height: 100%;
					font-size: 30rpx;
					font-weight: 500;
					color: #AAAAAA;
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
					color: #F0BA55;
				}
			}
		}

		.psdBox {
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
			width: 600rpx;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			border-radius: 50rpx;
			color: #fff;
			font-size: 32rpx;
			font-weight: 500;
			margin: 80upx auto 40rpx;
			background: #00D18B;
			box-shadow: 0rpx 8rpx 40rpx 0rpx rgba(159, 255, 109, 0.4);
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
