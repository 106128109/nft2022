<template>
	<view class="flex flex-column flex-middle">
		<view class="item-notice bg1" v-for="(item,index) in noticeList" @click="goDetail(item)">
			<image :src="item.image" mode="aspectFill" class="conimg"></image>
			<view class="conright">
				<view class="black size-28 bold mb-8" style="color:#67c5cd">{{item.title}}</view>
				<view class="flex">
					<view class="label">{{item.create_time}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return{
				noticeList: []
			}
		},
		onLoad(){
			this.getNotice()
		},
		methods: {
			async getNotice() {
				try {
					let res = await this.$http.get("index/noticeList");
					this.noticeList = res.data
				} catch (e) {
			
				}
			},
			goDetail(noticeItem) {
				let urlLink = './noticeDetail?id=' + noticeItem.id
				this.go(urlLink)
			}
		}
	}
</script>

<style lang="scss">
	.item-notice{
			background: #F0F0F0;
			border-radius: 30rpx;
			margin-bottom: 30rpx;
			width:720rpx;
			height: 510rpx;
			.conimg {
				width: 720rpx;
				height: 398rpx;
				border-radius: 30rpx;
			}
		
			.conright {
				margin-left: 24rpx;
				.label {
					height: 40rpx;
					line-height: 40rpx;
					background-image: linear-gradient(to right bottom, #ceaae6, #61c7cb);
					border-radius: 6rpx;
					font-size: 22rpx;
					padding: 0 16rpx;
					font-weight: bold;
					color: #fff;
				}
			}
		
	}
</style>