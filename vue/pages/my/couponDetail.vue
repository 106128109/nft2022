<template>
	<view class="content">
		<view class="couponBox ">
			<view class="couponTop flex_bt">
				<view class="">
					<view class="name">{{couponDetail.name}}</view>
					<view class="time">有效期至:{{couponDetail.end_time}}</view>
				</view>
				<view class="price">¥{{couponDetail.money}}</view>
			</view>
			<view class="flex_column">
				<tki-qrcode  cid="qrcode1" ref="qrcode" :val="couponDetail.order_num" :size="size" unit="upx" :background="background" :foreground="foreground" :pdground="pdground" :onval="onval" :loadMake="loadMake" :usingComponents="true" @result="qrR" />
				<view class="number">
					券码: <text>{{couponDetail.order_num}}</text>
				</view>
			</view>
			
		</view>
		
		<view class="btnBox flex_ar">
			<view class="btnItem" @tap="saveQrcode">
				<image class="img" src="../../static/img/my/save.png" mode=""></image>
				<view class="">保存图片</view>
			</view>
			<!-- <view class="btnItem" @tap="copy()">
				<image class="img" src="../../static/img/my/share.png" mode=""></image>
				<view class="">分享名片</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	export default {
		components: {tkiQrcode},
		data() {
			return {
				couponDetail: {},
				qrcodesrc: '',
				
				ifShow: true,
				val: '二维码', // 要生成的二维码
				size: 400, // 二维码大小
				background: '#ffffff', // 背景色
				foreground: '#000000', // 前景色
				pdground: '#000000', // 角标色
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
			}
		},
		onLoad() {
			this.couponDetail = uni.getStorageSync('Coupon');
		},
		methods: {
			saveQrcode() {
				this.$refs.qrcode._saveCode()
			},
			qrR(res){
				this.qrcodesrc = res;
			},
			save(index) {
				uni.downloadFile({
					url: this.qrcode,
					success: (res) => {
						console.log(res)
						if (res.statusCode == 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: ()=> {
									uni.showToast({
										title: '保存成功',
										icon: "none"
									});
								},
								fail: (err) => {
									console.log(err)
								}
							})
						}
					}
				});
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
	.tki-qrcode{
		width: 400rpx;
		height: 400rpx;
		margin: 40rpx auto;
	}
	.content {
		padding-top: 30rpx;
		.couponBox {
			// width: 100%;
			padding: 30rpx 54rpx;
			height: 870rpx;
			background: url(../../static/img/my/coupon3.png) no-repeat;
			background-size: 100% 100%;
			display: flex;
			flex-direction: column;
			.couponTop {
				height: 200rpx;
				margin-bottom: 40rpx;
				.name {
					color: #333333;
					font-size: 48rpx;
					font-weight: 500;
					margin-bottom: 10rpx;
				}
				.time {
					color: #999999;
					font-size: 24rpx;
					font-weight: 500;
				}
				.price {
					color: #F0BA55;
					font-size: 60rpx;
					font-weight: 500;
				}
			}
			.qrcode {
				width: 400rpx;
				height: 400rpx;
				margin: 40rpx auto;
			}
			
			.number {
				text-align: center;
				font-size: 40rpx;
				color: #777777;
				margin-top: 50rpx;
				text {
					color: #AE3523;
				}
			}
		}

		.btnBox {
			margin-top: 100rpx;

			.btnItem {
				color: #666666;
				font-size: 32rpx;
				text-align: center;

				.img {
					width: 56rpx;
					height: 56rpx;
					margin-bottom: 10rpx;
				}
			}
		}

	}
</style>
