<template>
	<view class="content">
		<swiper class="banner" indicator-dots="true" circular="true" autoplay="true" interval="2000" duration="500"
			indicator-color="#FFFFFF" indicator-active-color="#00D18B">
			<swiper-item v-for="(item, index) in banner" :key="index">
				<image :src="item.image" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		
		<!-- <view class="tabBox flex_bt">
			<scroll-view class="scroll-view_H"  scroll-x="true" scroll-left="120">
					<view :class="gid == item.id ? 'tab scroll-view-item_H act' : 'tab scroll-view-item_H'" v-for="(item, index) in CategoryList" @tap="reload(item.id)" :key="index">{{item.name}}</view>
			</scroll-view>
				<image class="right" v-if="block" @tap="block = !block" src="../../static/img/index/a2.png" mode=""></image>
				<image class="right" v-if="!block" @tap="block = !block" src="../../static/img/index/a1.png" mode=""></image>
		</view> -->
		

		<view class="goodsList" v-if="block">
			<view class="goodsItem" v-for="(item, index) in GoodsList" :key="index" @tap="go(`secondGoodsDetail?goodsId=${item.id}`)">
				<image class="goodsImg" :src="item.image" mode=""></image>
				<view class="goodsinfo">
					<view class="flex_bt">
						<view class="goodsName">{{item.name}}</view>
						<!-- <view class="label">{{item.goods_category_name}}</view> -->
					</view>
					
					<view class="">
						<!-- <view class="creator">{{item.creator}}</view> -->
						<view class="goodsPrice">
						<text class="size-22">当前 ¥</text>{{item.price}}</view>
					</view>
					
				</view>
			</view>
		</view>
		
		<view class="goodsList1" v-if="!block">
			<view class="goodsItem flex" v-for="(item, index) in GoodsList" :key="index" @tap="go(`secondGoodsDetail?goodsId=${item.id}`)">
				<image class="goodsImg" :src="item.image" mode=""></image>
				<view class="goodsinfo">
					<view class="goodsName">{{item.name}}</view>
					<view class="label">{{item.goods_category_name}}</view>
					<view class="creator">{{item.creator}}</view>
					<view class="goodsPrice">当前 ¥ <text style="font-size: 36rpx;">{{item.price}}</text></view>
				</view>
			</view>
		</view>
		
		<uni-load-more :status="status" v-if="GoodsList.length"></uni-load-more>
		<uni-footer currentTab="1"></uni-footer>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gid: '',
				banner: [],
				GoodsList: [],
				CategoryList:[{
					id: 0, name: '全部'
				}],
				status: 'more',
				pagesize: 15,
				page: 1,
				flag: false, //上拉加载
				block: true
			};
		},
		onLoad(e) {
			this.Reset();
		},
		onPullDownRefresh() {
			this.Reset();
		},
		onReachBottom() {
			if (!this.flag) {
				this.status = "loading";
				this.page++;
				this.getGoodsList();
			}
		},
		methods: {
			Reset() {
				this.flag = false;
				this.page = 1;
				this.GoodsList = [];
				this.CategoryList = [{
					id: 0, name: '全部'
				}]
				this.getBanner();
				this.getCategoryList();
			},
			reload(a){
				if(this.gid != a){
					this.gid = a;
					this.flag = false;
					this.page = 1;
					this.GoodsList = [];
					this.getGoodsList()
				}
			},
			getCategoryList(){
				this.$http.get('goods/goodsCategoryList').then(res => {
					if (res.code == 1) {
						this.CategoryList = this.CategoryList.concat(res.data);
						this.gid = 0;
						this.getGoodsList();
					}
				})
			},
			getGoodsList() {
				this.$http.get('order/memberGoodsList', {
					goods_category_id: this.gid,
					page: this.page,
					pagesize: this.pagesize
				}).then(res => {
					uni.stopPullDownRefresh();
					if (res.code == 1) {
						if (res.data.data.length != 0) {
							this.GoodsList = this.GoodsList.concat(res.data.data)
							if (res.data.data.length < this.pagesize) {
								this.flag = true;
								this.status = 'noMore'
							}
						} else {
							this.flag = true;
							this.status = 'noMore'
						}
					} else {
						this.flag = true;
						this.status = 'noMore'
					}
				})
			},
			getBanner() {
				this.$http.get('index/bannerList', {
					type: '2'
				}).then(res => {
					uni.stopPullDownRefresh();
					if (res.code == 1) {
						this.banner = res.data;
					}
				})
			}
		}
	}
