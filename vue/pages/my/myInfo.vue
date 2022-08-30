<template>
	<view class="content">
		<view class="line"></view>
		<view class="iptBox flexBox">
			<view class="label">头像</view>
			<view class="rBox flexBox">
				<image  @tap="chooseImg()" class="headIcon" :src="showSrc" mode="aspectFill"></image>
			</view>
		</view>

		<view class="iptBox flexBox" @tap="go('SetNickname?name='+userInfo.nick_name)">
			<view class="label">昵称</view>
			<view class="rBox flexBox">
				<view class="">{{userInfo.nick_name}}</view>
				<image class="arrowIcon" src="../../static/img/my/right.png" mode=""></image>
			</view>
		</view>
		
		<view class="iptBox flexBox">
			<view class="label">手机号</view>
			<view class="rBox flexBox">
				<view class="">{{userInfo.phone}}</view>
				<!-- <image class="arrowIcon" src="../../static/img/my/right.png" mode=""></image> -->
			</view>
		</view>

		<view class="iptBox flexBox" @tap="go('SetLoginPsd')">
			<view class="label">修改密码</view>
			<view class="rBox flexBox">
				<view class=""></view>
				<image class="arrowIcon" src="../../static/img/my/right.png" mode=""></image>
			</view>
		</view>
		
		<view class="iptBox flexBox" @tap="go('myCollection')">
			<view class="label">收款信息</view>
			<view class="rBox flexBox">
				<view class=""></view>
				<image class="arrowIcon" src="../../static/img/my/right.png" mode=""></image>
			</view>
		</view>
		
		<view class="box">
			<view class="p1">文昌(NFT)</view>
			<view class=" iptBox1  flexBox">
				<view class="label">我的地址</view>
				<view class="center">
					{{userInfo.wallet_address}}
					<image class="copy" @tap="copy(userInfo.wallet_address)" src="../../static/img/my/copy.png" mode=""></image>
				</view>
			</view>
			<view class=" iptBox1  flexBox">
				<view class="label">我的私钥</view>
				<view class="center">
					{{userInfo.wallet_private_key}}
					<image class="copy" @tap="copy(userInfo.wallet_private_key)" src="../../static/img/my/copy.png" mode=""></image>
				</view>
			</view>
			<view class=" iptBox1  flexBox">
				<view class="label">我的公钥</view>
				<view class="center">
					{{userInfo.wallet_public_key}}
					<image class="copy" @tap="copy(userInfo.wallet_public_key)" src="../../static/img/my/copy.png" mode=""></image>
				</view>
			</view>
		</view>
		
		<!-- <view class="box">
			<view class="p1">币安智能链(BSC)</view>
			<view class=" iptBox1  flexBox">
				<view class="label">我的地址</view>
				<view class="center">
					{{userInfo.bsc_wallet_address}}
					<image class="copy" @tap="copy(userInfo.bsc_wallet_address)" src="../../static/img/my/copy.png" mode=""></image>
				</view>
			</view>
			<view class=" iptBox1  flexBox">
				<view class="label">我的密钥</view>
				<view class="center">
					{{userInfo.bsc_private_key}}
					<image class="copy" @tap="copy(userInfo.bsc_private_key)" src="../../static/img/my/copy.png" mode=""></image>
				</view>
			</view>
		</view> -->
		
		<!-- <view class="box">
			<view class="p1">火币生态链(HECO)</view>
			<view class=" iptBox1  flexBox">
				<view class="label">我的地址</view>
				<view class="center">
					{{userInfo.ht_wallet_address}}
					<image class="copy" @tap="copy(userInfo.ht_wallet_address)" src="../../static/img/my/copy.png" mode=""></image>
				</view>
			</view>
			<view class=" iptBox1  flexBox">
				<view class="label">我的密钥</view>
				<view class="center">
					{{userInfo.ht_private_key}}
					<image class="copy" @tap="copy(userInfo.ht_private_key)" src="../../static/img/my/copy.png" mode=""></image>
				</view>
			</view>
		</view> -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showSrc: "",
				// nick_name: '',
				userInfo: {},
			}
		},
		onShow() {
			this.getMemInfo();
		},
		onLoad() {
		},
		methods: {
			show(imgs){
				uni.previewImage({
					urls: [imgs],
					longPressActions: {
						itemList: ['更换图片', '保存图片'],
						success: (data)=> {
							if(data.tapIndex === 1){
								console.log(data.tapIndex)
								uni.saveImageToPhotosAlbum({
									filePath: imgs,
									success: ()=> {
										uni.showToast({
											title: '保存成功',
											icon: "none"
										});
									}
								})
							} else{
								console.log(data.tapIndex)
								this.chooseImg();
							}
							
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			getMemInfo() {
				this.$http.get('user/userInfo').then(res => {
					if (res.code == 1) {
						this.userInfo = res.data;
						this.showSrc = res.data.head_image
					}
				})
			},
			editInfo() {
				let data = {
					nick_name: this.userInfo.nick_name,
					head_image: this.showSrc
				}
				this.$http.post('user/editUserInfo', data).then(res => {
					if (res.code == 1) {
						this.toast(res.msg);
						setTimeout(() => {
							uni.navigateBack({
								delta: 2
							})
						}, 1200)
					} else {
						this.toast(res.msg);
					}
				})
			},
			chooseImg() {
				let _this = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original'],
					success: (res) => {
						console.log(res)
						let tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: _this.baseUrl + 'upload/fileUpload',
							filePath: tempFilePaths[0],
							name: 'image',
							header: {
								'token': uni.getStorageSync("token")
							},
							success: (res1) => {
								var result = JSON.parse(res1.data);
								if (result.code == 1) {
									_this.showSrc = result.data.path;
									_this.editInfo()
								} else {
									_this.toast('上传失败');
								}
							}
						});
					}
				});
			},
		}
	}
</script>
<style>
	page {
		/* background-color: #23272C; */
	}
</style>
<style lang="scss" scoped>
	.content {
		// background: #23272C;

		.iptBox {
			margin: 0 30rpx;
			// background: #23272C;
			height: 108rpx;
			line-height: 108rpx;
			border-bottom: 2rpx solid #666262;

			.center {
				color: #AAAAAA;
				font-size: 28rpx;
			}

			.label {
				font-size: 32rpx;
				color: #000;
			}

			.rBox {
				justify-content: flex-end;
				flex: 1;
				color: #AAAAAA;
				font-size: 28rpx;
				text-align: right;

				.ipt {
					font-size: 28rpx;
					font-weight: 500;
					font-family: PingFangSC-Medium;
				}

				.headIcon {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}

				.arrowIcon {
					width: 44rpx;
					height: 44rpx;
				}
			}
		}

		.line {
			height: 20rpx;
			// background-color: #23272C;
		}
		
		.box{
			border-bottom: 2rpx solid #666262;
			.p1{
				color: #000;
				height: 80rpx;
				line-height: 80rpx;
				margin-left: 30rpx;
			}
			
		}
		
		.iptBox1 {
			height: auto;
			margin: 0 30rpx;
			padding: 30rpx 0;
			line-height: 44rpx;

			.label {
				width: 25%;
				font-size: 32rpx;
				color: #000;
			}

			.center {
				width: 70%;
				min-height: 44rpx;
				color: #AAAAAA;
				font-size: 28rpx;
				position: relative;
				word-wrap: break-word;
				word-break: break-word;
			}

			.copy {
				width: 44rpx;
				height: 44rpx;
				position: absolute;
				bottom: 0;
				right: 0;
			}
		}

	}
</style>
