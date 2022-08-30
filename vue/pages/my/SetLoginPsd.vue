<template>
	<view class="content">
		<view class="iptBox flexBox">
			<text class="label">手机号：</text>
			<input v-model="phone" type="number" disabled maxlength="11" placeholder="请输入手机号码" class="ipt"
				placeholder-class="iptP" />
		</view>

		<view class="iptBox flexBox">
			<text class="label">验证码：</text>
			<input v-model="mobileCode" type="text" placeholder="请输入验证码" class="ipt" placeholder-class="iptP" />
			<view class="codeBtn" @tap="getCode">{{btnMsg}}</view>
		</view>

		<view class="iptBox flexBox" v-if="!flag">
			<text class="label">新密码：</text>
			<input v-model="password" type="password" placeholder="请输入您要设置的新密码" class="ipt" placeholder-class="iptP" />
			<image @tap="flag=!flag" class="rightIcon" src="../../static/img/nosee.png" mode=""></image>
		</view>
		<view class="iptBox flexBox" v-if="flag">
			<text class="label">新密码：</text>
			<input v-model="password" type="text" placeholder="请输入您要设置的新密码" class="ipt" placeholder-class="iptP" />
			<image @tap="flag=!flag" class="rightIcon" src="../../static/img/see.png" mode=""></image>
		</view>

		<view class="iptBox flexBox" v-if="!flag1">
			<text class="label">确认密码：</text>
			<input v-model="newPass" type="password" placeholder="请再次输入您的新密码" class="ipt" placeholder-class="iptP" />
			<image @tap="flag1=!flag1" class="rightIcon" src="../../static/img/nosee.png" mode=""></image>
		</view>
		<view class="iptBox flexBox" v-if="flag1">
			<text class="label">确认密码：</text>
			<input v-model="newPass" type="text" placeholder="请再次输入您的新密码" class="ipt" placeholder-class="iptP" />
			<image @tap="flag1=!flag1" class="rightIcon" src="../../static/img/see.png" mode=""></image>
		</view>
		<view @tap="sub" class="subBtn">保存</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				mobileCode: '',
				password: '',
				newPass: '',
				btnMsg: '获取验证码',
				tim: '',
				flag: false,
				flag1: false
			}
		},
		onLaunch() {},
		onShow() {},
		onHide() {},
		onLoad(e) {
			this.phone = uni.getStorageSync("phone")
		},
		methods: {
			getCode() {
				if (this.tim != '') {
					return;
				}
				this.$http.post('login/sendCode', {
					phone: this.phone,
					type: '2'
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
			sub() {
				if (!this.mobileCode) {
					this.toast('请输入验证码');
					return;
				}
				if (!this.password) {
					this.toast('请输入新密码');
					return;
				}
				if (!this.newPass) {
					this.toast('请再次输入新密码');
					return;
				}
				if (this.newPass != this.password) {
					this.toast('两次密码输入不一致');
					return;
				}
				const data = {
					code: this.mobileCode,
					password: this.password,
					password_re: this.newPass,
				};
				this.$http.post('user/updatePassword', data).then(res => {
					if (res.code == 1) {
						this.toast(res.msg);
						uni.clearStorageSync();
						setTimeout(() => {
							uni.reLaunch({
								url: '../login/login'
							});
						}, 1000)
					} else {
						this.toast(res.msg)
					}
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.content {
		margin: 30rpx 20rpx;
		padding-bottom: 20rpx;
		background: #ffffff;
		box-shadow: 0px 0px 15rpx 6rpx rgba(52, 52, 52, 0.1);
		border-radius: 10rpx;

		.iptBox {
			margin: 0 30rpx;
			height: 108rpx;
			line-height: 108rpx;
			color: #aaaaaa;
			font-size: 30rpx;
			border-bottom: 1rpx solid #EEEEEE;

			.ipt {
				flex: 1;
				height: 100%;
				font-weight: 500;
				color: #aaaaaa;
				font-size: 30rpx;
			}

			.iptP {
				color: #aaaaaa;
				font-size: 30rpx;
				font-weight: 400;
			}

			.label {
				width: 26%;
				color: #000;
			}

			.rightIcon {
				width: 48rpx;
				height: 48rpx;
				padding: 10rpx;
			}

			.codeBtn {
				// width: 220rpx;
				height: 68rpx;
				line-height: 68rpx;
				text-align: center;
				border-radius: 34rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #F0BA55;
			}
		}

		.subBtn {
			width: 690rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			border-radius: 50rpx;
			color: #fff;
			font-size: 32rpx;
			font-weight: 500;
			background: #00DB7D;
			box-shadow: 0px 8px 40px 0px rgba(174, 53, 35, 0.4);
			position: absolute;
			bottom: 300rpx;
			left: 30rpx;
		}
	}
</style>