</script>
<style>
	page {
		background-color: #1e201f;
	}
</style>
<style lang="scss" scoped>
	/deep/uni-swiper .uni-swiper-wrapper{
		overflow: inherit;
	}
	/deep/uni-swiper .uni-swiper-dots-horizontal {
	    bottom: -20rpx  !important;
	}
	/deep/uni-swiper .uni-swiper-dot-active{
		width: 30rpx;
		height: 12rpx;
		background: #00D18B;
		border-radius: 6rpx;
	}
	.scroll-view_H {
			white-space: nowrap;
			width: 90%;
		}
		.scroll-view-item_H {
			padding: 0 10rpx;
			margin-right: 20rpx;
			display: inline-block;
			font-size: 30rpx;
			color: rgba(255, 255, 255, 1);
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
		}
	.content {
		.banner {
			padding: 20rpx 0 40rpx 0;
			width: calc(100% - 60rpx);
			height: 320rpx;
			margin: 0 30rpx;

			.uni-swiper-wrapper {
				z-index: 10;
			}

			image {
				width: 100%;
				height: 320rpx;
				border-radius: 20rpx;
			}
		}
		.tabBox{
			padding: 0 28rpx;
			height: 88rpx;
			.tab {
				font-size: 30rpx;
				color: rgba(255, 255, 255, 0.65);
				height: 88rpx;
				text-align: center;
				&.act {
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
				}
			}
			.right{
				width: 36rpx;
				height: 36rpx;
				padding: 10rpx;
			}
		}

		.goodsList {
			padding: 0 28rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-bottom: 50rpx;

			.goodsItem {
				width: 335rpx;
				margin-bottom: 25rpx;
				background: #1B1A1A;
				border-radius: 20rpx;

				.goodsImg {
					width: 330rpx;
					height: 300rpx;
					border-radius: 20rpx;
				}

				.goodsinfo {
					padding: 20rpx 20rpx;
					.label {
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						font-size: 28rpx;
						padding: 0 10rpx;
						background: #fff;
						border-radius: 6rpx;
						color: #1E1817;
						margin-bottom: 20rpx;
					}

					.goodsName {
						flex: 1;
						font-size: 28rpx;
						font-weight: 500;
						color: #fff;
						margin-bottom: 20rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.creator{
						width: 40%;
						color: #FFFFFF;
						font-size: 20rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.goodsPrice {
						color: #EDDFC0;
						font-size: 32rpx;
						font-weight: 500;
					}
				}
			}
		}
		.goodsList1{
			padding: 0 30rpx;
			.goodsItem{
				margin-bottom: 20rpx;
				.goodsImg{
					width: 300rpx;
					height: 300rpx;
					border-radius: 20rpx;
					margin-right: 25rpx;
				}
				.goodsinfo{
					padding: 10rpx 0;
					flex: 1;
					.label {
						width: 100rpx;
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						font-size: 22rpx;
						padding: 0 15rpx;
						background: #F1E2BC;
						border-radius: 6rpx;
						color: #1E1817;
						margin: 20rpx 0;
					}
					
					.goodsName{
						font-size: 32rpx;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 40rpx;
						height: 80rpx;
						overflow: hidden;
						word-break: break-all;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
					.creator{
						color: #FFFFFF;
						font-size: 20rpx;
						margin-bottom: 15rpx;
					}
					.goodsPrice{
						color: #AE3523;
						font-size: 24rpx;
						font-weight: 500;
					}
					
				}
			}
		}

	}
</style>
