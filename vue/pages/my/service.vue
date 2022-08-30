<template>
	<view class="content container">
		<view class="title">
			Hi，
		</view>
		<view class="text">
			欢迎来到我的客服，服务让生活更简单
		</view>
		<view class="box">
			<view class="box-top">
				{{img.title}}
			</view>
			<image class="box-img" :src="img.value" mode=""></image>
		</view>
		<view class="btn" @tap="callPhone">
			电话：{{phone}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img: {
					title: "",
					value: ""
				},
				phone: ""
			}
		},
		onLoad() {
			this.getList();
		},
		methods: {
			async getList() {
				try {
					let res = await this.$http.get('index/contacts');
					console.log(res);
					this.img = res[1];
					this.phone = res[0].value;
				} catch (e) {
					//TODO handle the exception
					this.toast(e);
				}
			},
			callPhone() {
				// #ifdef H5
				this.copy(this.phone);
				return;
				// #endif
				uni.makePhoneCall({
					phoneNumber: this.phone
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		position: relative;
		overflow: hidden;

		.title {
			width: 100%;
			margin-top: 40rpx;
			padding: 0 30rpx;
			font-size: 43rpx;
			font-family: KaiTi;
			font-weight: bold;
			color: #000;
		}

		.text {
			width: 100%;
			margin-top: 30rpx;
			padding: 0 30rpx;
			font-size: 24rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #000;
		}

		.box {
			margin: 40rpx auto;
			width: 362rpx;
			height: 412rpx;

			.box-top {
				padding: 0 20rpx;
				height: 60rpx;
				font-size: 30rpx;
				font-family: Microsoft YaHei;
				font-weight: bold;
				color: #000000;
				line-height: 60rpx;
			}

			.box-img {
				display: block;
				margin: 0 auto;
				margin-top: 20rpx;
				width: 290rpx;
				height: 290rpx;
			}
		}

		.btn {
			margin: 40rpx auto;
			width: 687rpx;
			height: 100rpx;
			background: #00DB7D;
			border-radius: 10rpx;
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #fff;
			text-align: center;
			line-height: 100rpx;
		}
	}
</style>
