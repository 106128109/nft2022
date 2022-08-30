<template>
	<view class="content container">
		<view class="status_bar flexBox">
			<view class="leftTit">
				<image class="logo" src="../../static/img/index/index-logo.png" mode="widthFix"></image>
			</view>
		</view>
		<swiper class="banner" indicator-dots="true" circular="true" autoplay="true" interval="3000" duration="800"
			indicator-color="#FFFFFF" indicator-active-color="#00D18B">
			<swiper-item v-for="(item, index) in banner" :key="index" @tap="goSwiper(item)">
				<image :src="item.image" mode=""></image>
			</swiper-item>
		</swiper>

		<view class="listBox">
			<view class="listItem" v-for="(item,index) in shopList" :key="index" @tap="gotoDetail(item)">
				<view class="mask">
					<view class="state" v-if="item.status == 1">{{item.end_time}} 结束</view>
					<view class="state" v-if="item.status == 2">{{item.start_time}} 开售</view>
					<!-- <view class="center flex_column">
						<image :src="item.image" mode="aspectFill"></image>
					</view> -->
				</view>
				<image class="goodsImg" :src="item.image" mode=""></image>
				<view class="goodsinfo">
					<view class="goodName">{{item.name}}</view>
					<view class="flexBox">
						<view class="label">{{item.goods_category_name}}</view>
						<view class="flexBox LimitBox">
							<view class="Limit">总量</view>
							<view class="stock">{{item.mhstock}}份</view>
						</view>
						<view class="price" style="margin-left: 20rpx;">¥{{item.price}}</view>
					</view>

				</view>
			</view>
		</view>
		<uni-load-more :status="status" v-if="shopList.length"></uni-load-more>
		<uni-footer currentTab="2"></uni-footer>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				banner: [],
				shopList: [],
				status: 'more',
				pagesize: 15,
				page: 1,
				flag: false, //上拉加载
				gid: '0',
				showType: '0',
				scrollTopt: 0,
			}
		},
		onLoad(e) {
			this.getBanner()
			this.shopList = [];
			this.getList();
			const that = this
			uni.$on('init', () => {
				this.flag = false;
				that.page = 1;
				that.shopList = [];
				that.getList();
			})
		},
		onPageScroll(e) {
			//根据scrollTop值超过某个临界点，设置不同的css样式
			this.scrollTopt = e.scrollTop;
			if (this.scrollTopt > 220) {

			}
		},
		onReachBottom() {
			if (!this.flag) {
				this.status = "loading";
				this.page++;
				this.getList();
			}
		},
		onPullDownRefresh() {
			this.getBanner();
			this.flag = false;
			this.page = 1;
			this.shopList = [];
			this.getList();
		},
		methods: {
			goSwiper(item) {
				if (item.url) {
					// #ifdef MP || APP-PLUS
					this.go('webView?ss=' + item.url)
					// #endif
					// #ifdef H5
					location.href = item.url;
					// #endif
				}
			},
			gotoDetail(item) {
				this.go('goodsMangheDetail?goodsId=' + item.id)
			},
			getList() {
				this.$http.get('manghe/goodsMangheList', {
					page: this.page,
					pagesize: this.pagesize
				}).then(res => {
					uni.stopPullDownRefresh();
					if (res.code == 1) {
						if (res.data.data.length == 0) {
							this.flag = true;
							this.status = 'noMore'
						} else {
							this.shopList = this.shopList.concat(res.data.data);
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
			getBanner() {
				this.$http.get('manghe/bannerList', {}).then(res => {
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

	.content {
		padding-bottom: 100rpx;

		.twoimg {
			height: 400rpx;
			width: 100%;
			border-radius: 20rpx;
		}

		.status_bar {
			width: calc(100% - 40rpx);
			padding: 0 20rpx;
			height: 80rpx;
			padding-top: var(--status-bar-height);

			.logo {
				margin-top: 20rpx;
				width: 280rpx;
			}
		}

		.banner {
			margin: 20rpx;
			height: 320rpx;
			border-radius: 20rpx;
			overflow: hidden;


			.uni-swiper-wrapper {
				z-index: 10;
				// background: #0A0A0A;
			}

			image {
				width: 100%;
				height: 320rpx;
			}

			.info {
				padding: 20rpx;

				.name {
					color: #FFFFFF;
					font-size: 30rpx;
				}

				.title {
					color: #757679;
					font-size: 22rpx;
				}
			}
		}

		.listBox {
			margin: 20rpx 20rpx;

			.listItem {
				background-color: #FFFFFF;
				border-radius: 30rpx;
				margin-bottom: 35rpx;
				margin-right: 20rpx;
				position: relative;

				.mask {
					width: 690rpx;
					height: 690rpx;
					border-radius: 30rpx;
					position: absolute;
					left: 0;
					top: 0;
					z-index: 10;

					.state {
						display: inline-block;
						padding: 0 18rpx;
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						color: #fff;
						font-size: 24rpx;
						border-radius: 22rpx;
						background: linear-gradient(90deg, #00D18B 0%, #00D18B 100%);
						margin-top: 30rpx;
						margin-left: 28rpx;
					}

					.state1 {
						color: rgba(255, 255, 255, 0.6);
						background: #010004;
						border-radius: 22rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						display: flex;
						max-width: 150rpx;
						box-sizing: border-box;

						.time {
							height: 26rpx;
							width: 26rpx;
							margin-right: 8rpx;
							margin: auto 8rpx auto 0;
						}
					}

				}

				.goodsImg {
					width: 690rpx;
					height: 690rpx;
					border-radius: 30rpx;
					// -webkit-filter: blur(4px);
					// filter: blur(4px);
				}

				.goodsinfo {
					padding: 15rpx 20rpx;

					// .goodsinfo-box {
					// 	width: 100%;
					// 	display: flex;
					// 	justify-content: space-between;
					// }

					.goodName {
						color: #000000;
						font-size: 30rpx;
						margin-bottom: 15rpx;
					}

					.label {
						height: 40rpx;
						line-height: 40rpx;
						font-size: 22rpx;
						padding: 0 15rpx;
						background: #F1E2BC;
						border-radius: 6rpx;
						color: #1E1817;
						margin-right: 20rpx;
					}

					.LimitBox {
						height: 40rpx;
						line-height: 40rpx;
						background: #3A3A3A;
						border-radius: 6rpx;
						font-size: 12px;

						.Limit {
							padding: 0 15rpx;
							border-radius: 6rpx;
							color: #010101;
							background-color: #EDDFC0;
						}

						.stock {
							padding: 0 15rpx;
							color: #fff;
						}
					}

					.bottom {
						margin-top: 10rpx;
					}

					.company_image {
						width: 32rpx;
						height: 32rpx;
						margin-right: 10rpx;
					}

					.price {
						color: #6cb9c3;
						font-size: 30rpx;
						font-weight: bold;
					}

					.good {
						flex: 1;
						color: rgba(255, 255, 255, 0.35);
						// color: #777777;
						font-size: 24rpx;
						font-weight: 500;
					}
				}
			}

			.listItem:nth-child(2n) {
				margin-right: 0rpx;
			}
		}





	}
</style>
