<template>
	<view class="content">
		<!-- <view class="iptBox">
			<text class="label">支付宝账号:</text>
			<input v-model="ali_name" type="text" placeholder="请输入支付宝账号" class="ipt" placeholder-class="iptP" />
		</view>
		<view class="iptBox1">
			<view class="label">请上传支付宝收款码:</view>
			<image @tap="chooseImg" class="headIcon" :src="alipayImg" mode=""></image>
		</view> -->
		<!-- <view class="iptBox">
			<text class="label">微信姓名:</text>
			<input v-model="wx_name" type="text" placeholder="请输入微信姓名" class="ipt" placeholder-class="iptP" />
		</view>
		<view class="iptBox1">
			<view class="label">请上传微信收款码:</view>
			<image @tap="chooseImg1" class="headIcon" :src="wxImg" mode=""></image>
		</view> -->
		<view class="iptBox">
			<text class="label">收款姓名:</text>
			<input v-model="bank_owner" type="text" placeholder="请输入收款姓名" class="ipt" placeholder-class="iptP" />
		</view>
		<view class="iptBox">
			<text class="label">开户银行:</text>
			<input v-model="bank_name" type="text" placeholder="请输入开户银行" class="ipt" placeholder-class="iptP" />
		</view>
		<!-- <view class="iptBox">
			<text class="label">开户支行：</text>
			<input v-model="bank_branch" type="text" placeholder="请输入开户支行"  placeholder-class="iptP" />
		</view> -->
		<view class="iptBox">
			<text class="label">银行卡号:</text>
			<input v-model="bank_number" type="number" placeholder="请输入银行卡号" class="ipt" placeholder-class="iptP" />
		</view>

		<view class="iptBox">
			<text class="label">手机号:</text>
			<input v-model="phone" type="number" disabled maxlength="11" class="ipt" placeholder-class="iptP" />
		</view>
		<view class="iptBox">
			<text class="label">验证码:</text>
			<input v-model="code" type="text" placeholder="请输入验证码" class="ipt" placeholder-class="iptP" />
			<view class="codeBtn" @tap="getCode">{{btnMsg}}</view>
		</view>
		<!-- <view class="tips">
			*温馨提示：需要同时提交三个收款信息
		</view> -->
		<view class="bottom">
			<view class="subBtn" @tap="sub()">确认</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnMsg: '获取验证码',
				tim: '',
				// alipayImg: "../../static/img/my/upload1.png",
				// wxImg: '../../static/img/my/upload1.png',
				// ali_name: '',
				// ali_image: '',
				// wx_name: '',
				// wx_image: '',
				bank_owner: '',
				bank_name: '',
				bank_number: '',
				bank_branch: '',
				phone: '',
				code: '',
			};
		},
		onLoad(e) {
			this.phone = uni.getStorageSync("phone");
			this.getData();
		},
		methods: {
			getData() {
				this.$http.get('user/collection').then(res => {
					if (res.code == 1) {
						// this.ali_name = res.data.ali_name;
						// this.ali_image = res.data.ali_image;
						// this.wx_name = res.data.wx_name;
						// this.wx_image = res.data.wx_image;
						this.bank_owner = res.data.bank_owner;
						this.bank_name = res.data.bank_name;
						this.bank_number = res.data.bank_number;
						this.bank_branch = res.data.bank_branch;
						// if (this.ali_image) {
						// 	this.alipayImg = this.ali_image;
						// }
						// if (this.wx_image) {
						// 	this.wxImg = this.wx_image;
						// }
					}
				})

			},
			sub() {
				// if (!this.ali_name) {
				// 	this.toast("请输入支付宝账号");
				// 	return;
				// };
				// if (!this.ali_image) {
				// 	this.toast("请上传支付宝收款码");
				// 	return;
				// };
				// if (!this.wx_name) {
				// 	this.toast("请输入微信姓名");
				// 	return;
				// }
				// if (!this.wx_image) {
				// 	this.toast("请上传微信收款码");
				// 	return;
				// }
				if (!this.bank_owner) {
					this.toast("请输入收款姓名");
					return;
				}
				if (!this.bank_name) {
					this.toast("请输入开户银行");
					return;
				}
				// if (!this.bank_branch) {
				// 	this.toast("请输入开户支行");
				// 	return;
				// }
				if (!this.bank_number) {
					this.toast("请输入银行卡号");
					return;
				}

				if (!this.code) {
					this.toast("请输入验证码");
					return;
				}
				let data = {
					// ali_name: this.ali_name,
					// ali_image: this.ali_image,
					// wx_name: this.wx_name,
					// wx_image: this.wx_image,
					bank_owner: this.bank_owner,
					bank_name: this.bank_name,
					bank_number: this.bank_number,
					bank_branch: this.bank_branch,
					code: this.code,
				}
				this.$http.post('user/collectMoney', data).then(res => {
					if (res.code == 1) {
						this.toast(res.msg);
						this.getData();
					} else {
						this.toast(res.msg)
					}
				})

			},
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
			// chooseImg() {
			// 	uni.chooseImage({
			// 		count: 1,
			// 		sizeType: ['original'],
			// 		success: (res) => {
			// 			let tempFilePaths = res.tempFilePaths;
			// 			uni.uploadFile({
			// 				url: this.baseUrl + 'upload/fileUpload',
			// 				filePath: tempFilePaths[0],
			// 				name: 'image',
			// 				header: {
			// 					'token': uni.getStorageSync("token")
			// 				},
			// 				success: (res1) => {
			// 					var result = JSON.parse(res1.data);
			// 					if (result.code == 1) {
			// 						this.alipayImg = result.data.path;
			// 						this.ali_image = result.data.path;
			// 					} else {
			// 						this.toast('上传失败');
			// 					}
			// 				}
			// 			});
			// 		}
			// 	});
			// },
			/* chooseImg1() {
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
									this.wxImg = result.data.path;
									this.wx_image = result.data.path;
								} else {
									this.toast('上传失败');
								}
							}
						});
					}
				});
			} */
		}
	}
