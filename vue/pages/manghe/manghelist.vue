<template>
	<view class="listBox">
		<view class="listItem" v-for="(item, index) in goodsList" :key="index">
			<view class="goodsList" >
				<image class="goodImg" :src="item.goods_image" mode=""></image>
				<view class="msgBox">
					<view class="goodName">
						<view class="manghe_flag">盲盒</view>
						<view class="">{{item.goods_name}}</view>
					</view>
					<!-- <view class="flex_bt">
						<view class="time">剩余次数:</view>
					</view> -->
					<view class="flex_bt">
						<view class="time">总数:<text class="no_open">{{item.no_open}}</text>/<text class="total">{{item.total}}</text></view>
					</view>
				</view>
				<view class="gotoMangheBtn" @tap="gotoMangheDetail(item)">立即开启</view>
			</view>
		</view>
		<uni-load-more :status="status" v-if="goodsList.length"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList: [],
				status: 'more',
				pagesize: 15,
				page: 1,
				flag: false, //上拉加载
			}
		},
		onShow() {
			this.Reset();
		},
		onLoad(e) {
			//this.Reset();
		},
		onReachBottom() {
			if (!this.flag) {
				this.status = "loading";
				this.page++;
				this.getList()
			}
		},
		onPullDownRefresh() {
			this.Reset();
		},
		methods: {
			Reset() {
				this.flag = false;
				this.page = 1;
				this.goodsList = [];
				this.getList()
			},
			gotoMangheDetail(item){
				this.go('openMangheDetail?goodsId=' + item.goods_id)
			},
			getList() {
				let data = {
					typeStatus: this.status,
					page: this.page,
					pagesize: this.pagesize
				}
				this.$http.post('manghe/mangheList', data).then(res => {
					uni.stopPullDownRefresh();
					if (res.code == 1) {
						if (res.data.data.length == 0) {
							this.flag = true;
							this.status = 'noMore'
						} else {
							this.goodsList = this.goodsList.concat(res.data.data);
							if (res.data.data.length < this.pagesize) {
								this.flag = true;
								this.status = 'noMore'
							}
						}
					} else {
						this.flag = true;
						this.status = 'noMore'
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.listBox {
	padding: 80rpx 30rpx 0;

	.listItem {
		// background: #383B3F;
		border-radius: 10rpx;
		margin-bottom: 30rpx;
		padding: 0 30rpx;
		background-color: #1B1A1A;
		.goodsList {
			padding: 30rpx 0;
			display: flex;
			align-items: center;
			.goodImg {
				width: 160rpx;
				height: 160rpx;
				margin-right: 20rpx;
			}
			.msgBox {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.goodName {
					font-size: 28rpx;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 40rpx;
					margin-bottom: 20rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					display: flex;
					justify-content: flex-start;
					.manghe_flag{
						width: 60rpx;
						height: 32rpx;
						line-height: 32rpx;
						text-align: center;
						padding: 2rpx 4rpx;
						background: #00DB7D;
						margin-right: 10rpx;
						border-radius: 4rpx;
						color: #333;
						font-size: 24rpx;
					}
				}
				
				.time {
					color: #AAAAAA;
					font-size: 24rpx;
					text-align: right;
					padding: 15rpx 0rpx;
				}
				.no_open{
					margin-left: 20rpx;
					color: red;
				}
				.total{
					margin-left: 0rpx;
				}
			}
			.gotoMangheBtn{
				width: 150rpx;
				height: 50rpx;
				background: #00DB7D;
				border-radius: 30rpx;
				line-height: 50rpx;
				padding: 4rpx 10rpx;
				color: #333;
				text-align: center;
				font-size: 26rpx;
				font-weight: bold;
			}
		}


		.handBox {
			height: 108rpx;
			font-size: 28rpx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			border-top: 2rpx solid #666262;

			.Btn {
				width: 140rpx;
				height: 56rpx;
				line-height: 56rpx;
				text-align: center;
				border-radius: 28rpx;
				font-weight: 500;
				font-family: PingFangSC-Medium;
				font-size: 28rpx;
				border: 2rpx solid #777777;
				color: #777777;
				margin-left: 20rpx;
			}

			.payBtn {
				border: 2rpx solid #4BAE45;
				color: #4BAE45;
			}

		}
	}
}
</style>
