<template>
	<view>
		<view class="notice-containter">
			<view class="notice-title">{{noticeContent.title}}</view>
			<view class="notice-time">{{noticeContent.create_time}}</view>
		<!-- 	<view class="notice-img">
				<image :src="noticeContent.image" mode=""></image>
			</view> -->
			<view class="notice-content" v-html="util.checkImg(noticeContent.content)"></view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				noticeId: "",
				noticeContent: {},
			}
		},
		onLoad(options) {
			if(options.id) {
				this.noticeId = options.id
				this.goDetail()
			}
		},
		methods: {
			goDetail() {
				this.$http.post('index/noticeDesc', {
					noticeid: this.noticeId
				}).then(res => {
					if (res.code == 1) {
						this.noticeContent = res.data
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.status_bar {
		width: 100%;
		font-weight: 500;
		text-align: center;
		position: fixed;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #1C1C1C;
		color: #fff;
		// position: fixed;
		// left: 0;
		// top: 90rpx;
		z-index: 100;
		/*  #ifdef MP-WEIXIN */
		padding-top: var(--status-bar-height);
		/*  #endif  */
		.leftTit {
			width: 10%;
		}
	
		.tit {
			flex: 1;
			text-align: center;
			color: #FFFFFF;
			font-size: 32rpx;
		}
	}
	
	.notice-containter{
		padding:0 40rpx 30rpx;
		.notice-title{
			padding: 20rpx 0;
			text-align: left;
			font-size: 32rpx;
			font-weight: bold;
			color: #000;
		}
		.notice-time{
			text-align: left;
			height: 50rpx;
			line-height: 50rpx;
			color: #999;
			margin-bottom: 20rpx;
			font-size: 26rpx;
		}
		.notice-content{
			margin-top:10rpx;
			text-align: justify;
			color: #000;
			font-size: 28rpx;
		}
		.notice-img{
			width: 100%;
			height: 270rpx;
			image{
				width: 100%;
				height: 270rpx;
				border-radius: 30rpx;
			}
		}
	}
</style>