</script>
<style lang="scss" scoped>
	.content {
		padding: 20rpx 30rpx 200rpx;

		.iptBox1 {
			.label {
				font-size: 28rpx;
				font-weight: 500;
				color: #000;
				line-height: 80rpx;
			}

			.headIcon {
				width: 140rpx;
				height: 140rpx;
			}
		}

		.iptBox {
			padding-left: 20rpx;
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			height: 80rpx;
			line-height: 80rpx;
			// border-bottom: 2rpx solid #666262;
			background: #FFFFFF;
			box-shadow: 0px 0px 15rpx 6rpx rgba(52, 52, 52, 0.1);
			border-radius: 10rpx;

			.ipt {
				flex: 1;
				font-size: 28rpx;
				color: #aaaaaa;
				font-weight: 500;
			}

			.iptP {
				color: #aaaaaa;
				font-weight: 400;
			}

			.label {
				font-size: 28rpx;
				font-weight: 400;
				color: #000;
				margin-right: 10rpx;
			}

			.codeBtn {
				text-align: center;
				padding: 0 20rpx;
				font-size: 26rpx;
				font-weight: 500;
				color: #FFDD9D;
			}
		}

		.tips {
			color: #AE3523;
			font-size: 24rpx;
			font-weight: 400;
			line-height: 60rpx;
		}

		.bottom {
			width: 100%;
			height: 180rpx;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 10;
		}

		.subBtn {
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			border-radius: 50rpx;
			color: #fff;
			font-size: 30rpx;
			font-weight: 500;
			margin: 40rpx 30rpx;
			background: #00DB7D;
			box-shadow: 0rpx 8rpx 40rpx 0rpx rgba(174, 53, 35, 0.4);
		}
	}
</style>
