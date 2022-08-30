<template>
	<view class="content container">
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
			<view class="iptItem flexBox" @tap="go('SetLoginPsd')">
				<image class="leftIcon" src="../../static/img/my/b5.png" mode=""></image>
				<view class="bb flex flex1">
					<view class="label">修改登录密码</view>
					<view class="centercon"></view>
					<image class="arrowIcon" src="../../static/img/my/right.png" mode=""></image>
				</view>
			</view>
			<view class="iptItem flexBox" @tap="go('SetPayPsd')">
				<image class="leftIcon" src="../../static/img/my/b5.png" mode=""></image>
				<view class="bb flex flex1">
					<view class="label">修改交易密码</view>
					<view class="centercon"></view>
					<image class="arrowIcon" src="../../static/img/my/right.png" mode=""></image>
				</view>
			</view>
			<view class="iptItem flexBox" @tap="go('myCollection')">
				<image class="leftIcon" src="../../static/img/my/b6.png" mode=""></image>
				<view class="bb flex flex1">
					<view class="label">收款信息</view>
					<view class="centercon"></view>
					<image class="arrowIcon" src="../../static/img/my/right.png" mode=""></image>
				</view>
			</view>
			<view class="iptItem flexBox" @tap="go('../login/privacyPolicy?type=1')">
				<image class="leftIcon" src="../../static/img/my/b2.png" mode=""></image>
				<view class="bb flex flex1">
					<view class="label">用户协议</view>
					<view class="centercon"></view>
					<image class="arrowIcon" src="../../static/img/my/right.png" mode=""></image>
				</view>
			</view>
			
			<!-- <view class="iptItem flexBox">
				<image class="leftIcon" src="../../static/img/my/b3.png" mode=""></image>
				<view class=" flex flex1">
					<view class="label">清除缓存</view>
					<view class="centercon"></view>
					<image class="arrowIcon" src="../../static/img/my/right.png" mode=""></image>
				</view>
			</view> -->
		</view>

		<!-- <view class="topic">其他</view> -->
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
			<!-- <view class="iptItem flexBox" v-if="userInfo.name">
				<image class="leftIcon" src="../../static/img/my/b6.png" mode=""></image>
				<view class="bb flex flex1">
					<view class="label">实名认证</view>
					<view class="centercon">{{userInfo.name}}</view>
					<image class="arrowIcon" src="../../static/img/my/right.png" mode=""></image>
				</view>
			</view> -->
			<view class="iptItem flexBox"  @tap="go('authentication')">
				<image class="leftIcon" src="../../static/img/my/b6.png" mode=""></image>
				<view class="flex bb flex1">
					<view class="label">实名认证</view>
					<view class="centercon" v-if="!userInfo.name">未认证</view>
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

		<view @tap="loginOut" class="subBtn flex_ct" style="background: #1B1A1A;">
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
			}
		}
	}
</script>

<style>
	page {
		background-color:  #1e201f;
	}
</style>

<style lang="scss" scoped>
	.content {
		.topic {
			color: #AAAAAA;
			font-size: 26rpx;
			height: 88rpx;
			line-height: 88rpx;
			padding: 20rpx 30rpx 0;
		}

		.iptBox {
			padding: 0 20rpx 0 30rpx;
			// background-color: #1B1A1A;
			background-color:  #1e201f;
			

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
					color: #FFFFFF;
					font-size: 32rpx;
					margin-right: 10rpx;
				}

				.centercon {
					flex: 1;
					color: #C4C6C6;
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
			width: 100%;
			height: 108rpx;
			line-height: 108rpx;
			text-align: center;
			color: #00DB7D;
			font-size: 30rpx;
			background: #1B1A1A;
			margin: 60rpx 0;

			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 30rpx;
			}
		}

	}
</style>
