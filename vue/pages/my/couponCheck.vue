<template>
	<view class="content">
		<view class="couponBox" v-if="showType == 1">
			<view class="topic flex_ct">
			
				<view class="center">请输入哈希值（含区块链地址）</view>
			
			</view>
			<view class="iptBox">
				<input v-model="order_num" type="text" placeholder="" class="ipt" placeholder-class="iptP" />
			</view>
			<view @tap="submit(order_num)" class="subBtn">查询</view>
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
					this.toast('请输入哈希值');
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
				background-color: #23272C;
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
					background-color: #fff;
				}

				.center {
					color: #fff;
					font-size: 35rpx;
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
				color: #fff;
				font-size: 32rpx;
				font-weight: 500;
				background: #23272C;
			}

		}


	}
</style>
