<template>
	<view class="content">
		<view class="tBox">
			<view class="msg">绑定手机</view>
			<view class="sMsg">为了你的账号安全,请先绑定手机号</view>
		</view>

		<view class="iptItem">
			<view class="label">手机号</view>
			<view class="iptBox flexBox">
				<text class="left">+86</text>
				<input v-model="mobile" maxlength="11" type="number" placeholder="请输入手机号" class="ipt"
					placeholder-class="iptP" />
			</view>
		</view>
		<view class="iptItem">
			<view class="label">验证码</view>
			<view class="iptBox flexBox">
				<text class=""></text>
				<input v-model='mobileCode' type="number" placeholder="请输入验证码" class="ipt" placeholder-class="iptP" />
				<view class="codeBtn" @tap="getCode">{{btnMsg}}</view>
			</view>
		</view>

		<view @tap="submit" class="subBtn">完 成</view>
		<view class="loginBox flex_ct" @tap="go('../index/index')"><text>取消登录</text></view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				mobileCode: '',
				btnMsg: '获取验证码',
				tim: '',
			}
		},
		onShow() {},
		onLoad(e) {

		},
		methods: {
			getCode() {
				if (this.tim != '') {
					return;
				}
				if (!this.mobile) {
					this.toast('请输入手机号');
					return;
				}
				this.$http.post('login/sendCode', {
					phone: this.mobile,
					type: '3'
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
			submit() {
				if (!this.mobile) {
					this.toast('请输入正确的手机号码');
					return;
				}
				if (!this.mobileCode) {
					this.toast('请输入验证码');
					return;
				}
				const data = {
					phone: this.mobile,
					code: this.mobileCode,
				};
				this.$http.post('login/bindPhone', data).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.toast(res.msg);
						uni.setStorageSync('app_token', res.data.app_token);
						setTimeout(() => {
							uni.reLaunch({
								url: '../index/index'
							});
						}, 1000);
						
					} else {
						this.toast(res.msg)
					}
				})

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
		padding: 0 40rpx;

		.tBox {
			padding-top: 60rpx;

			.msg {
				font-size: 50rpx;
				margin-bottom: 20rpx;
				font-weight: 500;
				color: #FFFFFF;
			}

			.sMsg {
				font-size: 24rpx;
				margin-bottom: 100rpx;
				color: #AAAAAA;
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
					color: #AAAAAA;
					margin-right: 40rpx;
				}

				.ipt {
					flex: 1;
					height: 100%;
					font-size: 32rpx;
					font-weight: 500;
					color: #AAAAAA;
				}

				.iptP {
					color: #AAAAAA;
					font-size: 32rpx;
					font-weight: 500;
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

		.subBtn {
			width: 630rpx;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			background: #AE3523;
			border-radius: 50rpx;
			color: #FFDD9D;
			font-size: 32rpx;
			margin: 100rpx auto;
			box-shadow: 0rpx 8rpx 40rpx 0rpx rgba(174, 53, 35, 0.4);
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
		}


	}
</style>
