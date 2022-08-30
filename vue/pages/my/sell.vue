<template>
	<view class="content container">
		<view class="goodsList">
			<view class="goodsItem" v-for="(item, index) in collectionList" :key="index" @tap="goDetail(item.id)">
				<image class="goodsImg" :src="item.goods_image" mode="aspectFill"></image>
				<view class="goodsinfo">
					<view class="goodsName">{{item.goods_name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showType: '2',
				id: 0,
				collectionList: {},
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getList();
		},
		methods: {
			getList() {
				let data = {
					status: this.showType,
					id: this.id
				}
				this.$http.post('index/collectionList', data).then(res => {
					this.collectionList = res;
				})
			},
			goDetail(a) {
				uni.navigateTo({
					url: '../user/mySaleDetail?goodsId=' + a
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		position: relative;

		.goodsList {
			padding: 0 30rpx;
			display: flex;
			flex-wrap: wrap;

			justify-content: space-between;

			.goodsItem {
				width: 335rpx;
				//background: #FFFFFF;
				//background: #383B3F;
				border-radius: 20rpx;
				margin-bottom: 20rpx;

				.goodsImg {
					width: 335rpx;
					height: 335rpx;
					border-radius: 20rpx;
				}

				.goodsinfo {
					padding: 20rpx;

					.goodsName {
						font-size: 26rpx;
						font-weight: 500;
						// color: #333333;
						color: #000;
						overflow: hidden;
						word-break: break-all;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
				}
			}
		}
	}
</style>
