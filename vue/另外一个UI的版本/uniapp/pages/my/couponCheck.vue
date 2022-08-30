<template>
	<view class="content">
		<view class="tabBox flexBox">
			<view @tap="showType = 1" :class="showType == 1 ? 'tab act flex_ct' : 'tab flex_ct'">
				<image class="img" v-if="showType == 1" src="../../static/img/my/couponCheck1.png" mode=""></image>
				<image class="img" v-if="showType == 2" src="../../static/img/my/couponCheck11.png" mode=""></image>
				<view class="">券码验券</view>
			</view>
			<view @tap="saomiao()"  :class="showType == 2 ? 'tab act flex_ct' : 'tab flex_ct'">
				<image class="img" v-if="showType == 1" src="../../static/img/my/couponCheck22.png" mode=""></image>
				<image class="img" v-if="showType == 2" src="../../static/img/my/couponCheck2.png" mode=""></image>
				<view class="">扫码验券</view>
			</view>
		</view>
		<view class="couponBox" v-if="showType == 1">
			<view class="topic flex_ct">
				<view class="line"></view>
				<view class="center">优惠券券码</view>
				<view class="line"></view>
			</view>
			<view class="iptBox">
				<input v-model="order_num" type="text" placeholder="请输入优惠券券码验券" class="ipt" placeholder-class="iptP" />
			</view>
			<view @tap="submit(order_num)" class="subBtn">提交验券</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				order_num: '',
				showType: 1
			}
		},
		onLoad() {},
		methods: {
			saomiao(){
				this.showType = 2;
				uni.scanCode({
				    onlyFromCamera: true,
				    success: (res) => {
								this.submit(res.result)
				    }
				});
			},
			submit(a) {
				if (!a) {
					this.toast('请输入优惠券券码');
					return;
				}
				this.$http.post('coupon/coupon', {
					order_num: a
				}).then(res => {
					if (res.code == 1) {
						this.toast(res.msg);
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						}, 1000)
					} else{
						this.toast(res.msg)
					}
				})
			},

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
		padding: 30rpx;

		.tabBox {
			width: 600rpx;
			height: 88rpx;
			line-height: 88rpx;
			background: #383B3F;
			border-radius: 44rpx;
			border: 2rpx solid #383B3F;
			margin: 0 auto;

			.tab {
				flex: 1;
				color: #AAAAAA;
				font-size: 32rpx;
				font-weight: 500;
			}
			.act {
				color: #FFDD9D;
				background-color: #AE3523;
				border-radius: 44rpx;
				border: none;
			}
			.img {
				width: 36rpx;
				height: 36rpx;
				margin-right: 10rpx;
			}
		}

		.couponBox {
			padding: 80rpx 40rpx;
			height: 520rpx;
			border-radius: 20rpx;
			box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(49, 60, 94, 0.15);
			background: #383B3F;
			margin-top: 60rpx;

			.topic {
				.line {
					width: 120rpx;
					height: 2rpx;
					background-color: #AAAAAA;
				}

				.center {
					color: #AAAAAA;
					font-size: 28rpx;
					text-align: center;
					margin: 0 30rpx;
				}
			}

			.iptBox {
				text-align: center;
				height: 112rpx;
				line-height: 112rpx;
				color: #AAAAAA;
				background-color: #23272C;
				border-radius: 20rpx;
				margin: 60rpx 0 200rpx;

				.ipt {
					flex: 1;
					height: 100%;
					font-size: 28rpx;
					font-weight: 500;
					font-family: PingFangSC-Medium;
					color: #AAAAAA;
				}

				.iptP {
					color: #AAAAAA;
					font-weight: 400;
					font-family: PingFangSC-Regular;
				}
			}

			.subBtn {
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				border-radius: 50rpx;
				color: #FFDD9D;
				font-size: 32rpx;
				font-weight: 500;
				background: #AE3523;
				box-shadow: 0px 8px 40px 0px rgba(174, 53, 35, 0.4);
			}

		}


	}
</style>
