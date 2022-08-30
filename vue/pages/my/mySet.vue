<template>
	<view class="content container">
		<view class="topic">信息</view>
		<view class="iptBox">
			<view class="iptItem flexBox" @tap="go('myInfo')">
				<image class="leftIcon" src="../../static/img/my/b2.png" mode=""></image>
				<view class="flex flex1">
					<view class="label">个人信息</view>
					<view class="centercon"></view>
					<image class="arrowIcon" src="../../static/img/my/right.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="topic">账户管理</view>
		<view class="iptBox">
			<view class="iptItem flexBox">
				<image class="leftIcon" src="../../static/img/my/b1.png" mode=""></image>
				<view class="bb flex flex1">
					<view class="label">手机号</view>
					<view class="centercon">{{userInfo.phone}}</view>
					<!-- <image class="arrowIcon" src="../../static/img/my/right.png" mode=""></image> -->
				</view>
			</view>
			<view class="iptItem flexBox" @tap="go('../login/privacyPolicy?type=1')">
				<image class="leftIcon" src="../../static/img/my/b2.png" mode=""></image>
				<view class="flex flex1">
					<view class="label">用户协议</view>
					<view class="centercon"></view>
					<image class="arrowIcon" src="../../static/img/my/right.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="topic">其他</view>
		<view class="iptBox">
			<!-- <view class="iptItem flexBox" @tap="go('myInfo')">
				<image class="leftIcon" src="../../static/img/my/b3.png" mode=""></image>
				<view class="flex bb flex1">
					<view class="label">我的地址</view>
					<view class="center">{{userInfo.wallet_address}}</view>
					<image class="arrowIcon" src="../../static/img/my/right.png" mode=""></image>
				</view>
			</view> -->
			<!-- <view class="iptItem flexBox" @tap="go('myInfo')">
				<image class="leftIcon" src="../../static/img/my/b5.png" mode=""></image>
				<view class="flex bb flex1">
					<view class="label">我的密钥</view>
					<view class="center">{{userInfo.wallet_private_key}}</view>
					<image class="arrowIcon" src="../../static/img/my/right.png" mode=""></image>
				</view>
			</view> -->
			<view class="iptItem flexBox" v-if="userInfo.name">
				<image class="leftIcon" src="../../static/img/my/b6.png" mode=""></image>
				<view class="bb flex flex1">
					<view class="label">实名认证</view>
					<view class="centercon">{{userInfo.name}}</view>
					<image class="arrowIcon" src="../../static/img/my/right.png" mode=""></image>
				</view>
			</view>
			<view class="iptItem flexBox" v-if="!userInfo.name" @tap="go('authentication')">
				<image class="leftIcon" src="../../static/img/my/b6.png" mode=""></image>
				<view class="flex bb flex1">
					<view class="label">实名认证</view>
					<view class="centercon">未认证</view>
					<image class="arrowIcon" src="../../static/img/my/right.png" mode=""></image>
				</view>
			</view>
		<!-- 	<view class="iptItem flexBox" @tap="go('/pages/my/service')">
				<image class="leftIcon" src="../../static/img/my/my-kf.png" mode=""></image>
				<view class="bb flex flex1">
					<view class="label">客服</view>
					<view class="centercon"></view>
					<image class="arrowIcon" src="../../static/img/my/right.png" mode=""></image>
				</view>
			</view> -->
			<view class="iptItem flexBox" @click="goLink()">
				<image class="leftIcon" src="../../static/img/my/b1.png" mode=""></image>
				<view class="bb flex flex1">
					<view class="label">APP下载</view>
					<view class="centercon"></view>
					<image class="arrowIcon" src="../../static/img/my/right.png" mode=""></image>
				</view>
			</view>
			<view class="iptItem flexBox" @tap="go('../login/privacyPolicy?type=2')">
				<image class="leftIcon" src="../../static/img/my/b7.png" mode=""></image>
				<view class="flex flex1">
					<view class="label">隐私条款</view>
					<view class="centercon"></view>
					<image class="arrowIcon" src="../../static/img/my/right.png" mode=""></image>
				</view>
			</view>
		</view>

		<view @tap="loginOut" class="subBtn flex_ct">
			<image class="leftIcon" src="../../static/img/my/b8.png" mode=""></image>
			<view class="">退出登录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rank_id: '',
				userInfo: {}
			}
		},
		onHide() {},
		onShow() {
			this.getMemInfo();
		},
		methods: {
			loginOut() {
				this.confirm('提示', '确认退出登录吗？', () => {
					uni.clearStorageSync();
					this.toast('退出成功');
					setTimeout(() => {
						uni.reLaunch({
							url: '../login/login'
						})
					}, 1000)
				});
			},
			getMemInfo() {
				this.$http.get('user/userInfo').then(res => {
					if (res.code == 1) {
						this.userInfo = res.data;
						this.showSrc = res.data.head_image;
					}
				})
			},
			goLink() {
				//#ifdef APP-PLUS
				plus.runtime.openWeb(this.userInfo.app_url)
				//#endif
				//#ifdef H5
				window.location.href = this.userInfo.app_url;
				//#endif
			}
		}
	}
</script>
<style lang="scss" scoped>
	.bb {
		border-bottom: 1px solid #BFBFBF;
	}
	.content {
		.topic {
			color: #666666;
			font-size: 26rpx;
			height: 88rpx;
			line-height: 88rpx;
			padding: 20rpx 30rpx 0;
		}

		.iptBox {
			padding: 0 20rpx 0 30rpx;
			margin: 0 20rpx;
			background: #FFFFFF;
			box-shadow: 0px 0px 15rpx 6rpx rgba(52, 52, 52, 0.1);
			border-radius: 10rpx;

			.iptItem {
				height: 108rpx;
				line-height: 108rpx;
				// border-bottom: 2rpx solid #666262;

				.leftIcon {
					width: 40rpx;
					height: 40rpx;
					margin-right: 30rpx;
				}

				.label {
					color: #000;
					font-size: 32rpx;
					margin-right: 10rpx;
				}

				.centercon {
					flex: 1;
					color: #666666;
					font-size: 28rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					text-align: end !important;
				}

				.arrowIcon {
					width: 44rpx;
					height: 44rpx;
				}
			}
		}




		.subBtn {
			// width: 100%;
			height: 108rpx;
			line-height: 108rpx;
			text-align: center;
			color: #00DB7D;
			font-size: 30rpx;
			background: #fff;
			margin: 60rpx 20rpx;
			box-shadow: 0px 0px 15rpx 6rpx rgba(52, 52, 52, 0.1);
			border-radius: 50rpx;

			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 30rpx;
			}
		}

	}
</style>
