<template>
	<view class="content">
		<view class="status_bar flexBox" :class="[scrollTopt>0?'fixedbotto':'','']">
			<view class="search">
				<input type="text" v-model="search" placeholder="请输入搜索内容">
				<view class="search-btn" @tap="searchClick">
					搜索
				</view>
			</view>
		</view>
		<swiper class="banner" indicator-dots="true" circular="true" autoplay="true" interval="2000" duration="500"
			indicator-color="#FFFFFF" indicator-active-color="#00D18B">
			<swiper-item v-for="(item, index) in banner" :key="index">
				<image :src="item.image" mode=""></image>
			</swiper-item>
		</swiper>

		<view class="tabBox flex_bt">
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120">
				<view :class="gid == item.id ? 'tab scroll-view-item_H act' : 'tab scroll-view-item_H'"
					v-for="(item, index) in CategoryList" @tap="reload(item.id)" :key="index">{{item.name}}</view>
			</scroll-view>
			<image class="right" v-if="block" @tap="block = !block" src="../../static/img/index/a2.png" mode=""></image>
			<image class="right" v-if="!block" @tap="block = !block" src="../../static/img/index/a1.png" mode="">
			</image>
		</view>


		<view class="goodsList" v-if="block">
			<view class="goodsItem" v-for="(item, index) in GoodsList" :key="index"
				@tap="go(`secondGoodsDetail?goodsId=${item.id}`)">
				<image class="goodsImg" :src="item.image" mode=""></image>
				<view class="goodsinfo">
					<view class="flex_bt">
						<view class="goodsName">{{item.name}}</view>
						<!-- <view class="label">{{item.goods_category_name}}</view> -->
					</view>
					<view class="flexBox flex_bt" style="margin-top: 20rpx;">
						<view class="label">{{item.goods_category_name}}</view>
						<view class="goodsPrice">
							{{item.price}}
						</view>
					</view>

					<!-- 	<view class="">
						<view class="goodsPrice">
							<text class="size-22">当前 ¥</text>{{item.price}}
						</view>
					</view> -->

				</view>
			</view>
		</view>

		<view class="goodsList1" v-if="!block">
			<view class="goodsItem flex" v-for="(item, index) in GoodsList" :key="index"
				@tap="go(`secondGoodsDetail?goodsId=${item.id}`)">
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
				search: "",
				banner: [],
				GoodsList: [],
				CategoryList: [{
					id: 0,
					name: '全部'
				}],
				status: 'more',
				pagesize: 15,
				page: 1,
				flag: false, //上拉加载
				block: true,
				scrollTopt: 0,
			};
		},
		onLoad(e) {
			this.Reset();
		},
		onPageScroll(e) {
			this.scrollTopt = e.scrollTop;
			if (this.scrollTopt > 220) {}
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
			searchClick() {
				this.gid = '';
				this.flag = false;
				this.page = 1;
				this.GoodsList = [];
				this.getGoodsList();
			},
			Reset() {
				this.flag = false;
				this.page = 1;
				this.GoodsList = [];
				this.CategoryList = [{
					id: 0,
					name: '全部'
				}]
				this.getBanner();
				this.getCategoryList();
			},
			reload(a) {
				if (this.gid != a) {
					this.gid = a;
					this.flag = false;
					this.page = 1;
					this.GoodsList = [];
					this.getGoodsList()
				}
			},
			getCategoryList() {
				this.$http.get('goods/goodsCategoryList').then(res => {
					if (res.code == 1) {
						this.CategoryList = this.CategoryList.concat(res.data);
						this.gid = 0;
						this.getGoodsList();
					}
				})
			},
			getGoodsList() {
				let data = {
					goods_category_id: this.gid,
					page: this.page,
					pagesize: this.pagesize,
				}
				if (this.search) {
					data.search = this.search;
				}
				this.$http.get('order/memberGoodsList', data).then(res => {
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
<style lang="scss" scoped>
	/deep/uni-swiper .uni-swiper-wrapper {
		overflow: inherit;
	}

	/deep/uni-swiper .uni-swiper-dots-horizontal {
		bottom: -20rpx !important;
	}

	/deep/uni-swiper .uni-swiper-dot-active {
		width: 30rpx;
		height: 12rpx;
		background: #00D18B;
		border-radius: 6rpx;
	}

	.status_bar {
		width: calc(100% - 40rpx);
		padding: 0 20rpx;
		height: 80rpx;

		padding-top: var(--status-bar-height);

		.search {
			width: calc(100%);
			height: 60rpx;
			border-radius: 10rpx;
			box-shadow: 0rpx 0rpx 15rpx 6rpx rgba(52, 52, 52, 0.1);
			display: flex;

			input {
				width: calc(100% - 140rpx);
				;
				height: 60rpx;
				font-size: 26rpx;
				padding: 0 20rpx;
				border-radius: 5rpx;
			}

			.search-btn {
				width: 99rpx;
				height: 60rpx;
				border-left: 1rpx solid rgba(52, 52, 52, 0.1);
				font-size: 28rpx;
				color: #000000;
				text-align: center;
				line-height: 60rpx;
			}
		}
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
		color: #000000;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
	}

	.content {
		padding-bottom: 100rpx;

		.banner {
			padding: 0 0 20rpx 0;
			width: calc(100%);
			height: 320rpx;

			.uni-swiper-wrapper {
				z-index: 10;
			}

			image {
				width: 100%;
				height: 320rpx;
			}
		}

		.tabBox {
			padding: 0 28rpx;
			height: 88rpx;

			.tab {
				font-size: 30rpx;
				color: #000000;
				height: 88rpx;
				text-align: center;

				&.act {
					font-weight: 600;
					color: #000000;
				}
			}

			.right {
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

			.goodsItem {
				width: 335rpx;
				margin-bottom: 25rpx;
				background: #FFFFFF;
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
						background: #FFE9B5;
						border-radius: 6rpx;
						color: #1E1817;
					}

					.goodsName {
						flex: 1;
						font-size: 28rpx;
						font-weight: 500;
						color: #000000;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.creator {
						width: 40%;
						color: #FFFFFF;
						font-size: 20rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.goodsPrice {
						color: #000000;
						font-size: 28rpx;
						font-weight: 500;
					}
				}
			}
		}

		.goodsList1 {
			padding: 0 30rpx;

			.goodsItem {
				margin-bottom: 20rpx;

				.goodsImg {
					width: 300rpx;
					height: 300rpx;
					border-radius: 20rpx;
					margin-right: 25rpx;
				}

				.goodsinfo {
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

					.goodsName {
						font-size: 32rpx;
						font-weight: 500;
						color: #000000;
						line-height: 40rpx;
						height: 80rpx;
						overflow: hidden;
						word-break: break-all;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}

					.creator {
						color: #FFFFFF;
						font-size: 20rpx;
						margin-bottom: 15rpx;
					}

					.goodsPrice {
						color: #000000;
						font-size: 24rpx;
						font-weight: 500;
					}

				}
			}
		}

	}
</style>
