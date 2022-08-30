<template>
	<view class="content">
		<view class="tBox">
			<view class="msg">请输入手机号</view>
			<view class="sMsg">为方便取得联系，请输入您的常用手机号码</view>
		</view>

		<view class="iptBox">
			<text class="label"></text>
			<input v-model="mobile" type="number" maxlength="11" placeholder="请输入手机号码" placeholder-class="iptP" />
		</view>
		<view @tap="getCode" :class="( mobile  ) ? 'subBtn' : 'subBtn noBtn' ">下一步</view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				mobile: '',
				btnMsg: '获取验证码',
				tim: ''
			}
		},
		onShow() {},
		onLoad(e) {},
		methods: {
			getCode() {
				if (this.tim != '') {
					return;
				}
				if (!this.mobile) {
					this.toast('请输入正确的手机号码');
					return;
				}
				this.$http.post('login/sendCode', {
					phone: this.mobile,
					type: '2'
				}).then(res => {
					if (res.code == 1) {
						this.toast(res.msg)
						this.tim = 60;
						setTimeout(() => {
							uni.navigateTo({
								url: './findPsd2?mobile=' + this.mobile + '&time=' + 60
							})
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
		padding: 0 30rpx;

		.tBox {
			padding-top: 60rpx;

			.msg {
				font-size: 50rpx;
				margin-bottom: 20rpx;
				font-weight: 500;
				color: #000;
			}

			.sMsg {
				font-size: 24rpx;
				margin-bottom: 100rpx;
				color: #AAAAAA;
			}
		}

		.iptBox {
			display: flex;
			align-items: center;
			padding: 0 30rpx;
			height: 100rpx;
			line-height: 100rpx;
			// background: #383B3F;
			// border-radius: 50rpx;
			border-bottom: 1rpx solid #999;

			input {
				flex: 1;
				font-size: 28rpx;
				color: #000;
			}
		}

		.subBtn {
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			background: #FFF1AC;
			border-radius: 50rpx;
			color: #000000;
			font-size: 32rpx;
			margin: 100rpx auto;
			// box-shadow: 0rpx 8rpx 40rpx 0rpx rgba(174, 53, 35, 0.4);

			// &.noBtn {
			// 	background: rgba(174, 53, 35, 0.4);
			// }
		}

	}
</style>
