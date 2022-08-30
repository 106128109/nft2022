<template>
	<view class="content">
		<view class="listItem1">进行实名认证,需要本人亲自完成!</view>
		<!-- <view class="listItem">
			<view class="topic flexBox">
				<view class="line"></view>
				<view class="label">上传身份证照片</view>
			</view>
			<view class="chooseImg flex_bt">
				<view class="iptBox1 flex_column">
					<image @tap="chooseImg1" class="headIcon" :src="wxImg" mode=""></image>
					<view class="">正面照片</view>
				</view>
				<view class="iptBox1 flex_column">
					<image @tap="chooseImg" class="headIcon" :src="alipayImg" mode=""></image>
					<view class="">反面照片</view>
				</view>
			</view>
		</view> -->

		<view class="listItem">
			<view class="topic flexBox">
				<view class="line"></view>
				<view class="label">完善您的个人信息</view>
			</view>
			<view class="iptBox">
				<text class="label">姓名</text>
				<input v-model="name" type="text" placeholder="请输入姓名" class="ipt" placeholder-class="iptP" />
			</view>
			<view class="iptBox">
				<text class="label">身份证号</text>
				<input v-model="card" type="text" placeholder="请输入本人身份证号" class="ipt" placeholder-class="iptP" />
			</view>
		</view>

		<view class="subBtn" @tap="submit()">提交审核</view>

		<!-- <view class="tips">
			*温馨提示：需要同时提交三个收款信息
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wxImg: '../../static/img/my/upload.png',
				alipayImg: "../../static/img/my/upload.png",
				name: '',
				card: '',
				card_front_image: '',
				card_back_image: '',
			};
		},
		onLoad(e) {
		},
		methods: {
			submit() {
				// if (!this.card_front_image) {
				// 	this.toast("请输入身份证正面照片");
				// 	return;
				// };
				// if (!this.card_back_image) {
				// 	this.toast("请输入身份证反面照片");
				// 	return;
				// };
				
				if (!this.name) {
					this.toast("请输入姓名");
					return;
				}
				if (!this.card) {
					this.toast("请输入本人身份证号");
					return;
				}
				// card_front_image: this.card_front_image,
				// card_back_image: this.card_back_image,
				let data = {
					name: this.name,
					card: this.card,
					
				}
				this.$http.post('user/auth', data).then(res => {
					if (res.code == 1) {
						this.toast(res.msg);
						setTimeout(() => {
							uni.navigateBack({
								delta:1
							})
						}, 1000)
					} else {
						this.toast(res.msg)
					}
				})
			},
			chooseImg() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original'],
					success: (res) => {
						let tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: this.baseUrl + 'upload/fileUpload',
							filePath: tempFilePaths[0],
							name: 'image',
							header: {
								'token': uni.getStorageSync("token")
							},
							success: (res1) => {
								var result = JSON.parse(res1.data);
								if (result.code == 1) {
									this.alipayImg = result.data.path;
									this.card_back_image = result.data.path;
									console.log(this.card_back_image);
								} else {
									this.toast('上传失败');
								}
							}
						});
					}
				});
			},
			chooseImg1() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original'],
					success: (res) => {
						let tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: this.baseUrl + 'upload/fileUpload',
							filePath: tempFilePaths[0],
							name: 'image',
							header: {
								'token': uni.getStorageSync("token")
							},
							success: (res1) => {
								console.log(res1);
								var result = JSON.parse(res1.data);
								if (result.code == 1) {
									this.wxImg = result.data.path;
									this.card_front_image = result.data.path;
									console.log(this.card_front_image);
								} else {
									this.toast('上传失败');
								}
							}
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		.listItem1 {
			text-align: center;
			height: 80rpx;
			line-height: 80rpx;
			color: #AAAAAA;
			font-size: 24rpx;
		}

		.listItem {
			margin: 20rpx;
			background-color: #ffffff;
			box-shadow: 0px 0px 15rpx 6rpx rgba(52, 52, 52, 0.1);
			border-radius: 10rpx;
			padding: 0 30rpx;
			// margin-bottom: 20rpx;
			padding-bottom: 20rpx;
			.topic {
				height: 88rpx;
				color: #000;
				font-size: 32rpx;

				.line {
					width: 8rpx;
					height: 28rpx;
					background-color: #00DB7D;
					border-radius: 4rpx;
					margin-right: 16rpx;
				}
			}

			.chooseImg {
				padding: 30rpx 0;
			}
		}

		.iptBox1 {
			width: 330rpx;
			height: 220rpx;
			color: #AAAAAA;
			font-size: 28rpx;
			background-color: #383B3F;

			.headIcon {
				width: 140rpx;
				height: 140rpx;
			}
		}

		.iptBox {
			display: flex;
			align-items: center;
			height: 100rpx;
			line-height: 100rpx;
			border-bottom: 1rpx solid #EEEEEE;

			.ipt {
				flex: 1;
				font-size: 30rpx;
				color: #AAAAAA;
				font-weight: 500;
			}

			.iptP {
				color: #AAAAAA;
				font-size: 30rpx;
				font-weight: 500;
			}

			.label {
				width: 23%;
				font-size: 30rpx;
				font-weight: 500;
				color: #000;
			}
		}
		.tips {
			color: #AAAAAA;
			text-align: center;
			font-size: 24rpx;
			font-weight: 400;
		}

		.subBtn {
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			border-radius: 50rpx;
			color: #fff;
			font-size: 32rpx;
			font-weight: 500;
			margin: 60rpx 30rpx;
			background: #00DB7D;
			box-shadow: 0px 0px 15rpx 6rpx rgba(52, 52, 52, 0.1);
		}

	}
</style>
